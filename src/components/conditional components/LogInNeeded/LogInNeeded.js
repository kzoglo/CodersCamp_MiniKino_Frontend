import React from 'react';

import { scrollTop } from '../../../assistive functions';
import './LogInNeeded.css';

export const LogInNeeded = ({ logInText }) => {
  scrollTop();
  return <div className="logInNeeded">{logInText}</div>;
};

LogInNeeded.defaultProps = {
  logInText: 'Musisz się zalogować!',
};
