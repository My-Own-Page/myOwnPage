const $box = document.querySelector('.box');
const $startButton = document.querySelector('.start-button');
const blockTemplate = document.getElementById('blockTemplate');

const cellSize = 30;

let isPlaying = false;
let currentBlock = null;

let row = 4;
let numRow = 0;

let col = 0;
let numCol = 0;

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

let i = 0;
let j = 0;
const makeBlock = () => {
  if (i < 20) {
    $box.children[row].children[col++].classList.add('blue');
    $box.children[row].children[j++].previousElementSibling.classList.remove(
      'blue'
    );
    document.addEventListener('keydown', handlerKeyDown);
  }
};

const startGame = () => {
  if (isPlaying) return;
  isPlaying = true;

  $startButton.textContent = 'Stop';

  createBlock();

  setInterval(makeBlock, 300);
};

const stopGame = () => {
  if (!isPlaying) return;
  isPlaying = false;
  $startButton.textContent = 'Start';
};

$startButton.addEventListener('click', () => {
  if (isPlaying) {
    stopGame();
  } else {
    startGame();
  }
});

const leftMove = () => {
  $box.children[row--].children[col].classList.add('blue');
  $box.children[row].children[col].classList.remove('blue');
};

const rightMove = () => {
  $box.children[row++].children[col].classList.add('blue');
};

const handlerKeyDown = (e) => {
  if (e.keyCode === 37) {
    leftMove();
  } else if (e.keyCode === 39) {
    rightMove();
  }
};
