import React, { useState, useEffect } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import axios from "axios";
import ResetButton from "./components/ResetButton";

function App() {
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    const response = await axios(
      "https://flaskreact-server.herokuapp.com/items/all"
      // "http://127.0.0.1:5000/items/all"
    );

    console.log(response);
    setTasks(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App bg-light">
      <ResetButton tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
