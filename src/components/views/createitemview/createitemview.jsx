import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../../../firebase/firestoreservice";

const CreateItemView = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createItem(form);
      navigate("/menu");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: "0 16px" }}>
      <h2>🍽️ Add Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Item Name" value={form.name} onChange={handleChange} required style={inp} />
        <input name="category" placeholder="Category (e.g. Burger, Pizza)" value={form.category} onChange={handleChange} required style={inp} />
        <input name="price" placeholder="Price (e.g. 500)" value={form.price} onChange={handleChange} required style={inp} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required style={{ ...inp, height: 80 }} />
        <button type="submit" disabled={loading} style={btn}>
          {loading ? "Saving..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

const inp = { display: "block", width: "100%", marginBottom: 12, padding: "8px 12px", fontSize: 15, boxSizing: "border-box" };
const btn = { padding: "10px 24px", background: "#e44d26", color: "#fff", border: "none", cursor: "pointer", fontSize: 15, borderRadius: 4 };

export default CreateItemView;