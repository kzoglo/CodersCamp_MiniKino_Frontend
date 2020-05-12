import React from 'react';

import { scrollTop } from '../../assistive functions';
import {
  check,
  isLower,
  isLowerEqual,
  isInequal as hadStateChanged,
} from '../../services/predicates';
import ContactWay from './parts/ContactWay/ContactWay';
import './ContactUs.css';

/*** Component ***/
class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      windowWidth: window.innerWidth,
    };
    this.wrapperRef = React.createRef();
  }

  /* Lifecycle Methods */
  componentDidMount() {
    const { finalWidthOfWindow, childrenNum, wrapper } = this.getVariables();
    const width = window.innerWidth;

    isLowerEqual(finalWidthOfWindow, width)
      ? this.changeToOneColumn(wrapper)
      : this.changeToMultiColumn(childrenNum, wrapper);

    window.addEventListener('resize', this.handleResize);
    scrollTop();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { finalWidthOfWindow } = this.getVariables();

    if (hadStateChanged(this.state.windowWidth, nextState.windowWidth)) {
      if (
        check(isLower, isLowerEqual)(
          finalWidthOfWindow,
          this.state.windowWidth,
          nextState.windowWidth
        )
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  /* Assistive Methods and Handlers */
  getVariables = () => {
    const wrapperRef = this.wrapperRef.current;
    const values = {
      finalWidthOfWindow: 800,
      childrenNum: wrapperRef.children.length,
      wrapper: wrapperRef,
    };
    return values;
  };

  changeToOneColumn = (wrapper) => {
    wrapper.style = 'grid-template-columns: auto';
  };

  changeToMultiColumn = (childrenNum, wrapper) => {
    wrapper.style = `grid-template-columns: repeat(${childrenNum},${
      100 / childrenNum
    }%)`;
  };

  handleResize = () => {
    const { finalWidthOfWindow, childrenNum, wrapper } = this.getVariables();

    this.setState({ windowWidth: window.innerWidth }, () => {
      if (isLowerEqual(finalWidthOfWindow, this.state.windowWidth)) {
        this.changeToOneColumn(wrapper);
      } else {
        this.changeToMultiColumn(childrenNum, wrapper);
      }
    });
  };

  /* Render */
  render() {
    return (
      <div className="contactUs-wrapper" ref={this.wrapperRef}>
        <ContactWay />
        <ContactWay
          iconSemanticUI="phone volume icon"
          header="Zadzwoń do nas na infolinię"
          content={{
            main: 'Masz pytanie?',
            secondary:
              'Nasi fachowcy czekają na Twoje pytania codziennie od 10:00 do 21:00',
          }}
          communication={{ way: 'tel', resource: '+48 666 66 66 66 66' }}
        />
      </div>
    );
  }
}

export default ContactUs;
