import React from 'react';
import { render } from '@testing-library/react';

import {
  addClasses,
  removeClasses,
  modifyClasses,
  startLoading,
  finishLoading,
  disableElement,
  enableElement,
} from '../../../assistive functions';

describe('assistive functions', () => {
  let testDiv, obj, divFromDOM, className;
  let testClasses;
  let classesObj = {
    visible: 'visible',
    invisible: 'invisible',
    undef: undefined,
  };

  beforeEach(() => {
    className = '';
    testClasses = ['test-class-one', 'test-class-two', 'test-class-three'];
  });

  describe('addClasses', () => {
    beforeEach(() => {
      testDiv = <div>Test</div>;
      obj = render(testDiv);
      divFromDOM = obj.getByText('Test');
    });

    test('should add given classes to a given DOM element, if classes and DOM element were passed as arguments.', () => {
      let classes = [...testClasses].splice(0, 2);
      addClasses(divFromDOM, classes);
      expect(divFromDOM.classList).toContain(classes[0]);
      expect(divFromDOM.classList).toContain(classes[1]);
    });

    test('should add a given class to a given DOM element, if a class and DOM element were passed as arguments.', () => {
      addClasses(divFromDOM, testClasses[0]);

      expect(divFromDOM.classList).toContain(testClasses[0]);
    });
  });

  describe('removeClasses', () => {
    beforeEach(() => {
      testClasses.forEach((testClass) => {
        className += ` ${testClass}`;
      });
      testDiv = <div className={className}>Test</div>;

      obj = render(testDiv);
      divFromDOM = obj.getByText('Test');
    });

    test('should remove given classes from a given DOM element, if classes and DOM element were passed as arguments.', () => {
      removeClasses(divFromDOM, testClasses);

      expect(divFromDOM.classList).not.toContain(testClasses[0]);
      expect(divFromDOM.classList).not.toContain(testClasses[1]);
      expect(divFromDOM.classList).not.toContain(testClasses[2]);
    });

    test('should remove a given class from a given DOM element, if a class and DOM element were passed as arguments.', () => {
      removeClasses(divFromDOM, testClasses[0]);

      expect(divFromDOM.classList).not.toContain(testClasses[0]);
      expect(divFromDOM.classList).toContain(testClasses[1]);
      expect(divFromDOM.classList).toContain(testClasses[2]);
    });
  });

  describe('modifyClasses', () => {
    beforeEach(() => {
      className = `${testClasses[0]} ${testClasses[1]}`;
      testDiv = <div className={className}>Test</div>;
      obj = render(testDiv);
      divFromDOM = obj.getByText('Test');
    });

    test('should add and/or remove given classes from a given DOM element, if classes and DOM element were passed as arguments.', () => {
      let classes = [...testClasses].splice(0, 2);
      modifyClasses(divFromDOM, classes, [testClasses[2]]);

      expect(divFromDOM.classList).not.toContain(testClasses[0]);
      expect(divFromDOM.classList).not.toContain(testClasses[1]);
      expect(divFromDOM.classList).toContain(testClasses[2]);
    });

    test('should add and/or remove a given class from a given DOM element, if a class and DOM element were passed as arguments.', () => {
      modifyClasses(divFromDOM, testClasses[0], testClasses[2]);

      expect(divFromDOM.classList).not.toContain(testClasses[0]);
      expect(divFromDOM.classList).toContain(testClasses[1]);
      expect(divFromDOM.classList).toContain(testClasses[2]);
    });
  });

  describe('startLoading', () => {
    beforeEach(() => {
      className = `${classesObj.invisible} ${testClasses[0]} ${testClasses[1]}`;
      testDiv = <div className={className}>Test</div>;
      obj = render(testDiv);
      divFromDOM = obj.getByText('Test');
    });

    test('should remove "invisible" class and add "visible" class and add and/or remove given classes from a given DOM element, if classes and DOM element were passed as arguments.', () => {
      let classes = [...testClasses].splice(0, 2);
      startLoading(divFromDOM, classes, [testClasses[2]]);

      expect(divFromDOM.classList).not.toContain(classesObj.invisible);
      expect(divFromDOM.classList).not.toContain(testClasses[0]);
      expect(divFromDOM.classList).not.toContain(testClasses[1]);
      expect(divFromDOM.classList).toContain(testClasses[2]);
      expect(divFromDOM.classList).toContain(classesObj.visible);
    });

    test('should remove "invisible" class and add "visible" class to a given DOM element, if only DOM element was passed as an argument.', () => {
      startLoading(divFromDOM);

      expect(divFromDOM.classList).not.toContain(classesObj.invisible);
      expect(divFromDOM.classList).toContain(testClasses[0]);
      expect(divFromDOM.classList).toContain(testClasses[1]);
      expect(divFromDOM.classList).toContain(classesObj.visible);
    });
  });

  describe('finishLoading', () => {
    beforeEach(() => {
      className = `${classesObj.invisible} ${testClasses[0]} ${testClasses[1]}`;
      testDiv = <div className={className}>Test</div>;
      obj = render(testDiv);
      divFromDOM = obj.getByText('Test');
    });

    test('should remove "invisible" class and add "visible" class from a given DOM element, if DOM element was passed as argument.', () => {
      finishLoading(divFromDOM);

      expect(divFromDOM.classList).not.toContain(classesObj.visible);
      expect(divFromDOM.classList).toContain(testClasses[0]);
      expect(divFromDOM.classList).toContain(testClasses[1]);
      expect(divFromDOM.classList).toContain(classesObj.invisible);
    });
  });

  describe('disableElement', () => {
    beforeEach(() => {
      className = `${testClasses[0]} ${testClasses[1]}`;
      testDiv = <div className={className}>Test</div>;
      obj = render(testDiv);
      divFromDOM = obj.getByText('Test');
    });

    test('should set a "disable" attribute to "true" and additionally add/remove classes for a given DOM element, if such element and classes were passed as arguments.', () => {
      let classes = [...testClasses].splice(0, 2);
      disableElement(divFromDOM, testClasses[2], classes);

      expect(divFromDOM.attributes.disabled.value).toBe('true');
      expect(divFromDOM.classList).not.toContain(testClasses[0]);
      expect(divFromDOM.classList).not.toContain(testClasses[1]);
      expect(divFromDOM.classList).toContain(testClasses[2]);
    });

    test('should set a "disable" attribute to "true" for a given DOM element, if such element was passed as an argument.', () => {
      disableElement(divFromDOM);

      expect(divFromDOM.attributes.disabled.value).toBe('true');
      expect(divFromDOM.classList).toContain(testClasses[0]);
      expect(divFromDOM.classList).toContain(testClasses[1]);
    });
  });

  describe('enableElement', () => {
    beforeEach(() => {
      className = `${testClasses[0]} ${testClasses[1]}`;
      testDiv = <div className={className}>Test</div>;
      obj = render(testDiv);
      divFromDOM = obj.getByText('Test');
    });

    test('should remove a "disable" attribute with "true" value and additionally add/remove classes for a given DOM element, if such element and classes were passed as arguments.', () => {
      let classes = [...testClasses].splice(0, 2);
      enableElement(divFromDOM, testClasses[2], classes);

      expect(divFromDOM.attributes.disabled).toBe(classesObj.undef);
      expect(divFromDOM.classList).not.toContain(testClasses[0]);
      expect(divFromDOM.classList).not.toContain(testClasses[1]);
      expect(divFromDOM.classList).toContain(testClasses[2]);
    });

    test('should remove a "disable" attribute with "true" value for a given DOM element, if such element was passed as an argument.', () => {
      enableElement(divFromDOM);

      expect(divFromDOM.attributes.disabled).toBe(classesObj.undef);
      expect(divFromDOM.classList).toContain(testClasses[0]);
      expect(divFromDOM.classList).toContain(testClasses[1]);
    });
  });
});
