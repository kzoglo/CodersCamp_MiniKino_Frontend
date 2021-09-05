import React from 'react';

import './Loading.css';

/*** Component ***/
const Loading = ({ loadingText }) => {
  return (
    <div className="loading-wrapper">
      <div>{loadingText}</div>
      <div className="loadingDots-outerWrapper">
        <div className="loadingDots-wrapper">
          <div> </div> <div> </div> <div> </div> <div> </div> <div> </div>
        </div>
      </div>
    </div>
  );
};

Loading.defaultProps = {
  loadingText: 'Wczytywanie',
};

export default Loading;
