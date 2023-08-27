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
let speed = 300;
let rotationIndex = 0;

let currentColor = '';
const colors = ['blue', 'red', 'yellow', 'orange', 'purple', 'pink', 'green'];

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
  W: [
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
    removeCurrentColor('W');
    drawBlock('W');
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
        const checkRow = newRow + r;
        const checkCol = newCol + c;

        if (checkRow >= row) {
          return row - 1;
        }

        if (
          $box.children[checkCol].children[checkRow].classList.contains(
            'locked'
          )
        ) {
          return endRow;
        }
        endRow = Math.max(endRow, checkRow);
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

        // 게임 보드 바깥으로 나가는 경우, 충돌로 처리
        if (checkRow >= row || checkCol < 0 || checkCol >= col) {
          return true;
        } else {
        }

        if (
          checkRow >= 0 &&
          $box.children[checkCol].children[checkRow].classList.contains(
            'locked'
          )
        ) {
          return true;
        }
      }
    }
  }
  return false;
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

const isLineFull = (rowIndex) => {
  for (let c = 0; c < col; c++) {
    if (!$box.children[c].children[rowIndex].classList.contains('locked')) {
      return false;
    }
  }
  return true;
};

const clearLineAndMoveDown = (rowIndex) => {
  for (let c = 0; c < col; c++) {
    $box.children[c].children[rowIndex].classList.remove('locked', ...colors);
  }

  for (let r = rowIndex; r > 0; r--) {
    for (let c = 0; c < col; c++) {
      const cell = $box.children[c].children[r];
      const upperCell = $box.children[c].children[r - 1];
      if (upperCell.classList.contains('locked')) {
        cell.className = upperCell.className;
      } else {
        cell.classList.remove('locked', ...colors);
      }
    }
  }
};

const makeBlock = () => {
  if (newRow < row) {
    if (newRow === 0) {
      currentColor = randomBlockColor();
      speed = 300;
      console.log(speed);
      clearInterval(intervalId);
      intervalId = setInterval(makeBlock, speed);
    }
    if (currentColor === 'blue') {
      currentShape = 'I';
    } else if (currentColor === 'red') {
      currentShape = 'T';
    } else if (currentColor === 'green') {
      currentShape = 'W';
    } else if (currentColor === 'yellow') {
      currentShape = 'Square';
    } else if (currentColor === 'orange') {
      currentShape = 'i';
    } else if (currentColor === 'purple') {
      currentShape = 'Z';
    } else {
      currentShape = 'V';
    }
    // currentColor = 'blue';

    const endRow = getBlockEndRow(currentShape);
    if (endRow >= row - 1 || isCollision(currentShape, newRow + 1, newCol)) {
      lockBlock(currentShape, newRow, newCol);

      for (let r = 0; r < row; r++) {
        if (isLineFull(r)) {
          clearLineAndMoveDown(r);
        }
      }
      if (newRow === 0) {
        stopGame();
        return;
      }
      newCol = 4;
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

createBlock();
$box.children[3].children[7].textContent = '테';
$box.children[4].children[7].textContent = '트';
$box.children[5].children[7].textContent = '리';
$box.children[6].children[7].textContent = '스';

$box.children[3].children[7].classList.add('textblue');
$box.children[4].children[7].classList.add('textgreen');
$box.children[5].children[7].classList.add('textyellow');
$box.children[6].children[7].classList.add('textred');
const startGame = () => {
  if (isPlaying) return;
  isPlaying = true;

  $startButton.textContent = 'Stop';

  intervalId = setInterval(makeBlock, speed);
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
  } else if (e.keyCode === 32) {
  }
};

const leftMove = () => {
  if (!isCollision(currentShape, newRow, newCol - 1)) {
    keyEventRemoveCurrentColor(currentShape);
    newCol--;
    randomBlock();
  }
};

const rightMove = () => {
  if (newCol < col - 1 && !isCollision(currentShape, newRow, newCol + 1)) {
    keyEventRemoveCurrentColor(currentShape);
    newCol++;
    randomBlock();
  }
};

const downMove = () => {
  speed -= 5;
  clearInterval(intervalId);
  intervalId = setInterval(makeBlock, speed);
};

const rotateMove = () => {
  keyEventRemoveCurrentColor(currentShape);
  rotationIndex++;
  if (rotationIndex > blockShapes[currentShape].length) {
    rotationIndex = 0;
  }
  drawBlock(currentShape);
};
