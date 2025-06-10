interface Device {
  readonly id: string;
  name: string;
  type:
    | "camera"
    | "telephone"
    | "Access Point"
    | "IP TV"
    | "nurseSystem"
    | "sensor"
    | string; // Extend this as needed
  location: {
    x: number;
    y: number;
    floor: number;
  };
  status: "active" | "inactive" | "maintenance";
  createdAt: Date;
  updatedAt: Date;
}
export default Device;
