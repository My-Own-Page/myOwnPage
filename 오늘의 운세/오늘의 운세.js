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

const randomTextElement = document.querySelector('.section .lucky .text');
const sectionElement = document.querySelector('.section');
const randomButton = document.querySelector('.section .lucky .btn1');

randomButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * randomTexts.length);
  const randomText = randomTexts[randomIndex];
  randomTextElement.textContent = randomText;
  
  const imageUrl = textToImageMap[randomText];
  if (imageUrl) {
      sectionElement.style.backgroundImage = `url(${imageUrl})`;
    }
    randomButton.style.display = 'none';
});
