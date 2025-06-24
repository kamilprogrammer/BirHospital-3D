"use client";

import { Suspense, useRef, useState, Dispatch, SetStateAction } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PivotControls,
  OrbitControls,
  Center,
  OrthographicCamera,
  useGLTF,
  Html,
} from "@react-three/drei";
import Device from "./Device";
import Model_decider from "./ModelDecider2D";
import { Mesh } from "three";

interface Canvas2dProps {
  floor: number;
  devices: Device[];
  selectedDeviceId: number | null;
  setSelectedDeviceId: Dispatch<SetStateAction<number | null>>;
}

function DeviceWithTransform({ device }: { device: Device }) {
  return (
    <PivotControls
      activeAxes={[true, true, false]}
      scale={1.5}
      disableScaling
      disableRotations
      depthTest={false}
    >
      <mesh
        position={[device.x_2d || 0, device.y_2d || 0, 0]}
        onPointerDown={(e) => {
          e.stopPropagation();
          console.log("Selected device ID:", device.id);
        }}
      >
        <sphereGeometry args={[0.5, 12, 12]} />

        <Model_decider type={device.type!} />
      </mesh>
    </PivotControls>
  );
}

function SceneContent({
  floor,
  devices,
}: {
  floor: number;
  devices: Device[];
}) {
  const model = useGLTF(`/2D - Objects/1.glb`);

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[0, -40, 0]} intensity={2} />
      <pointLight position={[0, 5, 0]} intensity={2} />

      {devices.map((device) => (
        <DeviceWithTransform key={device.id} device={device} />
      ))}

      <Center>
        <primitive
          object={model.scene}
          position={[0, -50, 2]}
          scale={0.005}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </Center>
    </>
  );
}

export default function Canvas2d({ floor, devices }: Canvas2dProps) {
  return (
    <div id="canvas-wrapper" className="h-screen w-full">
      <Canvas>
        <Suspense fallback={null}>
          <SceneContent floor={floor} devices={devices} />
        </Suspense>
        <OrthographicCamera makeDefault position={[2, 10, 100]} zoom={30} />
        <OrbitControls makeDefault enableZoom enablePan enableRotate={false} />
        <color attach="background" args={["#ffffff"]} />
      </Canvas>
    </div>
  );
}
