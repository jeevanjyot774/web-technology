const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: 3
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 2
    },
    {
        question: "Who wrote the National Anthem of India?",
        options: ["Bankim Chandra", "Rabindranath Tagore", "Gandhi", "Nehru"],
        answer: 2
    },
    {
        question: "Which gas do plants absorb?",
        options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon Dioxide"],
        answer: 4
    },
    {
        question: "Which is the largest ocean?",
        options: ["Indian", "Pacific", "Atlantic", "Arctic"],
        answer: 2
    },
    {
        question: "What is H2O?",
        options: ["Salt", "Hydrogen", "Water", "Acid"],
        answer: 3
    },
    {
        question: "Who invented the telephone?",
        options: ["Newton", "Edison", "Graham Bell", "Einstein"],
        answer: 3
    },
    {
        question: "Which country hosts the Olympics?",
        options: ["Same country", "Only USA", "Different countries", "Only Europe"],
        answer: 3
    },
    {
        question: "How many days are in a leap year?",
        options: ["364", "365", "366", "367"],
        answer: 3
    },
    {
        question: "Which is the longest river?",
        options: ["Amazon", "Ganga", "Nile", "Yamuna"],
        answer: 1
    }
];

let quizQuestions = [...questions].sort(() => Math.random() - 0.5);

let currentIndex = 0;
let selectedAnswers = Array(10).fill(null);

let timeLeft = 10;
let timerInterval;

const questionTag = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option-btn");
const currentQuestionNumber = document.getElementById("current");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

let timerDisplay = document.createElement("p");
timerDisplay.style.textAlign = "center";
timerDisplay.style.fontSize = "18px";
timerDisplay.style.marginBottom = "10px";
timerDisplay.style.color = "red";
timerDisplay.id = "timer";
document.querySelector(".question-card").prepend(timerDisplay);

function loadQuestion() {
    let q = quizQuestions[currentIndex];

    questionTag.innerText = q.question;
    currentQuestionNumber.innerText = currentIndex + 1;

    optionButtons.forEach((btn, i) => {
        btn.innerText = `${String.fromCharCode(65 + i)}. ${q.options[i]}`;
        btn.classList.remove("selected");

        if (selectedAnswers[currentIndex] === i) {
            btn.classList.add("selected");
        }
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.style.display = currentIndex === 9 ? "none" : "inline-block";
    document.getElementById("submit-btn").style.display =
        currentIndex === 9 ? "inline-block" : "none";

    resetTimer();
}

function selectOption(btn) {
    optionButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    selectedAnswers[currentIndex] = [...optionButtons].indexOf(btn);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 10;
    timerDisplay.innerText = ` Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = ` Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            autoNext();
        }
    }, 1000);
}

function autoNext() {
    clearInterval(timerInterval);
    if (currentIndex < 9) {
        currentIndex++;
        loadQuestion();
    } else {
        submitQuiz();
    }
}


function nextQuestion() {
    if (currentIndex < 9) {
        currentIndex++;
        loadQuestion();
    }
}

function previousQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        loadQuestion();
    }
}

function calculateScore() {
    submitQuiz();
}

function submitQuiz() {
    clearInterval(timerInterval);

    let score = 0;

    selectedAnswers.forEach((ans, index) => {
        if (ans !== null && ans === (quizQuestions[index].answer - 1)) {
            score++;
        }
    });

    localStorage.setItem("quizScore", score);
    localStorage.setItem("quizAnswered", "true");
    window.location.href = "results.html";
}
document.getElementById("submit-btn").addEventListener("click", submitQuiz);
loadQuestion();
