"use client";

import {
  Suspense,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
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
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";
import { useMemo } from "react";
import { useFloor } from "../2D/floorContext";
import { MapControls } from "@react-three/drei";

interface Canvas2dProps {
  floor: number;
  devices: Device[];
  selectedDeviceId: number | null;
  setSelectedDeviceId: Dispatch<SetStateAction<number | null>>;
  onUpdatePosition: (id: number, x: number, y: number) => void;
}

function DeviceWithTransform({
  device,
  onUpdatePosition,
}: {
  device: Device;
  onUpdatePosition: (id: number, x: number, y: number) => void;
}) {
  const objectRef = useRef<THREE.Group>(null);
  const previousPosition = useRef<THREE.Vector3>(new THREE.Vector3());
  const firstDevice = useMemo(() => structuredClone(device), []); // empty dep list

  return (
    <mesh position={[firstDevice.x_2d!, firstDevice.y_2d!, 0]}>
      <PivotControls
        activeAxes={[true, true, false]}
        scale={1}
        disableScaling
        disableRotations
        depthTest={false}
        onDragStart={() => {
          if (!objectRef.current) return;
          objectRef.current.updateMatrixWorld();
          const pos = new THREE.Vector3();
          const quat = new THREE.Quaternion();
          const scale = new THREE.Vector3();
          objectRef.current.matrixWorld.decompose(pos, quat, scale);
          previousPosition.current = pos.clone();
        }}
        onDragEnd={() => {
          if (!objectRef.current) return;
          objectRef.current.updateMatrixWorld();

          const newPos = new THREE.Vector3();
          const quat = new THREE.Quaternion();
          const scale = new THREE.Vector3();
          objectRef.current.matrixWorld.decompose(newPos, quat, scale);

          const prev = previousPosition.current;
          if (!prev || !newPos.equals(prev)) {
            console.log(device.id);
            onUpdatePosition(device.id!, newPos.x, newPos.y);
          }
        }}
      >
        <group ref={objectRef} onPointerDown={(e) => e.stopPropagation()}>
          <mesh>
            <Model_decider type={device.type!} />
          </mesh>
        </group>
      </PivotControls>
    </mesh>
  );
}

function SceneContent({
  floor,
  devices,
  onUpdatePosition,
}: {
  floor: number;
  devices: Device[];
  onUpdatePosition: (id: number, x: number, y: number) => void;
}) {
  const model = useGLTF(`/2D - Objects/1.glb`);

  return (
    <>
      {devices.map((device) => {
        if (device.floor !== floor) return null;
        return (
          <DeviceWithTransform
            key={device.id}
            device={device}
            onUpdatePosition={onUpdatePosition}
          />
        );
      })}

      <primitive
        object={model.scene}
        position={[23, -30.5, 0]}
        scale={0.005}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </>
  );
}

export default function Canvas2d({
  devices,
  floor,
  selectedDeviceId,
  setSelectedDeviceId,
  onUpdatePosition,
}: Canvas2dProps) {
  return (
    <div id="canvas-wrapper" className="h-screen w-full">
      <Canvas>
        <Suspense fallback={null}>
          <SceneContent
            floor={floor}
            devices={devices}
            onUpdatePosition={onUpdatePosition}
          />
        </Suspense>
        <PerspectiveCamera makeDefault position={[0, 0, 30]} />

        {/* <OrbitControls makeDefault enableZoom enablePan enableRotate={false} /> */}
        <MapControls
          enablePan
          enableZoom
          enableRotate={false}
          zoomSpeed={1}
          panSpeed={1}
          maxDistance={40}
        />
        <color attach="background" args={["#ffffff"]} />
      </Canvas>
    </div>
  );
}
