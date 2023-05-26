import { CIRCLE, CROSS, NO_PLAYER } from './config.js';
import * as model from './model.js';
import boxView from './view/boxView.js';

//////////////////////////////////////

/////////////////////////////////////

const controlBoxClicked = function (x, y) {
  // 0) Stop game when finsih
  if (model.state.gameFinish) return;

  // 1) Set Players and Turns (Data)

  model.setPlayerTurn(x, y);
  // 2) Display Players and Turns (Views)
  if (model.state.data[y][x] === CIRCLE) {
    boxView.addCircleIcon(x, y);
    boxView.displayCircleTurn();
    // Disable radio select after checked
    boxView.disableSelect();
  } else {
    boxView.addCrossIcon(x, y);
    boxView.displayCrossTurn();
    // Disable radio select after checked
    boxView.disableSelect();
  }

  controlCheckWinner();
};

const controlCheckWinner = function () {
  // 1) Check winner (Data)
  const winner = model.checkWinCondition(model.state.data);
  console.log(winner);

  // 2) Change score for winner (Data)

  if (winner === CIRCLE) {
    model.state.gameFinish = true;
    model.setScore(winner);
    boxView.displayResult_CircleWin(model.state.circleScore);
  } else if (winner === CROSS) {
    model.state.gameFinish = true;
    model.setScore(winner);
    boxView.displayResult_CrossWin(model.state.crossScore);
    model.state.gameFinish = true;
  } else if (winner === NO_PLAYER && model.checkBoardFull(model.state.data)) {
    model.state.gameFinish = true;
    boxView.displayResult_Draw();
  }
};

const controlRestart = function () {
  // 1) Reset data to empty
  model.restartGame();
  // 2) Reset View to empty
  boxView.displayRestart();
  console.log(model.state);
  // 3) Reset radio
  boxView.resetDisableSelect();
};

const controlReset = function () {
  // 1) Reset Score (Data)
  model.resetGame();
  // 1) Reset circle score in View
  boxView.displayReset(model.state.circleScore);
  // 1) Reset cross score in View
  boxView.displayReset(model.state.crossScore);

  controlRestart();
};

const controlPlayerSelect = function (selectedPlayer) {
  console.log(selectedPlayer);
  boxView.showPlayerStartingTurn(selectedPlayer);
  model.startingPlayer(selectedPlayer);
};

const controlGame = function () {
  //0) Control PlayerSelect
  boxView.addHandlerPlayerSelect(controlPlayerSelect);
  //1) get boxes from boxView
  boxView.addHandlerBoxClick(controlBoxClicked);
  boxView.addHandlerRestart(controlRestart);
  boxView.addHandlerReset(controlReset);
};

controlGame();
