import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <span className="progress-bar-fill" style={{ width: `${progress}%` }}>
        {progress}%
      </span>
    </div>
  );
};

export default ProgressBar;
