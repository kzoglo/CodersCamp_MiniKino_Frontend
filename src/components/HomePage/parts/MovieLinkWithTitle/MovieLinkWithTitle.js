import { Link } from 'react-router-dom';

import { setItem as setMovieId } from '../../../../services/localStorage';
import { appName } from '../../../App/routing/routingList';
import { getImageUrl } from '../../../../services/imageService';
import MoviePoster from '../../../low-level components/MoviePoster/MoviePoster';
import './MovieLinkWithTitle.css';

/*** Component ***/
const MovieLinkWithTitle = ({ imageUrl, _id, title, available }) => {
  return (
    <>
      <Link
        to={`${appName}/reservation`}
        className='movieLinkWithTitle-wrapper'
        onClick={() => setMovieId('movieId', _id)}
      >
        <MoviePoster
          src={getImageUrl(imageUrl)}
          alt={title}
          available={available}
        />
        <p className='movieLinkWithTitle-title' data-movie-id={_id}>
          {title}
        </p>
      </Link>
    </>
  );
};

export default MovieLinkWithTitle;
