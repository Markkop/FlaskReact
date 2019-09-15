import React from "react";
import useForm from "./useForm";
import axios from "axios";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título</label>
        <input type="text" id="title" onChange={handleChange}></input>
      </div>
      <div>
        <label htmlFor="description">Descrição:</label>
        <input type="text" id="description" onChange={handleChange}></input>
      </div>
      <div>
        <label htmlFor="deadline">Até:</label>
        <input type="date" id="deadline" onChange={handleChange}></input>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default TaskCreate;
