// layout.tsx
"use client";

import { ReactNode } from "react";
import { DndContext } from "@dnd-kit/core";
import FloorPanel from "../components/FloorPanel";
import { FloorProvider, useFloor } from "./floorContext";

interface LayoutProps {
  children: ReactNode;
}

function PanelWrapper() {
  const floorContext = useFloor();
  if (!floorContext) return null;

  const { floor, setFloor } = floorContext;
  return <FloorPanel floor={floor} setFloor={setFloor} />;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <DndContext>
      <FloorProvider>
        <div className="flex h-screen w-screen">
          <div className="w-60 bg-gray-800 text-white flex flex-col items-center py-4 border-r border-gray-700">
            <PanelWrapper />
          </div>
          <main className="flex-1 relative bg-white overflow-hidden">
            {children}
          </main>
        </div>
      </FloorProvider>
    </DndContext>
  );
}
