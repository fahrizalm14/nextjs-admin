// components/UsageChart.tsx
"use client";

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function UsageChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const data = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        label: "Usage (GB)",
        data: [1.5, 2.1, 3.5, 2.4, 4.1, 1.9, 3.2],
        backgroundColor: "#3b82f6", // bg-blue-300
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (tooltipItem: { raw: unknown }) => {
            const rawValue = tooltipItem.raw as number;
            return ` ${rawValue} GB`;
          },
        },
      },
    },
  };

  useEffect(() => {
    // Pastikan chartRef sudah ada dan tidak null
    if (!chartRef.current) return;

    // Hancurkan instance chart yang ada untuk mencegah duplikasi
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Buat instance chart baru
    const newChartInstance = new Chart(chartRef.current, {
      type: "bar",
      data: data,
      options: options,
    });

    chartInstance.current = newChartInstance;

    // Fungsi cleanup untuk menghancurkan chart saat komponen unmount
    return () => {
      newChartInstance.destroy();
    };
  }, []);

  return (
    <div className="bg-card p-4 rounded-xl">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Weekly Usage
      </h3>
      <div className="h-40">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
