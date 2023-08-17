// 화면을 배율로 배치
const row = 20;
const col = 10;

const startBord = () => {
  const $box = document.querySelector('.box');
  for (let i = 0; i < row; i++) {
    const $ul = document.createElement('ul');
    $ul.classList.add('bord-size');
    $box.appendChild($ul);
    for (let j = 0; j < col; j++) {
      const $li = document.createElement('li');
      $li.classList.add('bord');
      $ul.appendChild($li);
    }
  }
};

const startEventHandler = () => {
  if ($startButton.textContent === 'start') {
    $startButton.textContent = 'stop';
    startBord();
  } else {
    $startButton.textContent = 'start';
  }
};

const $startButton = document.querySelector('.button-box');
$startButton.textContent = 'start';

$startButton.addEventListener('click', startEventHandler);
