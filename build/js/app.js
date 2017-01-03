(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
var Game = require('./../js/simon.js').gameModule;

function displaySequence(colorArray) {
  var i = 0;

  function highlite(color) {
    if (i < colorArray.length) {

      $("#"+color).addClass(color + "-highlite");
      var removeHighliteId = setTimeout(function(){$("#"+color).removeClass(color + "-highlite");}, 550);
      i += 1;
      console.log("test. i="+i+ "," + colorArray.length);
    } else {
      window.clearInterval(highliteId);
    }
  }

  var highliteId = window.setInterval(
    function(){
      highlite(colorArray[i]);
    }, 700);
}

$(document).ready(function(){
  var newGame;

  $("#start").click(function(event){
    event.preventDefault();
    $("#message").empty();
    newGame = new Game();
    newGame.generateColor();
    displaySequence(newGame.gameArray);
  });


  $("#red, #blue, #green, #yellow").click(function(){
    var guessColor = $(this).attr("value");
    newGame.guessArray.push(guessColor);
    var correct = newGame.compareGuess();
    if (!correct) {
      $("#message").html("<h3>GAME OVER</h3>");
    } else if (correct && newGame.doneGuessing()){
        newGame.guessArray = [];
        newGame.generateColor();
        displaySequence(newGame.gameArray);
    }
  });

});

},{"./../js/simon.js":1}]},{},[2]);
