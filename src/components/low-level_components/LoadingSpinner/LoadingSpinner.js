import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = ({
  reference,
  classes: { outerWrapper, spinnerWrapper, spinner },
}) => {
  return (
    <div
      ref={reference}
      className={`loadingSpinner-outerWrapper invisible ${outerWrapper}`}
    >
      <div className={`loadingSpinner-wrapper ${spinnerWrapper}`}>
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
