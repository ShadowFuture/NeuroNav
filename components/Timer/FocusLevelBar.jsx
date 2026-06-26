import React from "react";

const FocusLevelBar = ({ focusScore = 50 }) => {
  const level = focusScore >= 70 ? "high" : focusScore >= 40 ? "medium" : "low";

  return (
    <div className={`focus-level-bar focus-level-bar--${level}`}>
      <div className="focus-level-bar__fill" style={{ width: `${focusScore}%` }} />
      <span className="focus-level-bar__label">{focusScore}% focus</span>
      {/* TODO: animate progress fill and add tooltips */}
    </div>
  );
};

export default FocusLevelBar;
