import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleItem, updateItem } from "../../../firebase/firestoreservice";
import { useAuth } from "../../../context/AuthContext";

const EditItemView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "" });
  const [loading, setLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    getSingleItem(id).then((snap) => {
      if (snap.exists()) {
        const data = snap.data();
        // Block normal user if they don't own this item
        if (role === "user" && data.createdByEmail !== user?.email) {
          setUnauthorized(true);
          return;
        }
        setForm(data);
      }
    });
  }, [id, role, user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateItem(id, form);
      navigate(`/menu/${id}`);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (unauthorized) return (
    <div style={{ textAlign: "center", marginTop: 60 }}>
      <h2>⛔ Unauthorized</h2>
      <p>You can only edit your own items.</p>
      <button onClick={() => navigate("/menu")} style={btn}>Go Back</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: "0 16px" }}>
      <h2>✏️ Edit Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Item Name" value={form.name} onChange={handleChange} required style={inp} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required style={inp} />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required style={inp} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required style={{ ...inp, height: 80 }} />
        <button type="submit" disabled={loading} style={btn}>
          {loading ? "Updating..." : "Update Item"}
        </button>
      </form>
    </div>
  );
};

const inp = { display: "block", width: "100%", marginBottom: 12, padding: "8px 12px", fontSize: 15, boxSizing: "border-box" };
const btn = { padding: "10px 24px", background: "#e44d26", color: "#fff", border: "none", cursor: "pointer", fontSize: 15, borderRadius: 4 };

export default EditItemView;