// components/RecentFiles.tsx

"use client";

import { RiFileTextLine, RiImageLine } from "@remixicon/react";

export default function RecentFiles() {
  const recentFiles = [
    {
      name: "New_Logo_Final.png",
      time: "2h ago",
      icon: <RiImageLine />,
      iconColor: "text-purple-500",
    },
    {
      name: "Meeting_Notes.docx",
      time: "5h ago",
      icon: <RiFileTextLine />,
      iconColor: "text-green-500",
    },
  ];

  return (
    <section className="bg-card p-4 rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-semibold text-foreground">
          Recent Files
        </h3>
        <a
          href="#"
          className="text-sm text-primary hover:text-primary-foreground"
        >
          View all
        </a>
      </div>
      <div className="space-y-2">
        {recentFiles.map((file, index) => (
          <a
            key={index}
            href="#"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className={`text-lg ${file.iconColor}`}>{file.icon}</span>
              <p className="font-medium text-foreground file-name text-sm">
                {file.name}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">{file.time}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
