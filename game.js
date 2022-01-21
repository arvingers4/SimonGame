var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var pressed = false;

//first time keydown.
$(document).keydown(function(){
  if(!pressed){
    nextSequence();
    pressed = true;
  }
})


  $(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    makesound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level "+ level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  makesound(randomChosenColor);

}
function makesound(key) {

  $("#" + key).click(function() {

    var sound = new Audio("sounds/" + key + ".mp3");
    return sound.play();
  })
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+ currentColor).removeClass("pressed");
  },100);
}


function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel]=== gamePattern[currentLevel]){
    //set a variable to count how many colors the user got right.
    var count = 0;
    //loop through the two arrays, and compare if EACH ONE of the values is the same the other
    for(var i = 0; i< gamePattern.length; i++){
      if(gamePattern[i] === userClickedPattern[i]){
        count++;
      }
    }
    //Only if the count is the same number as gamePattern length.
    //meaning each one of the colors must be right then its success

    if(count === gamePattern.length){
      console.log("success");
      setTimeout(function (){
        nextSequence();
      },1000);
    }
    //this will trigger wrong sound and trigger Game over
} else{
  console.log("wrong");

  var wrongAudio = new Audio("sounds/wrong.mp3");
  wrongAudio.play();

  $("body").addClass("game-over");
  setTimeout(function (){
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();

}
}

function startOver(){
  level = 0;
  gamePattern = [];
  pressed = false;
}
