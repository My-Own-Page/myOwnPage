const $box = document.querySelector('.box');
const $startButton = document.querySelector('.start-button');
const blockTemplate = document.getElementById('blockTemplate');
const numRows = 20;
const numCols = 10;
const cellSize = 30;
const blocks = [];

let isPlaying = false;

const createBlock = () => {
  const block = blockTemplate.content.cloneNode(true);
  if (blocks.length < numRows) {
    $box.appendChild(block);
    blocks.push(block);
    $box.children[4].classList.add('blue');
  }
};

// const moveBlockDown = () => {

// };

const startGame = () => {
  if (isPlaying) return;
  isPlaying = true;

  $startButton.textContent = 'Stop';
  // createBlock();
  setInterval(createBlock, 1000);
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
