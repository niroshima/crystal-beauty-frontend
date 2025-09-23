import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  // Category list
  const categories = [
    {
      name: "Skincare",
      imageUrl:
        "https://qobidmgoaldqctsnvltc.supabase.co/storage/v1/object/public/images/skincare.jpg",
    },
    {
      name: "Makeup",
      imageUrl:
        "https://qobidmgoaldqctsnvltc.supabase.co/storage/v1/object/public/images/Makeup.jpg",
    },
    {
      name: "Haircare",
      imageUrl:
        "https://qobidmgoaldqctsnvltc.supabase.co/storage/v1/object/public/images/haircare.jpg",
    },
    {
      name: "Fragrance",
      imageUrl:
        "https://qobidmgoaldqctsnvltc.supabase.co/storage/v1/object/public/images/Fragrance.jpg",
    },
  ];

  return (
    <div className="w-full h-full overflow-y-auto p-4">
      {/* Hero Section */}
      <section className="w-full h-[400px] bg-pink-100 rounded-xl flex items-center justify-center flex-col text-center shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-pink-700">
          Welcome to Crystal Beauty
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Natural, Radiant, You – because beauty should feel effortless.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition duration-300 cursor-pointer"
        >
          Shop Now
        </button>
      </section>

      {/* Categories */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white border rounded-lg p-4 text-center shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/products?category=${cat.name}`)} // navigate with query
            >
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="h-32 w-full object-cover rounded mb-2"
              />
              <p className="font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="mt-10 bg-pink-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-3 text-pink-800">
          About Crystal Beauty
        </h2>
        <p className="text-gray-700 leading-relaxed">
          At Crystal Beauty, we celebrate individuality by creating products
          that enhance your natural glow. Our skincare, makeup, haircare, and
          fragrances are thoughtfully formulated with safe, cruelty-free, and
          skin-loving ingredients. Whether you want a subtle everyday look or a
          bold statement style, our curated collection is designed to make you
          feel confident, radiant, and authentically you.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="mt-10 p-6 bg-white border rounded-lg shadow">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          Why Choose Crystal Beauty?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-pink-50 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">
              🌿 Safe Ingredients
            </h3>
            <p className="text-gray-600">
              Our formulas are dermatologically tested, free from harsh
              chemicals, and gentle on all skin types.
            </p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">
              🐰 Cruelty-Free
            </h3>
            <p className="text-gray-600">
              We never test on animals – our products are ethically crafted with
              love and care.
            </p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">
              ⭐ Trusted by Customers
            </h3>
            <p className="text-gray-600">
              Thousands of happy customers trust Crystal Beauty to deliver
              quality and satisfaction every time.
            </p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">
              🚚 Fast Delivery
            </h3>
            <p className="text-gray-600">
              We provide quick, reliable delivery to ensure your beauty
              essentials arrive right on time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
