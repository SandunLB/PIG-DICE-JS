
const diceRollSound = new Audio('audio/dice-roll.mp3');
const switchTurnSound = new Audio('audio/switch-turn.mp3');
const winSound = new Audio('audio/win.mp3');
const backgroundMusic = new Audio('audio/background-music.mp3');


backgroundMusic.volume = 0.3;


let isMusicPlaying = false;
function toggleMusic() {
  if (isMusicPlaying) {
    backgroundMusic.pause();
    isMusicPlaying = false;
  } else {
    backgroundMusic.loop = true; 
    backgroundMusic.play();
    isMusicPlaying = true;
  }
}


document.addEventListener('DOMContentLoaded', function() {
  const musicButton = document.querySelector('.btn--music');
  if (musicButton) {
    musicButton.addEventListener('click', toggleMusic);
  }
});
