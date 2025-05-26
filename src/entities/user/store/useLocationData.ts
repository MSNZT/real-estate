import { create } from "zustand";

export type LocationState = {
  locationData: {
    city: string | null;
    latitude: number;
    longitude: number;
    address: string | null;
  };
};

type LocationActions = {
  setData: (data: Partial<LocationState["locationData"]>) => void;
};

const initialValue = {
  latitude: 55.7522,
  longitude: 37.6155,
  city: "Москва",
  address: null,
};

export const useLocationData = create<LocationState & LocationActions>(
  (set) => ({
    locationData: initialValue,
    setData: (data: Partial<LocationState["locationData"]>) =>
      set((state) => ({ locationData: { ...state.locationData, ...data } })),
  })
);
