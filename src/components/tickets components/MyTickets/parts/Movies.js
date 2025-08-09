import React from 'react';

import { isLower as doesUserHasTickets } from '../../../../services/predicates';
import { getImageUrl } from '../../../../services/imageService';
import MoviePoster from '../../../low-level components/MoviePoster/MoviePoster';
import MovieInfo from '../../../low-level components/MovieInfo/MovieInfo';
import ScreeningInfo from '../../../low-level components/ScreeningInfo/ScreeningInfo';

/*** Assistive Functions ***/
const renderTickets = (reservations, noTicketsText) => {
  if (doesUserHasTickets(0, reservations.length)) {
    return reservations.map(({ screening_id, seat_id, _id }) => {
      let { imageUrl, title, description } = screening_id.movie_id;

      return (
        <div className='myTickets-innerWrapper' key={_id}>
          <MoviePoster src={getImageUrl(imageUrl)} alt={title} />

          <div className='myTickets-utils'>
            <MovieInfo movie={{ description, title }} />
            <ScreeningInfo seat={seat_id} screening={screening_id} />
          </div>
        </div>
      );
    });
  }
  return <div className='myTickets-noTickets'>{noTicketsText}</div>;
};

/*** Component ***/
export const Movies = ({ reservations, noTicketsText = 'Brak biletów do wyświetlenia' }) => {
  return (
    <div className='myTickets-wrapper'>
      {renderTickets(reservations, noTicketsText)}
    </div>
  );
};

