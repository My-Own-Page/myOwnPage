//운세 랜덤 텍스트 부분
const randomTexts = [
  "오늘은 행복한 하루가 될 거예요!",
    "잘하고 있는 당신을 칭찬해요!",
    "뭐든지 할 수 있어요!",
    "긍정적인 생각으로 시작해보세요!",
    "좋은 일이 곧 찾아올 거예요!",
    "운동을 마음만 먹고 안하면 안돼요!",
    "어떤 일에든 셈을 정확히 해야 해요.",
    "마음이 무거운 일이 생기니 속상해요.",
    "안 된다고 포기하는 순간에 될 거예요.",
    "지겹다고 포기하지 말고 끈기를 가져요.",
    "아무도 내 얘기를 믿어주지 않겠어요.",
    "세상에 공짜는 없는 법이니 다시 생각해요.",
    "내 짜증을 남에게 전가하지 마세요.",
    "나를 치장하려고 낭비가 심하면 안돼요.",
    "남들이 싫어한다고 나까지 그러면 안 돼요."
];
//운세 텍스트와 이미지 매핑 부분
const textToImageMap = {
  "오늘은 행복한 하루가 될 거예요!" : "./오늘의운세이미지폴더/Thesun.jpg",
  "잘하고 있는 당신을 칭찬해요!": "./오늘의운세이미지폴더/Thesun.jpg",
  "뭐든지 할 수 있어요!": "./오늘의운세이미지폴더/Thesun.jpg",
  "긍정적인 생각으로 시작해보세요!" : "./오늘의운세이미지폴더/best.gif ",
    "좋은 일이 곧 찾아올 거예요!" : "./오늘의운세이미지폴더/Thesun.jpg",
    "운동을 마음만 먹고 안하면 안돼요!" : "./오늘의운세이미지폴더/Thesun.jpg",
    "어떤 일에든 셈을 정확히 해야 해요." : "./오늘의운세이미지폴더/Thesun.jpg",
    "마음이 무거운 일이 생기니 속상해요." : "./오늘의운세이미지폴더/Thesun.jpg",
    "안 된다고 포기하는 순간에 될 거예요." : "./오늘의운세이미지폴더/Thesun.jpg",
    "지겹다고 포기하지 말고 끈기를 가져요." : "https://png.pngtree.com/png-vector/20210326/ourmid/pngtree-sing-moon-tarot-symbol-png-image_3139433.jpg", 
    "아무도 내 얘기를 믿어주지 않겠어요." : "./오늘의운세이미지폴더/Thesun.jpg",
    "세상에 공짜는 없는 법이니 다시 생각해요." : "./오늘의운세이미지폴더/Thesun.jpg",
    "내 짜증을 남에게 전가하지 마세요." : "./오늘의운세이미지폴더/Thesun.jpg", 
    "나를 치장하려고 낭비가 심하면 안돼요." : "./오늘의운세이미지폴더/Thesun.jpg",
    "남들이 싫어한다고 나까지 그러면 안 돼요." : "./오늘의운세이미지폴더/Thesun.jpg"
};
//오늘의 운세와 퀴즈 버튼 가져온 부분 
const randomTextElement = document.querySelector('.section .lucky .text');
const randomButton = document.querySelector('.section .lucky .btn1');
const resultDiv = document.querySelector('.section .lucky .result');
const retryButton = document.querySelector('.section .lucky .btn2');
const goquiz = document.querySelector('.section .quiz .quiz1');
const chooseQuiz = document.querySelector('.section .choosequiz');
const quizText = document.querySelector('.section .choosequiz .question');
const answerButton = document.querySelector('.section .choosequiz .answer');
const oButton = document.querySelector('.section .choosequiz .answer .o' );
const xButton = document.querySelector('.section .choosequiz .answer .x' );
//퀴즈 문제 부분
const quizQuestions = [
  { question: "지구의 모양은 무엇일까요?", answer: "o" },
  { question: "물의 화학식은 H2O입니다.", answer: "o" },
  { question: "태양은 지구 주위를 돕니다.", answer: "o" },
  { question: "1+1은 3입니다.", answer: "x" },
  { question: "한국의 수도는 서울입니다.", answer: "o" },
];


randomButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * randomTexts.length);
  const randomText = randomTexts[randomIndex];
  randomTextElement.textContent = randomText;

  const imageUrl = textToImageMap[randomText];
  if (imageUrl) {
      const sectionElement = document.querySelector('.section');
      sectionElement.style.backgroundImage = `url(${imageUrl})`;
      ;
  }

  randomButton.style.display = 'none';
  resultDiv.style.display = 'block';
  goquiz.style.display='none';
});



//상식 퀴즈 풀기 자바 부분
//상식 퀴즈 버튼을 클릭하면 퀴즈가 나타나도록 구현
goquiz.addEventListener('click', () => {
  randomButton.style.display = 'none';
  resultDiv.style.display = 'none';
  goquiz.style.display = 'none';
  chooseQuiz.style.display = 'block';
  
  currentQuestionIndex = 0;
  nextQuestion();
});
//메인으로 가기 버튼이 나오도록 구현 
retryButton.addEventListener('click', () => {
  randomTextElement.textContent = '';
  randomButton.style.display = 'block';
  resultDiv.style.display = 'none';
  goquiz.style.display = 'block';
  quizText.style.display='block';
  const sectionElement = document.querySelector('.section');
  sectionElement.style.backgroundImage = '';
});
//퀴즈를 틀렸을 시 화면에 틀렸습니다. 텍스트가 뜨도록 구현

const showWrongAnswer = () => {
  quizText.textContent = "틀렸습니다.";
  oButton.style.display = 'none';
  xButton.style.display = 'none';
  retryButton.style.display = 'block';
  goquiz.style.display = 'none';
};

let currentQuestionIndex = 0;

//문제를 맞췄을 시 다음 문제로 넘어 갈 수있도록 구현
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

//문제를 전부 맞추면 게임이 끝나도록 구현 
const finishQuiz = () => {
  quizText.textContent = "퀴즈 종료";
  oButton.style.display = 'none';
  xButton.style.display = 'none';
  retryButton.style.display = 'block';
  goquiz.style.display = 'none';
};

//o버튼을 누르면 맞았을시에 다음 문제로 넘어가고 틀렸을시 게임이 종료 되도록 구현
oButton.addEventListener('click', () => {
  if (currentQuestionIndex < quizQuestions.length) {
    const answer = quizQuestions[currentQuestionIndex].answer;
    if (answer === 'o') {
      currentQuestionIndex++;
      nextQuestion();
    } else {
      showWrongAnswer();
    }
  } else {
    finishQuiz();
  }
});
//x버튼을 누르면 맞았을시에 다음 문제로 넘어가고 틀렸을시 게임이 종료 되도록 구현
xButton.addEventListener('click', () => {
  if (currentQuestionIndex < quizQuestions.length) {
    const answer = quizQuestions[currentQuestionIndex].answer;
    if (answer === 'x') {
      currentQuestionIndex++;
      nextQuestion();
    } else {
      showWrongAnswer();
    }
  } else {
    finishQuiz();
  }
});


