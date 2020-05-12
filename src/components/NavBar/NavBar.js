import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import {
  isEqual,
  isLowerEqual as isHigherEqual,
} from '../../services/predicates';
import {
  addClasses,
  removeClasses,
  modifyClasses,
} from '../../assistive functions';
import linksList from './parts/linksList';
import './NavBar.css';

Link.defaultProps = {
  className: 'navBar-item',
};

/*** Component ***/
class NavBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      currentPathName: this.props.location.pathname,
      expanded: false,
      dropdown: isHigherEqual(660, window.innerWidth) ? true : false,
    };
    this.inputRef = React.createRef();
    this.wrapperRef = React.createRef();
    this.outerWrapperRef = React.createRef();
  }

  /* Lifecycle Methods */
  componentDidMount() {
    if (this.state.dropdown) {
      modifyClasses(
        this.wrapperRef.current,
        ['horizontalNav'],
        ['dropdownNav']
      );
    } else {
      modifyClasses(
        this.wrapperRef.current,
        ['dropdownNav'],
        ['horizontalNav']
      );
    }

    window.addEventListener('resize', this.handleWindowResize);
    this.outerWrapperRef.current.addEventListener(
      'blur',
      this.hideNavLinksWrapperFunc
    );

    this.setActiveNavTab();
  }

  componentDidUpdate() {
    this.setState(
      {
        currentPathName: this.props.location.pathname,
      },
      () => {
        this.setActiveNavTab();
      }
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    this.outerWrapperRef.current.removeEventListener(
      'blur',
      this.hideNavLinksWrapperFunc
    );
  }

  /* Assistive Methods */
  handleWindowResize = () => {
    if (isHigherEqual(window.innerWidth, 660)) {
      this.setState({ dropdown: false }, () => {
        modifyClasses(
          this.wrapperRef.current,
          ['dropdownNav', 'invisible'],
          ['horizontalNav']
        );
      });
    } else {
      this.setState({ dropdown: true, expanded: false }, () => {
        modifyClasses(
          this.wrapperRef.current,
          ['horizontalNav'],
          ['dropdownNav']
        );
      });
    }
  };

  setActiveNavTab = () => {
    const navChildren = Array.from(this.wrapperRef.current.children);
    const activeChild = navChildren.find((aTag) => {
      return isEqual(aTag.pathname, this.state.currentPathName);
    });

    navChildren.forEach((aTag) => removeClasses(aTag, 'navBar-activeItem'));
    if (activeChild) addClasses(activeChild, 'navBar-activeItem');
  };

  handleIconClick = () => {
    if (this.state.expanded) {
      modifyClasses(this.wrapperRef.current, ['visible'], ['invisible']);
      this.setState({ expanded: false });
    } else {
      modifyClasses(this.wrapperRef.current, ['invisible'], ['visible']);
      this.setState({ expanded: true });
    }
  };

  hideNavLinks = (isDropdown) => {
    if (isDropdown) {
      setTimeout(() => {
        this.setState({ expanded: false }, () => {
          modifyClasses(this.wrapperRef.current, ['visible'], ['invisible']);
        });
      }, 250);
    }
  };

  hideNavLinksWrapperFunc = () => this.hideNavLinks(this.state.dropdown);

  renderLinks = () => {
    return linksList.map(({ to, content }, index) => {
      return (
        <Link key={index} to={to}>
          {content}
        </Link>
      );
    });
  };

  renderIcon = () => {
    return (
      <FontAwesomeIcon
        className="navBar-menuIcon"
        icon={faBars}
        onClick={this.handleIconClick}
      />
    );
  };

  renderDropdownNav = () => {
    return this.renderHorizontalNav(this.renderIcon);
  };

  renderHorizontalNav = (renderAdditionalChildren = () => {}) => {
    return (
      <div
        className="navBar-outerWrapper"
        ref={this.outerWrapperRef}
        tabIndex="0"
      >
        {renderAdditionalChildren()}
        <div className="navBar-wrapper" ref={this.wrapperRef}>
          {this.renderLinks()}
        </div>
      </div>
    );
  };

  /* Render */
  render() {
    if (this.state.dropdown) {
      return this.renderDropdownNav();
    } else {
      return this.renderHorizontalNav();
    }
  }
}

export default withRouter(NavBar);
