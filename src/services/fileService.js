// 파일 업로드 공통 처리

import { api } from "./api";

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  return (await api.post("/file/upload", formData)).data;
}