const questionBank = [
  // JavaScript
  {
    q: "Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    q: "Which symbol is used for comments in JavaScript?",
    options: ["//", "<!-- -->", "#", "**"],
    answer: "//"
  },
  {
    q: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: "const"
  },
  {
    q: "Which JavaScript method selects an element by ID?",
    options: [
      "querySelectorAll()",
      "getElementsByClassName()",
      "getElementById()",
      "getElementsByTagName()"
    ],
    answer: "getElementById()"
  },

  // HTML
  {
    q: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    q: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>"
  },
  {
    q: "Which HTML tag is used to include JavaScript?",
    options: ["<js>", "<javascript>", "<script>", "<code>"],
    answer: "<script>"
  },

  // CSS
  {
    q: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Style Sheet",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    q: "Which CSS property controls text size?",
    options: ["font-size", "text-style", "text-size", "font-style"],
    answer: "font-size"
  },
  {
    q: "Which CSS layout is best for one-dimensional layouts?",
    options: ["Grid", "Flexbox", "Float", "Position"],
    answer: "Flexbox"
  },

  // Web Basics
  {
    q: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Method",
      "Digital Output Mode",
      "Document Order Model"
    ],
    answer: "Document Object Model"
  },
  {
    q: "Which HTTP method is used to send data to a server?",
    options: ["GET", "POST", "FETCH", "PUSH"],
    answer: "POST"
  }
];

// Shuffle questions dynamically
let questions = questionBank.sort(() => Math.random() - 0.5);

let index = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;
  optionsEl.innerHTML = "";

  const current = questions[index];
  questionEl.textContent = current.q;

  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(btn, current.answer);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(button, correct) {
  if (answered) return;
  answered = true;
  nextBtn.disabled = false;

  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    }
  });

  if (button.textContent !== correct) {
    button.classList.add("wrong");
  } else {
    score++;
  }
}

nextBtn.onclick = () => {
  index++;
  if (index < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `Score: ${score} / ${questions.length}`;
}

function restartQuiz() {
  index = 0;
  score = 0;
  questions = questionBank.sort(() => Math.random() - 0.5);
  quizEl.classList.remove("hidden");
  resultEl.classList.add("hidden");
  loadQuestion();
}

loadQuestion();
