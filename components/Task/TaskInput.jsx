import React from "react";

const TaskInput = () => (
  <div className="task-input">
    <label htmlFor="task-input">What do you want to accomplish?</label>
    <textarea id="task-input" rows="4" placeholder="Type a task here..." />
    <button type="button">Create steps</button>
    {/* TODO: wire value handling and task submission */}
  </div>
);

export default TaskInput;
