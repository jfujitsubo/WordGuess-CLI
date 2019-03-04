var Letter = require('./letter.js');

function Word(wordAnswer) {
    this.wordAnswer = wordAnswer;
    this.letters = [];

    this.letterGen = function() {
        var wordAnswerArr = this.wordAnswer.split('');
        for(var i = 0; i < wordAnswerArr.length; i++) {
            var newLetter = new Letter(wordAnswerArr[i]);
            this.letters.push(newLetter);
        }
    }

    this.userGuess = function(guess) {
        for(var i = 0; i < this.letters.length; i++) {
            this.letters[i].check(guess);
        }
    }

    this.update = function() {
        var string = '';
        for(var i = 0; i < this.letters.length; i++) {
            string += this.letters[i].returnChar();
        }
        return string;
    }
}

module.exports = Word;