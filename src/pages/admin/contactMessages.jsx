import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactMessages() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchMessages() {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); 
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact`,
        { headers: { Authorization: "Bearer " + token } }
      );
      setRows(data || []);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }

  async function markRead(id) {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact/${id}/read`,
        {},
        { headers: { Authorization: "Bearer " + token } }
      );
      setRows((prev) => prev.map((r) => (r._id === id ? data : r)));
      toast.success("Marked as read");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  }

  async function remove(id) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact/${id}`,
        { headers: { Authorization: "Bearer " + token } }
      );
      setRows((prev) => prev.filter((r) => r._id !== id));
      toast.success("Deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>
      {loading ? (
        <p>Loading…</p>
      ) : rows.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border bg-white rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r._id} className="border-t">
                  <td className="px-4 py-2">{r.name}</td>
                  <td className="px-4 py-2">{r.email}</td>
                  <td className="px-4 py-2 max-w-[400px] break-words">{r.message}</td>
                  <td className="px-4 py-2">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {r.isRead ? (
                      <span className="text-green-600">Read</span>
                    ) : (
                      <span className="text-yellow-600">New</span>
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {!r.isRead && (
                      <button
                        onClick={() => markRead(r._id)}
                        className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => remove(r._id)}
                      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
