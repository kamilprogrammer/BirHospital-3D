"use client";

import { DndContext } from "@dnd-kit/core";
import FloorPanel from "./components/FloorPanel";
import { useFloor } from "./floorContext";

export function DndContextWrapper({ children }: { children: React.ReactNode }) {
  const floorContext = useFloor();
  if (!floorContext) return null;

  const { floor, setFloor } = floorContext;

  return (
    <DndContext>
      <div className="flex h-screen w-screen">
        <div className="w-60 bg-gray-800 text-white flex flex-col items-center py-4 border-r border-gray-700">
          <FloorPanel floor={floor} setFloor={setFloor} />
        </div>
        <main className="flex-1 relative bg-white overflow-hidden">
          {children}
        </main>
      </div>
    </DndContext>
  );
}
