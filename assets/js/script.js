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
    // h1 and p's to describe quiz, button to start quiz
    let h1El = document.createElement("h1");
    h1El.innerText = "Coding Quiz Challenge";
    
    let p1El = document.createElement("p");
    p1El.innerText = "This is a timed, multiple choice quiz to test your knowledge of some basic coding concepts.";
    
    let p2El = document.createElement("p");
    p2El.innerText = "You will have 60 seconds to answer 10 multiple choice questions, but be careful--incorrect answers will subtract 10 seconds from your score!";
    
    let buttonEl = document.createElement("button");
    buttonEl.innerText = "Start Quiz!";

    buttonEl.addEventListener("click", startQuiz);

    mainEl.append(h1El);
    mainEl.appendChild(p1El);
    mainEl.appendChild(p2El);
    mainEl.appendChild(buttonEl);

}

/**
 * Displays the current time in the time left element.
 */
function countdownAndDisplayTimeLeft() {
    timeLeft--;
    if (timeLeft <= 0) {
        timeLeftEl.textContent = "BUZZZZ!!!!";
        return endQuiz();
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
function startQuiz() {
    if (intervalId === undefined) {
        timeLeft = 6;
        displayTimeLeft();
        startTimer();
    } else {
        console.warn("Already have a timer running with id: " + intervalId);
    }
    
}

/**
 * Ends the game by clearing the timer, and displaying the final message.
 */
function endQuiz() {
    stopTimer();
}

/**
 * Start the countdown timer.
 */
function startTimer() {
    intervalId = setInterval(countdownAndDisplayTimeLeft, 1000);
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

displayStartMessage();