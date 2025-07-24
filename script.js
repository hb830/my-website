const questions = [
  {
    question: "What does CPU stand for?",
    answers: [
      { text: "Central Processing Unit", correct: true },
      { text: "Computer Personal Unit", correct: false },
      { text: "Central Performance Unit", correct: false },
      { text: "Control Processing Unit", correct: false },
    ],
  },
  {
    question: "Which language is used for web apps?",
    answers: [
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
      { text: "Java", correct: false },
    ],
  },
  {
    question: "Which company created the iPhone?",
    answers: [
      { text: "Google", correct: false },
      { text: "Apple", correct: true },
      { text: "Microsoft", correct: false },
      { text: "Samsung", correct: false },
    ],
  },
];

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;

function startGame() {
  currentQuestionIndex = 0;
  nextButton.style.display = "none";
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  resetState();
  questionElement.innerText = question.question;

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  setStatusClass(document.body, correct);

  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
  } else {
    showEndGame();
  }
});

function showEndGame() {
  resetState();
  questionElement.innerText = "You completed the quiz!";
  nextButton.innerText = "Restart";
  nextButton.style.display = "block";
  nextButton.onclick = () => {
    nextButton.innerText = "Next";
    startGame();
  };
}

startGame();
