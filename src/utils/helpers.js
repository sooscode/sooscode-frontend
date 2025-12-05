// src/utils/helpers.js
// 유틸리티 함수 모음: 일반적인 헬퍼 함수들
// safe 등을 포함
// 사용법 : import { safe } from "@/utils/helpers";
// null 또는 undefined 값을 안전하게 처리

// 안전한 값 처리
export function safe(value, fallback = "") {
  return value ?? fallback;
}

// 비어있는 값 처리
export function isEmpty(value) {
  if (value == null) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "object" && Object.keys(value).length === 0) return true;
  return false;
}

// 배열을 안전하게 처리
export function safeArray(arr) {
  return Array.isArray(arr) ? arr : [];
}

// 객체를 안전하게 처리
export function safeObject(obj) {
  return obj && typeof obj === "object" && !Array.isArray(obj) ? obj : {};
}

// 깊은 복사
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 배열에서 중복 제거
export function uniqueArray(arr) {
  return Array.isArray(arr) ? [...new Set(arr)] : [];
}

// 객체 병합
export function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

// 랜덤 문자열 생성
export function uuid(prefix = "") {
  return prefix + Math.random().toString(36).substring(2, 9);
}

// 딜레이 함수
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// URL 쿼리 파라미터 파싱
export function getQueryParams() {
  return Object.fromEntries(new URLSearchParams(window.location.search));
}

// 배열 -> Map 변환
export function arrayToMap(arr, key = "id") {
  const map = {};
  arr.forEach(item => {
    map[item[key]] = item;
  });
  return map;
}

// 조건부 클래스 네임
export function cx(...classnames) {
  return classnames.filter(Boolean).join(" ");
}

// 숫자 범위 제한
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}