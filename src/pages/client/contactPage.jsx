import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      // No token required for public contact submission
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact`,
        formData
      );
      toast.success("Message sent successfully");
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message || "Failed to send message. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto p-6">
      {/* Header */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold text-pink-700 mb-2">Contact Us</h1>
        <p className="text-gray-600">
          Have questions or feedback? We'd love to hear from you!
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">
            Send us a Message
          </h2>

          {submitted && (
            <p className="text-green-600 mb-4">
              ✅ Thank you! Your message has been sent.
            </p>
          )}

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-pink-600"
            } bg-pink-500 text-white px-6 py-2 rounded-md transition`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Contact Info */}
        <div className="bg-pink-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">
            Get in Touch
          </h2>
          <p className="text-gray-700 mb-2">
            📍 Address: 123 Beauty Lane, Vilnius, Lithuania
          </p>
          <p className="text-gray-700 mb-2">📞 Phone: +370 600 12345</p>
          <p className="text-gray-700">✉️ Email: support@crystalbeauty.com</p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-4 text-pink-600 text-xl">
              <a href="#" className="hover:text-pink-800">🌐</a>
              <a href="#" className="hover:text-pink-800">📘</a>
              <a href="#" className="hover:text-pink-800">📸</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
