import React from 'react';

import { scrollTop } from '../../../assistive functions';
import './LogInNeeded.css';

export const LogInNeeded = ({ logInText = 'Musisz się zalogować!' }) => {
  scrollTop();
  return <div className="logInNeeded">{logInText}</div>;
};


