import { secureStorage } from "@/src/app_core/lib/storage/secureStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AuthState } from "./auth.type";

const initialState = {
  token: null,
  isAuthenticated: false,
} as const;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      logout: () => set(initialState),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => secureStorage),
    },
  ),
);
