import { create } from "zustand";

export type LocationStateType = {
  city: string;
  latitude: number;
  longitude: number;
};

export type LocationState = {
  location: LocationStateType | undefined;
};

type LocationActions = {
  setData: (data: LocationState["location"]) => void;
};

// const initialValue = {
//   latitude: 55.7522,
//   longitude: 37.6155,
//   city: "Москва",
//   address: null,
// };

export const useLocation = create<LocationState & LocationActions>((set) => ({
  location: undefined,
  setData: (data) => set((state) => ({ location: data })),
}));
