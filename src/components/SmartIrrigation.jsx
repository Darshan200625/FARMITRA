function SmartIrrigation() {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-green-900">
          Smart Irrigation
        </h2>

        <p className="text-center text-gray-600 mt-4">
          AI recommends the right irrigation schedule based on soil moisture and weather.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-5xl">💧</h3>
            <h4 className="text-2xl font-bold mt-4">Soil Moisture</h4>
            <p className="text-4xl text-green-700 mt-2">42%</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-5xl">🌦️</h3>
            <h4 className="text-2xl font-bold mt-4">Rain Prediction</h4>
            <p className="text-4xl text-blue-600 mt-2">Tomorrow</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-5xl">🚿</h3>
            <h4 className="text-2xl font-bold mt-4">AI Suggestion</h4>
            <p className="text-lg text-gray-700 mt-2">
              Delay irrigation for 24 hours due to expected rainfall.
            </p>
          </div>

        </div>

        <div className="text-center mt-12">
          <button className="bg-green-700 hover:bg-green-900 text-white px-10 py-3 rounded-xl">
            View Irrigation Schedule
          </button>
        </div>

      </div>
    </section>
  );
}

export default SmartIrrigation;