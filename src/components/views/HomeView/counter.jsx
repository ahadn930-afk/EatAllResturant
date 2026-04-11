import { useState } from "react";

function Counter() {
  const [guests, setGuests] = useState(0);

  return (
    <div style={{
      textAlign: "center",
      padding: "40px 20px",
      margin: "40px auto",
      maxWidth: "400px",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
    }}>
      <h2 style={{ fontSize: "20px", color: "#333", marginBottom: "10px" }}>
        🍽️ Table Reservation
      </h2>

      <p style={{ color: "#888", fontSize: "14px", marginBottom: "20px" }}>
        Select number of guests
      </p>

      <div style={{
        fontSize: "64px",
        fontWeight: "bold",
        color: "#c0392b",
        margin: "10px 0 24px",
      }}>
        {guests}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
        <button
          onClick={() => setGuests(guests + 1)}
          style={{
            padding: "12px 28px",
            fontSize: "20px",
            backgroundColor: "#c0392b",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}>
          +
        </button>

        <button
          onClick={() => { if (guests > 0) setGuests(guests - 1); }}
          style={{
            padding: "12px 28px",
            fontSize: "20px",
            backgroundColor: "#c0392b",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}>
          −
        </button>

        <button
          onClick={() => setGuests(0)}
          style={{
            padding: "12px 28px",
            fontSize: "14px",
            backgroundColor: "#f0f0f0",
            color: "#555",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
        }}>
        Reset
        </button>
    </div>

    <p style={{ marginTop: "20px", fontSize: "14px", color: "#888" }}>
        {guests === 0
        ? "No guests added yet."
        : `Table for ${guests} guest${guests > 1 ? "s" : ""} booked!`}
    </p>
    </div>
);
}

export default Counter;