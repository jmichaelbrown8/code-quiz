/** Array of question objects */
const questions = [
    {
        question: "How do we access the element we are listening from?",
        choices: ["event.target", "event.currentTarget", "event.element", "event.currentNode"],
        answer: "event.currentTarget"
    },
    {
        question: 'Which method will select the div element with id="card"?',
        choices: ['document.getElementById("card")', 'document.querySelector("div#card")', 'document.querySelectorAll("#card")[0]', "All of the above"],
        answer: "All of the above"
    },
    {
        question: 'Which selector will have the highest specificity?',
        choices: ["div.class1.class2", "div", ".class1.class2", "#id"],
        answer: "#id"
    },
    {
        question: 'Which array method adds items to the front?',
        choices: ["push", "pop", "shift", "unshift"],
        answer: "unshift"
    },
    {
        question: 'Which array method allows you to add an item to a specific index?',
        choices: ["slice", "splice", "concat", "insert"],
        answer: "splice"
    },
    {
        question: 'What is the outermost part of the box model?',
        choices: ["border", "padding", "outline", "margin"],
        answer: "margin"
    },
];

/** Which question the user is on */
var questionIndex = 0;

/** Time left on the user's current quiz. */
var timeLeft = 0;
var intervalId;

/** The user's current score. */
var score = 0;

/** High scores object. */
var highScores;

/** nav toggle (to switch between game and high scores) */
const navToggleEl = document.querySelector("#nav-toggle");
navToggleEl.addEventListener("click", displayHighScores);

/** time left */
const timeLeftEl = document.querySelector("#time-left");

/** score board */
const scoreBoardEl = document.querySelector("#score-board");

/** main element (where the messages and questions will display) */
const mainEl = document.querySelector("main");

/** This function registers the actions for each button created on the page, so only one event listener is required. */
function handleClick(event) {
    let el = event.target;
    if (el.tagName !== "BUTTON") {
        return;
    }

    switch (el.innerText) {
        case "Start Quiz!":
            startQuiz();
            break;
        case "Submit":
            addScore();
            displayHighScores(event);
            break;
        case "Go Back":
            displayStartMessage();
            break;
        case "Clear High Scores":
            clearHighScores();
            break;
        default: // answer buttons
            testAnswer(event);
    }
}

mainEl.addEventListener("click", handleClick)

/** Creates and displays the welcome message and the start button in the main element. */
function displayStartMessage() {
    clearMain();
    score = 0
    timeLeft = 0;

    navToggleEl.style.visibility = "visible";

    // h1 and p's to describe quiz, button to start quiz
    let h1El = document.createElement("h1");
    h1El.innerText = "Coding Quiz Challenge";
    
    let p1El = document.createElement("p");
    p1El.innerText = "This is a timed, multiple choice quiz to test your knowledge of some HTML, CSS, and JS details.";
    
    let p2El = document.createElement("p");
    p2El.innerText = "You will have 60 seconds to answer 10 multiple choice questions, but be careful--incorrect answers will subtract 10 seconds from your time!";
    
    let buttonEl = document.createElement("button");
    buttonEl.innerText = "Start Quiz!";

    mainEl.append(h1El);
    mainEl.appendChild(p1El);
    mainEl.appendChild(p2El);
    mainEl.appendChild(buttonEl);

}

/** Clears the main element, to get it ready for next content. */
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
    let choice = event.target;
    let value = choice.value;
    let answer = questions[questionIndex].answer;

    if (value === answer) {
        // correct
        score++;
        displayEphemeralMessage("Correct!", "rebeccapurple");
    }  else {
        // incorrect
        timeLeft -= 10;
        displayEphemeralMessage("Incorrect...");
    }

    displayScoreBoard();
    displayTimeLeft();
    displayNextQuestion();
}

/** Displays a message that lasts a few seconds and fades out */
function displayEphemeralMessage(text, color) {
    // If the user is quick, clear out any elements that are still on the page
    let oldEphemeralMessageEl = document.querySelector(".ephemeral-message");
    if (oldEphemeralMessageEl) {
        oldEphemeralMessageEl.remove();
    }

    let ephemeralMessageEl = document.createElement("div");
    ephemeralMessageEl.className = "ephemeral-message";
    ephemeralMessageEl.textContent = text;
    mainEl.after(ephemeralMessageEl);

    if (color) {
        ephemeralMessageEl.style.color = color;
    }
    
    // sets the opacity to 0 after 1 second (to start the 0.5-second transition in style.css)
    setTimeout(function() {
        ephemeralMessageEl.style.opacity = 0;
    }, 1000);

    // Removes the element after 2 seconds
    setTimeout(function() {
        ephemeralMessageEl.remove();
    }, 2000)
}

