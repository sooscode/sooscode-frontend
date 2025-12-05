//Backend API 엔드포인트들을 정의하는 파일
// 사용법 : import { API } from "@/constants/apiEndpoints";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const API = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    JOIN: `${BASE_URL}/auth/join`,
    REFRESH: `${BASE_URL}/auth/refresh`,
    PROFILE: `${BASE_URL}/auth/me`,
  },

  CLASS: {
    LIST: `${BASE_URL}/class`,
    DETAIL: (id) => `${BASE_URL}/class/${id}`,
    JOIN: (id) => `${BASE_URL}/class/${id}/join`,
  },

  STUDENT: {
    MYPAGE: `${BASE_URL}/student/mypage`,
    CLASS_LIST: `${BASE_URL}/student/classes`,
  },

  TEACHER: {
    MYPAGE: `${BASE_URL}/teacher/mypage`,
    CLASS_LIST: `${BASE_URL}/teacher/classes`,
  },

  CHAT: {
    ROOM_LIST: `${BASE_URL}/chat/rooms`,
    MESSAGE: (roomId) => `${BASE_URL}/chat/${roomId}/messages`,
  },
};

/*
ex) Usage in service file:
import { API } from "@/constants/apiEndpoints";
import api from "@/services/api";

export async function fetchClassDetail(id) {
  return api.get(API.CLASS.DETAIL(id));
}
*/