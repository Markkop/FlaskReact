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
    const newTask = [
      Math.random(),
      newValues["title"],
      newValues["description"],
      newValues["deadline"]
    ];

    // Updates list
    setTasks([newTask, ...tasks]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/items/new", {
        ...values
      });
      console.log("New event creation's response", response);
    } catch (error) {
      setTasks([...tasks]);
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
