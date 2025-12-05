import { useEffect, useState } from "react";
import { fetchClassInfo } from "../services/class/classService";

// 수업 정보 훅
// classId: 수업 ID
// 반환값: { data, loading, error }
export function useClassInfo(classId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const info = await fetchClassInfo(classId);
        if (mounted) setData(info);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, [classId]);

  return { data, loading, error };
}