/** Displays the quiz end message with results, and allows a user to store their name for the scoreboard. */
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
    buttonEl.type = "submit";
    formEl.appendChild(buttonEl);
}

/** Displays the current time in the time left element. */
function countdownAndDisplayTimeLeft() {
    timeLeft--;
    if (timeLeft <= 0) {
        timeLeftEl.textContent = "BUZZZZ!!!!";
        return endQuiz();
    }
    return displayTimeLeft();
}

/** Displays the current time in the time left element. */
function displayTimeLeft() {
    timeLeftEl.textContent = "Time left: " + timeLeft + "s";
}

/** Dislays the current scoreboard in the scoreboard element. */
function displayScoreBoard() {
    scoreBoardEl.textContent = "Correct: " + score;
}

/** Starts the quiz by displaying the first question and starting the countdown timer. */
function startQuiz() {
    if (intervalId === undefined) {
        timeLeft = 60;
        score = 0;
        questionIndex = 0;
        displayTimeLeft();
        displayScoreBoard();
        startTimer();
        displayNextQuestion(true);
    } else {
        console.warn("Already have a timer running with id: " + intervalId);
    }

}

/** Ends the game by clearing the timer, and displaying the final message. */
function endQuiz() {
    stopTimer();
    displayEndMessage();
}

/** Starts the countdown timer. */
function startTimer() {
    intervalId = setInterval(countdownAndDisplayTimeLeft, 1000);
}

/** Stops the countdown timer. */
function stopTimer() {
    clearInterval(intervalId);
    intervalId = undefined;
}

/** Adds a score, sorted in the list, and stores the high score list in localStorage. */
function addScore(e) {
    getHighScores();
    let nameEl = document.querySelector("input");
    let name = nameEl.value;
    let thisScore = {
        name: name,
        score: score,
        timeLeft: timeLeft
    };

    let added = false;

    // Add into list at right place
    for (var i = 0; i < highScores.length; i++) {
        let listScoreItem = highScores[i];
        if (thisScore.score > listScoreItem.score) {
            highScores.splice(i, 0, thisScore);
            added = true;
            break;
        } else if (thisScore.score === listScoreItem.score && thisScore.timeLeft >= listScoreItem.timeLeft) {
            highScores.splice(i, 0, thisScore);
            added = true;
            break;
        }
    }

    // If you made it here, you haven't added the score to the list yet because it's the lowest score. Just stick it on the end.
    if (!added) {
        highScores.push(thisScore);
    }
    setHighScores(); // stores in localStorage
}

/** Displays the high score list. */
function displayHighScores(e) {
    if (typeof e === "object") {
        e.preventDefault(); // needed to stop the warning about form not being connected
    }

    getHighScores();
    clearMain();

    navToggleEl.style.visibility = "hidden";

    let h1El = document.createElement("h1");
    h1El.textContent = "High Scores";
    mainEl.appendChild(h1El);

    let olEl = document.createElement("ol");
    mainEl.appendChild(olEl);

    for (var i = 0; i < highScores.length; i++) {
        let thisScore = highScores[i];
        let liEl = document.createElement("li");

        let nameSpanEl = document.createElement("span");
        nameSpanEl.innerText = (i + 1) + ". " + thisScore.name;
        liEl.appendChild(nameSpanEl);

        let scoreSpanEl = document.createElement("span");
        scoreSpanEl.innerText = Math.floor(thisScore.score / questions.length * 100) + "%";
        scoreSpanEl.title = "With " + thisScore.timeLeft + "s remaining";
        liEl.appendChild(scoreSpanEl);

        olEl.appendChild(liEl);
    }
    
    // buttons to go back to start a new quiz or clear the high scores
    let buttonDivEl = document.createElement("div");
    buttonDivEl.style = "width: 100%; display: flex; justify-content: space-between;";

    let goBackButtonEl = document.createElement("button");
    goBackButtonEl.textContent = "Go Back";
    buttonDivEl.appendChild(goBackButtonEl);

    let clearButtonEl = document.createElement("button");
    clearButtonEl.textContent = "Clear High Scores";
    buttonDivEl.appendChild(clearButtonEl);

    mainEl.appendChild(buttonDivEl);

}   

/** Gets the high score list from localStorage, stores in the global highScores variable. */
function getHighScores() {
    highScores = JSON.parse(localStorage.getItem('highScores'));

    if (highScores === null) {
        highScores = [];
    }
}

/** Sets highScores into localstorage */
function setHighScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

/** Clears localStorage (and the high scores along with it). */
function clearHighScores() {
    localStorage.clear();
    displayHighScores();
}

displayStartMessage();
displayScoreBoard();
displayTimeLeft();