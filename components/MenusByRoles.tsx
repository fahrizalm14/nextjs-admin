import { Role } from "@/types/auth";
import { MenuItem } from "@/types/layout";
import {
  RiDashboardFill,
  RiFolderLine,
  RiLineChartFill,
  RiMultiImageFill,
} from "@remixicon/react";

export const menusByRole: Record<Role, MenuItem[]> = {
  admin: [
    { label: "Analytic", icon: <RiLineChartFill />, href: "/analytic" },
    { label: "My Files", icon: <RiMultiImageFill />, href: "/myfiles" },
    // { label: "Upgrade", icon: <RiVipCrownFill />, href: "/upgrade" },
    // { label: "Trash", icon: <RiDeleteBin2Line />, href: "/trash" },
  ],
  user: [
    { label: "Analytic", icon: <RiDashboardFill />, href: "/analytic" },
    { label: "My Files", icon: <RiMultiImageFill />, href: "/myfiles" },
    {
      label: "My Files",
      icon: <RiFolderLine />,
      children: [{ label: "Photos", href: "/files/photos" }],
    },
  ],
  guest: [{ label: "Dashboard", icon: <RiDashboardFill />, href: "/analytic" }],
};
