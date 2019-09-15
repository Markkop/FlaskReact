import React from "react";
import axios from "axios";

// To Do: change backend's logic so it provides an object instead of an array
// Is it possible with sqlite? Perhaps migrate to mongo?

const TaskCard = ({ task }) => {
  const handleComplete = async () => {
    const response = await axios.put("http://127.0.0.1:5000/item/update", {
      title: task[1],
      completed_at: new Date()
    });
    console.log(response);
  };

  return (
    <div className="taskCard">
      <p>TaskID: {task[0]}</p>
      <p>Title: {task[1]}</p>
      <p>Description: {task[2]}</p>
      <p>Deadline: {task[3]}</p>
      <p>CompletedAt: {task[4]}</p>
      <button onClick={handleComplete}>Complete</button>
    </div>
  );
};

export default TaskCard;
