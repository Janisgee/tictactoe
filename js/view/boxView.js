import { BOARD_SIZE, CIRCLE, CROSS, NO_PLAYER } from '../config.js';

const CIRCLE_ICON = "<i class='fa-regular fa-circle fa-2xs tic-circle'></i>";
const CROSS_ICON = "<i class='fa-solid fa-xmark fa-sm tic-cross'></i>";

const PLAYER_BTNS = document.querySelectorAll('input[name="player"]');

class boxView {
  boxes = document.querySelectorAll('.box');
  gameInfo = document.querySelector('.gameInfo');
  gameResult = document.querySelector('.game-result');

  overlay = document.querySelector('.overlay');
  hidden = document.querySelector('.hidden');

  circleBoard = document.querySelector('.btn-circle');
  crossBoard = document.querySelector('.btn-cross');

  crossScoreDisplay = document.querySelector('.cross-score');
  circleScoreDisplay = document.querySelector('.circle-score');

  btnRestart = document.querySelector('.btn-restart');
  btnReset = document.querySelector('.btn-reset-score');

  selectRadio = document.querySelector('.select-radio');

  tictactoe = document.querySelector('.tictactoe');

  constructor() {}

  addHandlerBoxClick(handler) {
    let x = 0;
    let y = 0;
    this.boxes.forEach((box) => {
      box.x = x;
      box.y = y;
      box.addEventListener('click', () => handler(box.x, box.y));
      x++;
      if (x > BOARD_SIZE - 1) {
        x = 0;
        y++;
      }
    });
  }

  addCircleIcon(x, y) {
    this._addIcons(x, y, CIRCLE_ICON);
  }

  addCrossIcon(x, y) {
    this._addIcons(x, y, CROSS_ICON);
  }

  displayCircleTurn() {
    this._toggleTurns('Cross Turn');
  }

  displayCrossTurn() {
    this._toggleTurns('Circle Turn');
  }

  displayResult_CircleWin(score) {
    this._displayPlayerScore('Circle ⭕ win !');
    this.circleScoreDisplay.innerHTML = score;
  }

  displayResult_CrossWin(score) {
    this._displayPlayerScore('Cross ❌ win !');
    this.crossScoreDisplay.innerHTML = score;
  }

  displayResult_Draw() {
    this._displayPlayerScore('🛎️ Draw game !');
  }

  addHandlerRestart(handler) {
    this.btnRestart.addEventListener('click', handler);
  }

  displayRestart() {
    this.boxes.forEach((box) => {
      box.innerHTML = '';
    });
    this.circleBoard.classList.add('turn');
    this.crossBoard.classList.remove('turn');
    this.gameInfo.innerHTML =
      'Start game with circle turn first or select player';
  }

  addHandlerReset(handler) {
    this.btnReset.addEventListener('click', handler);
  }

  displayReset(score) {
    this.circleScoreDisplay.innerHTML = score;
    this.crossScoreDisplay.innerHTML = score;
  }

  addHandlerPlayerSelect(handler) {
    this.selectRadio.addEventListener('change', () => {
      let player = this.getSelectedFirstPlayer();

      // Show message
      if (player === CIRCLE || player === CROSS) {
        handler(player);
      }
      if (player === NO_PLAYER) {
        this.tictactoe.style.pointerEvents = 'none';
        setTimeout(() => {
          if (Math.random() > 0.5) {
            player = CIRCLE;
            handler(player);
          } else {
            player = CROSS;
            handler(player);
          }
          this.tictactoe.style.pointerEvents = 'auto';
        }, 1500);
      }
    });
  }

  getSelectedFirstPlayer() {
    let selectedPlayer = NO_PLAYER;

    PLAYER_BTNS.forEach((selectBtn) => {
      if (selectBtn.checked) {
        if (selectBtn.value === 'circle') {
          selectedPlayer = CIRCLE;
        }
        if (selectBtn.value === 'cross') {
          selectedPlayer = CROSS;
        }
        if (selectBtn.value === 'random') {
          selectedPlayer = NO_PLAYER;
          this.gameInfo.innerHTML = 'Random Turn First !';
          // this.boxes.forEach((box) => {
          //   box.removeEventListener('click', this.addHandlerBoxClick);
          // });
        }
      }
    });

    return selectedPlayer;
  }

  showPlayerStartingTurn(player) {
    if (player === CIRCLE) {
      this.gameInfo.innerHTML = 'Circle ⭕ Turn First !';
      this.circleBoard.classList.add('turn');
      this.crossBoard.classList.remove('turn');
    } else {
      this.gameInfo.innerHTML = 'Cross ❌ Turn First !';
      this.circleBoard.classList.remove('turn');
      this.crossBoard.classList.add('turn');
    }
  }

  disableSelect() {
    PLAYER_BTNS.forEach((selectBtn) => {
      if (selectBtn.checked === false) {
        selectBtn.disabled = true;
      }
    });
  }

  resetDisableSelect() {
    document.querySelector('#circle').checked = true;
    document.getElementById('circle').disabled = false;
    document.getElementById('cross').disabled = false;
    document.getElementById('random').disabled = false;
  }

  // _playerSelect() {

  // PLAYER_BTNS.forEach((selectBtn) => {
  //   if (selectBtn.checked) {
  //     console.log(selectBtn.value);
  //     if (selectBtn.value === 'circle') {
  //       this.gameInfo.innerHTML = 'Circle ⭕ Turn First !';
  //       this.circleBoard.classList.add('turn');
  //       this.crossBoard.classList.remove('turn');
  //       return 0;
  //     }
  //     if (selectBtn.value === 'cross') {
  //       this.gameInfo.innerHTML = 'Cross ❌ Turn First !';
  //       this.circleBoard.classList.remove('turn');
  //       this.crossBoard.classList.add('turn');
  //       return (turn = 1);
  //     }
  //     if (selectBtn.value === 'random') {
  //       this.gameInfo.innerHTML = 'Random Player !';

  //       return this._selectRandom.bind(this);
  //     }
  //   }
  // });
  // }

  // _selectRandom() {
  //   let random = Math.round(Math.random());
  //   console.log(random);
  //   setTimeout(() => {
  //     if (turn === 0) {
  //       this.circleBoard.classList.add('turn');
  //       this.crossBoard.classList.remove('turn');
  //       this.gameInfo.innerHTML = 'Circle ⭕ Turn First !';
  //     } else if (turn === 1) {
  //       this.circleBoard.classList.remove('turn');
  //       this.crossBoard.classList.add('turn');
  //       this.gameInfo.innerHTML = 'Cross ❌ Turn First !';
  //     }
  //   }, 1000);
  //   return (turn = random);
  // }

  _addIcons(x, y, icon) {
    this.boxes.forEach((box) => {
      if (x === box.x && y === box.y) {
        box.innerHTML = icon;
      }
    });
  }
  _toggleTurns(message) {
    this.circleBoard.classList.toggle('turn');
    this.crossBoard.classList.toggle('turn');
    this.gameInfo.innerHTML = message;
  }
  _closeOverlay() {
    ['click', 'keydown'].forEach((ev) =>
      this.overlay.addEventListener(ev, function () {
        this.classList.add('hidden');
      }),
    );
  }
  _displayPlayerScore(message) {
    setTimeout(() => {
      this.overlay.classList.toggle('hidden');
      this._closeOverlay();
      this.gameResult.innerHTML = this.gameInfo.innerHTML = message;
    }, 500);
  }
}

export default new boxView();
