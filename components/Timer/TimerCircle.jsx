import React from "react";

const TimerCircle = ({ timeLeft = 1500 }) => {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="timer-circle">
      <div className="timer-circle__content">
        <span className="timer-circle__time">{minutes}:{seconds}</span>
        <p className="timer-circle__label">Focus Session</p>
        {/* TODO: add animated progress ring and dynamic focus state styling */}
      </div>
    </div>
  );
};

export default TimerCircle;
