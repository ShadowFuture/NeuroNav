import React, { useState } from "react";

const createSteps = (taskText) => {
  const trimmed = taskText.trim();

  if (!trimmed) {
    return ["Enter a task to generate steps."];
  }

  const topic = trimmed.toLowerCase();
  const baseSteps = [
    `Define the main goal for ${trimmed}`,
    `Break ${trimmed} into one small action you can start now`,
    `Set a clear starting point and a finish line for ${trimmed}`,
    `Review your progress after the first try and adjust if needed`,
    `Take a short pause if you feel stuck and return with fresh energy`,
  ];

  if (topic.includes("study") || topic.includes("exam") || topic.includes("class")) {
    baseSteps.splice(2, 0, "Gather the notes or materials you need for this study task");
  }

  if (topic.includes("clean") || topic.includes("organize")) {
    baseSteps.splice(2, 0, "Choose one small area to focus on first");
  }

  return baseSteps.slice(0, 6);
};

const TaskBreaker = ({ compact = false }) => {
  const [taskText, setTaskText] = useState("");
  const [steps, setSteps] = useState(["Enter a task to generate steps."]);

  const handleBreakTask = () => {
    setSteps(createSteps(taskText));
  };

  const content = (
    <>
      <h1 style={{ marginBottom: "0.5rem" }}>Task Breaker</h1>
      <p style={{ marginBottom: "1.25rem", color: "#5b6d89" }}>
        Describe a big task and turn it into smaller next steps.
      </p>

      <section
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "1.25rem",
          boxShadow: "0 12px 32px rgba(34, 58, 120, 0.08)",
          border: "1px solid rgba(108, 124, 255, 0.16)",
        }}
      >
        <label htmlFor="task-input" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
          What do you want to tackle?
        </label>
        <input
          id="task-input"
          type="text"
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
          placeholder="Example: finish my website redesign"
          style={{
            width: "100%",
            padding: "0.8rem 0.95rem",
            borderRadius: "12px",
            border: "1px solid #dce5ff",
            marginBottom: "0.9rem",
          }}
        />
        <button type="button" onClick={handleBreakTask} style={{ padding: "0.8rem 1.1rem" }}>
          Break Task
        </button>
      </section>

      <section style={{ marginTop: "1.25rem" }}>
        <h2 style={{ marginBottom: "0.75rem" }}>Smaller steps</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.75rem" }}>
          {steps.map((step, index) => (
            <li
              key={`${step}-${index}`}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "0.9rem 1rem",
                border: "1px solid rgba(108, 124, 255, 0.14)",
              }}
            >
              {step}
            </li>
          ))}
        </ul>
      </section>
    </>
  );

  return compact ? (
    <section style={{ background: "#fff", borderRadius: "20px", padding: "1.25rem", border: "1px solid rgba(108, 124, 255, 0.16)" }}>
      {content}
    </section>
  ) : (
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1rem 3rem" }}>{content}</main>
  );
};

export default TaskBreaker;
