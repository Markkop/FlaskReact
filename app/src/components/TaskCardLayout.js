import React, { useState } from "react";

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
  const [type, setType] = useState("text");

  // enables isDue css class for older dates (had to split to get locale)
  const isDue = deadline && new Date([...deadline.split("-")]) - new Date() < 0;
  return (
    <form
      onSubmit={handleClick}
      id="cardForm"
      className="taskList mb-3 text-center"
    >
      <div className="taskCard card mb-4 shadow-sm">
        <div className="card-header">
          {/* <p>TaskID: {id}</p> */}
          {/* <label htmlFor="title">Title:</label> */}
          {title && <h4 className="my-0">{title}</h4>}
          {!title && (
            <input
              className="form-control"
              type="text"
              id="title"
              onChange={handleChange}
              placeholder="title"
            ></input>
          )}
        </div>
        <div className="card-body">
          {/* <label htmlFor="description">Description:</label> */}
          {description && <p>{description}</p>}
          {!description && (
            <input
              className="form-control"
              type="text"
              id="description"
              onChange={handleChange}
              placeholder="description"
            ></input>
          )}

          {/* <label htmlFor="deadline">Deadline:</label> */}

          {!completedAt && deadline && (
            <p className={`${isDue && !completedAt && "isDue"}`}>{deadline}</p>
          )}
          {!deadline && (
            <input
              className="form-control"
              type={type}
              id="deadline"
              onChange={handleChange}
              placeholder="deadline"
              onMouseOver={() => setType("date")}
            ></input>
          )}

          {completedAt && (
            <p>
              Completed at:
              <br />
              {completedAt
                .split(" ")
                .splice(0, 5)
                .join(" ")}
            </p>
          )}
        </div>
        <button
          onClick={handleClick}
          className={`btn btn-lg btn-block btn${
            completedAt ? "-outline" : ""
          }-primary`}
        >
          {buttonText}{" "}
        </button>
      </div>
    </form>
  );
};

export default TaskCardLayout;
