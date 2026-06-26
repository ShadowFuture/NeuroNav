import React from "react";

const TimerControls = ({ startTimer, pauseTimer, resetTimer, isRunning }) => (
  <div className="timer-controls">
    <button type="button" onClick={startTimer}>Start</button>
    <button type="button" onClick={pauseTimer}>Pause</button>
    <button type="button" onClick={resetTimer}>Reset</button>
    <p className="timer-controls__status">{isRunning ? "Running" : "Paused"}</p>
    {/* TODO: add disabled states and accessibility labels */}
  </div>
);

export default TimerControls;
