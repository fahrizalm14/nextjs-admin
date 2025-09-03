// components/StorageChart.tsx
"use client";

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

// Custom plugin to display text in the center of the doughnut chart
const centerTextPlugin = {
  id: "centerText",
  beforeDraw(chart: Chart) {
    const { ctx } = chart;
    const { data } = chart.config;
    const totalStorage = Number(data.datasets[0].data[1]) || 1;
    const usedStorage = Number(data.datasets[0].data[0]) || 0;
    const percentage = ((usedStorage / totalStorage) * 100).toFixed(0);

    ctx.save();
    ctx.font = "bolder 1.3rem sans-serif";
    // Mengubah warna teks menjadi abu-abu
    ctx.fillStyle = "#6b7280";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      `${percentage}%`,
      chart.getDatasetMeta(0).data[0].x,
      chart.getDatasetMeta(0).data[0].y - 17
    );
    ctx.restore();
  },
};
export default function StorageChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const newChartInstance = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [49, 101],
            backgroundColor: ["#3b82f6", "#e5e7eb"], // bg-blue-500, bg-gray-200
            borderWidth: 0,
            circumference: 180,
            rotation: -90,
            // Removed cutout from here
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
      plugins: [centerTextPlugin],
    });

    chartInstance.current = newChartInstance;

    return () => {
      newChartInstance.destroy();
    };
  }, []);

  return (
    <div className="bg-card p-4 rounded-xl flex flex-col items-center">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Used Storage
      </h3>
      <div className="w-40 h-20 mb-4">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="text-center text-muted-foreground">
        <p className="font-semibold text-sm">49 GB used</p>
        <p className="text-xs">101 GB total</p>
      </div>
    </div>
  );
}
