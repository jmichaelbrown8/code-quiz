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
        choices: ["E", "F", "G", "H"],
        answer: "E"
    }
];

// which question the user is on
var questionIndex = 0;

// time left
var timeLeft = 0;
var intervalId;

// score
var score = 0;

// high scores (in local storage)

// nav toggle (to switch between game and high scores)
const navToggleEl = document.querySelector("#nav-toggle");

// time left
const timeLeftEl = document.querySelector("#time-left");

// score board
const scoreBoardEl = document.querySelector("#score-board");

// main element (where the messages and questions will display)
const mainEl = document.querySelector("main");

/* TODO: writing a single click event will prevent me from attaching a ton of event listeners
function handleClick(event) {
    let el = event.target;
    console.log(event);
    console.log(el);
}
mainEl.addEventListener("click", handleClick, true)
*/

/**
 * Creates and displays the welcome message and the start button in the main element.
 */
function displayStartMessage() {
    clearMain();

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
 * Clears the main element, to get it ready for next content.
 */
function clearMain() {
    mainEl.innerText = "";
}

/**
 * Displays the next Question.
 * @param {boolean} start Defines whether this is the first question or not.
 * @returns void
 */
function displayNextQuestion(start) {
    if (start) {
        questionIndex = 0;
    } else {
        questionIndex++;
    }
    // check if was last question, and end quiz if so
    if (questionIndex >= questions.length) {
        return endQuiz();
    }
    // else clear main, then display the queestion and answer buttons
    clearMain();

    let h1El = document.createElement('h1');
    h1El.textContent = (questionIndex + 1) + ") " + questions[questionIndex].question;
    mainEl.appendChild(h1El);
    
    let choices = questions[questionIndex].choices;
    for (var i = 0; i < choices.length; i++) {
        let choice = choices[i];
        let choiceButtonEl = document.createElement("button");
        choiceButtonEl.textContent = choice;
        choiceButtonEl.value = choice;
        choiceButtonEl.addEventListener("click", testAnswer);
        mainEl.appendChild(choiceButtonEl);
    }

}

/**
 * This is the click event for the quiz answer buttons. It takes the value 
 * and tests it against the current question's answer. If correct, it adds
 * a point to the score. If incorrect, it removes time from the countdown.
 * It then displays a brief message to the user and displays the next question.
 * @param {object} event The click event from the button clicked.
 */
function testAnswer(event) {
    let choice = event.currentTarget;
    let value = choice.value;
    let answer = questions[questionIndex].answer;

    if (value === answer) {
        // correct
        score++;
    }  else {
        // incorrect
        timeLeft -= 5;
    }

    displayScoreBoard();
    displayTimeLeft();
    displayNextQuestion();
}

/**
 * Displays the quiz end message with results, allows a user to store their name 
 * for the scoreboard
 */
function displayEndMessage() {
    clearMain();

    // h1 and p's to describe quiz, button to start quiz
    let h1El = document.createElement("h1");
    h1El.textContent = "All done!";
    mainEl.appendChild(h1El);

    let pEl = document.createElement("p");
    pEl.textContent = "You answered " + score + " correct out of " + questions.length + " questions, with " + timeLeft + " seconds remaining.";
    mainEl.appendChild(pEl);

    let formEl = document.createElement("form");
    mainEl.appendChild(formEl);

    let labelEl = document.createElement("label");
    labelEl.textContent = "Your name";
    labelEl.setAttribute("for", "name");
    formEl.appendChild(labelEl);

    let inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "name");
    formEl.appendChild(inputEl);

    let buttonEl = document.createElement("button");
    buttonEl.textContent = "Submit";
    formEl.appendChild(buttonEl);
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
 * Dislays the current scoreboard in the scoreboard element.
 */
function displayScoreBoard() {
    scoreBoardEl.textContent = "Correct: " + score;
}

/**
 * Starts the game by displaying the first question and starting the countdown timer.
 */
function startQuiz() {
    if (intervalId === undefined) {
        timeLeft = 60;
        questionIndex = 0;
        displayTimeLeft();
        startTimer();
        displayNextQuestion(true);
    } else {
        console.warn("Already have a timer running with id: " + intervalId);
    }

}

/**
 * Ends the game by clearing the timer, and displaying the final message.
 */
function endQuiz() {
    stopTimer();
    displayEndMessage();
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

displayStartMessage();
displayScoreBoard();
displayTimeLeft();