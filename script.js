'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnSetScore = document.querySelector('.btn--set-score');
const inputWinningScore = document.getElementById('winning-score');
const modeToggle = document.getElementById('game-mode-toggle');
const modeLabel = document.getElementById('mode-label');
const playerName0 = document.getElementById('name--0');
const playerName1 = document.getElementById('name--1');

let scores, currentScore, activePlayer, playing, winningScore, singlePlayerMode;

// Initialize game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  winningScore = 100; // Default winning score
  singlePlayerMode = modeToggle.checked;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // Update player names based on mode
  if (singlePlayerMode) {
    playerName0.textContent = 'You';
    playerName1.textContent = 'AI';
  } else {
    playerName0.textContent = 'Player 1';
    playerName1.textContent = 'Player 2';
  }

  modeLabel.textContent = singlePlayerMode ? 'Single Player' : 'Multiplayer';
};

init();

// Switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  if (singlePlayerMode && activePlayer === 1) {
    setTimeout(aiTurn, 1000); // AI takes its turn after a delay
  }
};

// AI Turn
const aiTurn = function () {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    if (Math.random() > 0.5 || currentScore >= 20) {
      btnHold.click(); // AI decides to hold
    } else {
      setTimeout(aiTurn, 1000); // AI rolls again after a delay
    }
  } else {
    switchPlayer(); // AI rolled a 1, switch back to Player 1
  }
};

// Roll Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold Score
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= winningScore) {
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// New Game
btnNew.addEventListener('click', init);

// Set Winning Score
btnSetScore.addEventListener('click', function () {
  const inputScore = inputWinningScore.value;
  if (inputScore && inputScore > 0) {
    winningScore = inputScore;
    alert(`Winning score set to ${winningScore}`);
  } else {
    alert('Please enter a valid score');
  }
});

// Handle game mode toggle
modeToggle.addEventListener('change', function () {

  singlePlayerMode = modeToggle.checked;
  modeLabel.textContent = singlePlayerMode ? 'Single Player' : 'Multiplayer';
  init(); // Reinitialize the game when mode changes
});
