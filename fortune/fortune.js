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
  "남들이 싫어한다고 나까지 그러면 안 돼요.",
  
];
//운세 텍스트와 이미지 매핑 부분
const textToImageMap = {
  "오늘은 행복한 하루가 될 거예요!": ".",
  "잘하고 있는 당신을 칭찬해요!": ".",
  "뭐든지 할 수 있어요!": ".",
  "긍정적인 생각으로 시작해보세요!": ".",
  "좋은 일이 곧 찾아올 거예요!": ".",
  "운동을 마음만 먹고 안하면 안돼요!": ".",
  "어떤 일에든 셈을 정확히 해야 해요.": ".",
  "마음이 무거운 일이 생기니 속상해요.": ".",
  "안 된다고 포기하는 순간에 될 거예요.": ".",
  "지겹다고 포기하지 말고 끈기를 가져요.": ".",
  "아무도 내 얘기를 믿어주지 않겠어요.": ".",
  "세상에 공짜는 없는 법이니 다시 생각해요.": ".",
  "내 짜증을 남에게 전가하지 마세요.": ".",
  "나를 치장하려고 낭비가 심하면 안돼요.": ".",
  "남들이 싫어한다고 나까지 그러면 안 돼요.": "."
};
//오늘의 운세와 퀴즈 버튼 가져온 부분
const Egg = document.querySelector('.section .lucky .Egg .breakEgg');
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
  goquiz.style.display = 'none';
  Egg.style.display = 'none';
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
  Egg.style.display = 'block';
});


// ------------------------------------------------------------------------------------------//

// 상식 퀴즈 풀기 자바스크립트 부분
const choosequiz = document.querySelector('.section .choosequiz');
const quizText = document.querySelector('.section .choosequiz .showQuesion .question');
const oButton = document.querySelector('.section .choosequiz .answer .o');
const xButton = document.querySelector('.section .choosequiz .answer .x');
const yourScore = document.querySelector('.section .choosequiz .score .yourScore');
const retry = document.querySelector('.section .choosequiz .retrybutton');

//상식 퀴즈 풀러가기 버튼 누르면 상식 퀴즈 문제 나오도록 버튼 구현
goquiz.addEventListener('click', () => {
  choosequiz.style.display = 'block';
  goquiz.style.display = 'none';
  randomButton.style.display = 'none';
  currentQuestionIndex = 0;
  score = 0;
  yourScore.textContent = 'score: 0';
  quizText.textContent = '';
  oButton.style.display = 'block';
  xButton.style.display = 'block';
  retry.style.display = 'none';
  Egg.style.display = 'none';

  nextQuestion();
});

