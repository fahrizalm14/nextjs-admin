import { menusByRole } from "@/components/MenusByRoles";
import { MenuItem } from "./layout";

export interface TokenPayload {
  userId: string;
  role: Role;
}

// Definisikan semua peran
export type Role = "admin" | "user" | "guest";

// Definisikan semua perizinan dasar
export const PERMISSIONS = {
  READ: "read",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
};

// Interface untuk endpoint yang akan diproteksi
interface EndpointConfig {
  path: string;
  permissions: string[];
}

// Interface yang menggabungkan endpoint dan menu per peran
export interface RolePermissions {
  endpoints: EndpointConfig[];
  menus: MenuItem[];
}

export const ROLES_CONFIG: Record<Role, RolePermissions> = {
  guest: {
    endpoints: [],
    menus: menusByRole.guest,
  },
  user: {
    endpoints: [
      {
        path: "/api/analytic",
        permissions: ["read"],
      },
    ],
    menus: menusByRole.user,
  },
  admin: {
    endpoints: [],
    menus: menusByRole.admin,
  },
};

export interface ILoginRes {
  accessToken: string;
  user: IUserInfo;
}

export interface IUserInfo {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  role: string;
}
