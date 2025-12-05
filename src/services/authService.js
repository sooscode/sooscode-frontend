// 어느곳에서나 로그아웃 할 수 있는 Service

import { api } from "./api";
import { setCookie, deleteCookie } from "@/utils/cookie";

export const authService = {
  async login({ email, password }) {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("accessToken", res.data.accessToken);
    setCookie("refreshToken", res.data.refreshToken);

    return res.data;
  },

  logout() {
    localStorage.removeItem("accessToken");
    deleteCookie("refreshToken");
  }
};
