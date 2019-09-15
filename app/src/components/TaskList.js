import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    const response = await axios("http://127.0.0.1:5000/items/all");
    setTasks(response.data.items);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(tasks);

  // To Do: change index to a proper ID
  return (
    <div>
      {tasks &&
        tasks.map((task, index) => <TaskCard key={index} task={task} />)}
    </div>
  );
};

export default TaskList;
