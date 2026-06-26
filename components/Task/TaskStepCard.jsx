import React from "react";

const TaskStepCard = ({ step = "Example task step" }) => (
  <div className="task-step-card">
    <h3>Task Step</h3>
    <p>{step}</p>
    {/* TODO: add completion toggle and step details */}
  </div>
);

export default TaskStepCard;
