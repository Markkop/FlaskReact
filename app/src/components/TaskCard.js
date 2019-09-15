import React from "react";
import TaskCard from "./TaskCard";

const TaskCard = task => {
  return (
    <div>
      <p>{task.name}</p>
    </div>
  );
};

export default TaskCard;
