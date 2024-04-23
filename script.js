const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const restartButton = document.getElementById('restart');
const questions = [
    {
        "question": "What does HTML stand for?",
        "options": ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"],
        "answer": "Hyper Text Markup Language"
    },
    {
        "question": "Which CSS property is used to change the text color of an element?",
        "options": ["text-color", "color", "font-color", "text-style"],
        "answer": "color"
    },
    {
        "question": "Which symbol is used to access jQuery?",
        "options": ["$", "&", "%", "*"],
        "answer": "$"
    },
    {
        "question": "Which keyword is used to declare a variable in JavaScript?",
        "options": ["var", "int", "string", "variable"],
        "answer": "var"
    },
    {
        "question": "What does JSX stand for?",
        "options": ["JavaScript XML", "JavaScript XSL", "XML JavaScript", "XSL JavaScript"],
        "answer": "JavaScript XML"
    },
    {
        "question": "What is the output of the following code? console.log(1 + '2' + '2');",
        "options": ["122", "5", "14", "Undefined"],
        "answer": "122"
    },
    {
        "question": "Which lifecycle method is used in React to fetch data from an API?",
        "options": ["componentDidMount", "componentWillMount", "componentDidUpdate", "componentWillUnmount"],
        "answer": "componentDidMount"
    },
    {
        "question": "What is the purpose of the 'use strict' directive in JavaScript?",
        "options": ["To enable strict mode", "To disable strict mode", "To indicate a comment", "To use in regular expressions"],
        "answer": "To enable strict mode"
    },
    {
        "question": "Which of the following is NOT a valid CSS unit?",
        "options": ["px", "em", "rem", "vm"],
        "answer": "vm"
    },
    {
        "question": "Which method is used to change the state in React?",
        "options": ["setState", "changeState", "updateState", "stateChange"],
        "answer": "setState"
    }
];

let currentQuestion = 0;
let score = 0;


function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// Display question and start timer
function loadQuestion() {
    const question = questions[currentQuestion];
    const optionsHtml = question.options.map((option, index) => `
        <label>
            <input type="radio" name="question${currentQuestion}" value="${option}">
            ${option}
        </label>
    `).join('');

    quizContainer.innerHTML = `
        <h2>${question.question}</h2>
        <form id="questionForm">${optionsHtml}</form>
        <p>Time Left: <span id="timer">60</span> seconds</p>
    `;

    startTimer(60); 
}

// Start countdown timer
function startTimer(duration) {
    let timer = duration;
    const timerElement = document.getElementById('timer');
    const intervalId = setInterval(() => {
        timerElement.textContent = timer;
        if (--timer < 0) {
            clearInterval(intervalId);
            checkAnswer(); 
        }
    }, 1000);
}


function checkAnswer() {
    const answer = document.querySelector(`input[name="question${currentQuestion}"]:checked`);
    if (!answer) return;

    const isCorrect = answer.value === questions[currentQuestion].answer;

    if (isCorrect) {
        score++;
    }

    const feedback = isCorrect ? '<p style="color: green;">Correct!</p>' : `<p style="color: red;">Incorrect. The correct answer is ${questions[currentQuestion].answer}</p>`;
    quizContainer.innerHTML += feedback;

    // Disable radio buttons after answer
    const radios = document.querySelectorAll(`input[name="question${currentQuestion}"]`);
    radios.forEach(radio => {
        radio.disabled = true;
    });

    // Move to next question or show result
    currentQuestion++;
    if (currentQuestion < questions.length) {
        setTimeout(loadQuestion, 2000); 
    } else {
        setTimeout(showResult, 2000); 
    }
}


function showResult() {
    const scorePercentage = (score / questions.length) * 100;
    let resultHtml = `<h2>Your Score: ${score}/${questions.length}</h2>`;

    if (scorePercentage > 70) {
        resultHtml += `<p>Congratulations! You scored above 70%.</p>`;
    }

    quizContainer.innerHTML += resultHtml;
    submitButton.disabled = true;
    restartButton.style.display = 'block';
}


function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    submitButton.disabled = false;
    restartButton.style.display = 'none';
}

submitButton.addEventListener('click', checkAnswer);
restartButton.addEventListener('click', restartQuiz);



shuffleQuestions();
loadQuestion();
