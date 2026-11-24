import { useEffect, useState } from "react";
import axios from "axios";

function FarmManagement() {
  const [farms, setFarms] = useState([]);

  const [farmName, setFarmName] = useState("");
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // ================= Load Farms =================

  const loadFarms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/farms");
      setFarms(res.data.farms);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFarms();
  }, []);

  // ================= Add Farm =================

  const addFarm = async () => {
    try {
      const formData = new FormData();

      formData.append("farmName", farmName);
      formData.append("crop", crop);
      formData.append("area", area);
      formData.append("location", location);
      formData.append("status", "Healthy");

      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        "http://localhost:5000/api/farms",
        formData
      );

      alert("Farm Added Successfully");

      setFarmName("");
      setCrop("");
      setArea("");
      setLocation("");
      setImage(null);

      loadFarms();

    } catch (err) {
      console.log(err);
    }
  };

  // ================= Edit =================

  const editFarm = (farm) => {
    setEditingId(farm._id);

    setFarmName(farm.farmName);
    setCrop(farm.crop);
    setArea(farm.area);
    setLocation(farm.location);

    setIsEditing(true);
  };

  // ================= Update =================

  const updateFarm = async () => {
    try {
      const formData = new FormData();

      formData.append("farmName", farmName);
      formData.append("crop", crop);
      formData.append("area", area);
      formData.append("location", location);
      formData.append("status", "Healthy");

      if (image) {
        formData.append("image", image);
      }

      await axios.put(
        `http://localhost:5000/api/farms/${editingId}`,
        formData
      );

      alert("Farm Updated");

      setEditingId(null);
      setIsEditing(false);

      setFarmName("");
      setCrop("");
      setArea("");
      setLocation("");
      setImage(null);

      loadFarms();

    } catch (err) {
      console.log(err);
    }
  };

  // ================= Delete =================

  const deleteFarm = async (id) => {
    if (!window.confirm("Delete Farm?")) return;

    await axios.delete(
      `http://localhost:5000/api/farms/${id}`
    );

    loadFarms();
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">

      <h1 className="text-4xl font-bold text-green-700 mb-8">
        🌾 Farm Management
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

        <h2 className="text-2xl font-bold mb-5">
          {isEditing ? "Edit Farm" : "Add Farm"}
        </h2>

        <input
          className="border p-3 rounded-lg w-full mb-4"
          placeholder="Farm Name"
          value={farmName}
          onChange={(e)=>setFarmName(e.target.value)}
        />

        <input
          className="border p-3 rounded-lg w-full mb-4"
          placeholder="Crop"
          value={crop}
          onChange={(e)=>setCrop(e.target.value)}
        />

        <input
          className="border p-3 rounded-lg w-full mb-4"
          placeholder="Area"
          value={area}
          onChange={(e)=>setArea(e.target.value)}
        />

        <input
          className="border p-3 rounded-lg w-full mb-4"
          placeholder="Location"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
        />

        <input
          type="file"
          className="mb-5"
          onChange={(e)=>setImage(e.target.files[0])}
        />

        {isEditing ? (
          <button
            onClick={updateFarm}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Update Farm
          </button>
        ) : (
          <button
            onClick={addFarm}
            className="bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Add Farm
          </button>
        )}

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {farms.map((farm)=>(
          <div
            key={farm._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >

            {farm.image && (
              <img
                src={`http://localhost:5000/uploads/${farm.image}`}
                alt="Farm"
                className="w-full h-56 object-cover"
              />
            )}

            <div className="p-5">

              <h2 className="text-2xl font-bold text-green-700">
                {farm.farmName}
              </h2>

              <p>🌱 {farm.crop}</p>

              <p>📏 {farm.area} Acres</p>

              <p>📍 {farm.location}</p>

              <p>🌿 {farm.status}</p>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={()=>editFarm(farm)}
                  className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={()=>deleteFarm(farm._id)}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default FarmManagement;