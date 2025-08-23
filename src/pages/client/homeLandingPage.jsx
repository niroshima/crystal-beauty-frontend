import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  // Replace these URLs with your actual Supabase public URLs
  const categories = [
    {
      name: "Skincare",
      imageUrl: "https://qobidmgoaldqctsnvltc.supabase.co/storage/v1/object/public/images/skincare.jpg"
    },
    {
      name: "Makeup",
      imageUrl: "https://qobidmgoaldqctsnvltc.supabase.co/storage/v1/object/public/images/Makeup.jpg"
    },
    {
      name: "Haircare",
      imageUrl: "https://qobidmgoaldqctsnvltc.supabase.co/storage/v1/object/public/images/haircare.jpg"
    },
    {
      name: "Fragrance",
      imageUrl: "https://qobidmgoaldqctsnvltc.supabase.co/storage/v1/object/public/images/Fragrance.jpg"
    },
  ];

  return (
    <div className="w-full h-full overflow-y-auto p-4">
      {/* Hero Section */}
      <section className="w-full h-[400px] bg-pink-100 rounded-xl flex items-center justify-center flex-col text-center shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-pink-700">Welcome to Crystal Beauty</h1>
        <p className="text-lg text-gray-700 mb-6">Natural, Radiant, You.</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition duration-300 cursor-pointer"
        >
          Shop Now
        </button>
      </section>

      {/* Categories */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white border rounded-lg p-4 text-center shadow hover:shadow-lg transition">
              <img src={cat.imageUrl} alt={cat.name} className="h-32 w-full object-cover rounded mb-2" />
              <p className="font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="mt-10 bg-pink-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-2 text-pink-800">About Crystal Beauty</h2>
        <p className="text-gray-700">
          At Crystal Beauty, we believe in enhancing your natural beauty with safe, cruelty-free, and skin-friendly products.
          Discover our handpicked range of cosmetics made just for you.
        </p>
      </section>

      {/* Newsletter */}
      <section className="mt-10 p-6 bg-white border rounded-lg text-center shadow">
        <h3 className="text-xl font-semibold mb-2">Subscribe to our Newsletter</h3>
        <p className="text-gray-600 mb-4">Get exclusive offers and beauty tips in your inbox.</p>
        <form className="flex flex-col md:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Your email"
            className="border px-4 py-2 rounded-md w-full md:w-1/3"
          />
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md transition">Subscribe</button>
        </form>
      </section>
    </div>
  );
}
