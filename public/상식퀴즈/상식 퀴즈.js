// 상식 퀴즈 풀기 자바스크립트 부분

const quizText = document.querySelector('.section .choosequiz .showQuesion .question');
const oButton = document.querySelector('.section .choosequiz .answer .o');
const xButton = document.querySelector('.section .choosequiz .answer .x');
const yourScore = document.querySelector('.section .choosequiz .score .yourScore');

const quizQuestions = [
  { question: "지구의 모양은 무엇일까요?", answer: "o" },
  { question: "물의 화학식은 H2O입니다.", answer: "o" },
  { question: "태양은 지구 주위를 돕니다.", answer: "o" },
  { question: "1+1은 3입니다.", answer: "x" },
  { question: "한국의 수도는 서울입니다.", answer: "o" },
];

let currentQuestionIndex = 0;
let score = 0;

const showResult = (isCorrect) => {
  if (isCorrect) {
    score++;
    yourScore.textContent = `score: ${score}`;
  } else {
    quizText.textContent = "틀렸습니다.";
  }
  oButton.style.display = 'none';
  xButton.style.display = 'none';
};

const nextQuestion = () => {
  if (currentQuestionIndex < quizQuestions.length) {
    const question = quizQuestions[currentQuestionIndex].question;
    quizText.textContent = question;
    oButton.style.display = 'block';
    xButton.style.display = 'block';
  } else {
    finishQuiz();
  }
};

const finishQuiz = () => {
  if (score === quizQuestions.length) {
    quizText.textContent = "문제를 다 맞췄습니다!";
  } else {
    quizText.textContent = "문제를 다 맞추지 못했습니다.";
  }
  oButton.style.display = 'none';
  xButton.style.display = 'none';
};

oButton.addEventListener('click', () => {
  if (currentQuestionIndex < quizQuestions.length) {
    const answer = quizQuestions[currentQuestionIndex].answer;
    if (answer === 'o') {
      currentQuestionIndex++;
      showResult(true);
      nextQuestion();
    } else {
      currentQuestionIndex++;
      showResult(false);
      finishQuiz();
    }
  }
});

xButton.addEventListener('click', () => {
  if (currentQuestionIndex < quizQuestions.length) {
    const answer = quizQuestions[currentQuestionIndex].answer;
    if (answer === 'x') {
      currentQuestionIndex++;
      showResult(true);
      nextQuestion();
    } else {
      currentQuestionIndex++;
      showResult(false);
      finishQuiz();
    }
  }
});
