import {
  db
} from '../firebase-config.js';

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

let questions = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let email = '';
let answers = [];
let attempt = 1;

async function loadQuestions() {
  const response = await fetch('./questions.json');
  questions = await response.json();
}

loadQuestions();

const startBtn = document.getElementById('startBtn');
const submitBtn = document.getElementById('submitBtn');
const nextBtn = document.getElementById('nextBtn');
const retakeBtn = document.getElementById('retakeBtn');

startBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', submitAnswer);
nextBtn.addEventListener('click', nextQuestion);
retakeBtn.addEventListener('click', retakeQuiz);

async function startQuiz() {

  email = document.getElementById('emailInput').value;

  if (!email) {
    alert('Enter email');
    return;
  }

  const attemptsRef = collection(db, 'results');

  const q = query(
    attemptsRef,
    where('email', '==', email),
    where('quizId', '==', 'english-vocab')
  );

  const snapshot = await getDocs(q);

  attempt = snapshot.size + 1;

  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('quizScreen').style.display = 'block';

  renderQuestion();
}

function renderQuestion() {

  const q = questions[currentQuestion];

  document.getElementById('progress').innerText =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  document.getElementById('question').innerText = q.question;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';

  selectedAnswer = null;

  q.options.forEach((option, index) => {

    const btn = document.createElement('button');

    btn.innerText = option;

    btn.onclick = () => {

      selectedAnswer = index;

      document.querySelectorAll('#options button').forEach(b => {
        b.style.background = '#222';
      });

      btn.style.background = '#555';
    };

    optionsDiv.appendChild(btn);
  });

  document.getElementById('feedback').innerHTML = '';
  nextBtn.style.display = 'none';
}

function submitAnswer() {

  if (selectedAnswer === null) {
    alert('Choose an option');
    return;
  }

  const q = questions[currentQuestion];

  const correct = selectedAnswer === q.correct;

  if (correct) {
    score++;
  }

  answers.push({
    question: q.question,
    selected: selectedAnswer,
    correct: q.correct,
    isCorrect: correct
  });

  const feedback = document.getElementById('feedback');

  feedback.innerHTML = `
    <h3>${correct ? 'Correct' : 'Incorrect'}</h3>
    <p>Correct Answer: ${q.options[q.correct]}</p>
    <p>${q.note}</p>
  `;

  nextBtn.style.display = 'block';

  submitBtn.disabled = true;
}

async function nextQuestion() {

  submitBtn.disabled = false;

  currentQuestion++;

  if (currentQuestion >= questions.length) {
    await finishQuiz();
    return;
  }

  renderQuestion();
}

async function finishQuiz() {

  document.getElementById('quizScreen').style.display = 'none';
  document.getElementById('resultScreen').style.display = 'block';

  document.getElementById('finalScore').innerText =
    `${score} / ${questions.length}`;

  await addDoc(collection(db, 'results'), {
    email,
    quizId: 'english-vocab',
    score,
    total: questions.length,
    answers,
    attempt,
    createdAt: new Date().toISOString()
  });
}

function retakeQuiz() {
  location.reload();
}
