function About() {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-5xl font-bold text-green-900">
          About AgriTwin AI
        </h2>

        <p className="mt-8 text-xl text-gray-700 leading-9">
          AgriTwin AI is an intelligent farming platform that combines
          Artificial Intelligence, IoT, Weather Forecasting, Disease Detection,
          Crop Monitoring and Digital Twin Technology to help farmers increase
          productivity while reducing costs.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-800">
              🎯 Mission
            </h3>
            <p className="mt-4 text-gray-600">
              Empower every farmer with AI-powered smart farming solutions.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-800">
              👁 Vision
            </h3>
            <p className="mt-4 text-gray-600">
              Build the world's smartest digital agriculture ecosystem.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-800">
              🌱 Goal
            </h3>
            <p className="mt-4 text-gray-600">
              Improve crop yield while saving water, fertilizer and time.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;