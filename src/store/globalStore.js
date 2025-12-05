import { create } from "zustand";

export const useGlobalStore = create((set) => ({
  // 로그인 여부
  isLogin: false,

  // 로그인 토큰
  accessToken: null,

  // 사용자 정보
  user: null, // { id, name, role }
  role: null, // "STUDENT" | "TEACHER"

  // 로그인 설정
  setLogin: (token, user) =>
    set({
      isLogin: true,
      accessToken: token,
      user,
      role: user.role,
    }),

  // 로그아웃
  logout: () => {
    localStorage.removeItem("accessToken");
    set({
      isLogin: false,
      accessToken: null,
      user: null,
      role: null,
    });
  },
}));
