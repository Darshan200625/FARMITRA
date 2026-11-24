function Footer() {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-3xl font-bold">🌾 AgriTwin AI</h2>
          <p className="mt-4 text-gray-300">
            AI-powered Digital Twin Platform for Smart Agriculture.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Features</li>
            <li>Dashboard</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>Crop Recommendation</li>
            <li>Disease Detection</li>
            <li>Weather Forecast</li>
            <li>Yield Prediction</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p>📍 Bangalore, India</p>
          <p>📧 support@agritwinai.com</p>
          <p>📞 +91 7899238871</p>
        </div>

      </div>

      <div className="text-center border-t border-green-700 mt-10 pt-6">
        © 2026 AgriTwin AI. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;