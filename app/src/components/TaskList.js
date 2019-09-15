import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    const response = await axios("http://127.0.0.1:5000/items/all");
    setTasks(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(tasks);

  return (
    <div className="taskList">
      {tasks && tasks.map(task => <TaskCard key={task[0]} task={task} />)}
    </div>
  );
};

export default TaskList;
