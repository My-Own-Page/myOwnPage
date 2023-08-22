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
  "긍정적인 생각으로 시작해보세요!" : "./오늘의운세이미지폴더/Thesun.jpg",
    "좋은 일이 곧 찾아올 거예요!" : "./오늘의운세이미지폴더/Thesun.jpg",
    "운동을 마음만 먹고 안하면 안돼요!" : "./오늘의운세이미지폴더/Thesun.jpg",
    "어떤 일에든 셈을 정확히 해야 해요." : "./오늘의운세이미지폴더/Thesun.jpg",
    "마음이 무거운 일이 생기니 속상해요." : "./오늘의운세이미지폴더/Thesun.jpg",
    "안 된다고 포기하는 순간에 될 거예요." : "./오늘의운세이미지폴더/Thesun.jpg",
    "지겹다고 포기하지 말고 끈기를 가져요." : "./오늘의운세이미지폴더/Thesun.jpg", 
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

//메인으로 가기 버튼이 나오도록 구현 
retryButton.addEventListener('click', () => {
  randomTextElement.textContent = '';
  randomButton.style.display = 'block';
  resultDiv.style.display = 'none';
  goquiz.style.display = 'block';
  const sectionElement = document.querySelector('.section');
  sectionElement.style.backgroundImage = `url(./오늘의운세이미지폴더/taroMain.jpg)`; 
  choosequiz.style.display = 'none'; 
  goquiz.style.display = 'block'; 
});




// 상식 퀴즈 풀기 자바스크립트 부분
const choosequiz = document.querySelector('.section .choosequiz');
const quizText = document.querySelector('.section .choosequiz .showQuesion .question');
const oButton = document.querySelector('.section .choosequiz .answer .o');
const xButton = document.querySelector('.section .choosequiz .answer .x');
const yourScore = document.querySelector('.section .choosequiz .score .yourScore');
const retry = document.querySelector('.section .choosequiz .retrybutton');

//상식 퀴즈 풀라가기 버튼 누르면 상식 퀴즈 문제 나오도록 버튼 구현
goquiz.addEventListener('click',() => {
choosequiz.style.display = 'block';
goquiz.style.display = 'none';
randomButton.style.display = 'none';
})

const quizQuestions = [
  { question: "물의 화학식은 H2O입니다.", answer: "o" },
  { question: "태양은 지구 주위를 돕니다.", answer: "o" },
  { question: "56x56/56은 56입니다.", answer: "o" },
  { question: "한국의 수도는 서울입니다.", answer: "o" },
  { question: "심청이 아버지 심봉사의 이름은 심학규입니다.", answer: "o" },
  { question: "호주의 수도는 캔버라 입니다.", answer: "o" },
  { question: "국가의 3요소는 국민,영토,주권입니다.", answer: "o" },
  { question: "풀코스 마라톤의 총 길이는 42.196km입니다.", answer: "x" },
  { question: "색의 3원색은 빨강,파랑,검정입니다.", answer: "x" },
  { question: "서유기 일행들의 최종 목적지는 인도입니다.", answer: "o" },
  { question: "굼뱅이는 매미의 애벌레입니다.", answer: "o" },
  { question: "중국의 전통 의상은 유카타입니다.", answer: "x" },
  { question: "제주도의 삼다도(三多島)는 여자,돌,술 입니다.", answer: "x" },
  { question: "물가가 지속적으로 올라가는 현상은 인플레이션이다.", answer: "o" },
  { question: "유럽을 통일한 마케도니아의 왕은 히틀러 입니다.", answer: "x" },
  { question: "꿩의 새끼는 꺼병이 입니다.", answer: "o" },
  { question: "말은 엎드려서 잠을 잡니다.", answer: "x" },
  { question: "고등어의 새끼는 고도리 입니다.", answer: "o" },
  { question: "골치가 아프다에서 골치는 '뇌'입니다.", answer: "o" },
  { question: "大韓民國의 最南端에 있는 섬은 馬羅島입니다.  ", answer: "o" },
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
  retryButton.style.display = 'none';
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
  retryButton.style.display ='block';
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

retry.addEventListener('click',() => {
  randomTextElement.textContent = '';
  randomButton.style.display = 'block';
  resultDiv.style.display = 'none';
  goquiz.style.display = 'block';
  const sectionElement = document.querySelector('.section');
  sectionElement.style.backgroundImage = `url(./오늘의운세이미지폴더/taroMain.jpg)`; 
  choosequiz.style.display = 'none'; 
  goquiz.style.display = 'block'; 
});

