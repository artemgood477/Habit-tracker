import React from 'react';
import './TaskCompletionMarker.css';

const TaskCompletionMarker = ({ daysCompleted }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="task-marker">
      {days.map((day, index) => (
        <div key={index} className={`day ${daysCompleted[index] ? 'completed' : ''}`}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default TaskCompletionMarker;
