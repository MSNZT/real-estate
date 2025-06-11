import { create } from "zustand";

type OnlineStoreState = {
  onlineMap: Record<string, boolean>;
  requested: Set<string>;
};

type OnlineStoreActions = {
  addRequested: (userIds: string[]) => void;
  setMany: (map: Record<string, boolean>) => void;
  setOnline: (userId: string, status: boolean) => void;
};

type OnlineStore = OnlineStoreState & OnlineStoreActions;

const initialState = {
  onlineMap: {},
  requested: new Set<string>(),
};

export const useOnlineStore = create<OnlineStore>((set) => ({
  ...initialState,
  setOnline: (userId: string, status: boolean) =>
    set((state) => ({
      onlineMap: { ...state.onlineMap, [userId]: status },
    })),
  setMany: (map) =>
    set((state) => ({
      onlineMap: { ...state.onlineMap, ...map },
    })),
  addRequested: (userIds: string[]) =>
    set((state) => {
      const newSet = new Set(state.requested);
      userIds.forEach((userId) => newSet.add(userId));
      return {
        requested: newSet,
      };
    }),
}));
