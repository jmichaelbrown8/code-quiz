// variables to store data

// store the questions in an array of objects
const questions = [
    {
        question: "Choose the first alphabetical letter.",
        choices: ["A", "B", "C", "D"],
        answer: "A"
    },
    {
        question: "Choose the first alphabetical letter.",
        choices: ["A", "B", "C", "D"],
        answer: "A"
    },
    {
        question: "Choose the first alphabetical letter.",
        choices: ["A", "B", "C", "D"],
        answer: "A"
    },
    {
        question: "Choose the first alphabetical letter.",
        choices: ["A", "B", "C", "D"],
        answer: "A"
    }
];

// which question the user is on
var questionIndex = 0;

// time left
var timeLeft = 0;
var intervalId;

// score
var score = 0;

// scoreboard (in local storage)

// nav toggle (to switch between game and scoreboard)
const navToggleEl = document.querySelector("#nav-toggle");

// time left
const timeLeftEl = document.querySelector("#time-left");

// score
const scoreEl = document.querySelector("#score");

// main element (where the messages and questions will display)
const mainEl = document.querySelector("main");

/**
 * Creates and displays the welcome message and the start button in the main element.
 */
function displayStartMessage() {

}

/**
 * Displays the current time in the time left element.
 */
function countdownAndDisplayTimeLeft() {
    timeLeft--;
    if (timeLeft <= 0) {
        timeLeftEl.textContent = "BUZZZZ!!!!";
        return endGame();
    }
    return displayTimeLeft();
}

/**
 * Displays the current time in the time left element.
 */
function displayTimeLeft() {
    timeLeftEl.textContent = "Time left: " + timeLeft + "s";
}

/**
 * Starts the game by displaying the first question and starting the countdown timer.
 */
function startGame() {
    timeLeft = 6;
    displayTimeLeft();
    startTimer();
    
}

/**
 * Ends the game by clearing the timer, and displaying the final message.
 */
function endGame() {
    stopTimer();
}

/**
 * Start the countdown timer.
 */
function startTimer() {
    if (intervalId === undefined) {
        intervalId = setInterval(countdownAndDisplayTimeLeft, 1000);
    } else {
        console.warn("Already have a timer running with id: " + intervalId);
    }
    
}

/**
 * Stop the countdown timer. 
 */
function stopTimer() {
    clearInterval(intervalId);
    intervalId = undefined;
}

// What needs to be on the page:
// welcome and description
// start button
// space for questions to be displayed
// time left
// score
// link to scoreboard / back to game

// What actions does my code need to do
// start quiz (remove welcome/description, display first question, start timer)

// answer a question (tallies score, decrements time if wrong, moves to next question until the end)

// end game () (called when timer runs out, or final question is answered)

