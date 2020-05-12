import React from 'react';

import Attribution from './parts/Attribution/Attribution';
import OurCinemas from './parts/OurCinemas/OurCinemas';
import ContactLink from './parts/ContactLink/ContactLink';
import Applications from './parts/Applications/Applications';
import { picsData } from './parts/Applications/data';
import './Footer.css';

/*** Component ***/
const Footer = () => {
  return (
    <div className="footer-outerWrapper">
      <div className="footer-wrapper">
        <OurCinemas />
        <Applications dataList={picsData} />
        <ContactLink />
      </div>
      <Attribution />
    </div>
  );
};

export default Footer;
