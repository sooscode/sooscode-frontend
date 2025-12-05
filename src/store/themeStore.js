import { create } from "zustand";

export const useThemeStore = create((set) => {
  // 앱 최초 실행 시 localStorage 값 읽기
  const saved = localStorage.getItem("theme") || "light";

  // HTML에 테마 반영
  if (saved === "dark") {
    document.documentElement.classList.add("dark-mode");
  }

  return {
    theme: saved,

    setTheme: (newTheme) => {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
      }
      localStorage.setItem("theme", newTheme);

      set({ theme: newTheme });
    },

    toggleTheme: () =>
      set((state) => {
        const next = state.theme === "light" ? "dark" : "light";

        if (next === "dark") {
          document.documentElement.classList.add("dark-mode");
        } else {
          document.documentElement.classList.remove("dark-mode");
        }
        localStorage.setItem("theme", next);

        return { theme: next };
      }),
  };
});
