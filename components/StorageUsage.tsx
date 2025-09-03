// components/StorageUsage.tsx
"use client";

import UsageChart from "./UsageChart";

export default function StorageUsage() {
  return (
    <section className="bg-card p-4 rounded-xl">
      <h3 className="text-base font-semibold mb-2 text-foreground">
        Storage Usage
      </h3>
      <div className="h-56 relative">
        {/* Placeholder for the chart */}
        <UsageChart />
      </div>
    </section>
  );
}
