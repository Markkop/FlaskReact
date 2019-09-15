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
  return (
    <form onSubmit={handleClick} className="taskContainer">
      <div className="taskCard">
        {/* <p>TaskID: {id}</p> */}
        <div className="formPair">
          <label htmlFor="title">Title:</label>
          {title ? (
            <p>{title}</p>
          ) : (
            <input type="text" id="title" onChange={handleChange}></input>
          )}
        </div>
        <div className="formPair">
          <label htmlFor="description">Description:</label>
          {description ? (
            <p>{description}</p>
          ) : (
            <input type="text" id="description" onChange={handleChange}></input>
          )}
        </div>
        <div className="formPair">
          <label htmlFor="deadline">Deadline:</label>
          {deadline ? (
            <p>{deadline}</p>
          ) : (
            <input type="date" id="deadline" onChange={handleChange}></input>
          )}
        </div>
        {completedAt && <p>{`Completed at: ${completedAt}`}</p>}
      </div>
      <button onClick={handleClick}>{buttonText}</button>
    </form>
  );
};

export default TaskCardLayout;
