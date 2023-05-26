import { CIRCLE, CROSS, NO_PLAYER, BOARD_SIZE } from './config.js';
export const state = {
  turn: 0,
  data: [
    [NO_PLAYER, NO_PLAYER, NO_PLAYER],
    [NO_PLAYER, NO_PLAYER, NO_PLAYER],
    [NO_PLAYER, NO_PLAYER, NO_PLAYER],
  ],
  circleScore: 0,
  crossScore: 0,
  gameFinish: false,
};

export const setPlayerTurn = function (x, y) {
  //Check Board (Emply & Turns)
  if (state.data[y][x] !== NO_PLAYER) return;

  if (state.turn % 2 === 0) {
    state.data[y][x] = CIRCLE;
  } else {
    state.data[y][x] = CROSS;
  }
  state.turn++;
};

export const checkWinCondition = function (board) {
  // 1) Check rows
  for (let row = 0; row < BOARD_SIZE; row++) {
    let rowScore = 0;
    for (let column = 0; column < BOARD_SIZE; column++) {
      let box = board[row][column];
      rowScore += box;
    }
    if (rowScore === BOARD_SIZE * CIRCLE) return CIRCLE;
    if (rowScore === BOARD_SIZE * CROSS) return CROSS;
  }
  // 2) Check columns
  for (let column = 0; column < BOARD_SIZE; column++) {
    let columnScore = 0;
    for (let row = 0; row < BOARD_SIZE; row++) {
      let box = board[row][column];
      columnScore += box;
    }
    if (columnScore === BOARD_SIZE * CIRCLE) return CIRCLE;
    if (columnScore === BOARD_SIZE * CROSS) return CROSS;
  }

  // 3) Check diagonal
  let diagonalDownScore = 0;
  for (let rowAndColumn = 0; rowAndColumn < BOARD_SIZE; rowAndColumn++) {
    diagonalDownScore += board[rowAndColumn][rowAndColumn];
  }
  if (diagonalDownScore === BOARD_SIZE * CIRCLE) return CIRCLE;
  if (diagonalDownScore === BOARD_SIZE * CROSS) return CROSS;

  let diagonalUpScore = 0;
  for (let offset = 0; offset < BOARD_SIZE; offset++) {
    let row = offset;
    let column = 2 - offset;
    diagonalUpScore += board[row][column];
  }
  if (diagonalUpScore === BOARD_SIZE * CIRCLE) return CIRCLE;
  if (diagonalUpScore === BOARD_SIZE * CROSS) return CROSS;

  return NO_PLAYER;
};

export const checkBoardFull = function (board) {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let column = 0; column < BOARD_SIZE; column++) {
      if (board[row][column] === 0) return false;
    }
  }
  return true;
};

export const setScore = function (winner) {
  if (winner === CIRCLE) {
    return (state.circleScore += 1);
  } else if (winner === CROSS) {
    return (state.crossScore += 1);
  }
};

export const restartGame = function () {
  state.data = state.data.map((row) => row.map(() => NO_PLAYER));
  state.turn = 0;
  state.gameFinish = false;
};

export const resetGame = function () {
  state.crossScore = 0;
  state.circleScore = 0;
};

export const startingPlayer = function (selectedPlayer) {
  if (selectedPlayer === CIRCLE) {
    state.turn = 0;
  } else {
    state.turn = 1;
  }
};
