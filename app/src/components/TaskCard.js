import React from "react";

// To Do: change backend's logic so it provides an object instead of an array

const TaskCard = ({ task }) => {
  return (
    <div className="taskCard">
      <p>Task: {task[0]}</p>
      <p>Status: {task[1]}</p>
    </div>
  );
};

export default TaskCard;
