class Hangman {
  constructor(_canvas) {
    if (!_canvas) {
      throw new Error(`invalid canvas provided`);
    }

    //Declaring variables and creating the guesses array
    this.canvas = _canvas;
    this.ctx = this.canvas.getContext(`2d`);
    this.word = "";
    this.isOver = false;
    this.didWin = false;
    this.guesses = [];
    this.incorrectGuesses = 0;
  }

  /**
   * This function takes a difficulty string as a parameter
   * would use the Fetch API to get a random word from the Hangman
   * To get an easy word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=easy
   * To get an medium word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=medium
   * To get an hard word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=hard
   * The results is a json object that looks like this:
   *    { word: "book" }
   * */
  getRandomWord(difficulty) {
    return fetch(
      `https://hangman-micro-service.herokuapp.com?difficulty=${difficulty}`
    )
      .then((r) => r.json())
      .then((r) => r.word);
  }

  /**
   *
   * @param {string} difficulty a difficulty string to be passed to the getRandomWord Function
   * @param {function} next callback function to be called after a word is reveived from the API.
   */
  start(difficulty, next) {
    // get word and set it to the class's this.word
    const returnedWord = this.getRandomWord(difficulty);
    this.word = returnedWord;

    // clear canvas
    this.clearCanvas();

    // draw base
    this.drawBase();

    // reset this.guesses to empty array
    this.guesses = [];

    // reset this.isOver to false
    this.isOver = false;

    // reset this.didWin to false
    this.didWin = false;

    // call next after API retrieval
    next();
  }

  /**
   *
   * @param {string} letter the guessed letter.
   */
  guess(letter) {
    const guessInput = document.getElementById(`guessInput`)
    // Check if nothing was provided and throw an error if so
    // Check for invalid cases (numbers, symbols, ...) throw an error if it is
    // Check if more than one letter was provided. throw an error if it is.
    try {
      if (!letter) throw "You didn't provide a guess.";
      if (!/^[a-zA-Z]*$/.test(letter))  throw "Letters only please.";
      if (letter.length > 1) throw "Only one letter please.";

      // if it's a letter, convert it to lower case for consistency.
      letter = letter.toString().toLowerCase();

      // check if this.guesses includes the letter. Throw an error if it has been guessed already.
      let i;
      let doesExist =  false;
      for (i = 0; i < this.guesses.length; i++) {
        if (this.guesses[i] === letter) {
          doesExist = true;
          alert("You've already guessed this letter!");
        }
      }

      // Add the new letter to the guesses array if it doesn't already exist.
      // This IF statement prevents dupe entries into the array
      if (!this.guesses.includes(letter)) {
        this.guesses.push(letter);
      }

      // check if the word includes the guessed letter:
      if (this.word.toString().includes(letter)) {
        //    if it's is call checkWin()
        //    if it's not call onWrongGuess()
        this.checkWin();
      } else {
        this.onWrongGuess();
      }
    } catch (error) {
      console.error(error);
      alert(error);
      guessInput.focus();
    }
  }

  checkWin() {
    // using the word and the guesses array, figure out how many remaining unknowns.
    let remainingLetters = this.word.length;

    // if zero, set both didWin, and isOver to true
    if (remainingLetters === 0) {
      this.isOver = true;
      this.didWin = true;
    }
  }

  /**
   * Based on the number of wrong guesses, this function would determine and call the appropriate drawing function
   * drawHead, drawBody, drawRightArm, drawLeftArm, drawRightLeg, or drawLeftLeg.
   * if the number wrong guesses is 6, then also set isOver to true and didWin to false.
   */
  onWrongGuess() {
    switch (this.incorrectGuesses) {
      case 0:
        this.drawHead();
        break;
      case 1:
        this.drawBody();
        break;
      case 2:
        this.drawLeftArm();
        break;
      case 3:
        this.drawRightArm();
        break;
      case 4:
        this.drawLeftLeg();
        break;
      case 5:
        this.drawRightLeg();
        this.isOver = true;
        this.didWin = false;
        break;
    }
    this.incorrectGuesses++;
  }

  /**
   * This function will return a string of the word placeholder
   * It will have underscores in the correct number and places of the unguessed letters.
   * i.e.: if the word is BOOK, and the letter O has been guessed, this would return _ O O _
   */
  getWordHolderText() {
    let disguisedWord = "The Word: "
    let wordArray = this.word.toString().split();

    for (let i = 0; i < wordArray.length; i++) {
      wordArray[i] = "_";
    }

    disguisedWord += wordArray.join(" ");

    return disguisedWord;
  }

  /**
   * This function returns a string of all the previous guesses, seperated by a comma
   * This would return something that looks like
   * (Guesses: A, B, C)
   * Hint: use the Array.prototype.join method.
   */
  getGuessesText() {
    return ``;
  }

  /**
   * Clears the canvas
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the hangman base
   */
  drawBase() {
    this.ctx.fillRect(95, 10, 150, 10); // Top
    this.ctx.fillRect(245, 10, 10, 50); // Noose
    this.ctx.fillRect(95, 10, 10, 400); // Main beam
    this.ctx.fillRect(10, 410, 175, 10); // Base
  }

  drawHead() {}

  drawBody() {}

  drawLeftArm() {}

  drawRightArm() {}

  drawLeftLeg() {}

  drawRightLeg() {}
}
