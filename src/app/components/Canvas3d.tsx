"use client";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Device from "./Device";
import { DirectionalLightHelper } from "three";
import { useRef } from "react";
import * as THREE from "three";
import { useHelper } from "@react-three/drei";
import Camera from "./Camera";
interface Canvas3d {
  floor: number;
  devices: Device[];
}
function SceneLights() {
  const lightRef = useRef<THREE.Object3D>(new THREE.Object3D());
  useHelper(lightRef, DirectionalLightHelper, 10, "red");

  return (
    <directionalLight
      ref={lightRef}
      position={[100, 100, 1000]}
      intensity={20}
      color={"hotpink"}
      castShadow
    />
  );
}
export default function Canvas3d({ floor, devices }: Canvas3d) {
  console.log(floor);
  const model = useGLTF(`/3D - Objects/${floor}.glb`);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  return (
    <Canvas>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[-200, 200, 200]}
        fov={55}
        near={0.1}
        far={100000}
      />
      <color attach="background" args={["#1e1e1e"]} />

      {/*{devices.map((device) => {
        return (
          <mesh
            key={device.id}
            position={[device.x_3d! * 10, device.y_3d! * 10, 1]}
          >
            <boxGeometry args={[10, 10, 10]} />
            <meshStandardMaterial color="red" />
          </mesh>
        );
      })}*/}
      <ambientLight intensity={10} color={"hotpink"} />
      <SceneLights />

      <primitive object={model.scene} scale={2} center />
      {/*<OrbitControls
        minDistance={1}
        maxDistance={10000}
        makeDefault
        enableDamping
        dampingFactor={0.1}
        enablePan
        enableZoom
      />  */}
      <Camera cameraRef={cameraRef} />
    </Canvas>
  );
}
