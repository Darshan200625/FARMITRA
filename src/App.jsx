import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SmartIrrigation from "./pages/SmartIrrigation";
import DiseaseDetection from "./pages/DiseaseDetection";
import YieldPrediction from "./pages/YieldPrediction";
import FarmManagement from "./pages/FarmManagement";
import Analytics from "./pages/Analytics";
import MarketPrice from "./pages/MarketPrice";
import ChatBot from "./pages/ChatBot";
import Profile from "./pages/Profile";
import FarmMap from "./pages/FarmMap";

import Weather from "./components/Weather";

import FertilizerTest from "./components/FertilizerTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/weather" element={<Weather />} />
        <Route path="/irrigation" element={<SmartIrrigation />} />
        <Route path="/disease" element={<DiseaseDetection />} />
        <Route path="/yield" element={<YieldPrediction />} />
        <Route path="/farm" element={<FarmManagement />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/market" element={<MarketPrice />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/farm-map" element={<FarmMap />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;