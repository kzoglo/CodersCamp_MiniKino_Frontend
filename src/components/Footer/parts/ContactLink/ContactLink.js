import React from 'react';
import { Link } from 'react-router-dom';

import { appName } from '../../../App/routing/routingList';

/*** Component ***/
const ContactsLink = () => {
  return (
    <div className="item">
      <h2>KONTAKT</h2>
      <div className="ui list">
        <Link to={`${appName}/contact`} className="item">
          Kontakt
        </Link>
      </div>
    </div>
  );
};

export default ContactsLink;
