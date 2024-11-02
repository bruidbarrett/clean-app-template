import create from "zustand";
import { useEffect } from "react";
import { Project, Gallery } from "./types";

type Store = {
  // templateData: any;
  // setTemplateData: (templateData: any) => void;
};

export const useStore = create<Store>((set) => ({
  // templateData: {},
  // setTemplateData: (templateData) => set({ templateData }),
}));
