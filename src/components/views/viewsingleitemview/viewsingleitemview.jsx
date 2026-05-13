import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleItem } from "../../../firebase/firestoreservice";
const ViewSingleItemView = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    getSingleItem(id).then((snap) => {
      if (snap.exists()) setItem({ id: snap.id, ...snap.data() });
    });
  }, [id]);

  if (!item) return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: "0 16px" }}>
      <Link to="/menu">← Back to Menu</Link>
      <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 24, marginTop: 20 }}>
        <h2>{item.name}</h2>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Price:</strong> Rs. {item.price}</p>
        <p><strong>Description:</strong> {item.description}</p>
        <Link to={`/menu/edit/${item.id}`} style={{ background: "#f0a500", color: "#fff", padding: "8px 16px", textDecoration: "none", borderRadius: 4 }}>
          ✏️ Edit Item
        </Link>
      </div>
    </div>
  );
};

export default ViewSingleItemView;