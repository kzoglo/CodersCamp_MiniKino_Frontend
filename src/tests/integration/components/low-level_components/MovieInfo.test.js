import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sanitizeHtml from 'sanitize-html';

import MovieInfo from '../../../../components/low-level_components/MovieInfo/MovieInfo';

// innerText getter and setter implementation in JSDOM: https://github.com/jsdom/jsdom/issues/1245
Object.defineProperty(global.Element.prototype, 'innerText', {
  get() {
    return sanitizeHtml(this.textContent, {
      allowedTags: [], // remove all tags and return text content only
      allowedAttributes: {}, // remove all tags and return text content only
    });
  },
  set(x) {
    this.textContent = x;
  },
  configurable: true, // make it so that it doesn't blow chunks on re-running tests with things like --watch
});

describe('MovieInfo', () => {
  test('should on click change text of a span with a class of "movieInfo-descrSpan" from a short description of a movie to a long description and reversely, also should simultaneously change text of a span with a class of "movieInfo-tooltipText" from "Rozwiń opis" to "Zwiń opis".', () => {
    const props = {
      movie: {
        description:
          'Gdy Czkawka zmaga się zadaniami wodza Berk, Szczerbatek trafia na trop tajemniczej smoczycy.',
        title: 'Kamil',
      },
    };
    const { container } = render(<MovieInfo {...props} />, {
      container: document.body.appendChild(document.createElement('div')),
    });

    const paraContainer = container.children[1];
    const [, descrSpan, tooltipSpan] = paraContainer.children;

    expect(descrSpan.innerHTML).toBe('Gdy Czkawka zmaga się zadaniam...');
    expect(tooltipSpan.innerHTML).toBe('Rozwiń opis');

    userEvent.click(paraContainer);

    expect(descrSpan.innerHTML).toBe(props.movie.description);
    expect(tooltipSpan.innerHTML).toBe('Zwiń opis');

    userEvent.click(paraContainer);

    expect(descrSpan.innerHTML).toBe('Gdy Czkawka zmaga się zadaniam...');
    expect(tooltipSpan.innerHTML).toBe('Rozwiń opis');
  });
});
