import React from "react";

export const playAudio = (isPlaying, audioRef) => {
  // check if the song is playing
  if (isPlaying) {
    const playPromise = audioRef.current.play();
    // if the audio is undefined
    if (playPromise !== undefined) {
      // then wait a moment :)
      playPromise.then((audio) => {
        // when it's loaded, play
        audioRef.current.play();
      });
    }
  }
};
