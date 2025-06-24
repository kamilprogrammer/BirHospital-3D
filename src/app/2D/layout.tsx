"use client";

import { ReactNode } from "react";
import { DndContext } from "@dnd-kit/core";
import FloorPanel from "../components/FloorPanel";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <DndContext>
      <div className="flex h-screen w-screen">
        <div className="w-60 bg-gray-800 text-white flex flex-col items-center py-4 border-r border-gray-700">
          <FloorPanel selectedFloor={1} onFloorSelect={() => {}} />
        </div>
        <main className="flex-1 relative bg-white overflow-hidden">
          {children}
        </main>
      </div>
    </DndContext>
  );
}
