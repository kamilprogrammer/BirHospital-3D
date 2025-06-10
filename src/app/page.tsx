"use client";
import { useState } from "react";
import FloorPanel from "./components/FloorPanel";
import ViewToggle from "./components/ViewToggle";
import Canvas3d from "./components/Canvas3d";
import Device from "./components/Device";
import Canvas2d from "./components/Canvas";

export default function Home() {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [is3DView, setIs3DView] = useState(false);

  const devices_idk_from_where_you_can_say_they_are_mock_data: Device[] = [
    {
      id: "1",
      name: "Camera 01",
      type: "camera",
      location: { x: 12.34, y: 1.23, floor: 3 },
      status: "active",
      createdAt: new Date("2025-01-01T10:00:00Z"),
      updatedAt: new Date("2025-05-08T12:00:00Z"),
    },
    {
      id: "2",
      name: "Telephone 02",
      type: "telephone",
      location: { x: 34.56, y: 2.34, floor: 5 },
      status: "inactive",
      createdAt: new Date("2025-02-01T12:00:00Z"),
      updatedAt: new Date("2025-05-08T12:00:00Z"),
    },
    {
      id: "3",
      name: "Nurse System 03",
      type: "nurseSystem",
      location: { x: 45.67, y: 0.98, floor: 2 },
      status: "maintenance",
      createdAt: new Date("2025-03-01T14:00:00Z"),
      updatedAt: new Date("2025-05-08T13:00:00Z"),
    },
    {
      id: "4",
      name: "Sensor 04",
      type: "sensor",
      location: { x: 56.78, y: 1.56, floor: 7 },
      status: "active",
      createdAt: new Date("2025-04-01T16:00:00Z"),
      updatedAt: new Date("2025-05-08T14:00:00Z"),
    },
  ];
  console.log(selectedFloor);
  return (
    <main className="flex min-h-screen bg-gray-100">
      {/* Floor Panel */}
      <div className="w-64 bg-white shadow-lg z-10">
        <FloorPanel
          selectedFloor={selectedFloor}
          onFloorSelect={setSelectedFloor}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        {is3DView ? (
          <div className="w-full h-full">
            <Canvas3d
              devices={devices_idk_from_where_you_can_say_they_are_mock_data}
              floor={Number(selectedFloor)}
            ></Canvas3d>
          </div>
        ) : (
          <div className="w-full h-full">
            <Canvas2d
              key={selectedFloor}
              devices={devices_idk_from_where_you_can_say_they_are_mock_data}
              floor={selectedFloor}
            ></Canvas2d>
          </div>
        )}

        {/* View Toggle Button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <ViewToggle is3D={is3DView} onToggle={() => setIs3DView(!is3DView)} />
        </div>
      </div>
    </main>
  );
}
