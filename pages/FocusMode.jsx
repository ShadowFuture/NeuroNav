import React, { useEffect, useState } from "react";

const DEFAULT_TIME = 25 * 60;

const FocusMode = ({ compact = false }) => {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return undefined;

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          setIsRunning(false);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const content = (
    <>
      <h1 style={{ marginBottom: "0.35rem" }}>Focus Mode</h1>
      <p style={{ marginBottom: "1.4rem", color: "#5b6d89" }}>
        A calm, centered timer for your next deep work session.
      </p>

      <div
        style={{
          width: "220px",
          height: "220px",
          margin: "0 auto 1.4rem",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: "linear-gradient(135deg, #8be0d6, #6c7cff)",
          color: "#fff",
          fontSize: "3rem",
          fontWeight: 700,
          boxShadow: "0 12px 32px rgba(108, 124, 255, 0.2)",
        }}
      >
        {minutes}:{seconds}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
        <button type="button" onClick={() => setIsRunning(true)}>
          Start
        </button>
        <button type="button" onClick={() => setIsRunning(false)}>
          Pause
        </button>
        <button type="button" onClick={() => { setIsRunning(false); setTimeLeft(DEFAULT_TIME); }}>
          Reset
        </button>
      </div>
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

export default FocusMode;
