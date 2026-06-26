import React, { useEffect, useMemo, useState } from "react";

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

const PlannerPage = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(toDateKey(new Date()));
  const [eventsByDate, setEventsByDate] = useState({});
  const [eventText, setEventText] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("neuronav-planner-events");
      if (stored) {
        const parsed = JSON.parse(stored);
        const normalized = Object.entries(parsed).reduce((accumulator, [dateKey, value]) => {
          accumulator[dateKey] = Array.isArray(value)
            ? value.map((event) => {
                if (typeof event === "string") {
                  return { title: event, time: "", desc: "" };
                }

                return {
                  title: event.title || event.name || "Untitled event",
                  time: event.time || event.when || "",
                  desc: event.desc || event.description || "",
                };
              })
            : [];
          return accumulator;
        }, {});
        setEventsByDate(normalized);
      }
    } catch {
      // Ignore bad saved data and fall back to an empty planner.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("neuronav-planner-events", JSON.stringify(eventsByDate));
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
      cells.push({ day, key: toDateKey(date) });
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
      [selectedDate]: [...(current[selectedDate] || []), { title: trimmed, time: "", desc: "" }],
    }));
    setEventText("");
  };

  const changeMonth = (delta) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1));
  };

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1rem 3rem" }}>
      <section style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>Planner</h1>
        <p style={{ margin: 0, color: "#5b6d89" }}>
          View your calendar and add notes or events for each day.
        </p>
      </section>

      <section
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "1.25rem",
          boxShadow: "0 12px 32px rgba(34, 58, 120, 0.08)",
          border: "1px solid rgba(108, 124, 255, 0.16)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0 }}>Calendar Planner</h2>
            <p style={{ margin: "0.25rem 0 0", color: "#5b6d89" }}>Tap a day to view or add events.</p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="button" onClick={() => changeMonth(-1)} style={{ border: "none", borderRadius: "999px", padding: "0.5rem 0.8rem", cursor: "pointer" }}>
              ←
            </button>
            <span style={{ alignSelf: "center", fontWeight: 600 }}>
              {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button type="button" onClick={() => changeMonth(1)} style={{ border: "none", borderRadius: "999px", padding: "0.5rem 0.8rem", cursor: "pointer" }}>
              →
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: "0.5rem", marginTop: "1rem" }}>
          {weekdayNames.map((day) => (
            <div key={day} style={{ textAlign: "center", fontSize: "0.8rem", fontWeight: 700, color: "#5b6d89" }}>
              {day}
            </div>
          ))}
          {calendarDays.map((cell, index) => {
            if (!cell) {
              return <div key={`empty-${index}`} style={{ minHeight: "72px", borderRadius: "12px", background: "#f8fafc" }} />;
            }

            const isSelected = cell.key === selectedDate;
            const dayEvents = eventsByDate[cell.key] || [];

            return (
              <button
                key={cell.key}
                type="button"
                onClick={() => setSelectedDate(cell.key)}
                style={{
                  minHeight: "72px",
                  border: isSelected ? "1px solid #6c7cff" : "1px solid #e2e8f0",
                  borderRadius: "12px",
                  background: isSelected ? "#eef2ff" : "#ffffff",
                  padding: "0.45rem",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <strong>{cell.day}</strong>
                {dayEvents.length > 0 && (
                  <span style={{ fontSize: "0.72rem", color: "#5b6d89" }}>
                    {dayEvents.length} note{dayEvents.length > 1 ? "s" : ""}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", marginTop: "1rem" }}>
          <div>
            <h3 style={{ marginBottom: "0.5rem" }}>Add for {selectedLabel}</h3>
            <textarea
              value={eventText}
              onChange={(event) => setEventText(event.target.value)}
              placeholder="Write an event, reminder, or note..."
              style={{ width: "100%", minHeight: "90px", borderRadius: "12px", border: "1px solid #d8def7", padding: "0.75rem", resize: "vertical", font: "inherit" }}
            />
            <button type="button" onClick={handleAddEvent} style={{ marginTop: "0.6rem", border: "none", borderRadius: "999px", background: "#6c7cff", color: "#ffffff", padding: "0.6rem 1rem", cursor: "pointer" }}>
              Save event
            </button>
          </div>

          <div>
            <h3 style={{ marginBottom: "0.5rem" }}>Planned items</h3>
            {selectedEvents.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: "1rem", color: "#334155" }}>
                {selectedEvents.map((item, index) => (
                  <li key={`${item.title}-${index}`} style={{ marginBottom: "0.4rem" }}>
                    <strong>{item.title}</strong>
                    {item.time ? ` · ${item.time}` : ""}
                    {item.desc ? ` · ${item.desc}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: 0, color: "#5b6d89" }}>No events yet for this day.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PlannerPage;
