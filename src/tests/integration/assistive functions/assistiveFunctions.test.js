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
  validateEmail,
} from '../../../assistive functions';

describe('assistive functions', () => {
  let testDiv, obj, divFromDOM;

  describe('addClasses', () => {
    beforeEach(() => {
      testDiv = <div>Test</div>;
      obj = render(testDiv);
      divFromDOM = obj.getByText('Test');
    });

    test('should add given classes to a given DOM element, if classes and DOM element were passed as arguments.', () => {
      addClasses(divFromDOM, ['test-class-one', 'test-class-two']);
      expect(divFromDOM.classList).toContain('test-class-one');
      expect(divFromDOM.classList).toContain('test-class-two');
    });

    test('should add a given class to a given DOM element, if a class and DOM element were passed as arguments.', () => {
      addClasses(divFromDOM, 'test-class');

      expect(divFromDOM.classList).toContain('test-class');
    });
  });

  describe('removeClasses', () => {
    beforeEach(() => {
      testDiv = <div className='class1 class2 class3'>Test</div>;
      obj = render(testDiv);
      divFromDOM = obj.getByText('Test');
    });

    test('should remove given classes from a given DOM element, if classes and DOM element were passed as arguments.', () => {
      removeClasses(divFromDOM, ['class1', 'class2', 'class3']);

      expect(divFromDOM.classList).not.toContain('class1');
      expect(divFromDOM.classList).not.toContain('class2');
      expect(divFromDOM.classList).not.toContain('class3');
    });

    test('should remove a given class from a given DOM element, if a class and DOM element were passed as arguments.', () => {
      removeClasses(divFromDOM, 'class1');

      expect(divFromDOM.classList).not.toContain('class1');
      expect(divFromDOM.classList).toContain('class2');
      expect(divFromDOM.classList).toContain('class3');
    });
  });

  describe('modifyClasses', () => {
    beforeEach(() => {
      testDiv = <div className='class1 class2'>Test</div>;
      obj = render(testDiv);
      divFromDOM = obj.getByText('Test');
    });

    test('should add and/or remove given classes from a given DOM element, if classes and DOM element were passed as arguments.', () => {
      modifyClasses(divFromDOM, ['class1', 'class2'], ['class3']);

      expect(divFromDOM.classList).not.toContain('class1');
      expect(divFromDOM.classList).not.toContain('class2');
      expect(divFromDOM.classList).toContain('class3');
    });

    test('should add and/or remove a given class from a given DOM element, if a class and DOM element were passed as arguments.', () => {
      modifyClasses(divFromDOM, 'class1', 'class3');

      expect(divFromDOM.classList).not.toContain('class1');
      expect(divFromDOM.classList).toContain('class2');
      expect(divFromDOM.classList).toContain('class3');
    });
  });

  describe('startLoading', () => {
    beforeEach(() => {
      testDiv = <div className='invisible class1 class2'>Test</div>;
      obj = render(testDiv);
      divFromDOM = obj.getByText('Test');
    });

    test('should remove "invisible" class and add "visible" class and add and/or remove given classes from a given DOM element, if classes and DOM element were passed as arguments.', () => {
      startLoading(divFromDOM, ['class1', 'class2'], ['class3']);

      expect(divFromDOM.classList).not.toContain('invisible');
      expect(divFromDOM.classList).not.toContain('class1');
      expect(divFromDOM.classList).not.toContain('class2');
      expect(divFromDOM.classList).toContain('class3');
      expect(divFromDOM.classList).toContain('visible');
    });

    test('should remove "invisible" class and add "visible" class to a given DOM element, if only DOM element was passed as an argument.', () => {
      startLoading(divFromDOM);

      expect(divFromDOM.classList).not.toContain('invisible');
      expect(divFromDOM.classList).toContain('class1');
      expect(divFromDOM.classList).toContain('class2');
      expect(divFromDOM.classList).toContain('visible');
    });
  });

  describe('finishLoading', () => {
    beforeEach(() => {
      testDiv = <div className='invisible class1 class2'>Test</div>;
      obj = render(testDiv);
      divFromDOM = obj.getByText('Test');
    });

    test('should remove "invisible" class and add "visible" class from a given DOM element, if DOM element was passed as argument.', () => {
      finishLoading(divFromDOM);

      expect(divFromDOM.classList).not.toContain('visible');
      expect(divFromDOM.classList).toContain('class1');
      expect(divFromDOM.classList).toContain('class2');
      expect(divFromDOM.classList).toContain('invisible');
    });
  });

  describe('disableElement', () => {
    beforeEach(() => {
      testDiv = <div className='class1 class2'>Test</div>;
      obj = render(testDiv);
      divFromDOM = obj.getByText('Test');
    });

    test('should set a "disable" attribute to "true" and additionally add/remove classes for a given DOM element, if such element and classes were passed as arguments.', () => {
      disableElement(divFromDOM, ['class3'], ['class1', 'class2']);

      expect(divFromDOM.attributes.disabled.value).toBe('true');
      expect(divFromDOM.classList).not.toContain('class1');
      expect(divFromDOM.classList).not.toContain('class2');
      expect(divFromDOM.classList).toContain('class3');
    });

    test('should set a "disable" attribute to "true" for a given DOM element, if such element was passed as an argument.', () => {
      disableElement(divFromDOM);

      expect(divFromDOM.attributes.disabled.value).toBe('true');
      expect(divFromDOM.classList).toContain('class1');
      expect(divFromDOM.classList).toContain('class2');
    });
  });

  describe('enableElement', () => {
    beforeEach(() => {
      testDiv = <div className='class1 class2'>Test</div>;
      obj = render(testDiv);
      divFromDOM = obj.getByText('Test');
    });

    test('should remove a "disable" attribute with "true" value and additionally add/remove classes for a given DOM element, if such element and classes were passed as arguments.', () => {
      enableElement(divFromDOM, ['class3'], ['class1', 'class2']);

      expect(divFromDOM.attributes.disabled).toBe(undefined);
      expect(divFromDOM.classList).not.toContain('class1');
      expect(divFromDOM.classList).not.toContain('class2');
      expect(divFromDOM.classList).toContain('class3');
    });

    test('should remove a "disable" attribute with "true" value for a given DOM element, if such element was passed as an argument.', () => {
      enableElement(divFromDOM);

      expect(divFromDOM.attributes.disabled).toBe(undefined);
      expect(divFromDOM.classList).toContain('class1');
      expect(divFromDOM.classList).toContain('class2');
    });
  });

  describe('validateEmail', () => {
    test('should return false, if provided email is valid, otherwise true.', () => {
      const emails = [
        '@wp.pl',
        'test@',
        'test.pl',
        'test@pl',
        'test@wp',
        'test@wp.p',
        'test@wp.plplplplplplp',
        'test',
      ];

      emails.forEach((email) => {
        const returnedValue = validateEmail(email);
        expect(returnedValue).toBe(true);
      });
    });
  });
});
