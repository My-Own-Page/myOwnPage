const $box = document.querySelector('.box');
const $startButton = document.querySelector('.start-button');
const blockTemplate = document.getElementById('blockTemplate');

let isPlaying = false;
let intervalId = null;

let row = 4;
let col = 0;

let currentColor = '';
const colors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple'];

let max = 20;

const createBlock = () => {
  for (let i = 0; i < 10; i++) {
    const block = blockTemplate.content.cloneNode(true);
    $box.appendChild(block);
    for (let j = 0; j < 20; j++) {
      const createBlocks = document.createElement('div');
      createBlocks.classList.add('block');
      $box.children[i].appendChild(createBlocks);
    }
  }
};

const randomBlock = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

let newCol = 0;
const makeBlock = () => {
  if (col < max) {
    if (col === 0) {
      currentColor = randomBlock();
    }
    $box.children[row].children[col++].classList.add(currentColor);
    $box.children[row].children[
      newCol++
    ].previousElementSibling.classList.remove(currentColor);

    document.addEventListener('keydown', handlerKeyDown);
    console.log(max);
  } else {
    row = 4;
    col = 0;
    newCol = 0;
    if ($box.children[row].children[col].classList.contains(currentColor)) {
      max--;
    } else {
      max = 20;
    }
  }
};

const startGame = () => {
  if (isPlaying) return;
  isPlaying = true;

  $startButton.textContent = 'Stop';

  createBlock();

  intervalId = setInterval(makeBlock, 300);
};

const stopGame = () => {
  if (!isPlaying) return;
  isPlaying = false;
  $startButton.textContent = 'Start';

  clearInterval(intervalId);
};

$startButton.addEventListener('click', () => {
  if (isPlaying) {
    stopGame();
  } else {
    startGame();
  }
});

const handlerKeyDown = (e) => {
  if (e.keyCode === 37) {
    leftMove();
  } else if (e.keyCode === 39) {
    rightMove();
  }
};

const leftMove = () => {
  if (row > 0) {
    $box.children[row].children[col - 1].classList.remove(currentColor);
    $box.children[row].children[newCol].classList.remove(currentColor);
    row--;
    $box.children[row].children[newCol].classList.add(currentColor);
  }
};

const rightMove = () => {
  if (row < 9) {
    $box.children[row].children[col - 1].classList.remove(currentColor);
    $box.children[row].children[newCol].classList.remove(currentColor);
    row++;
    $box.children[row].children[newCol].classList.add(currentColor);
  }
};