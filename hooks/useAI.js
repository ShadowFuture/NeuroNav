const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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

const toDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDate = (date) => `${monthNames[date.getMonth()]} ${date.getDate()}`;

const normalizeEvent = (event) => {
  if (!event) {
    return null;
  }

  if (typeof event === "string") {
    return { title: event, time: "", desc: "" };
  }

  return {
    title: event.title || event.name || "Untitled event",
    time: event.time || event.when || "",
    desc: event.desc || event.description || "",
  };
};

const parseTimeValue = (timeValue) => {
  if (typeof timeValue !== "string") {
    return null;
  }

  const cleaned = timeValue.trim().toLowerCase();
  const match = cleaned.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);

  if (!match) {
    return null;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2] || 0);
  const period = match[3];

  if (period === "pm" && hours < 12) {
    hours += 12;
  }

  if (period === "am" && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
};

const readStoredEvents = (storageKey) => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const normalizePlannerEvent = (event) => {
  if (!event) {
    return null;
  }

  if (typeof event === "string") {
    return { title: event, time: "", desc: "" };
  }

  return {
    title: event.title || event.name || "Untitled event",
    time: event.time || event.when || "",
    desc: event.desc || event.description || "",
  };
};

export const normalizePlannerEvents = (sourceEvents) => {
  if (!sourceEvents || typeof sourceEvents !== "object") {
    return {};
  }

  return Object.entries(sourceEvents).reduce((accumulator, [dateKey, value]) => {
    accumulator[dateKey] = Array.isArray(value)
      ? value.map(normalizePlannerEvent).filter(Boolean)
      : [];
    return accumulator;
  }, {});
};

export const decomposeTaskIntoSteps = (taskText) => {
  const trimmed = taskText.trim();

  if (!trimmed) {
    return {
      steps: ["Enter a task to generate a plan."],
      summary: "Add a goal to create a plan.",
    };
  }

  const topic = trimmed.toLowerCase();
  let steps = [
    "Pick the first tiny action",
    "Work on it for 10 minutes",
    "Pause and check what is done",
    "Do the next small step",
    "Finish by noting the result",
  ];
  let summary = `Turned "${trimmed}" into a simple, neuro-friendly plan.`;

  if (topic.includes("clean") || topic.includes("room") || topic.includes("bedroom") || topic.includes("organize")) {
    steps = [
      "Pick up clothes and put them away",
      "Throw away trash and empty dishes",
      "Put away items that are on the floor",
      "Make the bed",
      "Wipe the desk and sweep the floor",
    ];
    summary = `Created a clear cleaning plan for "${trimmed}".`;
  } else if (topic.includes("study") || topic.includes("math") || topic.includes("exam") || topic.includes("class") || topic.includes("homework")) {
    steps = [
      "Gather your notes, book, and tools",
      "Open the first practice problem or page",
      "Work on one small section for 10 minutes",
      "Check your answers or notes",
      "Write down one question to ask later",
    ];
    summary = `Created a calm study plan for "${trimmed}".`;
  } else if (topic.includes("project") || topic.includes("work on")) {
    steps = [
      "Open the project file or materials",
      "Write down the next tiny task",
      "Spend 10 minutes on that first task",
      "Save what you completed",
      "Choose the next small step",
    ];
    summary = `Created a clear project starter plan for "${trimmed}".`;
  } else if (topic.includes("essay") || topic.includes("paper") || topic.includes("report")) {
    steps = [
      "Open the prompt and list your main points",
      "Write one paragraph or section",
      "Add evidence or details",
      "Review the draft for clarity",
      "Polish the ending and submit",
    ];
    summary = `Created a writing plan for "${trimmed}".`;
  } else if (topic.includes("presentation") || topic.includes("slides")) {
    steps = [
      "Open your slide outline",
      "Create the first slide or section",
      "Add the main points",
      "Practice the talk out loud",
      "Check the timing and flow",
    ];
    summary = `Created a presentation plan for "${trimmed}".`;
  }

  return {
    steps,
    summary,
  };
};

export const scheduleTaskPlan = (taskText, eventsByDate = null, referenceDate = new Date(), storageKey = "neuronav-planner-events") => {
  const plan = decomposeTaskIntoSteps(taskText);
  const sourceEvents = normalizePlannerEvents(eventsByDate || readStoredEvents(storageKey));
  const startDate = new Date(referenceDate);
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() + 1);

  const candidateDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  });

  const stepTimes = ["09:00 AM", "11:00 AM", "14:00 PM", "16:00 PM", "18:00 PM"];
  const scheduled = [];
  const usedDays = new Set();

  plan.steps.forEach((step, index) => {
    let bestDay = null;
    let bestKey = null;
    let bestScore = Number.POSITIVE_INFINITY;

    candidateDays.forEach((day, dayIndex) => {
      const key = toDateKey(day);
      if (usedDays.has(key)) {
        return;
      }

      const currentCount = sourceEvents[key]?.length || 0;
      const score = currentCount + (dayIndex > 3 ? 1 : 0);

      if (score < bestScore) {
        bestScore = score;
        bestDay = day;
        bestKey = key;
      }
    });

    if (!bestDay || !bestKey) {
      return;
    }

    const dayEvents = sourceEvents[bestKey] || [];
    dayEvents.push({
      title: step,
      time: stepTimes[index] || "Flexible",
      desc: `Auto-planned for: ${taskText.trim()}`,
    });
    sourceEvents[bestKey] = dayEvents;
    usedDays.add(bestKey);
    scheduled.push({
      date: bestKey,
      title: step,
      time: stepTimes[index] || "Flexible",
      desc: `Auto-planned for: ${taskText.trim()}`,
    });
  });

  if (typeof window !== "undefined") {
    window.localStorage.setItem(storageKey, JSON.stringify(sourceEvents));
  }

  const dayCount = new Set(scheduled.map((item) => item.date)).size;

  return {
    ...plan,
    scheduled,
    summary: `Scheduled ${scheduled.length} steps across ${dayCount} day${dayCount === 1 ? "" : "s"}.`,
  };
};

