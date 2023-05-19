let boxes;
let data;
let turn;
let circleScore = 0;
let crossScore = 0;

const overlay = document.querySelector('.overlay');
const hidden = document.querySelector('.hidden');

const gameResult = document.querySelector('.game-result');

const btnRestart = document.querySelector('.btn-restart');
const btnReset = document.querySelector('.btn-reset-score');

const crossScoreDisplay = document.querySelector('.cross-score');
const circleScoreDisplay = document.querySelector('.circle-score');

const restart = function () {
  console.log('restart');
  boxes.forEach((box) => (box.innerHTML = ''));
  initialize();
};
btnRestart.addEventListener('click', restart);

const resetScore = function () {
  circleScoreDisplay.innerHTML = circleScore = 0;
  crossScoreDisplay.innerHTML = crossScore = 0;
  restart();
};
btnReset.addEventListener('click', resetScore);

const initialize = function () {
  data = [[], [], []];
  turn = 0;
  let x = 0;
  let y = 0;
  let i = 0;

  boxes = document.querySelectorAll('.box');

  boxes.forEach((box) => {
    box.x = x;
    box.y = y;
    box.i = i++;
    data[y][x] = 0;
    x++;
    if (x > 2) {
      x = 0;
      y++;
    }
    box.addEventListener('click', clickedBox);
  });
};
const PLAYER_1 = 1;
const PLAYER_2 = -1;
const NO_PLAYER = 0;
const BOARD_SIZE = 3;

const getWinningPlayer = function (board) {
  // 1) Check rows
  for (let row = 0; row < BOARD_SIZE; row++) {
    let rowScore = 0;
    for (let column = 0; column < BOARD_SIZE; column++) {
      let box = board[row][column];
      rowScore += box;
    }
    if (rowScore === BOARD_SIZE * PLAYER_1) return PLAYER_1;
    if (rowScore === BOARD_SIZE * PLAYER_2) return PLAYER_2;
  }

  // 2) Check columns
  for (let column = 0; column < BOARD_SIZE; column++) {
    let columnScore = 0;
    for (let row = 0; row < BOARD_SIZE; row++) {
      let box = board[row][column];
      columnScore += box;
    }
    if (columnScore === BOARD_SIZE * PLAYER_1) return PLAYER_1;
    if (columnScore === BOARD_SIZE * PLAYER_2) return PLAYER_2;
  }

  // 3) Check diagonal
  let diagonalDownScore = 0;
  for (let rowAndColumn = 0; rowAndColumn < BOARD_SIZE; rowAndColumn++) {
    diagonalDownScore += board[rowAndColumn][rowAndColumn];
  }
  if (diagonalDownScore === BOARD_SIZE * PLAYER_1) return PLAYER_1;
  if (diagonalDownScore === BOARD_SIZE * PLAYER_2) return PLAYER_2;

  let diagonalUpScore = 0;
  for (let offset = 0; offset < BOARD_SIZE; offset++) {
    let row = offset;
    let column = 2 - offset;
    diagonalUpScore += board[row][column];
  }
  if (diagonalUpScore === BOARD_SIZE * PLAYER_1) return PLAYER_1;
  if (diagonalUpScore === BOARD_SIZE * PLAYER_2) return PLAYER_2;

  return NO_PLAYER;
};

const isBoardFull = function (board) {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let column = 0; column < BOARD_SIZE; column++) {
      if (board[row][column] === 0) return false;
    }
  }
  return true;
};

const closeOverlay = function () {
  let events = ['click', 'keydown'];
  events.forEach((ev) =>
    overlay.addEventListener(ev, function () {
      overlay.classList.add('hidden');
    }),
  );
};

const result = function (win) {
  if (win === PLAYER_2) {
    boxes.forEach((box) => {
      box.removeEventListener('click', clickedBox);
    });
    setTimeout(() => {
      overlay.classList.toggle('hidden');
      closeOverlay();
      gameResult.innerHTML = 'Cross ❌ win !';
      crossScoreDisplay.innerHTML = crossScore += 1;
    }, 500);
  }
  if (win === PLAYER_1) {
    boxes.forEach((box) => {
      box.removeEventListener('click', clickedBox);
    });
    setTimeout(() => {
      overlay.classList.toggle('hidden');
      closeOverlay();
      gameResult.innerHTML = 'Circle ⭕ win !';
      circleScoreDisplay.innerHTML = circleScore += 1;
    }, 500);
  }
  if (win === NO_PLAYER && isBoardFull(data)) {
    setTimeout(() => {
      overlay.classList.toggle('hidden');
      closeOverlay();
      gameResult.innerHTML = '🛎️ Draw game !';
    }, 500);
  }
};

const clickedBox = function (event) {
  let box = event.currentTarget;
  if (box.innerHTML === '') {
    if (turn % 2 === 0) {
      box.innerHTML = "<i class='fa-regular fa-circle fa-2xs tic-circle'></i>";
      data[box.y][box.x] = PLAYER_1;
    } else {
      box.innerHTML = "<i class='fa-solid fa-xmark fa-sm tic-cross'></i>";
      data[box.y][box.x] = PLAYER_2;
    }
    turn++;
  }

  let win = getWinningPlayer(data);
  console.log(win);
  result(win);
};

initialize();

// //Circle
// <i class='fa-regular fa-circle fa-2xs tic-circle'></i>;
// //Cross
// <i class='fa-solid fa-xmark fa-sm tic-cross'></i>;
