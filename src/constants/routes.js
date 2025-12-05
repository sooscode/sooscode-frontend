// src/constants/routes.js
// 애플리케이션의 라우트 경로들을 정의
// 사용법 : import { ROUTES } from "@/constants/routes";
// ROUTES 객체를 통해 경로에 접근 가능
// AppRouter.jsx 등에서 사용

export const ROUTES = {
  ROUTING: "/routing",

  LOGIN: "/login",

  JOIN : "/join",

  STUDENT: {
    MYPAGE: "/student/mypage",
    CLASS_JOIN: (id = ":id") => `/student/class/${id}`,
    CLASS_DETAIL: (id = ":id") => `/student/class/${id}/detail`,
  },

  TEACHER: {
    MYPAGE: "/teacher/mypage",
    CLASS_JOIN: (id = ":id") => `/teacher/class/${id}`,
    CLASS_DETAIL: (id = ":id") => `/teacher/class/${id}/detail`,
  },
};
