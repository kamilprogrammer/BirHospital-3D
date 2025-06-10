// Canvas2d.tsx
"use client";
import Device from "./Device";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { Suspense } from "react";

interface Canvas2dProps {
  floor: number;
  devices: Device[];
}

function SceneContent({
  floor,
  devices,
}: {
  floor: number;
  devices: Device[];
}) {
  const model = useGLTF(`/2D - Objects/1.glb`);
  console.log(model);

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[0, -40, 0]} intensity={2} />
      <pointLight position={[0, 5, 0]} intensity={2} />

      <Center>
        <primitive
          object={model.scene}
          position={[0, 1, 5]}
          scale={100}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </Center>
      {devices.map((device) => {
        //const deviceModel = model_decider(device);
        //if (deviceModel === null) return null;

        return (
          <primitive
            object={model.scene}
            key={device.id}
            position={1}
            scale={100}
          />
        );
      })}
    </>
  );
}

export default function Canvas2d({ floor, devices }: Canvas2dProps) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <SceneContent floor={floor} devices={devices} />
      </Suspense>
      <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={75} />
      <OrbitControls
        makeDefault
        enableZoom={true}
        enableRotate={true}
        enablePan={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        maxAzimuthAngle={0}
        minAzimuthAngle={0}
      />
      <color attach="background" args={["#1e1e1e"]} />
    </Canvas>
  );
}
