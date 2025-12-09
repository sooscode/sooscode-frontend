// src/features/chat/ChatSidebar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "./ChatPanel.css";

const SOCKET_URL = "http://localhost:8080/ws";

export default function ChatPanel({ userId, username }) {
    // ✅ 여기서 classId를 그냥 1로 고정
    const classId = 1;

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    const clientRef = useRef(null);
    const bottomRef = useRef(null);

    // ✅ 히스토리
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/chat/history?classId=${classId}`,
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!res.ok) {
                    console.error("채팅 히스토리 요청 실패:", res.status);
                    setMessages([]);
                    return;
                }

                const data = await res.json();
                if (Array.isArray(data)) {
                    setMessages(data);
                } else {
                    setMessages([]);
                }
            } catch (e) {
                console.error("히스토리 요청 에러:", e);
                setMessages([]);
            }
        };

        fetchHistory();
    }, [classId]);

    // ✅ STOMP 연결
    useEffect(() => {
        const socket = new SockJS(SOCKET_URL, null, { withCredentials: true });
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
        });

        client.onConnect = () => {
            setIsConnected(true);

            client.subscribe(`/topic/chat/${classId}`, (msg) => {
                const body = JSON.parse(msg.body);
                setMessages((prev) => [...prev, body]);
            });
        };

        client.onStompError = (frame) => {
            console.error("STOMP 에러:", frame.headers["message"]);
        };

        client.activate();
        clientRef.current = client;

        return () => client.deactivate();
    }, [classId]);

    // ✅ 자동 스크롤
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // ✅ 메시지 전송
    const sendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        if (!clientRef.current || !isConnected) return;

        const payload = {
            classId, // 항상 1
            userId,
            username,
            content: inputValue,
            createdAt: new Date().toISOString(),
        };

        clientRef.current.publish({
            destination: `/app/chat/${classId}`, // 항상 /app/chat/1
            body: JSON.stringify(payload),
        });

        setInputValue("");
    };

    // ✅ 공감(리액션) 전송
    const sendReaction = async (chatId) => {
        if (!chatId) {
            console.error("chatId 없음, 공감 전송 불가");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/chat/chat.react", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ chatId }), // ChatReactionRequest { Long chatId }
            });

            if (!res.ok) {
                console.error("공감 요청 실패:", res.status);
                return;
            }

            // 서버가 { count: number } 반환한다는 가정 (ChatReactionResponse)
            const data = await res.json();

            // 해당 메시지의 공감 수 갱신 (reactionCount 필드 사용)
            if (typeof data.count === "number") {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.chatId === chatId
                            ? { ...msg, reactionCount: data.count }
                            : msg
                    )
                );
            }
        } catch (e) {
            console.error("공감 요청 에러:", e);
        }
    };

    return (
        <aside className="chat-sidebar">
            <div className="chat-sidebar__header">
                <div className="chat-sidebar__title">채팅 (classId: {classId})</div>
                <div
                    className={isConnected ? "chat-status online" : "chat-status offline"}
                />
            </div>

            <div className="chat-sidebar__messages">
                {Array.isArray(messages) &&
                    messages.map((msg, idx) => {
                        const mine = msg.userId === userId;
                        return (
                            <div
                                key={idx}
                                className={`chat-bubble ${mine ? "mine" : "other"}`}
                            >
                                {!mine && (
                                    <div className="chat-username">
                                        {msg.name || `User ${msg.userId}`}
                                    </div>
                                )}

                                <div className="chat-content">{msg.content}</div>

                                {/* ✅ 공감 버튼 + 카운트 */}
                                <div className="chat-actions">
                                    <button
                                        type="button"
                                        className="chat-react-btn"
                                        onClick={() => sendReaction(msg.chatId)}
                                    >
                                        ✅
                                    </button>
                                    <span className="chat-react-count">
                                        {msg.reactionCount ?? 0}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                <div ref={bottomRef} />
            </div>

            <form className="chat-sidebar__input" onSubmit={sendMessage}>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="메시지 입력..."
                />
                <button type="submit">전송</button>
            </form>
        </aside>
    );
}
