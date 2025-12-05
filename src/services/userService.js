// 유저 정보를 불러오거나 수정하는 공통 기능

import { api } from "./api";

export async function fetchMyInfo() {
  return (await api.get("/user/me")).data;
}