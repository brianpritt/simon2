function Game(){
    this.guessArray = [];
    this.gameArray = [];
    this.guessCount = 0;
}

Game.prototype.generateColor = function () {
  //Returns random color from colors
  var colors = ["red", "blue", "yellow", "green"];

  var generateIndex = Math.floor(Math.random() * 4);

  this.gameArray.push(colors[generateIndex]);
};

Game.prototype.compareGuess = function(){
  //check if guess is correct, return true; not correct, return false;
  if (this.guessArray[this.guessCount] === this.gameArray[this.guessCount]) {
    this.guessCount += 1;
    return true;
  } else {
    this.guessCount = 0;
    return false;
  }
};

Game.prototype.doneGuessing = function() {
  //check if user has guessed the correct number of times
  if (this.guessCount === this.gameArray.length){
    this.guessCount = 0;
    return true;
  } else {
    return false;
  }
};

exports.gameModule = Game;
