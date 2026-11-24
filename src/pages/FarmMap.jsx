import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FarmMap() {
  const position = [13.3409, 77.1010]; // Tumakuru

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        🗺 Farm Map
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-5">
        <MapContainer
          center={position}
          zoom={13}
          style={{
            height: "600px",
            width: "100%",
            borderRadius: "15px",
          }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>
              🌾 My Farm
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default FarmMap;