import { FaUserCircle } from "react-icons/fa";

function Profile() {
  return (
    <div className="min-h-screen bg-green-50 p-8">

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <div className="flex items-center gap-6">

          <FaUserCircle className="text-8xl text-green-700" />

          <div>
            <h1 className="text-4xl font-bold text-green-700">
              Farmer Profile
            </h1>

            <p className="text-gray-500">
              Manage your account information
            </p>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-6 mt-10">

          <div>
            <label className="font-semibold">Full Name</label>

            <input
              type="text"
              value="Darshan"
              className="w-full border rounded-lg p-3 mt-2"
              readOnly
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>

            <input
              type="email"
              value="darshan@gmail.com"
              className="w-full border rounded-lg p-3 mt-2"
              readOnly
            />
          </div>

          <div>
            <label className="font-semibold">Phone</label>

            <input
              type="text"
              value="+91 9876543210"
              className="w-full border rounded-lg p-3 mt-2"
              readOnly
            />
          </div>

          <div>
            <label className="font-semibold">Role</label>

            <input
              type="text"
              value="Farmer"
              className="w-full border rounded-lg p-3 mt-2"
              readOnly
            />
          </div>

        </div>

        <button
          className="mt-8 bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800"
        >
          Edit Profile
        </button>

      </div>

    </div>
  );
}

export default Profile;