var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = []; 
var userClickedPattern = []; //to detect when any of the buttons are clicked and trigger a handler function
var started = false; //для початку гри
var level = 0;

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); //рандомні числа позиціЇ
  var randomChosenColor = buttonColors[randomNumber]; //рандомний колір
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
};

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id"); //to store the id of the button that got clicked
  userClickedPattern.push(userChosenColor); //add the contents

  $("#" + userChosenColor).fadeOut(100).fadeIn(100);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1); //after user has chosen their answer
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("succes");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key To Restart");
    startOver();
  }
};

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
};

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};
