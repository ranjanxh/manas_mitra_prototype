import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

const MeditationPage = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  // You will need to place your audio file in the `public/audio` directory
  const audioSrc = "/audio/5min-meditation.mp3"; 

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] bg-white rounded-lg shadow-md overflow-hidden">
      {/* Background & Player */}
      <div
        className="flex-1 flex flex-col items-center justify-center text-white relative bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 text-center p-4">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">
            5-Minute Guided Meditation for Focus
          </h1>
          <button
            onClick={togglePlay}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-white text-blue-600 shadow-lg hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
          </button>
          <div className="w-72 md:w-96 bg-white/30 h-1.5 rounded-full mt-6 overflow-hidden">
            <div
              className="bg-white h-1.5 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <audio ref={audioRef} src={audioSrc} />
        </div>
      </div>

      {/* Instructions & Transcript */}
      <div className="bg-white p-6 text-center border-t">
        <p className="text-gray-700 mb-4">
          Find a quiet space, put on your headphones, and press play to begin.
        </p>
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          {showTranscript ? "Hide Transcript" : "View Full Transcript"}
        </button>
        {showTranscript && (
          <div className="mt-4 text-left max-w-2xl mx-auto text-gray-600 text-sm leading-relaxed">
            <p>
              Welcome to this 5-minute guided meditation for focus. Sit comfortably, close your
              eyes, and take a deep breath in... and out. Let your mind settle...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeditationPage;