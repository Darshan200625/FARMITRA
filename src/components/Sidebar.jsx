
import {
  FaHome,
  FaUser,
  FaCloudSun,
  FaTint,
  FaBug,
  FaChartLine,
  FaMapMarkedAlt,
  FaMoneyBill,
  FaChartBar,
  FaRobot,
  FaSignOutAlt,
  FaSeedling,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menu = [
    {
      icon: <FaHome />,
      text: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <FaUser />,
      text: "Profile",
      path: "/profile",
    },
    {
      icon: <FaCloudSun />,
      text: "Weather",
      path: "/weather",
    },
    {
      icon: <FaTint />,
      text: "Irrigation",
      path: "/irrigation",
    },
    {
      icon: <FaBug />,
      text: "Disease",
      path: "/disease",
    },
    {
      icon: <FaChartLine />,
      text: "Yield",
      path: "/yield",
    },
    {
      icon: <FaMapMarkedAlt />,
      text: "Farm",
      path: "/farm",
    },
    {
      icon: <FaMoneyBill />,
      text: "Market",
      path: "/market",
    },
    {
      icon: <FaChartBar />,
      text: "Analytics",
      path: "/analytics",
    },
    {
      icon: <FaRobot />,
      text: "AI Chatbot",
      path: "/chatbot",
    },
    {
      icon: <FaMapMarkedAlt />,
      text: "Farm Map",
      path: "/farm-map",
    },
    {
      icon: <FaSeedling />,
      text: "Soil Analysis",
      path: "/soil-analysis",
    },
  ];

  return (
    <div className="w-64 bg-green-800 text-white min-h-screen flex flex-col shadow-lg">

      {/* Logo */}
      <div className="p-6 border-b border-green-700">
        <h1 className="text-3xl font-bold">
            🌾 FarmMitra
        </h1>

        <p className="text-green-200 mt-2">
          Smart Agriculture
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4">
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-700 mb-2 transition"
          >
            <span className="text-xl">{item.icon}</span>

            <span className="text-lg">
              {item.text}
            </span>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-green-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;
