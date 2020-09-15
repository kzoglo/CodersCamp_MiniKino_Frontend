import React from 'react';
import { render } from '@testing-library/react';

import MoviePoster from '../../../../components/low-level components/MoviePoster/MoviePoster';

describe('Movie Poster', () => {
  let props = {
    src: 'test',
    alt: 'test',
    available: true,
  };

  test('should render movie poster with information about it\'s accessibility, if an "available" prop is passed with "true" or "false" value to the "MoviePoster" component.', () => {
    const { getByText } = render(<MoviePoster {...props} />, {
      container: document.body.appendChild(document.createElement('div')),
    });
    const accessibilitySpan = getByText('Dostępny');

    expect(accessibilitySpan.classList.contains('moviePoster-available')).toBe(
      true
    );
  });

  test('should render movie poster with information about it\'s accessibility, if an "available" prop is passed with "false" value to the "MoviePoster" component.', () => {
    props.available = false;
    const { getByText } = render(<MoviePoster {...props} />, {
      container: document.body.appendChild(document.createElement('div')),
    });
    const accessibilitySpan = getByText('Niedostępny');

    expect(
      accessibilitySpan.classList.contains('moviePoster-unavailable')
    ).toBe(true);
  });

  test('should not render information about movie poster\'s accessibility, if an "available" prop is not passed or passed with "undefined" value to the "MoviePoster" component.', () => {
    props.available = undefined;
    const { container } = render(<MoviePoster {...props} />, {
      container: document.body.appendChild(document.createElement('div')),
    });
    const moviePosterWrapper = container.firstElementChild;
    const isMoviePosterSpanPresent = moviePosterWrapper.children.length > 1;

    expect(isMoviePosterSpanPresent).toBe(false);
  });
});
