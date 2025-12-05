// src/services/class/classHooks.js
import { useEffect, useState } from "react";
import { fetchClassInfo } from "./classService";

// 수업 정보 쿼리 훅
// classId: 수업 ID
// 반환값: { data, isLoading }
export function useClassInfoQuery(classId) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!classId) return;

    async function load() {
      try {
        const info = await fetchClassInfo(classId);
        setData(info);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [classId]);

  return { data, isLoading };
}
