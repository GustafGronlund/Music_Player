import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  setSongInfo,
  songInfo,
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setCurrentSong,
}) => {
  // Event handlers
  const playSongHandler = () => {
    // if the song is playing
    if (isPlaying) {
      // pause it
      audioRef.current.pause();
      // changing state
      setIsPlaying(!isPlaying);
    } else {
      // if it's already paused, play it
      audioRef.current.play();
      // changing state
      setIsPlaying(!isPlaying);
    }
  };
  // format the time from e.target on audio
  const getTime = (time) => {
    return (
      // time / 60 gives the minute, time % 60 every time we hit 60 it starts at zero again
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    // updating audio
    audioRef.current.currentTime = e.target.value;
    // updating setSongInfo state on the property currentTime when input onchange is being activated
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const skipTrackHandler = (direction) => {
    // getting the current index
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      // incrementing by one on current index, also adding modulus operator so it starts from beginning when it's on the last song of array
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      // if currentindex -1 equals songs.length -1
      if ((currentIndex - 1) % songs.length === -1) {
        // gives the last index in array
        setCurrentSong(songs[songs.length - 1]);
        return;
      }
      // decreasing index by one
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
