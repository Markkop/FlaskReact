import React from "react";
import useForm from "./useForm";
import axios from "axios";
import TaskCardLayout from "./TaskCardLayout";

const TaskCreate = () => {
  const createTask = async () => {
    console.log(values);
    const response = await axios.post("http://127.0.0.1:5000/items/new", {
      title: values.title,
      description: values.description,
      deadline: values.deadline
    });

    console.log(response);
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
