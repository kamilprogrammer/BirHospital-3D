interface Device {
  readonly id?: number;

  type?: "Camera" | "Telephone" | "AP" | "IP TV" | "Nurse" | "Sensor" | string;
  IP?: string;
  MAC?: string;
  MODEL?: string;
  notes?: string;
  x_2d?: number;
  y_2d?: number;
  floor?: number;
  x_3d?: number;
  y_3d?: number;
  z_3d?: number;

  status?: "active" | "inactive" | "maintenance";
  createdAt?: Date;
}
export default Device;
