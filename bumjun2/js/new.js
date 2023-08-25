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
let rotationIndex = 0;

let currentColor = '';
const colors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'pink'];

const blockShapes = {
  I: [
    [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
  ],
  T: [
    [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  L: [
    [
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 1],
      ],
    ],
  ],
  i: [
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0],
    ],
    [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
    ],
  ],
  Z: [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
  ],
  V: [
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  Square: [
    [
      [1, 1],
      [1, 1],
    ],
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
  const currentRotation = blockShape[rotationIndex % blockShape.length];
  for (let r = 0; r < currentRotation.length; r++) {
    for (let c = 0; c < currentRotation[r].length; c++) {
      if (currentRotation[r][c] === 1) {
        const cell = $box.children[newCol + c].children[newRow + r];
        cell.classList.add(currentColor);
      }
    }
  }
};

const removeCurrentColor = (shape) => {
  const blockShape = blockShapes[shape];
  const currentRotation = blockShape[rotationIndex % blockShape.length];
  for (let r = 0; r < currentRotation.length; r++) {
    for (let c = 0; c < currentRotation[r].length; c++) {
      if (currentRotation[r][c] === 1) {
        const cell = $box.children[newCol + c].children[rowSize + r];
        cell.classList.remove(currentColor);
      }
    }
  }
};

const keyEventRemoveCurrentColor = (shape) => {
  const blockShape = blockShapes[shape];
  const currentRotation = blockShape[rotationIndex % blockShape.length];
  for (let r = 0; r < currentRotation.length; r++) {
    for (let c = 0; c < currentRotation[r].length; c++) {
      if (currentRotation[r][c] === 1) {
        const cell = $box.children[newCol + c].children[newRow + r];
        cell.classList.remove(currentColor);
      }
    }
  }
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
  } else if (currentColor === 'orange') {
    removeCurrentColor('i');
    drawBlock('i');
  } else if (currentColor === 'purple') {
    removeCurrentColor('Z');
    drawBlock('Z');
  } else {
    removeCurrentColor('V');
    drawBlock('V');
  }
};

const getBlockEndRow = (shape) => {
  const blockShape = blockShapes[shape];
  const currentRotation = blockShape[rotationIndex % blockShape.length];
  let endRow = 0;
  for (let r = 0; r < currentRotation.length; r++) {
    for (let c = 0; c < currentRotation[r].length; c++) {
      if (currentRotation[r][c] === 1) {
        endRow = Math.max(endRow, newRow + r);
      }
    }
  }
  return endRow;
};

const isCollision = (shape, newRow, newCol) => {
  const blockShape = blockShapes[shape];
  const currentRotation = blockShape[rotationIndex % blockShape.length];
  for (let r = 0; r < currentRotation.length; r++) {
    for (let c = 0; c < currentRotation[r].length; c++) {
      if (currentRotation[r][c] === 1) {
        const checkRow = newRow + r;
        const checkCol = newCol + c;
        if (
          $box.children[checkCol].children[checkRow].classList.contains(
            'locked'
          )
        ) {
          return true;
        }
      }
    }
  }
  // return false;
};

const lockBlock = (shape, newRow, newCol) => {
  const blockShape = blockShapes[shape];
  const currentRotation = blockShape[rotationIndex % blockShape.length];
  for (let r = 0; r < currentRotation.length; r++) {
    for (let c = 0; c < currentRotation[r].length; c++) {
      if (currentRotation[r][c] === 1) {
        const cell = $box.children[newCol + c].children[newRow + r];
        cell.classList.add('locked', currentColor);
      }
    }
  }
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
    } else if (currentColor === 'orange') {
      currentShape = 'i';
    } else if (currentColor === 'purple') {
      currentShape = 'Z';
    } else {
      currentShape = 'V';
    }
    // currentColor = 'red';

    const endRow = getBlockEndRow(currentShape);
    if (endRow >= row - 1 || isCollision(currentShape, newRow + 1, newCol)) {
      lockBlock(currentShape, newRow, newCol);
      newRow = 0;
    } else {
      newRow++;
      rowSize = newRow - 1;
      randomBlock();
    }
  } else {
    newRow = 0;
    newCol = 4;
  }
};

const rotateBlock = (shape) => {
  const rotations = blockShapes[shape];
  const currentRotation = rotations[rotationIndex % rotations.length];

  for (let r = 0; r < currentRotation.length; r++) {
    for (let c = 0; c < currentRotation[r].length; c++) {
      if (currentRotation[r][c] === 1) {
        const cell = $box.children[newCol + c].children[newRow + r];
        cell.classList.add(currentColor);
      }
    }
  }
};

const startGame = () => {
  if (isPlaying) return;
  isPlaying = true;

  $startButton.textContent = 'Stop';

  createBlock();

  intervalId = setInterval(makeBlock, 300);
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
  } else if (e.keyCode === 38) {
    rotateMove();
  } else if (e.keyCode === 40) {
    downMove();
  }
};

const leftMove = () => {
  if (!isCollision(currentShape, newRow, newCol - 1)) {
    keyEventRemoveCurrentColor(currentShape);
    newCol--;
    makeBlock();
  }
};

const rightMove = () => {
  if (newCol < col - 1 && !isCollision(currentShape, newRow, newCol + 1)) {
    keyEventRemoveCurrentColor(currentShape);
    newCol++;
    makeBlock();
  }
};
const rotateMove = () => {
  keyEventRemoveCurrentColor(currentShape);
  rotationIndex++;
  if (rotationIndex > blockShapes[currentShape].length) {
    rotationIndex = 0;
  }
  rotateBlock(currentShape);
};
