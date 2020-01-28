import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function reservation(props) {
  const movie = props._id;
  window.localStorage.setItem('movieId', movie);
}

const Photo = props => {
  return (
    <div>
      <Link
        to="/CodersCamp_MiniKino_Frontend/reservation"
        className="ui card"
        onClick={() => reservation(props)}
      >
        <div className="ui slide masked reveal image ins-img">
          <img
            className="ui medium circular image "
            src={'img/home/' + props.imageUrl}
            alt="Home photo"
          />
        </div>
        <div className="content" data-movie-id={props._id}>
          <a className="header">{props.title}</a>
        </div>
      </Link>
    </div>
  );
};

export default Photo;
