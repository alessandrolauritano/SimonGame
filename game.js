var buttonColours = ["red", "blue", "green", "yellow"]; //array with colors
var gamePattern = []; //this will be filled with the new color everytime
var userClickedPattern =[];
// Random Number from 0 to 3
var level = 0;
var toggle = false;
var click = 0;
var err = 0;


  function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level ++;
    $("#level-title").html("Level " + level);
    wrong = false;
  };

function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
};

function animatePress(currentColour){

  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");  },100);
}


$(document).keypress(function(){ //toggle starts from 0, it increases everytime                    //I click, if it's the first it will execute the next sequence.
  if (toggle == false){
    nextSequence();
  } //checks if it is the first time you press the key and goes to the nextSequence only if it is
    toggle = true;
});



$(".btn").click(function(){
  var userChosenColour = this.id; // Angela does $(this).attr("id");
  click++;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(level);

  });


function checkAnswer(currentLevel){
  if (userClickedPattern[click-1]!=gamePattern[click-1]){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
    wrong = true;
    start0ver();
  }
  if (click == currentLevel && wrong == false){
    click = 0;
    userClickedPattern = [];
    setTimeout(nextSequence, 1000);
  }
}

function start0ver(){
  toggle = false;
  click = 0;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $(document).keypress(function(){ //toggle starts from 0, it increases everytime                    //I click, if it's the first it will execute the next sequence.
    if (toggle == false){
      nextSequence();
    } //checks if it is the first time you press the key and goes to the nextSequence only if it is
      toggle = true;
  });
}


// if the first array is smaller than the second then wait for it to be full before
// calling the function
