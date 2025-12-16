import Editor from '@monaco-editor/react';
import {useEffect, useRef, useState} from "react";
import {useDarkMode} from "@/hooks/useDarkMode.js";
import styles from './CodePanel.module.css';
import { useSocketContext } from "@/features/classroom/contexts/SocketContext";
import {api} from "@/services/api.js";

const CodeSharePanel = ({classId, isInstructor = false}) => {
    const {darkMode} = useDarkMode();

    // 로컬 상태 사용 (독립적인 코드 관리)
    const [sharedCode, setSharedCode] = useState("// 공유된 코드가 여기에 표시됩니다...");
    const [editorInstance, setEditorInstance] = useState(null);
    const [monacoInstance, setMonacoInstance] = useState(null);
    const [output, setOutput] = useState("");
    const [lastUpdateTime, setLastUpdateTime] = useState(null);
    const socket = useSocketContext();

    // 선생님이 수정할 때 사용할 디바운스 타이머
    const debounceTimerRef = useRef(null);

    /**
     * 웹소켓 구독
     */
    useEffect(() => {
        if (!socket || !classId) {
            return;
        }

        if (!socket.connected) {
            return;
        }

        const subscription = socket.subscribe(
            `/topic/code/${classId}`,
            (data) => {
                handleReceivedCode(data);
            }
        );

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [socket, socket?.connected, classId]);

    /**
     * 받은 코드 처리
     */
    const handleReceivedCode = (dto) => {
        // 코드 업데이트
        if (dto.code !== undefined) {
            setSharedCode(dto.code);

            if (editorInstance) {
                // 현재 커서 위치 저장
                const currentPosition = editorInstance.getPosition();
                const currentScrollTop = editorInstance.getScrollTop();

                // 코드 업데이트
                editorInstance.setValue(dto.code);

                // 선생님의 경우 커서와 스크롤 위치 복원
                if (isInstructor && currentPosition) {
                    editorInstance.setPosition(currentPosition);
                }
                editorInstance.setScrollTop(currentScrollTop);
            }

            // 마지막 업데이트 시간 기록
            setLastUpdateTime(new Date().toLocaleTimeString());
        }

        // output 업데이트
        if (dto.output !== undefined) {
            setOutput(dto.output || "");
        }
    };

    /**
     * 선생님이 코드를 수정할 때 자동으로 전송
     */
    useEffect(() => {
        if (!isInstructor) return;
        if (!socket || !socket.connected || !classId) return;

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            const message = {
                code: sharedCode,
                language: 'javascript',
                output: output || null,
            };

            try {
                socket.publish(`/app/code/${classId}`, message);
            } catch (error) {
                console.error('코드 전송 실패:', error);
            }
        }, 300);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [sharedCode, output, socket, classId, isInstructor]);

    /**
     * 라이트/다크 자동 적용
     */
    const applyTheme = (monaco) => {
        if (!monaco) return;

        const bg = getComputedStyle(document.documentElement)
            .getPropertyValue("--color-bg-primary")
            .trim();

        const baseTheme = darkMode ? "vs-dark" : "vs";

        monaco.editor.defineTheme("customTheme", {
            base: baseTheme,
            inherit: true,
            rules: [],
            colors: {
                "editor.background": bg,
            },
        });

        monaco.editor.setTheme("customTheme");
    };

    /**
     * Editor 로딩 시 실행
     */
    const handleEditorMount = (editor, monaco) => {
        setEditorInstance(editor);
        setMonacoInstance(monaco);
        applyTheme(monaco);

        const wrapper = editor.getDomNode().parentElement;
        const observer = new ResizeObserver(() => editor.layout());
        observer.observe(wrapper);

        editor.__observer = observer;
    };

    /**
     * 테마 모드 바뀔 때마다 테마 재적용
     */
    useEffect(() => {
        if (monacoInstance) {
            applyTheme(monacoInstance);
        }
    }, [darkMode]);

    /**
     * 컴파일 창 리사이즈
     */
    const bottomRef = useRef(null);
    const startResize = (e) => {
        e.preventDefault();
        document.addEventListener("mousemove", handleResize);
        document.addEventListener("mouseup", stopResize);
    };

    const handleResize = (e) => {
        const containerTop = bottomRef.current.parentElement.getBoundingClientRect().top;
        const containerHeight = bottomRef.current.parentElement.offsetHeight;

        const newHeight = containerHeight - (e.clientY - containerTop);

        bottomRef.current.style.height = `${newHeight}px`;

        if (editorInstance) editorInstance.layout();
    };

    const stopResize = () => {
        document.removeEventListener("mousemove", handleResize);
        document.removeEventListener("mouseup", stopResize);
    };

    /**
     * 선생님 전용: 실행 기능
     */
    const run = async () => {
        if (!isInstructor) return;

        try {
            const encoded = btoa(unescape(encodeURIComponent(sharedCode)));

            const response = await api.post("/api/compile/run", {
                code: encoded,
            });

            const result = response.data;
            const newOutput = result.output || "결과가 없습니다.";
            setOutput(newOutput);

            // 결과를 웹소켓으로 전송
            if (socket && socket.connected) {
                const message = {
                    code: sharedCode,
                    language: 'javascript',
                    output: newOutput,
                };
                socket.publish(`/app/code/${classId}`, message);
            }

        } catch (err) {
            const errorOutput = err.response
                ? "백엔드 오류:\n" + JSON.stringify(err.response.data, null, 2)
                : "네트워크 오류:\n" + err.message;
            setOutput(errorOutput);
        }
    };

    /**
     * 선생님 전용: 리셋 기능
     */
    const reset = () => {
        if (!isInstructor) return;

        const resetCode = "// write code";
        setSharedCode(resetCode);
        if (editorInstance) editorInstance.setValue(resetCode);
    };

    /**
     * 복사 기능
     */
    const copy = () => {
        navigator.clipboard.writeText(sharedCode);
        alert("복사 되었습니다.");
    };

    /**
     * 모나코 에디터 내장 옵션
     */
    const options = {
        minimap: {enabled: false},
        fontSize: 14,
        tabSize: 2,
        scrollBeyondLastLine: false,
        wordWrap: "on",
        lineDecorationsWidth: 1,
        lineNumbersMinChars: 1,
        automaticLayout: true,
        overviewRulerLanes: 0,
        overviewRulerBorder: false,
        scrollbar: {
            verticalScrollbarSize: 4,
            verticalSliderSize: 4,
        },
        readOnly: !isInstructor, // 선생님만 편집 가능
    };

    return (
        <>
            <div className={`${styles.relative} ${styles.editorWrapper} ${styles.editorWrapperRight}`}>
                {/* 선생님 전용: 편집 가능 표시 */}
                {isInstructor && (
                    <div className={styles.indigator} style={{backgroundColor: 'var(--color-success)', color: 'white'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                            <path d="m15 5 4 4"/>
                        </svg>
                        편집 모드
                    </div>
                )}

                {/* 실시간 업데이트 인디케이터 */}
                {lastUpdateTime && !isInstructor && (
                    <div className={styles.indigator}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-clock-check-icon lucide-clock-check">
                            <path d="M12 6v6l4 2"/>
                            <path d="M22 12a10 10 0 1 0-11 9.95"/>
                            <path d="m22 16-5.5 5.5L14 19"/>
                        </svg>
                        {lastUpdateTime}
                    </div>
                )}

                <Editor
                    language="javascript"
                    value={sharedCode}
                    onChange={(value) => setSharedCode(value)}
                    options={options}
                    onMount={handleEditorMount}
                    theme="customTheme"
                    className={styles.editor}
                />

                {/* 하단 결과창 */}
                <div className={`${styles.bottomPane} ${styles.bottomPaneRight}`} ref={bottomRef}>
                    {/* 리사이즈 바 */}
                    <div className={styles.resizer} onMouseDown={startResize}>
                        <div className={styles.dotWrap}/>
                    </div>

                    {/* 컴파일 창*/}
                    <div className={styles.resultHeader}>
                        <div className={styles.flex}>
                            {/* 선생님만 실행/리셋 버튼 표시 */}
                            {isInstructor && (
                                <>
                                    <button onClick={run} className={styles.runButton}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>
                                        </svg>
                                    </button>
                                    <button onClick={reset} className={styles.resetButton}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                                            <path d="M3 3v5h5"/>
                                        </svg>
                                    </button>
                                </>
                            )}
                            <button onClick={copy} className={styles.copyButton} title="복사">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <pre className={styles.resultOutput}>{output || "결과가 여기에 표시됩니다."}</pre>
                </div>
            </div>
        </>
    )
}

export default CodeSharePanel;