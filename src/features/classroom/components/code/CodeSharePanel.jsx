// features/classroom/components/CodeSharePanel.jsx (리팩토링 버전)

import Editor from '@monaco-editor/react';
import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import styles from './CodePanel.module.css';
import { useMonacoEditor } from "@/features/classroom/hooks/code/useMonacoEditor.js";
import { useCodeExecution } from "@/features/classroom/hooks/code/useCodeExecution.js";
import { getEditorOptions } from "@/features/classroom/utils/editorUtils.js";
import { useSocketContext } from "@/features/classroom/contexts/SocketContext";
import { CLASS_MODES, useClassMode } from "@/features/classroom/contexts/ClassModeContext.jsx";

const CodeSharePanel = ({ classId, isInstructor = false }) => {
    const [sharedCode, setSharedCode] = useState('// 코드를 기다리는 중...');
    const [senderInfo, setSenderInfo] = useState(null);
    const { handleEditorMount } = useMonacoEditor();
    const { output, run, copy } = useCodeExecution(sharedCode);
    const { mode } = useClassMode();
    const socket = useSocketContext();

    const isReadOnly = !isInstructor && mode === CLASS_MODES.VIEW_ONLY;

    // 역할에 따른 구독 토픽 결정
    const subscribeTopic = isInstructor
        ? `/topic/code/student/${classId}`
        : `/topic/code/instructor/${classId}`;

    // 코드 수신 구독
    useEffect(() => {
        if (!socket || !socket.connected) {
            console.log('[CodeSharePanel] 소켓 미연결 또는 classId 없음');
            return;
        }

        console.log(`[CodeSharePanel] 구독 시작: ${subscribeTopic}`);

        const subscription = socket.subscribe(subscribeTopic, (data) => {
            console.log('[CodeSharePanel] 수신 데이터:', data);

            if (!data || data.code == null) return;

            setSharedCode(data.code);
            setSenderInfo({
                userId: data.userId,
                timestamp: new Date(),
            });
        });

        return () => {
            if (subscription) {
                subscription.unsubscribe();
                console.log(`[CodeSharePanel] 구독 해제: ${subscribeTopic}`);
            }
        };
    }, [socket, socket?.connected, classId, subscribeTopic]);

    const options = getEditorOptions(true); // 항상 읽기 전용

    return (
        <div className={`${styles.relative} ${styles.editorWrapper}`}>
            {/* 헤더 */}
            <div className={styles.shareHeader}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
                    {isInstructor ? '📝 학생 코드 (실시간)' : '👨‍🏫 강사 코드 (실시간)'}
                </h3>
                {senderInfo && (
                    <span style={{ fontSize: '12px', opacity: 0.7 }}>
                        User #{senderInfo.userId} · {senderInfo.timestamp.toLocaleTimeString()}
                    </span>
                )}
            </div>

            {/* 읽기 전용 배지 */}
            <div className={styles.readOnlyBadge}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                실시간 동기화
            </div>

            <PanelGroup direction="vertical">
                {/* 에디터 패널 */}
                <Panel defaultSize={70} minSize={30}>
                    <Editor
                        language="javascript"
                        value={sharedCode}
                        options={options}
                        onMount={handleEditorMount}
                        theme="customTheme"
                        className={styles.editor}
                    />
                </Panel>

                {/* 리사이즈 핸들 */}
                <PanelResizeHandle className={styles.verticalResizer}>
                    <div className={styles.dotWrap} />
                </PanelResizeHandle>

                {/* 결과 패널 */}
                <Panel defaultSize={30} minSize={15} maxSize={70}>
                    <div className={styles.bottomPane}>
                        <div className={styles.resultHeader}>
                            <div className={styles.flex}>
                                <button onClick={run} className={styles.runButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                                    </svg>
                                </button>
                                <button onClick={copy} className={styles.copyButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <pre className={styles.resultOutput}>{output || "결과가 여기에 표시됩니다."}</pre>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    );
};

export default CodeSharePanel;