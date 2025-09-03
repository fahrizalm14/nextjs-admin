// components/ActivityLog.tsx
"use client";

import {
  RiDeleteBinLine,
  RiDownload2Line,
  RiUploadCloud2Line,
} from "@remixicon/react";

// Data dummy untuk log aktivitas
const recentActivity = [
  {
    action: "Uploaded new file",
    filename: "Annual-Report.pdf",
    time: "2 hours ago",
    icon: <RiUploadCloud2Line />,
    iconColor: "text-blue-500",
  },
  {
    action: "Deleted a file",
    filename: "Old-Photos.zip",
    time: "Yesterday",
    icon: <RiDeleteBinLine />,
    iconColor: "text-destructive",
  },
  {
    action: "Downloaded a folder",
    filename: "Project_A_Assets",
    time: "3 days ago",
    icon: <RiDownload2Line />,
    iconColor: "text-green-500",
  },
  {
    action: "Uploaded new file",
    filename: "Client_Agreement.docx",
    time: "5 days ago",
    icon: <RiUploadCloud2Line />,
    iconColor: "text-blue-500",
  },
];

const ActivityLog = () => {
  return (
    <div className="bg-card p-4 rounded-xl">
      <h3 className="text-xl font-semibold mb-4 text-foreground">
        Activity Log
      </h3>
      <div className="space-y-4">
        {recentActivity.map((activity, index) => (
          <div key={index} className="flex items-center gap-4">
            <div
              className={`p-2 rounded-full ${activity.iconColor} bg-muted-foreground/10`}
            >
              {activity.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {activity.action}
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.filename}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
