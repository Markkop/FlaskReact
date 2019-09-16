import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import axios from "axios";
import TaskCreate from "./TaskCreate";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    const response = await axios(
      // "https://flaskreact-server.herokuapp.com/items/all"
      "http://127.0.0.1:5000/items/all"
    );
    console.log(response);
    setTasks(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(tasks);

  return (
    <div className="taskList">
      <TaskCreate setTasks={setTasks} tasks={tasks} />
      {tasks && tasks.map(task => <TaskCard key={task[0]} task={task} />)}
    </div>
  );
};

export default TaskList;
