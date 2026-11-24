import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const cropData = {
    labels: ["Rice", "Wheat", "Maize", "Cotton", "Sugarcane"],
    datasets: [
      {
        label: "Production (Tons)",
        data: [120, 90, 140, 70, 180],
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
      },
    ],
  };

  const diseaseData = {
    labels: ["Healthy", "Diseased"],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ["#16a34a", "#dc2626"],
      },
    ],
  };

  const rainfallData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Rainfall (mm)",
        data: [35, 50, 45, 80, 120, 170],
        borderColor: "#2563eb",
        backgroundColor: "#60a5fa",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">

      <h1 className="text-4xl font-bold text-green-700 mb-8">
        📊 Analytics Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Crop Production
          </h2>

          <Bar data={cropData} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Disease Analysis
          </h2>

          <Pie data={diseaseData} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
          <h2 className="text-xl font-bold mb-4">
            Monthly Rainfall
          </h2>

          <Line data={rainfallData} />
        </div>

      </div>

    </div>
  );
}

export default Analytics;