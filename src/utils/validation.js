// 유효성 검사 규칙 모음: 이메일, 비밀번호, 사용자 이름 등의 검증 함수들
// 사용법 : import { isValidEmail, isValidPassword, isValidUsername } from "@/utils/validation";
// 이메일 형식 검사
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
// 비밀번호 강도 검사 (최소 8자, 대문자, 소문자, 숫자 포함)
export function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}
// 사용자 이름 유효성 검사 (특수문자 제외, 3~20자)
export function isValidUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
  return usernameRegex.test(username);
}
// 전화번호 형식 검사 (예: 010-1234-5678)
export function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;
  return phoneRegex.test(phoneNumber);
}
// 우편번호 형식 검사 (예: 12345 또는 12345-6789)
export function isValidPostalCode(postalCode) {
  const postalCodeRegex = /^\d{5}(-\d{4})?$/;
  return postalCodeRegex.test(postalCode);
}
// URL 형식 검사
export function isValidURL(url) {
  const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/;
  return urlRegex.test(url);
}
// 날짜 형식 검사 (YYYY-MM-DD)
export function isValidDate(date) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
}
// 시간 형식 검사 (HH:MM:SS)
export function isValidTime(time) {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return timeRegex.test(time);
}
// 전체 유효성 검사 함수 예시
export function validateForm({ email, password, username }) {
  return (
    isValidEmail(email) &&
    isValidPassword(password) &&
    isValidUsername(username)
  );
}

