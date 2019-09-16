import React from "react";
import useForm from "./useForm";
import axios from "axios";
import TaskCardLayout from "./TaskCardLayout";

const TaskCreate = ({ setTasks, tasks }) => {
  const createTask = async () => {
    let newValues = {
      ...values
    };

    // Apply defaults
    ["title", "description", "deadline"].forEach(field => {
      if (!newValues[field]) {
        newValues[field] = `no ${field}`;
      }
    });

    // Create a new task as an array
    const newid = tasks && tasks.length + 1;
    const newTask = [
      newid,
      newValues["title"],
      newValues["description"],
      newValues["deadline"]
    ];
    // Updates list
    tasks && setTasks([newTask, ...tasks]);

    try {
      const response = await axios.post(
        "http://flaskreact-server.herokuapp.com/items/new",
        {
          ...values
        }
      );
      console.log("New event creation's response", response);
    } catch (error) {
      tasks && setTasks([...tasks]);
      console.log(error);
    }
  };

  const { values, handleChange, handleSubmit } = useForm(createTask);

  return (
    <TaskCardLayout
      handleClick={handleSubmit}
      handleChange={handleChange}
      buttonText={"Create new task"}
    />
  );
};

export default TaskCreate;
