import React from 'react';

/*** Component ***/
const Applications = ({ dataList }) => {
  const picsList = () => {
    return dataList.map(({ className, src, alt }, index) => {
      return (
        <div key={index} className="item">
          <img className={className} src={src} alt={alt} />
        </div>
      );
    });
  };

  return (
    <div className="item">
      <h2>APLIKACJA MINIKINO</h2>
      <div className="ui list">{picsList()}</div>
    </div>
  );
};

export default Applications;
