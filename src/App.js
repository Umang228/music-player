import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ArtistBanner from "./components/ArtistBanner";
import SongList from "./components/SongList";
import NowPlayingCard from "./components/NowPlayingCard";

const App = () => {
  const [songs, setSongs] = useState([
    {
      id: "1",
      title: "Billie Jean",
      artist: "Michael Jackson",
      time: "4:53",
      file: require("./assets/song-1.mp3"),
      playing: false,
    },
    {
      id: "2",
      title: "Beat It",
      artist: "Michael Jackson",
      time: "4:18",
      file: require("./assets/song-2.mp3"),
      playing: false,
    },
    {
      id: "3",
      title: "Smooth Criminal",
      artist: "Michael Jackson",
      time: "4:17",
      file: require("./assets/song-3.mp3"),
      playing: false,
    },
    {
      id: "4",
      title: "Don't Stop 'Til You Get Enough",
      artist: "Michael Jackson",
      time: "6:05",
      file: require("./assets/song-4.mp3"),
      playing: false,
    },
    {
      id: "5",
      title: "Rock With You",
      artist: "Michael Jackson",
      time: "3:40",
      file: require("./assets/song-5.mp3"),
      playing: false,
    },
  ]);

  const [currentSong, setCurrentSong] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song) => {
    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(song.file);
    newAudio.play();
    setAudio(newAudio);
    setIsPlaying(true);
    setCurrentSong(song);

    setSongs(
      songs.map((s) =>
        s.id === song.id ? { ...s, playing: true } : { ...s, playing: false }
      )
    );
  };

  const togglePlayback = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", () => setIsPlaying(false));
    }
    return () => {
      if (audio) {
        audio.removeEventListener("ended", () => setIsPlaying(false));
        audio.pause();
      }
    };
  }, [audio]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center p-6 bg-gradient-to-b from-red-900 to-black overflow-y-scroll scrollbar-hidden">
        <Navbar />
        <ArtistBanner />
        
        {/* Popular & See All */}
        <div className="w-[90%] flex justify-between items-center mt-1 mb-5">
          <h2 className="text-lg font-bold text-white">Popular</h2>
          <span className="text-sm text-white">See All</span>
        </div>

        <div className="w-full flex-grow">
          <SongList songs={songs} setSongs={setSongs} playSong={playSong} />
        </div>
      </div>

      {/* Now Playing Card */}
      <div className="w-72 p-6 bg-black flex flex-col justify-end">
        <NowPlayingCard song={currentSong} playing={isPlaying} togglePlayback={togglePlayback}/>
      </div>
    </div>
  );
};

export default App;
