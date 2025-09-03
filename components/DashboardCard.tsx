// components/DashboardCard.tsx
"use client";

import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  progressWidth?: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  iconBgColor,
  iconColor,
  progressWidth,
}: DashboardCardProps) {
  return (
    <div className="bg-card p-4 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-xl font-bold mt-1 text-foreground">{value}</h3>
        </div>
        <div className={`p-2 rounded-full ${iconBgColor} ${iconColor}`}>
          {icon}
        </div>
      </div>
      {progressWidth && (
        <div className="mt-3">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${iconColor.replace(
                "text-",
                "bg-"
              )} rounded-full`}
              style={{ width: progressWidth }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
