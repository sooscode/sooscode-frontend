// 유틸리티 함수 모음: 데이터 포맷팅 관련 함수들
// formatNumber, formatDate, formatTime 등을 포함
// 사용법 : import { formatNumber, formatDate, formatTime } from "@/utils/formatter";

// 숫자를 천 단위로 콤마(,)로 포맷팅
export function formatNumber(num) {
  if (num === null || num === undefined) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 날짜를 "YYYY-MM-DD" 형식으로 포맷팅
export function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
// 시간을 "HH:MM:SS" 형식으로 포맷팅
export function formatTime(date) {
  if (!date) return "";
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}