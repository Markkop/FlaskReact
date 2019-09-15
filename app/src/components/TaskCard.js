import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div>
      <p>Task:</p>
      <p>{task[0]}</p>
    </div>
  );
};

export default TaskCard;
