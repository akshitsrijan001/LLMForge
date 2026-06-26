export default function Sidebar() {
  return (
    <aside
      style={{
        width: 270,
        background: "#111827",
        borderRight: "1px solid #1f2937",
        display: "flex",
        flexDirection: "column",
        padding: 20,
      }}
    >
      <h2 style={{ marginBottom: 30 }}>
        🚀 LLMForge
      </h2>

      <button
        style={{
          padding: 12,
          borderRadius: 10,
          background: "#2563eb",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        + New Chat
      </button>

      <div style={{ marginTop: 40 }}>
        <h4>Recent Chats</h4>

        <p> Welcome</p>
        <p> AI Agents</p>
        <p> RAG Testing</p>
      </div>
    </aside>
  );
}