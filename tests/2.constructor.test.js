/**
 * @jest-environment jsdom
 */
/* eslint-env browser */
const rewire = require(`rewire`);
const Hangman = rewire(`../resources/js/Hangman`).__get__(`Hangman`);

describe(`Hangman class`, function () {
  describe(`Constructor()`, function () {
    it(`should construct with valid canvas`, function () {
      expect(function () {
        const canvas = document.createElement(`canvas`);
        const game = new Hangman(canvas);
      }).not.toThrowError();
    });

    it(`should throw an error when no canvas element is provided`, function () {
      expect(function () {
        const game = new Hangman();
      }).toThrow(`invalid canvas provided`);
    });
  });
});
