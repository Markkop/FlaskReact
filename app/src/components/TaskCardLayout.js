import React from "react";

const TaskCardLayout = ({
  id,
  title,
  description,
  deadline,
  completedAt,
  handleClick,
  buttonText,
  handleChange
}) => {
  // enables isDue css class for older dates (had to split to get locale)
  const isDue = deadline && new Date([...deadline.split("-")]) - new Date() < 0;
  return (
    <form onSubmit={handleClick} className="taskContainer">
      <div className="taskCard">
        {/* <p>TaskID: {id}</p> */}
        <div className="formPair">
          <label htmlFor="title">Title:</label>
          {title && <p>{title}</p>}
          {!title && (
            <input type="text" id="title" onChange={handleChange}></input>
          )}
        </div>
        <div className="formPair">
          <label htmlFor="description">Description:</label>
          {description && <p>{description}</p>}
          {!description && (
            <input type="text" id="description" onChange={handleChange}></input>
          )}
        </div>
        <div className="formPair">
          <label htmlFor="deadline">Deadline:</label>
          {deadline && (
            <p className={`${isDue && !completedAt && "isDue"}`}>{deadline}</p>
          )}
          {!deadline && (
            <input type="date" id="deadline" onChange={handleChange}></input>
          )}
        </div>
        <div className="formPair">
          {completedAt && <p>Completed on:</p>}
          {completedAt && (
            <p>
              {completedAt
                .split(" ")
                .splice(0, 5)
                .join(" ")}
            </p>
          )}
        </div>
      </div>
      <button onClick={handleClick}>{buttonText}</button>
    </form>
  );
};

export default TaskCardLayout;
