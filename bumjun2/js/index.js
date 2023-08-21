const $box = document.querySelector('.box');
const $startButton = document.querySelector('.start-button');
const blockTemplate = document.getElementById('blockTemplate');
const numRows = 20;
const numCols = 10;
const cellSize = 30;
const blocks = [];

let isPlaying = false;
let currentBlock = null;

let row = 0;
let col = 0;

const createBlock = () => {
  const block = blockTemplate.content.cloneNode(true);
  $box.appendChild(block);
  blocks.push(block);
};

const makeBlock = () => {
  if ($box.children[3].children.length < numRows) {
    const createBlock = document.createElement('div');
    createBlock.classList.add('block');
    createBlock.classList.add('blue');
    $box.children[3].appendChild(createBlock);
    for (let i = 0; i < numCols; i++) {}
  }
};

const startGame = () => {
  if (isPlaying) return;
  isPlaying = true;

  $startButton.textContent = 'Stop';
  document.addEventListener('keydown', handlerKeyDown);
  for (let i = 0; i < numCols; i++) {
    createBlock();
  }
  setInterval(makeBlock, 1000);
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

const handlerKeyDown = (e) => {
  if (e.keyCode === 37) {
    console.log('왼');
    -1;
  } else if (e.keyCode === 39) {
    console.log('오');
  }
};
