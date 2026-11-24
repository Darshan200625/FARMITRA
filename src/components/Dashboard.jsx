function Dashboard() {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-green-900">
          Farmer Dashboard
        </h2>

        <p className="text-center text-gray-600 mt-4">
          Monitor your farm with AI-powered insights.
        </p>

        <div className="grid md:grid-cols-4 gap-8 mt-12">

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h1 className="text-5xl">🌾</h1>
            <h3 className="text-2xl font-bold mt-4">12</h3>
            <p>Total Crops</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h1 className="text-5xl">📈</h1>
            <h3 className="text-2xl font-bold mt-4">52 Tons</h3>
            <p>Total Yield</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h1 className="text-5xl">💧</h1>
            <h3 className="text-2xl font-bold mt-4">42%</h3>
            <p>Soil Moisture</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h1 className="text-5xl">🌦</h1>
            <h3 className="text-2xl font-bold mt-4">28°C</h3>
            <p>Today's Weather</p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-3xl font-bold text-green-800">
              Recent Activities
            </h3>

            <ul className="mt-6 space-y-3">
              <li>✅ Crop health checked</li>
              <li>🌧 Rain expected tomorrow</li>
              <li>💧 Irrigation scheduled</li>
              <li>🌾 Yield prediction updated</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-3xl font-bold text-green-800">
              AI Suggestions
            </h3>

            <ul className="mt-6 space-y-3">
              <li>🌱 Apply Nitrogen fertilizer</li>
              <li>🚿 Delay irrigation by 1 day</li>
              <li>🍂 Monitor leaf health</li>
              <li>📈 Best harvest after 8 days</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Dashboard;