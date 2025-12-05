import { useState, useEffect } from "react";

//300ms의 기본 지연 시간
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // value가 바뀔 때마다 기존 타이머 제거
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/*
Ex) Usage in a component:
검색 API 호출시 디바운스 적용
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchBox() {
  const [input, setInput] = useState("");
  
  // 입력값을 300ms 동안 지연시킨 값
  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    if (!debouncedInput) return;

    console.log("API 호출:", debouncedInput);
    // 실제 API 호출
    // api.get(`/search?keyword=${debouncedInput}`);
  }, [debouncedInput]);

  return (
    <input
      type="text"
      placeholder="검색어 입력"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}
*/