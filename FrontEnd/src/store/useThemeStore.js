import { create } from "zustand";
import { THEMES } from "../constants";
export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "emerald",
    setTheme: (theme) => {
        if (THEMES.includes(theme)) {
            localStorage.setItem("chat-theme", theme);
            set({ theme });
        }
    },
}));