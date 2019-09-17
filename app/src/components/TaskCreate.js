import React from "react";
import useForm from "./useForm";
import axios from "axios";
import TaskCardLayout from "./TaskCardLayout";

const TaskCreate = ({ tasks, setTasks }) => {
  const createTask = async () => {
    const newid = values["id"] ? values.id : tasks && tasks.length + 1;

    let newValues = {
      id: newid,
      title: values["title"] ? values.title : `My task #${newid}`,
      description: values["description"] ? values.description : "",
      deadline: values["deadline"] ? values.deadline : ""
    };

    // Create a new task as an array
    const newTask = [
      newid,
      newValues["title"],
      newValues["description"],
      newValues["deadline"]
    ];
    // Updates list
    tasks && setTasks([newTask, ...tasks]);
    setValues({});
    try {
      const response = await axios.post(
        "https://flaskreact-server.herokuapp.com/items/new",
        // "http://127.0.0.1:5000/items/new",
        {
          ...newValues
        }
      );
      console.log("New event creation's response", response);
    } catch (error) {
      tasks && setTasks([...tasks]);
      console.log(error);
    }
  };

  const { values, setValues, handleChange, handleSubmit } = useForm(createTask);

  return (
    <TaskCardLayout
      handleClick={handleSubmit}
      handleChange={handleChange}
      buttonText={"Create new task"}
      isForm={true}
    />
  );
};

export default TaskCreate;
