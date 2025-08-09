import React from 'react';

import './Loading.css';

/*** Component ***/
const Loading = ({ loadingText = 'Wczytywanie' }) => {
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

export default Loading;
