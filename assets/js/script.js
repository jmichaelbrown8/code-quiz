// variables to store data

// store the questions in an array of objects
/*
    {
        question: "Choose the first alphabetical letter.",
        choices: ["A", "B", "C", "D"],
        answer: "A"
    }
*/
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

// score
var score = 0;

// scoreboard (in local storage)


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

