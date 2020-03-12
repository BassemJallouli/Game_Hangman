var _this; // _this points to this  
// _ signifies that it's something temporary and should be kept private
var maxChances = 7;
// declaration for form, input, word, chances and previousGuesses
var gameController = {
    form: document.querySelector('form'),
    // The Document method querySelector() returns the first Element 
    //within the document that matches the specified selector
    input: document.querySelector('[name="guess"]'),
    word: document.querySelector('.word'),
    chances: document.querySelector('.chances'),
    previousGuesses: document.querySelector('.previous-guesses')
}

function Hangman() {
    // description of properties
    this.runGame = true;
    this.words = [
        'happy',
        'smile',
        'react',
        'software',
        'angular'
    ];
    this.word = '';
    this.displayString = '';
    this.chances = maxChances;
    this.previousGuesses = [];

    // declaration for methods
    this.run = function () {
        this.setup();
        _this = this;
        //We can add the event listener to the form instead fo the button because the button is type="submit"
        gameController.form.addEventListener('submit', this.guessLetter);
    };

    this.setup = function () {
        //Reset the game back to a starting position
        gameController.previousGuesses.innerHTML = '';
        this.previousGuesses = [];
        this.chances = maxChances;
        this.displayString = '';
        //Get a new word
        var i = Math.floor(Math.random() * this.words.length);//The floor() method rounds a number DOWNWARDS to the nearest integer, and returns the result.
        this.word = this.words[i];

        //How do we display enough empty spaces
        for (var i = 0; i < this.word.length; i++) this.displayString += '_';//for loops do not need {} braces IF we only have one line of code inside the loop. "this.dislayString += '_';" is actually INSIDE this loop.

        //get our values to show on screen
        gameController.word.textContent = this.displayString;
        gameController.chances.textContent = this.chances;
        //get our values to show in console
        console.log(this.word);
    };

    this.guessLetter = function (event) {
        event.preventDefault();
        //Check if the guessed letter is in the word
        if (_this.word.includes(gameController.input.value)) {
            //Update the display string (showing the letters)
            for (var i = 0; i < _this.word.length; i++) {
                //loop through each letter in our word, one-by-one
                var currentChar = _this.word.substr(i, 1);
                //If the current character matches what we have guessed
                if (currentChar === gameController.input.value) {

                    _this.displayString = //Slice the pieces that we need using .slice() https://www.w3schools.com/jsref/jsref_slice_array.asp
                        _this.displayString.slice(0, i) + //is grabbing all the underscores BEFORE our matched character
                        currentChar + //Concatenating in our current character which matches with our word.
                        _this.displayString.slice(i + 1, _this.displayString.length);//is grabbing all the underscores AFTER our matched character

                    //We still have to output our code to the browser
                    gameController.word.textContent = _this.displayString;
                }
            }

            //has the word been completely solved?
            if (!gameController.word.textContent.includes('_')) {
                //Win!
                _this.win();
            }
        } else {
            //Letter is not in word
            //Burn one chance
            _this.chances--;
            //Update user interface
            gameController.chances.textContent = _this.chances;

            //Check for game over
            if ( _this.chances == 0 ){
                _this.lose();
            }
        }
        //Reset the input
        gameController.input.value = '';
    };

    // declaration of win
    this.win = function () {
        if ( confirm('Perfect, you win! Play again :)') ) {
            this.setup();
        }
    };

    // declaration of lose
    this.lose = function () {
        if ( confirm('Sorry, you lose! Play again :)') ) {
            this.setup();
        }
    };
};


// run of function for Hangman
var game = new Hangman();
game.run();