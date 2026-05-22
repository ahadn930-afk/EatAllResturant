import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  getAllUsers,
  getChatId,
  sendMessage,
  subscribeToMessages,
} from "../../../firebase/firestoreservice";

const ChatView = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  // Fetch all users except current user
  useEffect(() => {
    getAllUsers().then((snap) => {
      const list = snap.docs
        .map((d) => d.data())
        .filter((u) => u.uid !== user.uid);
      setUsers(list);
    });
  }, [user]);

  // Subscribe to messages when a user is selected
  useEffect(() => {
    if (!selectedUser) return;
    const chatId = getChatId(user.uid, selectedUser.uid);
    const unsubscribe = subscribeToMessages(chatId, (msgs) => {
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [selectedUser, user]);

  // Auto scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !selectedUser) return;
    const chatId = getChatId(user.uid, selectedUser.uid);
    await sendMessage(chatId, {
      text,
      senderUid:   user.uid,
      senderName:  user.displayName || user.email,
      senderEmail: user.email,
    });
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 64px)", fontFamily: "sans-serif" }}>

      {/* Left: User List */}
      <div style={{ width: 260, borderRight: "1px solid #ddd", overflowY: "auto", background: "#fafafa" }}>
        <div style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
          <h3 style={{ margin: 0, fontSize: 16 }}>💬 Chats</h3>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#888" }}>{user.displayName || user.email}</p>
        </div>
        {users.length === 0 && (
          <p style={{ padding: 16, fontSize: 13, color: "#888" }}>No other users found.</p>
        )}
        {users.map((u) => (
          <div
            key={u.uid}
            onClick={() => { setSelectedUser(u); setMessages([]); }}
            style={{
              padding: "12px 16px",
              cursor: "pointer",
              background: selectedUser?.uid === u.uid ? "#e44d2615" : "transparent",
              borderLeft: selectedUser?.uid === u.uid ? "3px solid #e44d26" : "3px solid transparent",
              borderBottom: "1px solid #eee",
            }}
          >
            <div style={{ fontWeight: 500, fontSize: 14 }}>{u.name || u.email}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{u.email}</div>
            <div style={{
              display: "inline-block",
              fontSize: 10,
              padding: "1px 6px",
              borderRadius: 10,
              marginTop: 4,
              background: u.role === "admin" ? "#e44d2620" : "#eee",
              color: u.role === "admin" ? "#e44d26" : "#555",
            }}>
              {u.role}
            </div>
          </div>
        ))}
      </div>

      {/* Right: Chat Window */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {!selectedUser ? (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48 }}>💬</div>
              <p>Select a user to start chatting</p>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div style={{ padding: "12px 20px", borderBottom: "1px solid #ddd", background: "#fff" }}>
              <div style={{ fontWeight: 600 }}>{selectedUser.name || selectedUser.email}</div>
              <div style={{ fontSize: 12, color: "#888" }}>{selectedUser.email}</div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: 20, background: "#f9f9f9" }}>
              {messages.length === 0 && (
                <p style={{ textAlign: "center", color: "#bbb", fontSize: 13 }}>No messages yet. Say hello! 👋</p>
              )}
              {messages.map((msg) => {
                const isMe = msg.senderUid === user.uid;
                return (
                  <div key={msg.id} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", marginBottom: 10 }}>
                    <div style={{
                      maxWidth: "65%",
                      padding: "8px 14px",
                      borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      background: isMe ? "#e44d26" : "#fff",
                      color: isMe ? "#fff" : "#333",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      fontSize: 14,
                    }}>
                      {!isMe && <div style={{ fontSize: 11, color: "#aaa", marginBottom: 2 }}>{msg.senderName}</div>}
                      <div>{msg.text}</div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Message Input */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid #ddd", background: "#fff", display: "flex", gap: 8 }}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message... (Enter to send)"
                style={{ flex: 1, padding: "10px 14px", borderRadius: 24, border: "1px solid #ddd", fontSize: 14, outline: "none" }}
              />
              <button
                onClick={handleSend}
                disabled={!text.trim()}
                style={{ padding: "10px 20px", background: "#e44d26", color: "#fff", border: "none", borderRadius: 24, cursor: "pointer", fontSize: 14, fontWeight: 500 }}
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatView;