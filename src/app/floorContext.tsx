"use client";
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

const SelectedOptionContext = createContext<{
  floor: number;
  setFloor: Dispatch<SetStateAction<number>>;
} | null>(null);

export function FloorProvider({ children }: { children: React.ReactNode }) {
  const [floor, setFloor] = useState<number>(0);

  return (
    <SelectedOptionContext.Provider value={{ floor, setFloor }}>
      {children}
    </SelectedOptionContext.Provider>
  );
}

export function useFloor() {
  return useContext(SelectedOptionContext);
}
