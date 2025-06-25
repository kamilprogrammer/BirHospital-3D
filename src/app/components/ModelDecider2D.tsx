import { Html } from "@react-three/drei";

export default function Model_decider({ type }: { type: string }) {
  if (!type) return null;

  const icons: Record<string, string> = {
    telephone: "/2D - Objects/telephone.png",
    camera: "/2D - Objects/cctv.png",
    server: "/2D - Objects/server.png",
    nursing: "/2D - Objects/nursing.png",
    sensor: "/2D - Objects/sensor.png",
  };

  const icon = icons[type.toLowerCase()];
  if (!icon) return null;

  return (
    <Html
      transform
      distanceFactor={0.4}
      zIndexRange={[100, 0]}
      position={[0, 0, 0.2]}
      occlude={false}
    >
      <div className="w-fit">
        <img src={icon} alt={type} />
      </div>
    </Html>
  );
}
