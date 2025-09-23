import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import toast from "react-hot-toast";

export default function ReviewPage() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/review/" + selectedProductId)
        .then((res) => {
          setReviews(res.data);
        });
    }
  }, [selectedProductId]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedProductId || !customerName || rating === 0 || !comment) {
      toast.error("Please fill all fields");
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/review", {
        productId: selectedProductId,
        customerName,
        rating,
        comment,
      })
      .then(() => {
        toast.success("Review submitted successfully");
        setCustomerName("");
        setRating(0);
        setComment("");
        setShowForm(false);

        // reload reviews
        return axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/review/" + selectedProductId
        );
      })
      .then((res) => setReviews(res.data))
      .catch(() => toast.error("Failed to submit review"));
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-pink-700 mb-6 text-center">
        Product Reviews
      </h1>

      {/* Product Selector */}
      <select
        className="w-full p-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-pink-400"
        value={selectedProductId}
        onChange={(e) => {
          setSelectedProductId(e.target.value);
          setShowForm(false);
        }}
      >
        <option value="">-- Select a product --</option>
        {products.map((product, index) => (
          <option key={index} value={product.productId}>
            {product.name} ({product.productId})
          </option>
        ))}
      </select>

      {selectedProductId && (
        <>
          {/* Write Review Button */}
          <div className="mb-6">
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-md shadow-md hover:from-red-600 hover:to-pink-600 transition duration-300 ease-in-out"
              >
                ✍️ Write Your Review
              </button>
            )}
          </div>

          {/* Review Form */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="p-6 bg-white border rounded-lg shadow mb-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-pink-600">
                Add Your Review
              </h2>

              <input
                type="text"
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value={0}>Select Rating</option>
                <option value={1}>★</option>
                <option value={2}>★★</option>
                <option value={3}>★★★</option>
                <option value={4}>★★★★</option>
                <option value={5}>★★★★★</option>
              </select>

              <textarea
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-md shadow-md hover:from-red-600 hover:to-pink-600 transition duration-300 ease-in-out"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md shadow-md hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Customer Reviews */}
          <div className="p-6 bg-pink-50 border rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-pink-600">
              Customer Reviews
            </h2>
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet</p>
            ) : (
              <ul className="space-y-4">
                {reviews.map((rev, i) => (
                  <li key={i} className="border-b pb-2">
                    <p className="font-bold text-pink-700">{rev.customerName}</p>
                    <p className="text-red-500">
                      {"★".repeat(rev.rating)}
                      {"☆".repeat(5 - rev.rating)}
                    </p>
                    <p className="text-gray-700">{rev.comment}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(rev.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
