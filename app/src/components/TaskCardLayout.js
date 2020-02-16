import React, { useState } from 'react'

const TaskCardLayout = ({
  id,
  title,
  description,
  deadline,
  completedAt,
  handleClick,
  buttonText,
  handleChange,
  isForm,
}) => {
  const [type, setType] = useState('text')

  const convertDate = string => {
    const dateObj = new Date(string)
    return dateObj.toDateString()
  }

  // enables isDue css class for older dates (had to split to get locale)

  let isDue = false
  if (deadline && !completedAt) {
    isDue = deadline && new Date([...deadline.split('-')]) - new Date() < 0
  } else {
    isDue = false
  }

  const checkStatus = (isDue, completedAt) => {
    if (completedAt) {
      return 'isComplete'
    }

    if (isDue) {
      return 'isDue'
    }

    return 'isNone'
  }

  return (
    <form onSubmit={handleClick} id='cardForm' className='mb-3 text-center'>
      <div className={'taskCard card mb-4 shadow-sm fadeIn'}>
        <div className={`${checkStatus(isDue, completedAt)} card-header `}>
          {/* <p>TaskID: {id}</p> */}
          {/* <label htmlFor="title">Title:</label> */}

          {!isForm && <h4 className='my-0'>{title}</h4>}
          {isForm && (
            <input className='form-control' type='text' id='title' onChange={handleChange} placeholder='title'></input>
          )}
        </div>
        <div className='card-body'>
          {/* <label htmlFor="description">Description:</label> */}
          <div className='taskDescription'>
            {!isForm && <p>{description}</p>}
            {isForm && (
              <textarea
                className='form-control'
                type='text'
                id='description'
                onChange={handleChange}
                placeholder='description'
                rows='3'
              ></textarea>
            )}
          </div>
        </div>
        {/* <label htmlFor="deadline">Deadline:</label> */}
        <div className={`${checkStatus(isDue, completedAt)} card-footer text-muted`}>
          {!isForm &&
            (completedAt ? (
              <p className='p-2'>
                Completed at
                <br />
                {completedAt
                  .split(' ')
                  .splice(0, 5)
                  .join(' ')}
              </p>
            ) : (
              deadline && (
                <p className={'p-2'}>
                  Deadline:
                  <br />
                  {convertDate(deadline)}
                </p>
              )
            ))}
          {isForm && (
            <input
              className='form-control'
              type={type}
              id='deadline'
              onChange={handleChange}
              placeholder='deadline'
              onMouseOver={() => setType('date')}
            ></input>
          )}

          <button onClick={handleClick} className={`btn btn-lg btn-block btn${completedAt ? '-outline' : ''}-primary`}>
            {buttonText}{' '}
          </button>
        </div>
      </div>
    </form>
  )
}

export default TaskCardLayout
