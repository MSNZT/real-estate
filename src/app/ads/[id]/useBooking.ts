import { create } from "zustand";

type BookingState = {
  countDays: number | null;
};

type InitialState = {
  countDays: BookingState["countDays"];
  setCountDays: (data: number | null) => void;
};

const initialState: BookingState = {
  countDays: null,
};

export const useBooking = create<InitialState>((set) => ({
  ...initialState,
  setCountDays: (count: number | null) =>
    set({
      countDays: count,
    }),
}));
