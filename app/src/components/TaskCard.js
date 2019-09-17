import React, { useState } from "react";
import axios from "axios";
import TaskCardLayout from "./TaskCardLayout";

// To Do: change backend's logic so it provides an object instead of an array
// Is it possible with sqlite? Perhaps migrate to mongo?

const TaskCard = ({ task }) => {
  const id = task[0];
  const title = task[1] ? task[1] : `My task #${id}`;
  const description = task[2];
  const deadline = task[3];
  const completedAt = task[4];

  const [done, setDone] = useState(completedAt ? true : false);

  const convertToUTC = string => {
    if (!string) {
      return "";
    }
    const date = string.split(" ");
    return new Date(`${date[0]}T${date[1]}Z`);
  };
  const [date, setDate] = useState(convertToUTC(completedAt));

  const handleClick = async event => {
    event.preventDefault();
    if (!done) {
      setDate(Date());
    } else {
      setDate("");
    }
    setDone(!done);
    try {
      const response = await axios.put(
        // "http://127.0.0.1:5000/item/update"
        "https://flaskreact-server.herokuapp.com/item/update",
        {
          taskid: id,
          completed_at: !done ? new Date() : null
        }
      );
      console.log(response);
    } catch (error) {
      setDone(!done);
      setDate("Please try again later");
      console.log(error);
    }
  };

  return (
    <TaskCardLayout
      id={id}
      title={title}
      description={description}
      deadline={deadline}
      completedAt={date.toString()}
      handleClick={handleClick}
      buttonText={done ? "Task done ✓" : "Mark as done"}
    />
  );
};

export default TaskCard;
