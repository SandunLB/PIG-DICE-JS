// Audio elements
const diceRollSound = new Audio('dice-roll.mp3');
const switchTurnSound = new Audio('switch-turn.mp3');
const winSound = new Audio('win.mp3');
const backgroundMusic = new Audio('background-music.mp3');

// Background music loop
backgroundMusic.loop = true;

// Play background music
const playBackgroundMusic = function () {
  backgroundMusic.play();
};

// Pause background music
const pauseBackgroundMusic = function () {
  backgroundMusic.pause();
};

// Play dice roll sound
const playDiceRollSound = function () {
  diceRollSound.play();
};

// Play switch turn sound
const playSwitchTurnSound = function () {
  switchTurnSound.play();
};

// Play win sound
const playWinSound = function () {
  winSound.play();
};
