//로그인 정보 저장
//다크모드 상태 저장
//최근 본 강의 저장
//사용자 UI 설정 저장

import { useState, useEffect } from "react";

// key: 로컬 스토리지 키
// initialValue: 초기값
// 반환값: [value, setValue]
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch (err) {
      console.error("localStorage get error", err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("localStorage set error", err);
    }
  }, [key, value]);

  return [value, setValue];
}
