import create from "zustand";
import { useEffect } from "react";
import { Project, Gallery } from "./types";

type Store = {
  // tristanData: any;
  // setTristanData: (tristanData: any) => void;
};

export const useStore = create<Store>((set) => ({
  // tristanData: {},
  // setTristanData: (tristanData) => set({ tristanData }),
}));
