import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = ({
  reference,
  classes: { outerWrapper, spinnerWrapper, spinner },
}) => {
  return (
    <div
      className={`loadingSpinner-outerWrapper ${outerWrapper}`}
    >
      <div 
        ref={reference}
        className={`loadingSpinner-wrapper hide ${spinnerWrapper} `}
      >
        <div className={`loadingSpinner-spinner ${spinner}`}></div>
      </div>
    </div>
  );
};

LoadingSpinner.defaultProps = {
  classes: {
    outerWrapper: '',
    spinnerWrapper: '',
    spinner: '',
  },
};

export default LoadingSpinner;
