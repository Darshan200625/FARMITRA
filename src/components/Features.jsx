function Features() {
  const features = [
    {
      title: "Crop Monitoring",
      icon: "🌱",
      desc: "Monitor crop health using AI and satellite data.",
    },
    {
      title: "Disease Detection",
      icon: "🤖",
      desc: "Detect crop diseases using Artificial Intelligence.",
    },
    {
      title: "Weather Forecast",
      icon: "🌦️",
      desc: "Get real-time weather prediction for your farm.",
    },
    {
      title: "Smart Irrigation",
      icon: "💧",
      desc: "AI recommends the right irrigation schedule.",
    },
    {
      title: "Yield Prediction",
      icon: "📈",
      desc: "Predict crop yield before harvesting.",
    },
    {
      title: "Digital Twin",
      icon: "🛰️",
      desc: "Create a virtual digital twin of your farmland.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-green-800">
          Our Features
        </h2>

        <p className="text-center text-gray-600 mt-4">
          AI-driven tools for modern agriculture.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-green-50 rounded-2xl shadow-lg p-8 hover:scale-105 transition duration-300"
            >
              <div className="text-5xl">{item.icon}</div>

              <h3 className="text-2xl font-bold mt-4">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;