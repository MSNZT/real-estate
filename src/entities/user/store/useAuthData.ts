import { create } from "zustand";
import { User } from "../model/user";

type AuthState = {
  isAuth: boolean;
  isLoading: boolean;
  userData: User | null;
};

type AuthStateActions = {
  setAuthData: (data: Partial<AuthState>) => void;
  clearAuthData: () => void;
};

type AuthStateStore = AuthState & AuthStateActions;

const initialState = {
  isAuth: false,
  isLoading: false,
  userData: null,
} satisfies AuthState;

export const useAuthData = create<AuthStateStore>((set) => ({
  ...initialState,
  setAuthData: (data) => set((state) => ({ ...state, ...data })),
  clearAuthData: () => set({ ...initialState, isLoading: false }),
}));
