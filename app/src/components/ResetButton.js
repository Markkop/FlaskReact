import React from "react";
import axios from "axios";

const ResetButton = ({ tasks, setTasks }) => {
  const handleClick = async () => {
    setTasks([]);

    try {
      const response = await axios("http://127.0.0.1:5000/items/reset");

      console.log(response);
      if (response["message"] === "done") {
        setTasks(tasks);
      }
    } catch (error) {
      setTasks(tasks);
    }
  };

  return (
    <button
      className="helperButton btn btn-block btn-primary"
      onClick={handleClick}
    >
      Delete all tasks
    </button>
  );
};

export default ResetButton;
