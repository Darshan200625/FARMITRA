import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://farmitra-bgf4.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        alert("Login Successful ✅");

        // Save token
        localStorage.setItem("token", res.data.token);

        // Go to Dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-300 flex justify-center items-center">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[450px]">

        <h1 className="text-4xl font-bold text-center text-green-800">
          🌾 Framitra
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Farmer Login
        </p>

        <form onSubmit={handleLogin} className="mt-8">

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-4 rounded-xl mb-5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4 rounded-xl mb-5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-4 rounded-xl hover:bg-green-900"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-700 font-bold"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;