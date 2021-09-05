import React from 'react';

import {
  isEqual,
  isLower as compareLenghts,
} from '../../../services/predicates';
import './MovieInfo.css';

/*** Variables ***/
const shortDescrLength = 30;
const dots = '...';
const shortDescrWithDotsLength = (dots) => shortDescrLength + dots.length;

/*** Assistive Functions ***/
const fullDescrAndTooltipText = (refDescr, refTooltip, descr, fullDescr) => {
  if (isEqual(refDescr.innerText.length, shortDescrWithDotsLength(dots))) {
    refDescr.innerText = fullDescr;
    refTooltip.innerText = 'Zwiń opis';
  } else {
    refDescr.innerText = descr;
    refTooltip.innerText = 'Rozwiń opis';
  }
};

const cutMovieDescription = (fullDescr) => {
  if (compareLenghts(shortDescrLength, fullDescr.length)) {
    return `${fullDescr.slice(0, shortDescrLength)}${dots}`;
  } else return fullDescr;
};

/*** Component ***/
const MovieInfo = ({
  movie: { description, title },
  titleClass,
  descriptionClass,
  descrSpanClass,
  tooltipTextClass 
}) => {
  let refDescr = React.createRef();
  let refTooltip = React.createRef();

  return (
    <>
      <h3 className={`${titleClass} movieInfo-title`}>{title}</h3>
      <p
        className={`${descriptionClass} movieInfo-description movieInfo-tooltip`}
        onClick={() =>
          fullDescrAndTooltipText(
            refDescr.current,
            refTooltip.current,
            cutMovieDescription(description),
            description
          )
        }
      >
        <span>{'Opis: '}</span>
        <span
          className={`${descrSpanClass} movieInfo-descrSpan`}
          ref={refDescr}
        >
          {cutMovieDescription(description)}
        </span>
        <span
          className={`${tooltipTextClass} movieInfo-tooltipText`}
          ref={refTooltip}
        >
          {'Rozwiń opis'}
        </span>
      </p>
    </>
  );
};

MovieInfo.defaultProps = {
  titleClass: '',
  descriptionClass: '',
  descrSpanClass: '',
  tooltipTextClass: '',
};

export default MovieInfo;
