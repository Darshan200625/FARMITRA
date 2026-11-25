
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalFarms: 0,
    totalCrops: 0,
    totalArea: 0,
    healthy: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get(
        "https://farmitra-bgf4.onrender.com/api/dashboard"
      );

      if (res.data.success) {
        setStats(res.data);
      }
    } catch (err) {
      console.log("Dashboard Error:", err);
    }
  };

  // Dashboard modules (Crop Recommendation removed)
  const cards = [
    {
      title: "🌦 Weather Dashboard",
      color: "bg-blue-500",
      path: "/weather",
    },
    {
      title: "💧 Smart Irrigation",
      color: "bg-cyan-600",
      path: "/irrigation",
    },
    {
      title: "🦠 Disease Detection",
      color: "bg-red-500",
      path: "/disease",
    },
    {
      title: "📈 Yield Prediction",
      color: "bg-purple-600",
      path: "/yield",
    },
    {
      title: "🗺 Farm Management",
      color: "bg-yellow-500",
      path: "/farm",
    },
    {
      title: "💰 Market Prices",
      color: "bg-orange-500",
      path: "/market",
    },
    {
      title: "📊 Analytics",
      color: "bg-indigo-600",
      path: "/analytics",
    },
    {
      title: "🤖 AI Chatbot",
      color: "bg-pink-600",
      path: "/chatbot",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
          <div className="bg-blue-500 text-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg">🌾 Total Farms</h2>
            <h1 className="text-4xl font-bold mt-3">
              {stats.totalFarms}
            </h1>
          </div>

          <div className="bg-green-600 text-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg">🌱 Total Crops</h2>
            <h1 className="text-4xl font-bold mt-3">
              {stats.totalCrops}
            </h1>
          </div>

          <div className="bg-yellow-500 text-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg">📏 Total Area</h2>
            <h1 className="text-4xl font-bold mt-3">
              {stats.totalArea} Acres
            </h1>
          </div>

          <div className="bg-purple-600 text-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg">🌿 Healthy Farms</h2>
            <h1 className="text-4xl font-bold mt-3">
              {stats.healthy}
            </h1>
          </div>
        </div>

        {/* AI Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 pb-8">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.path)}
              className={`${card.color} text-white rounded-xl p-8 shadow-lg cursor-pointer hover:scale-105 hover:shadow-2xl transition duration-300`}
            >
              <h2 className="text-2xl font-bold text-center">
                {card.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
