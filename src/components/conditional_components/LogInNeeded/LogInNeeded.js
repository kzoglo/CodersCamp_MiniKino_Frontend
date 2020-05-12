import React from 'react';

import './LogInNeeded.css';

export const LogInNeeded = ({ logInText }) => {
  // localStorage.clear();
  return <div className="logInNeeded">{logInText}</div>;
};

LogInNeeded.defaultProps = {
  logInText: 'Musisz się zalogować!',
};
