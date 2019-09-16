import React from "react";
import TaskCard from "./TaskCard";
import TaskCreate from "./TaskCreate";

const TaskList = ({ tasks, setTasks }) => {
  return (
    <section>
      <div className="taskList">
        <TaskCreate setTasks={setTasks} tasks={tasks} />
        {tasks && tasks.map(task => <TaskCard key={task[0]} task={task} />)}
      </div>
    </section>
  );
};

export default TaskList;
