let add = document.getElementById('add');
let subtract = document.getElementById('subtract');
let multiply = document.getElementById('multiply');
let divide = document.getElementById('divide');
let expressionDiv = document.querySelector('.expression');
let answers = document.querySelectorAll('li');
let scoreElement = document.querySelector('.currentScore');
let problemNumber = document.querySelector('.currentProblem');
let startButton = document.getElementById('btnStart');
let i = 0;
let problemAnswer = 0;
let operators = [];

/**
 * Utility function to generate a random number based on max
 * @param {number} max
 */
function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
/**
* Utility function to shuffle the items in an array
* @param {object} arr
*/
function shuffleArray(arr) {
    return arr.sort(function (a, b) { return Math.random() - 0.5 })
}
function returnNewProblem() {
    let number = getRandomNumber(operators.length);
    return `${getRandomNumber(10)} ${operators[number]} ${getRandomNumber(10)}`;
}


// displays current problem
function seeCurrentProblem() {
    let currentProblem = returnNewProblem();
    // sets problem on page
    expressionDiv.innerText = currentProblem;

    let unparsedAnswer = parseInt(currentProblem.substring(0, 1)) + currentProblem.substring(2, 3) + parseInt(currentProblem.substring(4));
    problemAnswer = eval(unparsedAnswer);
    // creates answer to problem

    // generate 3 wrong answers
    let answerArray = [problemAnswer];
    let answerArrayLength = 1;
    while (answerArrayLength < 4) {
        let x = getRandomNumber(82);
        if (x != problemAnswer) {
            answerArray.push(x);
            answerArrayLength++;
        }
    }
    shuffleArray(answerArray);
    let answersSection = document.querySelectorAll('li');
    let index = 0;
    answersSection.forEach((li) => {
        li.innerText = answerArray[index];
        index++;
    });
}

function hideMathProblems() {
    document.querySelector('.firstP').classList.add('hidden');
    document.getElementById('problem').classList.add('hidden');
    document.getElementById('answers').classList.add('hidden');
    document.getElementById('btnStartOver').classList.add('hidden');

}

function showMathProblems() {
    document.querySelector('.start').classList.add('hidden');
    document.getElementById('options').classList.add('hidden');
    document.getElementById('btnStart').classList.add('hidden');

    document.querySelector('.firstP').classList.remove('hidden');
    document.getElementById('problem').classList.remove('hidden');
    document.getElementById('answers').classList.remove('hidden');
    document.getElementById('btnStartOver').classList.remove('hidden');
}

function populateOperatorArray() {
    if (add.checked) {
        operators.push('+');
    }
    if (subtract.checked) {
        operators.push('-');
    }
    if (multiply.checked) {
        operators.push('*');
    }
    if (divide.checked) {
        operators.push('/');
    }

    if (operators.length === 0) {
        alert("Please check something!");
        location.reload();
    }
}

function makeQuiz() {
    
    seeCurrentProblem();
    answers.forEach((answer) => {
        answer.addEventListener('click', (event) => {
            if (event.target.innerText == problemAnswer) {
                scoreElement.innerText = parseInt(scoreElement.innerText) + 1;
                problemNumber.innerText = parseInt(problemNumber.innerText) + 1;
                i++;
                if (i < 10) {
                    seeCurrentProblem();
                }
                else if (i == 10) {
                    problemNumber.innerText = 10;
                    document.querySelector('.expression').classList.add('hidden');
                    document.getElementById('answers').classList.add('hidden');
                }
            } else {
                problemNumber.innerText = parseInt(problemNumber.innerText) + 1;
                i++;
                if (i < 10) {
                    seeCurrentProblem();
                }
                else if (i == 10) {
                    problemNumber.innerText = 10;
                    document.querySelector('.expression').classList.add('hidden');
                    document.getElementById('answers').classList.add('hidden');
                }
            }
        })
    });
}

function startOver() {
    btnStartOver.addEventListener('click', () => {
        location.reload();
     });
    
}

document.addEventListener('DOMContentLoaded', () => {

    hideMathProblems();
    startButton.addEventListener('click', () => {

        populateOperatorArray();
        showMathProblems();
        makeQuiz();
        startOver();
    })

});