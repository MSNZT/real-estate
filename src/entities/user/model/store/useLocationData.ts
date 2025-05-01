import { create } from "zustand";

type LocationState = {
  city: string;
  latitude: number;
  longitude: number;
  setData: (data: Partial<LocationState>) => void;
};

const initialValue = {
  latitude: 55.7522,
  longitude: 37.6155,
  city: "Москва",
};

export const useLocationData = create<LocationState>((set) => ({
  ...initialValue,
  setData: (data: Partial<LocationState>) =>
    set((state) => ({ ...state, ...data })),
}));
