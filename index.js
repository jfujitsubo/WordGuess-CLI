var Word = require('./word.js');
var inquirer = require('inquirer');

var words = ["Goku", "Piccolo", "Vegeta", "Jiren", "Krillin", "Yamcha"];

var wordAnswer = new Word(words[Math.floor(Math.random()* words.length)]);

wordAnswer.letterGen();
var remainingGuesses = 15;
var currentGuesses = [];

console.log("HELLO! This is the Dragonball Universe Guessing Game" + "\nguess the name of the Dragonball Character to win!");

function gameEnd(result) {
    if(result === 'win') {
        console.log("Wow you won!");
        console.log("you guessed " + wordAnswer.wordAnswer.toUpperCase()); 
    } else {
        console.log("You lost :(");
        console.log("The correct answer was: " + wordAnswer.wordAnswer);

    };

    wordAnswer.letterGen()
    remainingGuesses = 15;
    currentGuesses = [];

    inquirer.prompt([{
        message: "Play again?",
        name: "confirm",
        type: "confirm",
    }]).then(function(response){
        if(response.confirm) {
            console.log("Starting new game..");
            gameStart();
        } else {
            console.log("Try again next time!");
            return;
        }
    });
};


function gameStart() {
    inquirer.prompt([{
        name: "guess",
        prefix: '',
        message: "\nWord: " + wordAnswer.update() + "\nGuesses remaining: " + remainingGuesses + "\nCurrent guesses: " + (currentGuesses) +
        "\n" + "Guess a letter:"
    }]).then(function(data) {

        if(data.guess === "") {
            console.log("Please enter a letter");
            return gameStart();
        } else if (data.guess.length > 1) {
            console.log("Please guess 1 letter at a time");
            return gameStart();
        } else if (currentGuesses.includes(data.guess)) {
            console.log("Please guess a letter you haven't guessed yet");
            return gameStart();
        }

        if(!wordAnswer.wordAnswer.includes(data.guess)) {
            remainingGuesses--;
        }

        currentGuesses.push(data.guess);

        for(var i = 0; i < wordAnswer.letters.length; i++) {
            wordAnswer.letters[i].check(data.guess);
        };

        if(wordAnswer.update().toLowerCase() == wordAnswer.wordAnswer.toLowerCase()) {
            gameEnd('win');
            return;
        }

        if(remainingGuesses == 0) {
            gameEnd('loss')
            return;
        }
        gameStart();
    });
}

gameStart();