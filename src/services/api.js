import axios from "axios";

// Axios 인스턴스 생성: 백엔드 API와의 통신을 위한 설정
export const api = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 주소
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});