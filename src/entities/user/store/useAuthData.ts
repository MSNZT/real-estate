import { create } from "zustand";
import { User } from "../model/user";

type AuthState = {
  isAuth: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  userData: User | null;
};

type AuthStateActions = {
  setAuthData: (data: Partial<AuthState>) => void;
  clearAuthData: () => void;
};

type AuthStateStore = AuthState & AuthStateActions;

// const hasToken = !!tokenService.getAccessToken();

const initialState = {
  isAuth: false,
  isLoading: false,
  isInitialized: false,
  userData: null,
} satisfies AuthState;

export const useAuthData = create<AuthStateStore>((set) => ({
  ...initialState,
  setAuthData: (data) => set((state) => ({ ...state, ...data })),
  clearAuthData: () => set({ ...initialState, isLoading: false }),
}));
