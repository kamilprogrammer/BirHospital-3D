"use client";

import { useEffect, useState } from "react";
import Canvas2d from "../components/Canvas";
import Device from "../components/Device";
import { Button } from "../../components/ui/button";
import { supabase } from "../../lib/supabase";

export default function Page() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

  const handleAddCamera = () => {
    const newCamera: Device = {
      type: "camera",
      x_2d: 0,
      y_2d: 0,
    };

    setDevices((prev) => [...prev, newCamera]);
  };
  const handleAddTelephone = () => {
    const newTelephone: Device = {
      type: "telephone",
      x_2d: 0,
      y_2d: 0,
    };

    setDevices((prev) => [...prev, newTelephone]);
  };
  const handleAddServer = () => {
    const newServer: Device = {
      type: "server",
      x_2d: 0,
      y_2d: 0,
    };

    setDevices((prev) => [...prev, newServer]);
  };
  const handleAddNursing = () => {
    const newNursing: Device = {
      type: "nursing",
      x_2d: 0,
      y_2d: 0,
    };

    setDevices((prev) => [...prev, newNursing]);
  };
  const handleAddSensor = () => {
    const newSensor: Device = {
      type: "sensor",
      x_2d: 0,
      y_2d: 0,
    };

    setDevices((prev) => [...prev, newSensor]);
  };

  const handleSave = async () => {
    try {
      const { data, error } = await supabase.from("devices").insert(devices[0]);
      if (error) throw error;
      console.log(data);
    } catch (error) {
      console.error("Error saving devices:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" && selectedDeviceId !== null) {
        setDevices((prev) => prev.filter((d) => d.id !== selectedDeviceId));
        setSelectedDeviceId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDeviceId]);

  return (
    <>
      <Canvas2d
        floor={1}
        devices={devices}
        selectedDeviceId={selectedDeviceId}
        setSelectedDeviceId={setSelectedDeviceId}
      />

      <div className="flex">
        <Button
          onClick={handleAddCamera}
          variant="default"
          className="m-2 p-2 w-fit"
        >
          Add Camera
        </Button>
        <Button
          onClick={handleAddTelephone}
          variant="default"
          className="m-2 p-2 w-fit"
        >
          Add Telephone
        </Button>
        <Button
          onClick={handleAddServer}
          variant="default"
          className="m-2 p-2 w-fit"
        >
          Add Server
        </Button>
        <Button
          onClick={handleAddNursing}
          variant="default"
          className="m-2 p-2 w-fit"
        >
          Add Nursing
        </Button>
        <Button
          onClick={handleAddSensor}
          variant="default"
          className="m-2 p-2 w-fit"
        >
          Add Sensor
        </Button>
        <Button
          onClick={handleSave}
          variant="default"
          className="m-2 p-2 w-fit bg-indigo-800 hover:bg-blue-900"
        >
          Save Changes
        </Button>
      </div>
    </>
  );
}
