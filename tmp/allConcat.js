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
