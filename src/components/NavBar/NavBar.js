import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import timeout from '../../services/timeout';
import { getAnyItem as getUserId } from '../../services/localStorage';
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
      loginBtn: '',
      windowWidth: window.innerWidth,
      currentPathName: this.props.location.pathname,
      expanded: false,
      dropdown: isHigherEqual(660, window.innerWidth) ? true : false,
    };
    this.inputRef = React.createRef();
    this.iconWrapperRef = React.createRef();
    this.wrapperRef = React.createRef();
    this.outerWrapperRef = React.createRef();
  }

  /* Lifecycle Methods */
  componentDidMount() {
    this.setState({ loginBtn: this.setLoginBtnText() });
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
        loginBtn: this.setLoginBtnText(),
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
  setLoginBtnText = () => {
    return getUserId('userId') ? 'Wyloguj' : 'Zaloguj';
  };

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
      addClasses(this.wrapperRef.current, ['navBar-wrapper-animation']);
      addClasses(this.iconWrapperRef.current, ['navBar-menuIcon-animation']);
      timeout(() => {
        removeClasses(this.wrapperRef.current, ['navBar-wrapper-animation']);
        removeClasses(this.iconWrapperRef.current, [
          'navBar-menuIcon-animation',
        ]);
      }, 2000);
      modifyClasses(this.wrapperRef.current, ['invisible'], ['visible']);
      this.setState({ expanded: true });
    }
  };

  hideNavLinks = (isDropdown) => {
    if (isDropdown) {
      timeout(() => {
        this.setState({ expanded: false }, () => {
          modifyClasses(this.wrapperRef.current, ['visible'], ['invisible']);
        });
      }, 250);
    }
  };

  hideNavLinksWrapperFunc = () => this.hideNavLinks(this.state.dropdown);

  renderLinks = () => {
    return linksList.map(({ to, content, name }, index) => {
      if (isEqual(name, 'Login')) content = this.state.loginBtn;
      return (
        <Link key={index} to={to}>
          {content}
        </Link>
      );
    });
  };

  renderDropdownIcon = (isExpanded) => {
    if (isExpanded) {
      return <FontAwesomeIcon icon={faTimes} onClick={this.handleIconClick} />;
    } else {
      return <FontAwesomeIcon icon={faBars} onClick={this.handleIconClick} />;
    }
  };

  renderDropdownNav = (isExpanded) => {
    return this.renderHorizontalNav(() => this.renderDropdownIcon(isExpanded));
  };

  renderHorizontalNav = (renderAdditionalChildren = () => {}) => {
    return (
      <div
        className="navBar-outerWrapper"
        ref={this.outerWrapperRef}
        tabIndex="0"
      >
        <div className="iconWrapperRef" ref={this.iconWrapperRef}>
          {renderAdditionalChildren()}
        </div>
        <div className="navBar-wrapper" ref={this.wrapperRef}>
          {this.renderLinks()}
        </div>
      </div>
    );
  };

  /* Render */
  render() {
    if (this.state.dropdown) {
      return this.renderDropdownNav(this.state.expanded);
    } else {
      return this.renderHorizontalNav();
    }
  }
}

export default withRouter(NavBar);
