const $box = document.querySelector('.box');
const $startButton = document.querySelector('.start-button');
const blockTemplate = document.getElementById('blockTemplate');

let isPlaying = false;
let intervalId = null;

let row = 20;
let col = 10;
let newRow = 0;
let rowSize = 0;
let newCol = 4;
let speed = 500;

let currentColor = '';
const colors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple'];
const blockShapes = {
  I: [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  L: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  Square: [
    [1, 1],
    [1, 1],
  ],
};
const createBlock = () => {
  for (let i = 0; i < col; i++) {
    const block = blockTemplate.content.cloneNode(true);
    $box.appendChild(block);
    for (let j = 0; j < row; j++) {
      const createBlocks = document.createElement('div');
      createBlocks.classList.add('block');
      $box.children[i].appendChild(createBlocks);
    }
  }
};

const randomBlockColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const drawBlock = (shape) => {
  const blockShape = blockShapes[shape];
  for (let r = 0; r < blockShape.length; r++) {
    for (let c = 0; c < blockShape[r].length; c++) {
      if (blockShape[r][c] === 1) {
        const cell = $box.children[newCol + c].children[newRow + r];
        cell.classList.add(currentColor);
      }
    }
  }
};

const removeCurrentColor = (shape) => {
  const blockShape = blockShapes[shape];
  for (let r = 0; r < blockShape.length; r++) {
    for (let c = 0; c < blockShape[r].length; c++) {
      if (blockShape[r][c] === 1) {
        const cell = $box.children[newCol + c].children[rowSize + r];
        cell.classList.remove(currentColor);
      }
    }
  }
};

const keyEventRemoveCurrentColor = (cols) => {
  const cell = $box.children[cols].children[newRow];
  cell.classList.remove(currentColor);
};

const randomBlock = () => {
  if (currentColor === 'blue') {
    removeCurrentColor('I');
    drawBlock('I');
  } else if (currentColor === 'red') {
    removeCurrentColor('T');
    drawBlock('T');
  } else if (currentColor === 'green') {
    removeCurrentColor('L');
    drawBlock('L');
  } else if (currentColor === 'yellow') {
    removeCurrentColor('Square');
    drawBlock('Square');
  }
};

const randomBlockShap = () => {};

const getBlockEndRow = (shape) => {
  const blockShape = blockShapes[shape];
  let endRow = 0;
  for (let r = 0; r < blockShape.length; r++) {
    for (let c = 0; c < blockShape[r].length; c++) {
      if (blockShape[r][c] === 1) {
        endRow = Math.max(endRow, newRow + r);
      }
    }
  }
  return endRow;
};

const makeBlock = () => {
  if (newRow < row) {
    if (newRow === 0) {
      currentColor = randomBlockColor();
    }
    if (currentColor === 'blue') {
      currentShape = 'I';
    } else if (currentColor === 'red') {
      currentShape = 'T';
    } else if (currentColor === 'green') {
      currentShape = 'L';
    } else if (currentColor === 'yellow') {
      currentShape = 'Square';
    }
    const endRow = getBlockEndRow(currentShape);
    if (endRow < row - 1) {
      newRow++;
      rowSize = newRow - 1;
      randomBlock();
    } else {
      newRow = 0;
    }

    // newRow++;
    // rowSize = newRow - 1;
    // randomBlock();
  } else {
    newRow = 0;
  }
};

const startGame = () => {
  if (isPlaying) return;
  isPlaying = true;

  $startButton.textContent = 'Stop';

  createBlock();

  intervalId = setInterval(makeBlock, 50);
  document.addEventListener('keydown', handlerKeyDown);
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
  } else if (e.keyCode === 40) {
    downMove();
  }
};

const leftMove = () => {
  if (newCol > 0) {
    keyEventRemoveCurrentColor(newCol);
    newCol--;
    makeBlock();
  }
};

const rightMove = () => {
  if (newCol < col - 1) {
    keyEventRemoveCurrentColor(newCol);
    newCol++;
    makeBlock();
  }
};
