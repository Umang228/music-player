import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaRandom, FaRedoAlt } from "react-icons/fa";

const NowPlayingCard = ({ song, playing, togglePlayback, songs, setCurrentSong }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const audioRef = useRef(null);

  // Handle song change (shuffle and loop logic)
  useEffect(() => {
    if (audioRef.current && song && song.file) {
      audioRef.current.src = song.file;
      audioRef.current.load();
    }
  }, [song]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !song) return;

    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    const updateTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const setSongDuration = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current.addEventListener("timeupdate", updateTime);
    audioRef.current.addEventListener("loadedmetadata", setSongDuration);

    // Handle loop behavior
    if (isLooping) {
      audioRef.current.loop = true;
    } else {
      audioRef.current.loop = false;
    }

    audioRef.current.addEventListener("ended", handleSongEnd);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateTime);
      audioRef.current.removeEventListener("loadedmetadata", setSongDuration);
      audioRef.current.removeEventListener("ended", handleSongEnd);
    };
  }, [playing, song, isLooping]);

  const handleSongEnd = () => {
    if (isShuffling) {
      playRandomSong();
    } else {
      const currentIndex = songs.findIndex((s) => s.id === song.id);
      const nextSong = songs[(currentIndex + 1) % songs.length]; // Loop back to the first song
      setCurrentSong(nextSong);
    }
  };

  const handleSliderChange = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const playRandomSong = () => {
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    setCurrentSong(randomSong);
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  if (!song || !song.file) return null;

  return (
    <div className="w-45 p-4 bg-red-600 text-white rounded-lg shadow-lg mb-6">
      <audio ref={audioRef} />
      <h2 className="text-sm font-bold text-center mb-3">Now Playing</h2>
      <div className="relative rounded-lg overflow-hidden mb-3">
        <img
          src="/artist.jpeg"
          alt={`${song.title} cover`}
          className="w-full h-30 object-cover"
        />
      </div>
      <p className="text-md font-semibold text-center">{song.title}</p>
      <p className="text-sm text-center text-gray-200">{song.artist}</p>
      
      {/* Slider */}
      <div className="mt-4">
        <div className="relative">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => handleSliderChange(e.target.value)}
            className="w-full h-2 bg-gray-400 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ff4d4d ${((currentTime / duration) * 100) || 0}%, #555 ${((currentTime / duration) * 100) || 0}%)`
            }}
          />
          <div className="flex justify-between text-xs mt-1 text-gray-200">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-between mt-4 text-lg">
        <button onClick={toggleShuffle} className="hover:text-gray-300">
          <FaRandom color={isShuffling ? "green" : "white"} />
        </button>
        <button className="hover:text-gray-300">
          <FaStepBackward />
        </button>
        <button onClick={togglePlayback} className="hover:text-gray-300">
          {playing ? <FaPause /> : <FaPlay />}
        </button>
        <button className="hover:text-gray-300">
          <FaStepForward />
        </button>
        <button onClick={toggleLoop} className="hover:text-gray-300">
          <FaRedoAlt color={isLooping ? "green" : "white"} />
        </button>
      </div>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default NowPlayingCard;
