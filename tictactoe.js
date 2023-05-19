let boxes;
let data;
let turn;

const initialize = function () {
  boxes = document.querySelectorAll('.box');
  data = [[], [], []];
  turn = 0;
  let x = 0;
  let y = 0;
  let i = 0;

  boxes.forEach((box) => {
    box.x = x;
    box.y = y;
    box.i = i++;
    data[y][x] = box;
    x++;
    if (x > 2) {
      x = 0;
      y++;
    }
    box.addEventListener('click', clickedBox);
  });
};

const getScore = function (board) {
  let win = 0;
  for (let row = 0; row < board.length; row++) {
    let score = 0;
    for (let column = 0; column < board.length; column++) {
      score += board[row][column];
    }
    if (score == 3) win = 1;
    if (score == -3) win = -1;
  }
  for (let column = 0; column < board.length; column++) {
    let score = 0;
    for (let row = 0; row < board.length; row++) {
      score += board[row][column];
    }
    if (score == 3) win = 1;
    if (score == -3) win = -1;
  }

  let score = 0;
  for (let rowAndColumn = 0; rowAndColumn < 3; rowAndColumn++) {
    score += board[rowAndColumn][rowAndColumn];
  }
  if (score == 3) win = 1;
  if (score == -3) win = -1;

  score = 0;
  for (let ii = 0; ii < 3; ii++) {
    let row = 2 - ii;
    let column = 0 + ii;
    score += board[row][column];
  }
  if (score == 3) win = 1;
  if (score == -3) win = -1;

  return win;
};

const isBoardFull = function (board) {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      if (board[y][x] === 0) {
        return false;
      }
    }
  }
};

const clickedBox = function (event) {
  let box = event.currentTarget;
  if (box.innerHTML === '') {
    if (turn % 2 === 0) {
      box.innerHTML = "<i class='fa-regular fa-circle fa-2xs tic-circle'></i>";
      data[box.y][box.x] = 1;
    } else {
      box.innerHTML = "<i class='fa-solid fa-xmark fa-sm tic-cross'></i>";
      data[box.y][box.x] = -1;
    }
    turn++;
  }

  let win = getScore(data);
  console.log(win);

  setTimeout(() => {
    if (win === -1) alert('Cross win');
    if (win === 1) alert('Circle win');
    if (win === 0 && isBoardFull(data)) alert('Draw game!');
  }, 100);
};

initialize();

// //Circle
// <i class='fa-regular fa-circle fa-2xs tic-circle'></i>;
// //Cross
// <i class='fa-solid fa-xmark fa-sm tic-cross'></i>;
