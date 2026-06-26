import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateWeeklyReview } from "../hooks/useAI";

const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const toDateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const Home = () => {
  const navigate = useNavigate();
  const [plannerExpanded, setPlannerExpanded] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(toDateKey(new Date()));
  const [eventsByDate, setEventsByDate] = useState({});
  const [eventText, setEventText] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    try {
      const storedEvents = localStorage.getItem("neuronav-planner-events");
      if (storedEvents) {
        setEventsByDate(JSON.parse(storedEvents));
      }

      const storedNotes = localStorage.getItem("neuronav-notes");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch {
      // Ignore bad saved data and fall back to an empty planner.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("neuronav-planner-events", JSON.stringify(eventsByDate));
  }, [eventsByDate]);

  useEffect(() => {
    localStorage.setItem("neuronav-notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    setReviewText(generateWeeklyReview(eventsByDate));
  }, [eventsByDate]);

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];

    for (let i = 0; i < firstDay; i += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(year, month, day);
      cells.push({
        day,
        key: toDateKey(date),
      });
    }

    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    return cells;
  }, [viewDate]);

  const selectedLabel = useMemo(() => {
    const parsed = new Date(`${selectedDate}T00:00:00`);
    return parsed.toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }, [selectedDate]);

  const selectedEvents = eventsByDate[selectedDate] || [];

  const handleAddEvent = () => {
    const trimmed = eventText.trim();
    if (!trimmed) {
      return;
    }

    setEventsByDate((current) => ({
      ...current,
      [selectedDate]: [...(current[selectedDate] || []), trimmed],
    }));
    setEventText("");
  };

  const handleAddNote = () => {
    const trimmed = noteText.trim();
    if (!trimmed) {
      return;
    }

    setNotes((current) => [{ id: Date.now(), text: trimmed }, ...current]);
    setNoteText("");
  };

  const changeMonth = (delta) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1));
  };

  return (
    <main style={{ maxWidth: "1120px", margin: "0 auto", padding: "2rem 1rem 3rem" }}>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "28px",
          padding: "2rem 1.5rem",
          marginBottom: "1.25rem",
          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(242,246,255,0.95) 100%)",
          border: "1px solid rgba(108, 124, 255, 0.18)",
          boxShadow: "0 20px 60px rgba(34, 58, 120, 0.10)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-20px auto auto -12px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 224, 214, 0.28) 0%, rgba(139, 224, 214, 0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-30px",
            bottom: "-40px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(108, 124, 255, 0.2) 0%, rgba(108, 124, 255, 0) 72%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <p style={{ marginBottom: "0.4rem", color: "#6f7ba8", letterSpacing: "0.16em", textTransform: "uppercase", fontSize: "0.8rem" }}>
            Daily calm dashboard
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "0.5rem", color: "#23304f" }}>
            NeuroNav
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#5b6d89", maxWidth: "720px", margin: "0 auto", lineHeight: 1.7 }}>
            A calm, modern place to organize your day, protect your focus, and keep momentum without feeling overwhelmed.
          </p>
        </div>
      </section>

      <section style={{ marginTop: "0.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "1rem",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(108, 124, 255, 0.18)",
              borderRadius: "24px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
              padding: "1.25rem",
              boxShadow: "0 16px 40px rgba(34, 58, 120, 0.08)",
            }}
          >
            <h2 style={{ marginBottom: "0.35rem", fontSize: "1.1rem", color: "#23304f" }}>Weekly AI Review</h2>
            <p style={{ margin: "0 0 0.75rem", color: "#5b6d89", lineHeight: 1.6 }}>
              Your calendar insights appear here as a live weekly summary.
            </p>
            <div
              style={{
                whiteSpace: "pre-line",
                lineHeight: 1.65,
                color: "#334155",
                background: "linear-gradient(135deg, #f8fafc 0%, #eef4ff 100%)",
                borderRadius: "16px",
                padding: "0.9rem 1rem",
                border: "1px solid rgba(108, 124, 255, 0.12)",
              }}
            >
              {reviewText || "Your review will appear here as you add events to your calendar."}
            </div>
          </div>

          <div
            style={{
              border: "1px solid rgba(108, 124, 255, 0.18)",
              borderRadius: "24px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
              padding: "1.25rem",
              boxShadow: "0 16px 40px rgba(34, 58, 120, 0.08)",
            }}
          >
            <h2 style={{ marginBottom: "0.35rem", fontSize: "1.1rem", color: "#23304f" }}>Notes Widget</h2>
            <p style={{ margin: "0 0 0.75rem", color: "#5b6d89", lineHeight: 1.6 }}>
              Capture quick thoughts, reminders, or ideas in a personal note board.
            </p>
            <textarea
              value={noteText}
              onChange={(event) => setNoteText(event.target.value)}
              placeholder="Write a note..."
              style={{
                width: "100%",
                minHeight: "90px",
                borderRadius: "14px",
                border: "1px solid #d8def7",
                padding: "0.75rem",
                resize: "vertical",
                font: "inherit",
                background: "#ffffff",
              }}
            />
            <button
              type="button"
              onClick={handleAddNote}
              style={{
                marginTop: "0.6rem",
                border: "none",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #6c7cff 0%, #8ea2ff 100%)",
                color: "#ffffff",
                padding: "0.6rem 1rem",
                cursor: "pointer",
              }}
            >
              Save note
            </button>

            <div style={{ marginTop: "1rem", display: "grid", gap: "0.6rem" }}>
              {notes.length > 0 ? (
                notes.map((note) => (
                  <div
                    key={note.id}
                    style={{
                      background: "linear-gradient(135deg, #f8fafc 0%, #eef4ff 100%)",
                      borderRadius: "12px",
                      padding: "0.75rem 0.9rem",
                      color: "#334155",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    {note.text}
                  </div>
                ))
              ) : (
                <p style={{ margin: 0, color: "#5b6d89" }}>No notes yet. Add one above.</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/support")}
            style={{
              textAlign: "left",
              border: "1px solid rgba(108, 124, 255, 0.18)",
              borderRadius: "24px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
              padding: "1.25rem",
              boxShadow: "0 16px 40px rgba(34, 58, 120, 0.08)",
              cursor: "pointer",
            }}
          >
            <h2 style={{ marginBottom: "0.35rem", fontSize: "1.1rem", color: "#23304f" }}>Support Hub</h2>
            <p style={{ margin: 0, color: "#5b6d89", lineHeight: 1.6 }}>
              Open this widget for calm support, guided focus, and gentle planning tools.
            </p>
          </button>

          <button
            type="button"
            onClick={() => navigate("/planner")}
            style={{
              textAlign: "left",
              border: "1px solid rgba(108, 124, 255, 0.18)",
              borderRadius: "24px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
              padding: "1.25rem",
              boxShadow: "0 16px 40px rgba(34, 58, 120, 0.08)",
              cursor: "pointer",
            }}
          >
            <h2 style={{ marginBottom: "0.35rem", fontSize: "1.1rem", color: "#23304f" }}>Planner Widget</h2>
            <p style={{ margin: 0, color: "#5b6d89", lineHeight: 1.6 }}>
              Open a simple calendar to jot down events, appointments, and notes.
            </p>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
