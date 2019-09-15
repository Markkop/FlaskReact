import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div>
      <p>Task:</p>
      <p>{task}</p>
    </div>
  );
};

export default TaskCard;