//퀴즈 문제 부분 구현
const quizQuestions = [
  { question: "물의 화학식은 H2O입니다.", answer: "o" },
  { question: "지구는 태양 주위를 돕니다.", answer: "o" },
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

//퀴즈를 맞추거나 틀렸을 시 메인으로 버튼 구현
retry.addEventListener('click', () => {
  randomTextElement.textContent = '';
  randomButton.style.display = 'block';
  resultDiv.style.display = 'none';
  goquiz.style.display = 'block';
  const sectionElement = document.querySelector('.section');
  sectionElement.style.backgroundImage = `url(./오늘의운세이미지폴더/taroMain.jpg)`;
  choosequiz.style.display = 'none';
  Egg.style.display = 'block';
});

//퀴즈를 맞추면 score가 1점씩 추가 되도록 구현
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

//퀴즈를 맞추면 다음 문제로 넘어가도록 구현
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
//퀴즈가 끝났을 때를 구현
const finishQuiz = () => {
  if (score === quizQuestions.length) {
    quizText.textContent = "문제를 다 맞췄습니다!";
  } else {
    quizText.textContent = "문제를 다 맞추지 못했습니다.";
  }
  oButton.style.display = 'none';
  xButton.style.display = 'none';
  retry.style.display = 'block';

};

//o버튼을 눌렀을때 맞았는지 틀렸는지 구현
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

//x버튼을 눌렀을때 맞았는지 틀렸는지 구현
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

//------------------------------------------------------------------------------------//
//계란 뿌시기 js 부분
//계란 클릭 ! 버튼을 클릭 했을 시 카운트가 증가 하도록 변수 생성
eggClickCount = 0;

//계란 뿌수기 버튼 가져오기
const showEgg = document.querySelector('.container1 .section .egg');
const EggMain = document.querySelector('.container1 .section .egg .eggBtn .eggClickGoMain');
const EggBtnClick = document.querySelector('.container1 .section .egg .eggBtn .eggclickBtn');
const EggScore = document.querySelector('.container1 .section .egg .eggScore .eggscore');
const EggImage = document.querySelector('.container1 .section .egg .egg1 .eggimage');
const EggImage1 = document.querySelector('.container1 .section .egg .egg1 .eggimage1');
const EggImage2 = document.querySelector('.container1 .section .egg .egg1 .eggimage2');
const EggText = document.querySelector('.container1 .section .egg .eggBtn .eggText');


//계란을 뿌수는 클릭!버튼 눌렀을때 스코어가 올라가도록 구현
EggBtnClick.addEventListener('click',()=>{
  // console.log('버튼클릭!');
  eggClickCount ++;
  EggScore.textContent =`버튼 클릭 횟수:${eggClickCount}`;
  // console.log(EggScore);
  
  //스코어가 200이 되면 사진이 변경 되도록 구현
  if(eggClickCount === 200){
    EggText.textContent = '이제 300번 남았습니다!';
    EggImage.style.display ='none';
    EggImage1.style.display ='block';
    EggImage2.style.display ='none';
    EggImage.style.backgroundRepeat = 'no-repeat';
    EggImage.style.backgroundPosition = 'center';
    EggImage.removeChild(EggImage.firstChild);
    //스코어가 500이 되면 계란이 전부 깨지면서 계란 뿌수기가 끝나도록 구현
  }if (eggClickCount === 500) {
    EggImage.style.display ='none';
    EggImage1.style.display ='none';
    EggImage2.style.display ='block';
    EggImage.style.backgroundRepeat = 'no-repeat';
    EggImage.style.backgroundPosition = 'center';
  
    EggText.textContent = '계란을 전부 부셨습니다!';
    EggBtnClick.style.display='none';
    EggMain.style.display='block';
  }
  EggImage.classList.add('shakeing');
 
  //계란 이미지를 랜덤하게 좌우로 30씩 움직 이도록 설정
  const shakeIntensity = 30;
  EggImage.style.transform = `rotate(${Math.random() * shakeIntensity - shakeIntensity / 2}deg)`;
  setTimeout(() => {
    EggImage.style.transform = 'rotate(0deg)';
  }, 100);
  const shakeIntensity1 = 30;
  EggImage1.style.transform = `rotate(${Math.random() * shakeIntensity1 - shakeIntensity1 / 2}deg)`;
  setTimeout(() => {
    EggImage1.style.transform = 'rotate(0deg)';
  }, 100);
});
//메인 화면 계란 뿌수기 버튼 눌렀을때 이벤트
Egg.addEventListener('click', () => {
  randomButton.style.display = "none";
  goquiz.style.display = 'none';
  Egg.style.display = 'none';
  EggMain.style.display = 'none';
  showEgg.style.display = 'block';
  EggBtnClick.disabled = false;
  eggClickCount = 0;
  EggScore.textContent = '버튼 클릭 횟수: 0';
  EggText.textContent = '계란을 500번 뿌수세요!';
  EggText.style.display='block';
  EggScore.style.display = 'block';
  EggBtnClick.style.display='block';
  EggImage.style.display ='block';
  EggImage1.style.display ='none';
  EggImage2.style.display ='none';
});


//메인으로 버튼 눌렀을때 이벤트

EggMain.addEventListener('click',()=>{
  randomButton.style.display ='block';
  goquiz.style.display='block';
  Egg.style.display = 'block';
  EggText.style.display = 'none';
  EggScore.style.display ='none';
  showEgg.style.display = 'none';
  EggBtnClick.disabled = false;
  eggClickCount = 0; 
  EggScore.textContent = '버튼 클릭 횟수: 0'; 
});
