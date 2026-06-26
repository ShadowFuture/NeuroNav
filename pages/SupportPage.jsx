import React, { useState } from "react";
import { scheduleTaskPlan } from "../hooks/useAI";
import FocusMode from "./FocusMode";
import CalmCorner from "./CalmCorner";
import NeuroRegulationCoach from "./NeuroRegulationCoach";

const cardStyle = {
  background: "linear-gradient(135deg, #fcfdff 0%, #f5f7ff 100%)",
  borderRadius: "24px",
  padding: "1.25rem",
  boxShadow: "0 10px 24px rgba(94, 108, 162, 0.10)",
  border: "1px solid rgba(140, 155, 255, 0.18)",
};

const SupportPage = () => {
  const [taskText, setTaskText] = useState("");
  const [planSteps, setPlanSteps] = useState([]);
  const [scheduledItems, setScheduledItems] = useState([]);
  const [planSummary, setPlanSummary] = useState("");

  const handleCreatePlan = () => {
    const result = scheduleTaskPlan(taskText);
    setPlanSteps(result.steps);
    setScheduledItems(result.scheduled);
    setPlanSummary(result.summary);
  };

  return (
    <main style={{ maxWidth: "1120px", margin: "0 auto", padding: "2rem 1rem 3rem", background: "#f4f6fc", minHeight: "100vh" }}>
      <section style={{ ...cardStyle, textAlign: "center", marginBottom: "1rem" }}>
        <p style={{ margin: "0 0 0.4rem", color: "#6f7ba8", letterSpacing: "0.16em", textTransform: "uppercase", fontSize: "0.8rem" }}>
          Support Hub
        </p>
        <h1 style={{ margin: "0 0 0.5rem", color: "#23304f", fontSize: "1.8rem" }}>Gentle tools for calm focus</h1>
        <p style={{ margin: 0, color: "#5b6d89", maxWidth: "700px", marginInline: "auto", lineHeight: 1.6 }}>
          A clear, low-stress space for planning, grounding, and getting unstuck without feeling overwhelmed.
        </p>
      </section>

      <section style={{ ...cardStyle, marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.8rem" }}>
          <div>
            <h2 style={{ margin: "0 0 0.25rem", color: "#23304f" }}>Neuro-Friendly Task Translator</h2>
            <p style={{ margin: 0, color: "#5b6d89", lineHeight: 1.5 }}>
              Turn vague goals into simple, doable steps that feel easier to begin.
            </p>
          </div>
          <span style={{ background: "#e9ecff", color: "#4655aa", padding: "0.35rem 0.7rem", borderRadius: "999px", fontSize: "0.85rem" }}>
            Gentle planning
          </span>
        </div>

        <textarea
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
          placeholder="Example: Clean my room"
          style={{
            width: "100%",
            minHeight: "96px",
            borderRadius: "14px",
            border: "1px solid #d9dff6",
            padding: "0.8rem 0.9rem",
            resize: "vertical",
            font: "inherit",
            color: "#23304f",
            background: "#ffffff",
            boxSizing: "border-box",
          }}
        />
        <button
          type="button"
          onClick={handleCreatePlan}
          style={{
            marginTop: "0.8rem",
            padding: "0.7rem 1rem",
            border: "none",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #6d7cff 0%, #8ea2ff 100%)",
            color: "#ffffff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Generate plan
        </button>

        {planSummary && <p style={{ marginTop: "0.8rem", color: "#334155" }}>{planSummary}</p>}

        {planSteps.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <h3 style={{ marginBottom: "0.55rem", color: "#23304f" }}>Suggested steps</h3>
            <ol style={{ paddingLeft: "1.2rem", color: "#334155", lineHeight: 1.7 }}>
              {planSteps.map((step, index) => (
                <li key={`${step}-${index}`} style={{ marginBottom: "0.35rem" }}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {scheduledItems.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <h3 style={{ marginBottom: "0.55rem", color: "#23304f" }}>Scheduled into your calendar</h3>
            <ul style={{ paddingLeft: "1.2rem", color: "#334155", lineHeight: 1.7 }}>
              {scheduledItems.map((item, index) => (
                <li key={`${item.date}-${index}`} style={{ marginBottom: "0.35rem" }}>
                  {item.title} — {new Date(`${item.date}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" })} at {item.time}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        <div style={cardStyle}>
          <NeuroRegulationCoach />
        </div>
        <div style={cardStyle}>
          <FocusMode />
        </div>
        <div style={cardStyle}>
          <CalmCorner />
        </div>
      </div>
    </main>
  );
};

export default SupportPage;
