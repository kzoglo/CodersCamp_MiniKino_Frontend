import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import NavBar from '../../../components/NavBar/NavBar';

describe('NavBar', () => {
  afterEach(() => {
    localStorage.clear();
    cleanup();
    window.innerWidth = 1020;
  });

  test('should change background color of a navigation tab, by adding "navBar-activeItem" class, if user click on that tab.', () => {
    const { getByText } = render(
      <Router>
        <NavBar />
      </Router>
    );
    const pricesTab = getByText('Cennik');
    userEvent.click(pricesTab);

    expect(pricesTab).toHaveClass('navBar-activeItem');
  });

  test('should change text of the login/logout navigation tab by inserting "userId" item into the localStorage/clearing localStorage, if user logs in/logs out.', () => {
    const { container, rerender } = render(
      <Router>
        <NavBar />
      </Router>
    );
    const logTab = container.firstElementChild.children[1].lastElementChild;

    expect(logTab).toHaveAttribute('href', '#/login');
    expect(logTab).toHaveTextContent('Zaloguj');

    localStorage.setItem('userId', 'testUserId');
    rerender(
      <Router>
        <NavBar />
      </Router>
    );

    expect(logTab).toHaveTextContent('Wyloguj');
  });

  test('should change navigation mode from horizontal to dropdown and reversely, by addition of "horizontalNav" or "dropdownNav" classes, if window.innerWidth crossed 660px threshold in either way.', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );
    const tabsWrapper = document.body.querySelector('.navBar-wrapper');

    expect(tabsWrapper).toHaveClass('horizontalNav');

    window.innerWidth = 650;
    fireEvent(window, new Event('resize'));

    expect(tabsWrapper).toHaveClass('dropdownNav');
  });

  test('should add a dropdown icon to the navigation, if viewport width is below 660px.', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );
    const dropdownIconWrapper = document.body.querySelector('.iconWrapperRef');

    expect(dropdownIconWrapper).toBeEmpty();

    window.innerWidth = 650;
    fireEvent(window, new Event('resize'));

    expect(dropdownIconWrapper).not.toBeEmpty();
  });

  test('should display dropdown navigation and change dropdown icon to cross icon, if user clicks on dropdown icon.', async () => {
    window.innerWidth = 650;
    fireEvent(window, new Event('resize'));
    render(
      <Router>
        <NavBar />
      </Router>
    );
    const navBarWrapper = document.body.querySelector('.navBar-wrapper');
    const icon = document.body.querySelector('.iconWrapperRef svg');

    // first click - on rolled-up navigation
    userEvent.click(icon);

    expect(navBarWrapper).toHaveClass(
      'visible',
      'navBar-wrapper-animation',
      'dropdownNav'
    );
    expect(icon).not.toHaveAttribute('data-icon', 'bars');
    expect(icon).toHaveAttribute('data-icon', 'times');

    // second click - on expanded navigation
    userEvent.click(icon);

    expect(navBarWrapper).not.toHaveClass('visible');
    expect(navBarWrapper).toHaveClass(
      'dropdownNav',
      'invisible',
      'navBar-wrapper-animation'
    );
    expect(icon).toHaveAttribute('data-icon', 'bars');
    expect(icon).not.toHaveAttribute('data-icon', 'times');
    await waitFor(
      () => expect(navBarWrapper).not.toHaveClass('navBar-wrapper-animation'),
      {
        timeout: 2001,
      }
    );
  });

  test('should check if navigation dispatches to proper subpages, when user clicks a given link inside a navigation.', async () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    const navBarWrapperChildren = document.body.querySelector('.navBar-wrapper')
      .children;
    const navBarWrapperChildrenArr = Array.from(navBarWrapperChildren);

    navBarWrapperChildrenArr.forEach((elem, index) => {
      const hashes = ['#/', '#/prices', '#/mytickets', '#/register', '#/login'];
      userEvent.click(elem);

      expect(window.location.hash).toBe(hashes[index]);
    });
  });
});
