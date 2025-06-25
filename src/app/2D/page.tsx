"use client";

import { useEffect, useState } from "react";
import Canvas2d from "../components/Canvas";
import Device from "../components/Device";
import { Button } from "../../components/ui/button";
import { supabase } from "../../lib/supabase";

export default function Page() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    handleGetValues();
    console.log(devices);
  }, []);
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
  const handleGetValues = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("Devices").select("*");
      if (error) throw error;
      setDevices(data);
      setTimeout(() => {
        console.log(devices);
      }, 1000);
      setLoading(false);
    } catch (error) {
      console.error("Error getting devices:", error);
    }
  };
  const handleSave = async () => {
    console.log(devices);
    setLoading(true);
    devices.map(async (device) => {
      if (device.id) {
        const { data, error } = await supabase
          .from("Devices")
          .update(device)
          .eq("id", device.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("Devices").insert(device);
        if (error) throw error;
      }
    });
    setLoading(false);
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

  const handleUpdatePosition = (id: number, x: number, y: number) => {
    console.log(id, x, y);
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id ? { ...device, x_2d: x, y_2d: y } : device
      )
    );
    console.log(devices);
  };

  return (
    <>
      <Canvas2d
        floor={1}
        devices={devices}
        selectedDeviceId={selectedDeviceId}
        setSelectedDeviceId={setSelectedDeviceId}
        onUpdatePosition={handleUpdatePosition}
      />

      <div className="flex">
        <Button
          onClick={handleAddCamera}
          disabled={loading}
          variant={loading ? "ghost" : "default"}
          className="m-2 p-2 w-fit"
        >
          Add Camera
        </Button>
        <Button
          onClick={handleAddTelephone}
          disabled={loading}
          variant={loading ? "ghost" : "default"}
          className="m-2 p-2 w-fit"
        >
          Add Telephone
        </Button>
        <Button
          onClick={handleAddServer}
          disabled={loading}
          variant={loading ? "ghost" : "default"}
          className="m-2 p-2 w-fit"
        >
          Add Server
        </Button>
        <Button
          onClick={handleAddNursing}
          disabled={loading}
          variant={loading ? "ghost" : "default"}
          className="m-2 p-2 w-fit"
        >
          Add Nursing
        </Button>
        <Button
          onClick={handleAddSensor}
          disabled={loading}
          variant={loading ? "ghost" : "default"}
          className="m-2 p-2 w-fit"
        >
          Add Sensor
        </Button>
        <Button
          onClick={handleSave}
          disabled={loading}
          variant={loading ? "ghost" : "default"}
          className="m-2 p-2 w-fit bg-indigo-800 hover:bg-blue-900"
        >
          Save Changes
        </Button>
      </div>
    </>
  );
}
