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
const aiDifficulty = document.getElementById('ai-difficulty'); // Difficulty selector

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
  
  // Enable buttons for the human player
  btnRoll.disabled = false;
  btnHold.disabled = false;
};

init();

// Switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  if (singlePlayerMode && activePlayer === 1) {
    // AI's turn
    aiTurn();
  } else {
    // Enable buttons for the human player
    btnRoll.disabled = false;
    btnHold.disabled = false;
  }
};

// AI Decision Logic Based on Difficulty
const aiTurn = function () {
  btnRoll.disabled = true;
  btnHold.disabled = true;

  const difficulty = aiDifficulty.value; // Get selected difficulty

  // Different behavior based on difficulty
  let holdThreshold, rollDelay;

  if (difficulty === 'easy') {
    holdThreshold = 15; // AI holds with a lower score, takes more risks
    rollDelay = Math.random() * 500 + 1000; // Slower rolls
  } else if (difficulty === 'medium') {
    holdThreshold = 20; // Balanced approach
    rollDelay = Math.random() * 1000 + 1000; // Moderate speed
  } else if (difficulty === 'hard') {
    holdThreshold = 25; // AI holds with a higher score, takes fewer risks
    rollDelay = Math.random() * 1500 + 500; // Faster rolls
  }

  setTimeout(() => {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      current1El.textContent = currentScore;

      // Randomly decide whether to hold or roll again based on difficulty
      const shouldHold = Math.random() > 0.5 || currentScore >= holdThreshold;

      if (shouldHold) {
        // Random delay before AI decides to hold
        const aiHoldDelay = Math.random() * 1000 + 500;

        setTimeout(() => {
          scores[1] += currentScore;
          score1El.textContent = scores[1];

          if (scores[1] >= winningScore) {
            playing = false;
            diceEl.classList.add('hidden');
            player1El.classList.add('player--winner');
            player1El.classList.remove('player--active');
          } else {
            switchPlayer();
          }
        }, aiHoldDelay);
      } else {
        aiTurn(); // AI rolls again
      }
    } else {
      switchPlayer(); // AI rolls a 1, switches back to the human player
    }
  }, rollDelay); // AI rolls after a delay based on difficulty
};


// Rolling dice functionality
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

// Hold score functionality
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

// New Game functionality
btnNew.addEventListener('click', init);

// Set Winning Score functionality
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
