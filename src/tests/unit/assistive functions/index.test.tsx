import {
  validateEmail,
  validateCommonTextInput,
  validateSurname,
} from '../../../assistive functions';

describe('assistive functions', () => {
  describe('validateEmail', () => {
    test('should return false, if provided email is valid, otherwise returns true.', () => {
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

  describe('validateCommonTextInput', () => {
    test('should return false, if provided input data contain at least one item, which is one from range "a-ż", additionally first item can be uppercase, otherwise returns true.', () => {
      const inputsTrue = [
        'aW',
        'WWW',
        'WaaaW',
        'WaaWaaW',
        '416841',
        41241,
        '!@#$%^&*()_+=-',
        'Kamd42719',
        'Kam421dask',
        'Jdah#@',
        'J@$fa',
      ];
      const inputsFalse = ['a', 'A', 'aaaa', 'Wa', 'Sample'];

      inputsTrue.forEach((input) => {
        const returnedValue = validateCommonTextInput(input);
        expect(returnedValue).toBe(true);
      });

      inputsFalse.forEach((input) => {
        const returnedValue = validateCommonTextInput(input);
        expect(returnedValue).toBe(false);
      });
    });
  });

  describe('validateSurname', () => {
    describe('validateComplexSurname', () => {
      test('should return false, if a given surname is validated positively, otherwise returns true', () => {
        const surnamesFalse = [
          'Żogło-Kamil',
          "d'Rogers",
          'Żogło Żogło',
          'Żogło',
        ];
        const surnamesTrue = [
          'żogło-',
          'Żogło-',
          "Zfs'",
          '432 432',
          '#$& $@#',
          'Kamil @@$',
          'Ka41 Kam',
          "4'Kam",
          'Zogło-42',
          'Żogło-#^',
          'ŻogJo-Kam',
        ];

        surnamesTrue.forEach((input) => {
          const returnedValue = validateSurname(input);
          expect(returnedValue).toBe(true);
        });

        surnamesFalse.forEach((input) => {
          const returnedValue = validateSurname(input);
          expect(returnedValue).toBe(false);
        });
      });
    });
  });
});
