import React, { useEffect, useState } from "react";

const CalmCorner = ({ compact = false }) => {
  const [phase, setPhase] = useState("inhale");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPhase((current) => (current === "inhale" ? "exhale" : "inhale"));
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  const prompt = phase === "inhale" ? "Breathe in…" : "Breathe out…";

  const content = (
    <>
      <h1 style={{ marginBottom: "0.35rem" }}>Calm Corner</h1>
      <p style={{ marginBottom: "1.4rem", color: "#5b6d89" }}>
        Let this gentle rhythm help you slow down and reset.
      </p>

      <div
        style={{
          width: "220px",
          height: "220px",
          margin: "0 auto 1.25rem",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #8be0d6, #6c7cff)",
          animation: "breathe 4s ease-in-out infinite",
          boxShadow: "0 16px 40px rgba(108, 124, 255, 0.22)",
          display: "grid",
          placeItems: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.05rem",
        }}
      >
        {prompt}
      </div>

      <p style={{ color: "#5b6d89", fontSize: "1rem" }}>
        Inhale slowly, exhale gently, and let the moment soften.
      </p>
    </>
  );

  return compact ? (
    <section style={{ background: "#fff", borderRadius: "20px", padding: "1.25rem", border: "1px solid rgba(108, 124, 255, 0.16)", textAlign: "center" }}>
      {content}
    </section>
  ) : (
    <main style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "2rem 1rem" }}>
      <section
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "2rem",
          boxShadow: "0 16px 40px rgba(34, 58, 120, 0.08)",
          border: "1px solid rgba(108, 124, 255, 0.16)",
          textAlign: "center",
        }}
      >
        {content}
      </section>
    </main>
  );
};

export default CalmCorner;
