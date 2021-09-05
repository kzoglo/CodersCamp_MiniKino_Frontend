import React from 'react';

import './ContactWay.css';

/*** Component ***/
const ContactWay = ({
  iconSemanticUI,
  header,
  content: { main, secondary },
  communication: { way, resource },
  wrapperClass,
  iconClass,
  titleClass,
  textsClass 
}) => {
  return (
    <div className={`contactWay-wrapper ${wrapperClass}`}>
      <i className={`${iconSemanticUI} contactWay-icon ${iconClass}`}></i>
      <h1 className={`contactWay-title ${titleClass}`}>{header}</h1>
      <div className={`contactWay-texts ${textsClass}`}>
        <p>{main}</p>
        <p>{secondary}</p>
        <p>
          {way} <span>{resource}</span>
        </p>
      </div>
    </div>
  );
};

ContactWay.defaultProps = {
  iconSemanticUI: 'envelope outline icon',
  header: 'Napisz do nas e-mail',
  content: {
    main: 'Masz pytanie?',
    secondary: 'Napisz do nas, a na pewno się z Tobą skontaktujemy',
  },
  communication: {
    way: 'e-mail:',
    resource: 'minikino@gmail.com',
  },
  wrapperClass: '',
  iconClass: '',
  titleClass: '',
  textsClass: '',
};

export default ContactWay;
