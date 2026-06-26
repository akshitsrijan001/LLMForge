export default function Header() {
  return (
    <header
      style={{
        height: 70,
        borderBottom: "1px solid #1f2937",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 25px",
      }}
    >
      <h2>Local AI Workspace</h2>

      <div>
        🟢 Ollama Connected
      </div>
    </header>
  );
}