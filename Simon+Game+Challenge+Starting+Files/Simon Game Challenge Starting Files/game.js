// Array of button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store the game pattern
var gamePattern = [];
// Array to store the user's clicked pattern
var userClickedPattern = [];

// Game state variables
var started = false;
var level = 0;

// Event listener for keypress to start the game
$(document).keypress(function () {
  if (!started) {
    // Update the level title and start the next sequence
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Event listener for button clicks
$(".btn").click(function () {
  // Get the ID of the clicked button
  var userChosenColour = $(this).attr("id");
  // Add the chosen color to the user's pattern
  userClickedPattern.push(userChosenColour);

  // Play sound and animate the button press
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check the user's answer
  checkAnswer(userClickedPattern.length - 1);
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
  // Check if the user's answer matches the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // Check if the user has completed the sequence
    if (userClickedPattern.length === gamePattern.length) {
      // Move to the next sequence after a delay
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Play the wrong sound and show game over animation
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    // Update the level title to show game over message
    $("#level-title").text("Game Over, Press Any Key to Restart");
    // Restart the game
    startOver();
  }
}

// Function to generate the next sequence
function nextSequence() {
  // Reset the user's clicked pattern
  userClickedPattern = [];

  // Increment the level and update the level title
  level++;
  $("#level-title").text("Level " + level);

  // Generate a random color and add it to the game pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Animate the chosen button and play its sound
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// Function to play sound for a given color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to animate button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
