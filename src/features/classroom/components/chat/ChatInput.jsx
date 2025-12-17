import React from "react";

export default function ChatInput({ inputValue, setInputValue, onSubmit, sendTyping, stopTyping}) {
    return (
        <form className="chat-sidebar__input" onSubmit={onSubmit}>
            <textarea
                onInput={(e) => {
                    const el = e.target;
                    el.style.height = "36px";
                    el.style.height = Math.min(el.scrollHeight, 120) + "px";
                    el.style.overflowY = el.scrollHeight > 120 ? "auto" : "hidden";
                }}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value)
                    if(e.target.value.trim()){sendTyping();
                    }else{
                        stopTyping();

                    }
                }}
                placeholder="메시지를 입력하세요"
            />
            <button type="submit">전송</button>
        </form>
    );
}
