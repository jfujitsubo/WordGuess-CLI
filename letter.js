function Letter(char) {
    this.char = char.toUpperCase();
    this.guessedRight = false;
    this.returnChar = function() {
        if(this.guessedRight) {
            return this.char;
        } else {
            return "_";
        }
    }

    this.check = function(guess) {
        if(this.char.toLowerCase() == guess.toLowerCase()) {
            this.guessedRight = true;
        }
    }
};

module.exports = Letter;