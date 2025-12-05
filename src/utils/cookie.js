export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp('(^| )' + name + '=([^;]+)')
    );
    return matches ? matches[2] : null;
}


/* 쿠키 설정

export function setCookie(name, value, days = 7) {
  const date = new Date();
  date.setDate(date.getDate() + days);

  const cookie = [
    `${name}=${encodeURIComponent(value)}`,
    `expires=${date.toUTCString()}`,
    `path=/`,                 // 모든 경로에서 접근 가능
    `SameSite=Lax`,
  ];

  // HTTPS에서 Secure 옵션 추가
  if (window.location.protocol === "https:") {
    cookie.push("Secure");
  }

  document.cookie = cookie.join("; ");
}


// 쿠키 가져오기
export function getCookie(name) {
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );

  return match ? decodeURIComponent(match[2]) : null;
}


// 쿠키 삭제
export function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
}

쿠키 설정
import { setCookie, getCookie, deleteCookie } from "@/utils/cookie";
ex1) setCookie("refreshToken", refreshToken, 7); 쿠키 저장
ex2) const refreshToken = getCookie("refreshToken"); 쿠키 가져오기
ex3) deleteCookie("refreshToken"); 쿠키 삭제

*/