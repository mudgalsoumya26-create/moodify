import { useEffect, useRef, useState } from "react";
import "./Player.css";

const Player = ({
  title = "lovely (with Khalid)",
  
  cover = "/images/lovely.jpg",
  audioSrc = "",
  onNext,
  onPrevious,
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || !audioSrc) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const skip = (seconds) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = Math.max(
      0,
      Math.min(audioRef.current.currentTime + seconds, duration || Infinity)
    );
  };

  const changeProgress = (event) => {
    const value = Number(event.target.value);
    setProgress(value);

    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  const changeSpeed = (event) => {
    const value = Number(event.target.value);
    setSpeed(value);

    if (audioRef.current) {
      audioRef.current.playbackRate = value;
    }
  };

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <div className="music-player">
      {audioSrc && <audio ref={audioRef} src={audioSrc} />}

      <div className="player-topbar">
        <button className="icon-button">‹</button>
        <span>SWEETENER</span>
        <button className="icon-button">⋮</button>
      </div>

      <div className="album-cover">
        <img src={cover} alt={`${title} album cover`} />
      </div>

      <div className="song-info">
        <h2>{title}</h2>
        
      </div>

      <div className="progress-container">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={progress}
          onChange={changeProgress}
        />

        <div className="time-labels">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-controls">
        <button className="control-button" onClick={() => skip(-5)}>
          ↶<small>5</small>
        </button>

        <button className="control-button" onClick={onPrevious}>
          ⏮
        </button>

        <button className="play-button" onClick={togglePlay}>
          {isPlaying ? "Ⅱ" : "▶"}
        </button>

        <button className="control-button" onClick={onNext}>
          ⏭
        </button>

        <button className="control-button" onClick={() => skip(5)}>
          ↷<small>5</small>
        </button>
      </div>

      <div className="player-options">
        <label htmlFor="speed">Speed</label>
        <select id="speed" value={speed} onChange={changeSpeed}>
          <option value="0.5">0.5x</option>
          <option value="0.75">0.75x</option>
          <option value="1">1x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </div>
  );
};

export default Player;