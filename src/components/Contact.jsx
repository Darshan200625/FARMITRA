function Contact() {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-green-900">
          Contact Us
        </h2>

        <p className="text-center text-gray-600 mt-4">
          We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-12">

          <div className="bg-white p-8 rounded-2xl shadow-lg">

            <h3 className="text-3xl font-bold text-green-800 mb-6">
              Send a Message
            </h3>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-xl p-4 mb-4"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-xl p-4 mb-4"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border rounded-xl p-4 mb-4"
            />

            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full border rounded-xl p-4"
            ></textarea>

            <button className="mt-6 bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-900">
              Send Message
            </button>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">

            <h3 className="text-3xl font-bold text-green-800 mb-6">
              Contact Information
            </h3>

            <p className="mb-4">📍 Bangalore, Karnataka, India</p>
            <p className="mb-4">📞 +91 7899238871</p>
            <p className="mb-4">📧 support@agritwinai.com</p>
            <p className="mb-4">🌐 www.agritwinai.com</p>

            <div className="mt-10 bg-green-100 rounded-xl p-8 text-center">
              🗺️ Google Maps will be integrated here.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;