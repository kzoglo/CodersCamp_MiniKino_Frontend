import React from 'react';

import { isEqual as isSeatDefined } from '../../../services/predicates';
import { dateFormat } from '../../tickets components/Reservation/parts/BuyTicket/parts/assistiveFunctions';
import './ScreeningInfo.css';

/*** Component ***/
const ScreeningInfo = ({
  seat,
  screening,
  timeClass,
  seatClass,
  wrapperClass,
}) => {
  if (!isSeatDefined(seat, null)) {
    return (
      <div className={`${wrapperClass} screeningInfo-wrapper`}>
        <p className={`${timeClass} screeningInfo-time`}>
          <span>{'Godzina: '}</span> {dateFormat(screening.time)}
        </p>
        <p className={`${seatClass} screeningInfo-seat`}>
          <span>{'Sala: '}</span>
          {seat.room_id.name}
          <span>{', Rząd: '}</span>
          {seat.row}
          <span>{', Miejsce: '}</span>
          {seat.seatNumber}
        </p>
      </div>
    );
  } 
  else return null;
};

ScreeningInfo.defaultProps = {
  timeClass: '',
  seatClass: '',
  wrapperClass: '',
};

export default ScreeningInfo;
