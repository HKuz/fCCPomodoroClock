/**
 * @author Heather Kusmierz
 */

// Variable Declarations:
var input = []; // will hold break time and work time minutes
var pomodoroText = ["Flawless Victory - You Deserve a Break!", "All Your Base Are Belong to Us - Get to Work!"];
var secondsRemaining = 0;
var intervalHandle;
// Toggle continuously between work and break sessions 
// 1 is work, 0 is break, toggleCounter % 2 to flipflop
var toggleCounter = 1;
var index = 1;
// Sound variables
var soundMP3 = new Audio("https://dl.dropboxusercontent.com/s/31xn13aamvutb9m/Power-Up-KP-1879176533.mp3");
var soundWAV = new Audio("https://dl.dropboxusercontent.com/s/ip8q46m5pdzqqao/Power-Up-KP-1879176533.wav");



// Function Declarations:
function startCountdown() {
  var b = Number($("#breakTime").html());
  var w = Number($("#workTime").html());
  input[0] = b;
  input[1] = w;
  var minutes = input[index];
  var text = pomodoroText[index];
  secondsRemaining = minutes * 60;
  $("#timerText").html(text);
  $("#pause").removeClass("disabled");
  $("#timer").css("color", "green");
  // Set off the interval every second:
  intervalHandle = setInterval(tickTock, 1000);
}

function tickTock() {
  var display = $("#timer").html();
  //console.log("Display is: ", display);
  var mins = Math.floor(secondsRemaining / 60);
  var secs = secondsRemaining % 60;
  
  if (secs < 10) {
    secs = "0" + secs.toString();
  }
  
  if (secondsRemaining <= 10) {
    $("#timer").css("color", "red");
  }
  
  var message = mins.toString() + ":" + secs.toString();
  $("#timer").html(message);
  
  if (secondsRemaining === 0) {
    // Increment the counter, change index to shift from work to break, or vice versa
    toggleCounter++;
    index = toggleCounter % 2;
    // Play a sound
    soundMP3.play();
    soundWAV.play();
    // ANIMATE OR CHANGE STYLES?
    clearInterval(intervalHandle);
    intervalHandle = 0;
    startCountdown();
  }
  secondsRemaining--;
}


// Functions for jQuery button handlers
function start() {
  $(".up-down").addClass("disabled");
  if (secondsRemaining === 0) {
    // Starting a new timer on a work session
    clearInterval(intervalHandle);
    index = 1;
    startCountdown();
  } else {
    // Restart the current timer
    intervalHandle = setInterval(tickTock, 1000);
  }
}

function pause() {
  $(".up-down").removeClass("disabled");
  clearInterval(intervalHandle);
}

// Document Ready
$(function(){
  var breakTemp = Number($("#breakTime").html());
  var workTemp = Number($("#workTime").html());
  
  // Button Functionality
  $("#breakDown").on("click", function() {
    if (!$("#breakDown").hasClass("disabled")) {
      secondsRemaining = 0;
      $("#breakTime").html(function(){
        if (breakTemp === 1) {
          return 1;
        } else {
          return --breakTemp;
        }
      });
    }
  });  
  
  $("#breakUp").on("click", function() {
    if (!$("#breakUp").hasClass("disabled")) {
      secondsRemaining = 0;
      $("#breakTime").html(++breakTemp);
    }
  });
  
  $("#workDown").on("click", function() {
    if (!$("#workDown").hasClass("disabled")) {
      secondsRemaining = 0;
      $("#workTime").html(function(){
        if (workTemp === 1) {
          return 1;
        } else {
          return --workTemp;
        }
      });
    }
  });  
  
  $("#workUp").on("click", function() {
    if (!$("#workUp").hasClass("disabled")) {
      secondsRemaining = 0;
      $("#workTime").html(++workTemp);
    }
  });
  
  // Start-Pause button functionality 
  $("#start").on("click", start);  
  $("#pause").on("click", pause);
  
}); // end document $ function

