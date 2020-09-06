import React from 'react';

import { isEqual as isSeatDefined } from '../../../services/predicates';
import { dateFormat } from '../../tickets_components/Reservation/parts/BuyTicket/parts/assistiveFunctions';
import './ScreeningInfo.css';

/*** Component ***/
const ScreeningInfo = ({
  seat,
  screening,
  classes: { timeClass, seatClass, wrapperClass },
}) => {
  if (!isSeatDefined(seat, undefined)) {
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

  return null;
};

ScreeningInfo.defaultProps = {
  classes: {
    timeClass: '',
    seatClass: '',
    wrapperClass: '',
  },
};

export default ScreeningInfo;
