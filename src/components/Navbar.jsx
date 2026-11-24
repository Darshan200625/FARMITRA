import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <div className="bg-white shadow-lg h-20 flex justify-between items-center px-8">

      <div>
        <h1 className="text-3xl font-bold text-green-700">
          🌾 FarmMitra
        </h1>

        <p className="text-gray-500">
          Smart Agriculture Platform
        </p>
      </div>

      <div className="flex items-center gap-6">

        <button className="text-2xl text-gray-600 hover:text-green-700">
          <FaBell />
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle className="text-5xl text-green-700" />

          <div>
            <h2 className="font-bold">
              Farmer
            </h2>

            <p className="text-sm text-gray-500">
              Welcome Back 👨‍🌾
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Navbar;