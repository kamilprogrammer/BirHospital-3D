"use client";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Device from "./Device";

interface Canvas3d {
  floor: number;
  devices: Device[];
}

export default function Canvas3d({ floor, devices }: Canvas3d) {
  console.log(floor);
  return (
    <Canvas>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 50]}
        fov={75}
        near={0.1}
        far={1000}
      />
      <color attach="background" args={["#1e1e1e"]} />
      <ambientLight intensity={1} />
      {devices.map((device) => {
        return (
          <mesh
            key={device.id}
            position={[device.location.x, device.location.y, 1]}
          >
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="white" />
          </mesh>
        );
      })}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <OrbitControls makeDefault />
    </Canvas>
  );
}
