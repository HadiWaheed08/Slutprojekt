//Skapar frågor samt val och rätta svaret
const quizData = [
  {
    frågor: "Vilken av följande är newtons första lag?",
    vals: [
      "a) Gravitationslagen",
      "b) Kraft och motkraft",
      "c) Kraftlagen",
      "d) Tröghetslagen",
    ],
    correct: "d) Tröghetslagen",
  },
  {
    frågor: "Vilken av följande är newtons tredje lag?",
    vals: [
      "a) Tröghetslagen",
      "b) Kraft och motkraft",
      "c) Termodynamik",
      "d) Gravitationslagen",
    ],
    correct: "b) Kraft och motkraft",
  },
  {
    frågor: "Vilken av följande är newtons andra lag?",
    vals: [
      "a) Kraft och motkraft",
      "b) Tröghetslagen",
      "c) Kraftlagen",
      "d) Termodynamik",
    ],
    correct: "c) Kraftlagen",
  },
  {
    frågor: "Vilken av följande är newtons nollte lag?",
    vals: [
      "a) Termodynamik",
      "b) Kraftlagen",
      "c) Kraft och motkraft",
      "d) Gravitationslagen ",
    ],
    correct: "a) Termodynamik",
  },
];

//Skapar variabeler
let currentFrågor = 0;
let score = 0;
let timeLeft = 30;
let timer;

// Skapar variabel och kopplar den till en objekt med id
const frågor = document.getElementById("frågor");
const valbtn = document.getElementById("val");
const nextBtn = document.getElementById("nextBtn");
const resultat = document.getElementById("resultat");
const time = document.getElementById("tid");
const StartaOmBtn = document.getElementById("StartaOmBtn");
const quizContainer = document.getElementById("quiz");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackResult = document.getElementById("feedbackResult");

/* En feedback system för att skydda mot XSS*/
feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let message = document.getElementById("message").value;

  /* rensar inputten */
  username = RensaInput(username);
  message = RensaInput(message);

  /* visar meddelandet */
  feedbackResult.textContent = `Tack ${username}! Din feedback har skickats.`;

  feedbackForm.reset();
});
/* Rensar alla dessa tecken */
function RensaInput(input) {
  return input.replace(/[<>@£${`|*'~¨^}]/g, "");
}

//Startar quiz
function startQuiz() {
  showFrågor();
  startTimer();
  nextBtn.style.display = "none";
  resultat.classList.add("hidden");
}
/* Visar svar */
function showFrågor() {
  const f = quizData[currentFrågor];
  frågor.textContent = f.frågor;

  valbtn.innerHTML = "";
  f.vals.forEach((val) => {
    const btn = document.createElement("button");
    btn.textContent = val;
    btn.addEventListener("click", () => selectAnswer(btn, f.correct));
    valbtn.appendChild(btn);
  });
}
/* kontrollerar ifall svaret är rätt */
function selectAnswer(button, correctAnswer) {
  const selected = button.textContent;

  Array.from(valbtn.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.style.borderColor = "#00FF00";
    }
    if (btn.textContent === selected && selected !== correctAnswer) {
      btn.style.borderColor = "#FF0000";
    }
  });
  /* Ökar poängen om det rätt svar */
  if (selected === correctAnswer) {
    score++;
  }
  nextBtn.style.display = "inline-block";
}
/* Nästa fråga */
function nextFråga() {
  currentFrågor++;
  if (currentFrågor < quizData.length) {
    showFrågor();
    nextBtn.style.display = "none";
  } else {
    endQuiz();
  }
}
/* timer */
function startTimer() {
  time.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    time.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}
/* Vid slutet av quiz */
function endQuiz() {
  clearInterval(timer);
  quizContainer.classList.add("hidden");
  resultat.textContent = `Du fick ${score} ut av ${quizData.length}!`;
  resultat.classList.remove("hidden");
  StartaOmBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", nextFråga);

/* Om man vill starta om quizzet */
StartaOmBtn.addEventListener("click", () => {
  currentFrågor = 0;
  score = 0;
  timeLeft = 30;
  resultat.classList.add("hidden");
  StartaOmBtn.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  time.textContent = timeLeft;
  startQuiz();
});
/* startar quizzet direkt */
startQuiz();
