import React, { useState } from "react";
import axios from "axios";

// To Do: change backend's logic so it provides an object instead of an array
// Is it possible with sqlite? Perhaps migrate to mongo?

const TaskCard = ({ task }) => {
  const id = task[0];
  const title = task[1];
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

  const handleClick = async () => {
    if (!done) {
      setDate(Date());
    } else {
      setDate("");
    }
    setDone(!done);
    try {
      const response = await axios.put("http://127.0.0.1:5000/item/update", {
        title: title,
        completed_at: !done ? new Date() : null
      });
    } catch (error) {
      setDone(!done);
      setDate("Please try again later");
      console.log(error);
    }
  };

  return (
    <div className="taskCard">
      <p>TaskID: {id}</p>
      <p>Title: {title}</p>
      <p>Description: {description}</p>
      <p>Deadline: {deadline}</p>
      <p>CompletedAt:</p>
      <p>{date.toString()}</p>
      <button onClick={handleClick}>
        {done ? "Mark as undone" : "Mark as done"}
      </button>
    </div>
  );
};

export default TaskCard;
