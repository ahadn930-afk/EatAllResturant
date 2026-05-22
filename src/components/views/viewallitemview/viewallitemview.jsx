import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllItems, deleteItem } from "../../../firebase/firestoreservice";
import { useAuth } from "../../../context/AuthContext";

const ViewAllItemsView = () => {
  const { user, role } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const snapshot = await getAllItems();
    setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      await deleteItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>🍴 Restaurant Menu</h2>
        {/* Only admin sees Add Item button */}
        {role === "admin" && (
          <Link to="/menu/create" style={btnStyle}>+ Add Item</Link>
        )}
      </div>

      {items.length === 0 && <p>No items yet.</p>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
        {items.map((item) => (
          <div key={item.id} style={card}>
            <h3 style={{ margin: "0 0 4px" }}>{item.name}</h3>
            <p style={{ margin: "0 0 4px", color: "#888" }}>{item.category}</p>
            <p style={{ margin: "0 0 8px", fontWeight: "bold" }}>Rs. {item.price}</p>
            <p style={{ margin: "0 0 12px", fontSize: 13 }}>{item.description}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <Link to={`/menu/${item.id}`} style={{ ...actionBtn, background: "#333" }}>View</Link>

              {/* Admin can edit and delete any item */}
              {role === "admin" && (
                <>
                  <Link to={`/menu/edit/${item.id}`} style={{ ...actionBtn, background: "#f0a500" }}>Edit</Link>
                  <button onClick={() => handleDelete(item.id)} style={{ ...actionBtn, background: "#e44d26", border: "none", cursor: "pointer" }}>Delete</button>
                </>
              )}

              {/* Normal user can only edit/delete their own items */}
              {role === "user" && user && item.createdByEmail === user.email && (
                <>
                  <Link to={`/menu/edit/${item.id}`} style={{ ...actionBtn, background: "#f0a500" }}>Edit</Link>
                  <button onClick={() => handleDelete(item.id)} style={{ ...actionBtn, background: "#e44d26", border: "none", cursor: "pointer" }}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const card = { border: "1px solid #ddd", borderRadius: 8, padding: 16 };
const btnStyle = { background: "#e44d26", color: "#fff", padding: "8px 16px", textDecoration: "none", borderRadius: 4 };
const actionBtn = { color: "#fff", padding: "6px 12px", borderRadius: 4, textDecoration: "none", fontSize: 13 };

export default ViewAllItemsView;