import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = ({
  outerWrapper,
  spinnerWrapper,
  spinner, 
  reference,
}) => {
  return (
    <div
      className={`loadingSpinner-outerWrapper ${outerWrapper}`}
    >
      <div 
        ref={reference}
        className={`loadingSpinner-wrapper hide ${spinnerWrapper}`}
      >
        <div className={`loadingSpinner-spinner ${spinner}`}></div>
      </div>
    </div>
  );
};

LoadingSpinner.defaultProps = {
  reference: '',
  outerWrapper: '',
  spinnerWrapper: '',
  spinner: '',
};

export default LoadingSpinner;
