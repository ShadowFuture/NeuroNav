import React, { useMemo, useState } from "react";

const getCoachResponse = (input) => {
  const text = input.trim().toLowerCase();

  if (!text) {
    return {
      title: "You are not behind.",
      message: "You do not need to fix everything right now. Start with one small action and let the rest wait.",
      microBreak: "Take a 60-second pause: inhale for 4, exhale for 6.",
      groundingSteps: [
        "Drop your shoulders and unclench your jaw",
        "Notice three things you can see around you",
        "Name one thing you can do in the next 2 minutes",
      ],
      sensoryTools: ["Soft blanket", "Warm drink", "Dim lights", "Quiet music"],
    };
  }

  if (text.includes("overwhelm") || text.includes("overwhelmed") || text.includes("too much") || text.includes("panic") || text.includes("anxious")) {
    return {
      title: "You seem overloaded.",
      message: "It makes sense that your system is asking for a break. You are allowed to slow down without guilt.",
      microBreak: "Try a 2-minute reset: put both feet on the floor, breathe slowly, and sip some water.",
      groundingSteps: [
        "Lower the volume of the task list to one item",
        "Place one hand on your chest and one on your stomach",
        "Pick the smallest next step you can finish in 60 seconds",
      ],
      sensoryTools: ["Weighted blanket", "Fidget object", "Gentle music", "Dark glasses"],
    };
  }

  if (text.includes("angry") || text.includes("frustrated") || text.includes("mad")) {
    return {
      title: "That frustration makes sense.",
      message: "Strong feelings are information, not a failure. You do not need to act on them immediately.",
      microBreak: "Step away for 90 seconds, unclench your hands, and do one slow stretch.",
      groundingSteps: [
        "Name the feeling without judging it",
        "Take three slow breaths and widen your shoulders",
        "Choose a calm action like walking to the sink or opening a window",
      ],
      sensoryTools: ["Cold water", "A short walk", "A calm playlist", "A quiet corner"],
    };
  }

  if (text.includes("sad") || text.includes("down") || text.includes("low") || text.includes("depressed")) {
    return {
      title: "You do not have to carry this alone.",
      message: "A heavy day can make everything feel harder. Small comfort and one tiny task are enough for now.",
      microBreak: "Try a gentle check-in: drink water, sit somewhere comfortable, and notice one pleasant detail.",
      groundingSteps: [
        "Sit somewhere steady and soften your shoulders",
        "Say one kind sentence to yourself",
        "Choose one tiny task that takes less than 5 minutes",
      ],
      sensoryTools: ["Warm tea", "Soft lighting", "A favorite blanket", "A comforting scent"],
    };
  }

  return {
    title: "You are allowed to pause.",
    message: "This moment does not need a perfect response. A gentle reset is enough.",
    microBreak: "Take one minute to notice your breath, your feet, and the room around you.",
    groundingSteps: [
      "Name what is happening in one short sentence",
      "Choose one manageable next action",
      "Let the rest wait for later",
    ],
    sensoryTools: ["A stretch", "A calm playlist", "A snack", "A quiet break"],
  };
};

const NeuroRegulationCoach = () => {
  const [inputText, setInputText] = useState("");
  const response = useMemo(() => getCoachResponse(inputText), [inputText]);

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f7f9ff 100%)",
        borderRadius: "24px",
        padding: "1.25rem",
        border: "1px solid rgba(140, 155, 255, 0.18)",
        boxShadow: "0 12px 32px rgba(94, 108, 162, 0.10)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.8rem" }}>
        <div>
          <h2 style={{ marginBottom: "0.25rem", color: "#23304f" }}>Neuro-Regulation Coach</h2>
          <p style={{ margin: 0, color: "#5b6d89", lineHeight: 1.5 }}>
            A calm, supportive companion for overwhelm, stress, and emotional reset.
          </p>
        </div>
        <span style={{ background: "#eef2ff", color: "#4655aa", padding: "0.35rem 0.7rem", borderRadius: "999px", fontSize: "0.85rem" }}>
          Gentle support
        </span>
      </div>

      <textarea
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        placeholder="How are you feeling right now?"
        style={{
          width: "100%",
          minHeight: "96px",
          borderRadius: "14px",
          border: "1px solid #d9dff6",
          padding: "0.8rem 0.9rem",
          resize: "vertical",
          font: "inherit",
          background: "#ffffff",
          boxSizing: "border-box",
          color: "#23304f",
        }}
      />

      <div
        style={{
          marginTop: "0.9rem",
          padding: "1rem",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #f7f9ff 0%, #eef4ff 100%)",
          border: "1px solid rgba(108, 124, 255, 0.14)",
        }}
      >
        <h3 style={{ marginBottom: "0.35rem", color: "#23304f" }}>{response.title}</h3>
        <p style={{ marginBottom: "0.75rem", color: "#334155", lineHeight: 1.6 }}>{response.message}</p>

        <div style={{ marginBottom: "0.75rem" }}>
          <strong style={{ display: "block", marginBottom: "0.3rem", color: "#23304f" }}>Micro-break</strong>
          <p style={{ margin: 0, color: "#334155" }}>{response.microBreak}</p>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <strong style={{ display: "block", marginBottom: "0.3rem", color: "#23304f" }}>Grounding steps</strong>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "#334155", lineHeight: 1.7 }}>
            {response.groundingSteps.map((step, index) => (
              <li key={`${step}-${index}`}>{step}</li>
            ))}
          </ul>
        </div>

        <div>
          <strong style={{ display: "block", marginBottom: "0.3rem", color: "#23304f" }}>Sensory-safe tools</strong>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {response.sensoryTools.map((tool, index) => (
              <span
                key={`${tool}-${index}`}
                style={{
                  background: "#ffffff",
                  border: "1px solid #dfe6ff",
                  borderRadius: "999px",
                  padding: "0.35rem 0.65rem",
                  color: "#4655aa",
                  fontSize: "0.9rem",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeuroRegulationCoach;
