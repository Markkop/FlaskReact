import React from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskCreate from "./components/TaskCreate";

function App() {
  return (
    <div className="App">
      <TaskCreate />
      <TaskList />
    </div>
  );
}

export default App;