export function generateWeeklyReview(eventsByDate = null, referenceDate = new Date(), storageKey = "neuronav-planner-events") {
  const sourceEvents = eventsByDate || readStoredEvents(storageKey);
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });

  const daySummaries = days.map((date) => {
    const key = toDateKey(date);
    const rawEvents = Array.isArray(sourceEvents?.[key]) ? sourceEvents[key] : [];
    const normalizedEvents = rawEvents.map(normalizePlannerEvent).filter(Boolean);

    const hasConflict = normalizedEvents.some((event, index) => {
      const currentTime = parseTimeValue(event.time);
      if (currentTime === null) {
        return false;
      }
      return normalizedEvents.slice(index + 1).some((otherEvent) => {
        const otherTime = parseTimeValue(otherEvent.time);
        return otherTime !== null && Math.abs(otherTime - currentTime) < 30;
      });
    });

    return {
      date,
      key,
      events: normalizedEvents,
      eventCount: normalizedEvents.length,
      hasConflict,
    };
  });

  const busyDays = daySummaries.filter((day) => day.eventCount > 0);
  const freeDays = daySummaries.filter((day) => day.eventCount === 0);
  const overloadedDays = daySummaries.filter((day) => day.eventCount >= 4 || (day.eventCount >= 3 && day.hasConflict));
  const conflictDays = daySummaries.filter((day) => day.hasConflict);

  const weekdayCounts = daySummaries.reduce((counts, day) => {
    counts[day.date.getDay()] += day.eventCount;
    return counts;
  }, new Array(7).fill(0));

  const busiestWeekdayIndex = weekdayCounts.reduce(
    (bestIndex, count, index, array) => (count > array[bestIndex] ? index : bestIndex),
    0,
  );

  const focusDays = busyDays
    .filter((day) => day.eventCount >= 2)
    .sort((a, b) => b.eventCount - a.eventCount)
    .slice(0, 3);

  const suggestions = [];

  if (overloadedDays.length > 0) {
    const overloadedLabels = overloadedDays.map((day) => `${weekdayNames[day.date.getDay()]} (${formatDate(day.date)})`).join(", ");
    suggestions.push(`Keep ${overloadedLabels} lighter by trimming one task or moving a commitment to a freer day.`);
  }

  if (conflictDays.length > 0) {
    const conflictLabels = conflictDays.map((day) => `${weekdayNames[day.date.getDay()]} (${formatDate(day.date)})`).join(", ");
    suggestions.push(`Review possible time clashes on ${conflictLabels} and consider consolidating tasks.`);
  }

  if (freeDays.length > 0) {
    const freeLabels = freeDays.map((day) => `${weekdayNames[day.date.getDay()]} (${formatDate(day.date)})`).join(", ");
    suggestions.push(`Use your lighter days — ${freeLabels} — for planning, deep work, or recovery.`);
  }

  if (focusDays.length > 0) {
    const focusLabels = focusDays.map((day) => `${weekdayNames[day.date.getDay()]} (${formatDate(day.date)})`).join(", ");
    suggestions.push(`Protect your most packed days, ${focusLabels}, with early focus blocks and fewer context switches.`);
  }

  if (suggestions.length === 0) {
    suggestions.push("Your week looks balanced. Keep the momentum going with a small planning check-in each evening.");
  }

  const busyLabel = busyDays.length > 0
    ? busyDays.map((day) => `${weekdayNames[day.date.getDay()]} (${formatDate(day.date)})`).join(", ")
    : "no scheduled commitments";

  const freeLabel = freeDays.length > 0
    ? freeDays.map((day) => `${weekdayNames[day.date.getDay()]} (${formatDate(day.date)})`).join(", ")
    : "none";

  const summaryParts = [
    "Weekly AI review",
    `You have ${busyDays.length} busy day${busyDays.length === 1 ? "" : "s"} in the next 7 days and ${freeDays.length} lighter day${freeDays.length === 1 ? "" : "s"}.`,
    `Busy days: ${busyLabel}.`,
    `Free days: ${freeLabel}.`,
    overloadedDays.length > 0
      ? `The heaviest days appear to be ${overloadedDays.map((day) => `${weekdayNames[day.date.getDay()]} (${formatDate(day.date)})`).join(", ")}, so it may help to reduce pressure there.`
      : "Your week looks reasonably balanced, with no clearly overloaded days.",
    conflictDays.length > 0
      ? `There are likely time conflicts on ${conflictDays.map((day) => `${weekdayNames[day.date.getDay()]} (${formatDate(day.date)})`).join(", ")}.`
      : "No obvious scheduling conflicts stood out from the current entries.",
    `Your calendar pattern suggests ${weekdayNames[busiestWeekdayIndex]} is the most packed day this week.`,
    "Productivity suggestions:",
    ...suggestions.map((suggestion) => `- ${suggestion}`),
  ];

  return summaryParts.join("\n");
}

export function useAI() {
  return { generateWeeklyReview };
}

export default generateWeeklyReview;
