// Audio elements
const diceRollSound = new Audio('audio/dice-roll.mp3');
const switchTurnSound = new Audio('audio/switch-turn.mp3');
const winSound = new Audio('audio/win.mp3');
const backgroundMusic = new Audio('audio/background-music.mp3');

// Background music toggle function
let isMusicPlaying = false;
function toggleMusic() {
  if (isMusicPlaying) {
    backgroundMusic.pause();
    isMusicPlaying = false;
  } else {
    backgroundMusic.loop = true; // Set to loop the background music
    backgroundMusic.play();
    isMusicPlaying = true;
  }
}

// Ensure DOM is loaded before adding event listener
document.addEventListener('DOMContentLoaded', function() {
  const musicButton = document.querySelector('.btn--music');
  if (musicButton) {
    musicButton.addEventListener('click', toggleMusic);
  }
});
