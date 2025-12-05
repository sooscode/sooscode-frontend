import { useEffect, useRef, useState } from "react";

// options: IntersectionObserver 옵션 객체
// 반환값: { targetRef, isIntersecting }
export function useIntersectionObserver(options = {}) {
  const targetRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
      observer.disconnect();
    };
  }, [options]);

  return { targetRef, isIntersecting };
}

/*
Ex) Usage in a component: 무한 스크롤

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Section() {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,            // 요소의 30%가 보일 때 true
  });

  return (
    <div>
      <div style={{ height: "800px" }}>위 공간</div>

      <div
        ref={targetRef}
        style={{
          height: "200px",
          background: isIntersecting ? "lightgreen" : "lightgray",
          transition: "0.3s",
        }}
      >
        {isIntersecting ? "보임!" : "안 보임!"}
      </div>

      <div style={{ height: "800px" }}>아래 공간</div>
    </div>
  );
}



*/