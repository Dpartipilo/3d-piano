export const playAudio = (e: any, musicNote: string) => {
  e.stopPropagation();
  if (!musicNote) return;
  const audio = new Audio(
    `http://carolinegabriel.com/demo/js-keyboard/sounds/0${musicNote}.wav`
  );

  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
};
