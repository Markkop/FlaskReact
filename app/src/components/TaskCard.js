import React from "react";

// To Do: change backend's logic so it provides an object instead of an array

const TaskCard = ({ task }) => {
  return (
    <div className="taskCard">
      <p>TaskID: {task[0]}</p>
      <p>Title: {task[1]}</p>
      <p>Description: {task[2]}</p>
      <p>Deadline: {task[3]}</p>
      <p>CompletedAt: {task[4]}</p>
    </div>
  );
};

export default TaskCard;
