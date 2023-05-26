let boxes;
let data;
let turn;
let circleScore = 0;
let crossScore = 0;

boxes = document.querySelectorAll('.box');
const overlay = document.querySelector('.overlay');
const hidden = document.querySelector('.hidden');

const gameResult = document.querySelector('.game-result');

const gameInfo = document.querySelector('.gameInfo');

const selectRadio = document.querySelector('.select-radio');
const playerBtn = document.querySelectorAll('input[name="player"]');

const btnRestart = document.querySelector('.btn-restart');
const btnReset = document.querySelector('.btn-reset-score');

const circleBoard = document.querySelector('.btn-circle');
const crossBoard = document.querySelector('.btn-cross');

const crossScoreDisplay = document.querySelector('.cross-score');
const circleScoreDisplay = document.querySelector('.circle-score');

const disableSelect = function () {
  for (const selectBtn of playerBtn) {
    if (selectBtn.checked === false) {
      selectBtn.disabled = true;
    }
  }
};

const selectRandom = function () {
  let random = Math.round(Math.random());
  console.log(random);
  setTimeout(function () {
    if (turn === 0) {
      circleBoard.classList.add('turn');
      crossBoard.classList.remove('turn');
      gameInfo.innerHTML = 'Circle ⭕ Turn First !';
    } else if (turn === 1) {
      circleBoard.classList.remove('turn');
      crossBoard.classList.add('turn');
      gameInfo.innerHTML = 'Cross ❌ Turn First !';
    }
  }, 1000);
  return (turn = random);
};

const selectPlayer = function () {
  selectRadio.addEventListener('change', function () {
    for (const startMethod of playerBtn) {
      if (startMethod.checked) {
        console.log(startMethod.value);
        if (startMethod.value === 'circle') {
          gameInfo.innerHTML = 'Circle ⭕ Turn First !';
          circleBoard.classList.add('turn');
          crossBoard.classList.remove('turn');
          return (turn = 0);
        }
        if (startMethod.value === 'cross') {
          gameInfo.innerHTML = 'Cross ❌ Turn First !';
          circleBoard.classList.remove('turn');
          crossBoard.classList.add('turn');
          return (turn = 1);
        }
        if (startMethod.value === 'random') {
          gameInfo.innerHTML = 'Random Player !';

          return selectRandom();
        }
      }
    }
  });
};

const restart = function () {
  circleBoard.classList.remove('turn');
  circleBoard.classList.add('turn');

  crossBoard.classList.remove('turn');
  document.querySelector('#circle').checked = true;
  document.getElementById('circle').disabled = false;
  document.getElementById('cross').disabled = false;
  document.getElementById('random').disabled = false;
  gameInfo.innerHTML = 'Start game with circle turn first or select player';
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
  selectPlayer();

  let x = 0;
  let y = 0;

  boxes.forEach((box) => {
    box.x = x;
    box.y = y;
    turn = 0;
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
      gameResult.innerHTML = gameInfo.innerHTML = 'Cross ❌ win !';
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
      gameResult.innerHTML = gameInfo.innerHTML = 'Circle ⭕ win !';
      circleScoreDisplay.innerHTML = circleScore += 1;
    }, 500);
  }
  if (win === NO_PLAYER && isBoardFull(data)) {
    setTimeout(() => {
      overlay.classList.toggle('hidden');
      closeOverlay();
      gameResult.innerHTML = gameInfo.innerHTML = '🛎️ Draw game !';
    }, 500);
  }
};

const clickedBox = function (event) {
  let box = event.currentTarget;
  if (box.innerHTML === '') {
    if (turn % 2 === 0) {
      box.innerHTML = "<i class='fa-regular fa-circle fa-2xs tic-circle'></i>";
      data[box.y][box.x] = PLAYER_1;
      circleBoard.classList.remove('turn');
      crossBoard.classList.add('turn');
      gameInfo.innerHTML = 'Cross Turn';
      disableSelect();
    } else {
      box.innerHTML = "<i class='fa-solid fa-xmark fa-sm tic-cross'></i>";
      data[box.y][box.x] = PLAYER_2;
      circleBoard.classList.add('turn');
      crossBoard.classList.remove('turn');
      gameInfo.innerHTML = 'Circle Turn';
      disableSelect();
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
