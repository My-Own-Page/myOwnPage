const quizQuestions = [
    {
        question: "대한민국의 수도는 어디일까요?",
        answer: "서울",
    },
    {
        question: "바다의 염분 농도가 가장 높은 바다는 어디일까요?",
        answer: "카스피해",
    },
    {
        question: "우리 몸을 구성하고 있는 원소는 주로 어떤 원소일까요?",
        answer: "산소",
    },
    
];

const quizButton = document.querySelector('.quiz .quiz1');
const resultText = document.querySelector('.quiz .result .text');
const oButton = document.querySelector('.quiz .result .o'); // 수정된 부분
const xButton = document.querySelector('.quiz .result .x'); // 수정된 부분

let currentQuestionIndex = 0;

quizButton.addEventListener('click', () => {
    quizButton.style.display = 'none';
    showQuestion();
});

function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    resultText.textContent = currentQuestion.question;
    oButton.style.display = 'block';
    xButton.style.display = 'block';
}

oButton.addEventListener('click', checkAnswer); // 수정된 부분
xButton.addEventListener('click', checkAnswer); // 수정된 부분

function checkAnswer(event) { // 수정된 부분
    const button = event.target;
    const userAnswer = button.textContent.toLowerCase();
    const correctAnswer = quizQuestions[currentQuestionIndex].answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        resultText.textContent = "정답입니다!";
    } else {
        resultText.textContent = "오답입니다.";
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        oButton.style.display = 'none';
        xButton.style.display = 'none';
        quizButton.style.display = 'block';
        quizButton.textContent = "다시 퀴즈 풀기";
    }
}
