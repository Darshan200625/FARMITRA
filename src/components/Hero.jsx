function Hero() {
  return (
    <section className="bg-gradient-to-r from-lime-200 to-green-300 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-10">

        {/* Left Side */}
        <div>
          <h1 className="text-6xl font-bold text-green-900 leading-tight">
            AI Powered <br />
            Smart Agriculture
          </h1>

          <p className="mt-6 text-xl text-gray-700">
            Monitor crops, detect diseases, predict yield,
            analyze weather, and manage your farm using
            Artificial Intelligence and Digital Twin Technology.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-900">
              Get Started
            </button>

            <button className="border-2 border-green-700 text-green-700 px-8 py-3 rounded-xl hover:bg-green-700 hover:text-white">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=700"
            alt="Farm"
            className="rounded-3xl shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;