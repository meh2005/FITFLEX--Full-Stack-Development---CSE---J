import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

// REGISTER ONLY WHAT A BAR CHART NEEDS
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DailyActivityChart({ user }) {
  const labels = user.workouts.map((w) =>
    new Date(w.time).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    })
  );

  const minutes = user.workouts.map((w) => w.duration);

  const data = {
    labels,
    datasets: [
      {
        label: "Active Minutes",
        data: minutes,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">Daily Activity</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
