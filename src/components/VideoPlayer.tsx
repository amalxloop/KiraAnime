"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Loader2, Settings, Subtitles, Maximize, Minimize, Volume2, VolumeX, Play, Pause, SkipForward } from "lucide-react";
import { getStream, type StreamData } from "@/lib/api";

interface VideoPlayerProps {
  episodeId: string;
  animeId: string;
  server?: string;
  category?: "sub" | "dub";
  onProgress?: (currentTime: number, duration: number) => void;
}

export function VideoPlayer({ animeId, episodeId, server = "hd-1", category = "sub", onProgress }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streamData, setStreamData] = useState<StreamData | null>(null);
  const [selectedSubtitle, setSelectedSubtitle] = useState<string | null>(null);
  const [qualityLevels, setQualityLevels] = useState<any[]>([]);
  const [selectedQuality, setSelectedQuality] = useState<number>(-1);
  const [showSettings, setShowSettings] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loadStream = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getStream(animeId, episodeId, server, category);
        setStreamData(data);
        
        const videoUrl = data.sources?.[0]?.url;
        if (!videoUrl) throw new Error("No stream found");

        if (Hls.isSupported()) {
          if (hlsRef.current) hlsRef.current.destroy();
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
          });
          hlsRef.current = hls;
          hls.loadSource(videoUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, (_, parsedData) => {
            setLoading(false);
            setQualityLevels(parsedData.levels);
            video.play().catch(() => {});
          });
          hls.on(Hls.Events.ERROR, (_, errorData) => {
            if (errorData.fatal) {
              hls.recoverMediaError();
            }
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = videoUrl;
          video.onloadedmetadata = () => {
            setLoading(false);
            video.play().catch(() => {});
          };
        }
      } catch (err) {
        setError("Failed to load stream. Try another server.");
        setLoading(false);
      }
    };

    loadStream();

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
      if (onProgress) onProgress(video.currentTime, video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", () => setIsPlaying(true));
    video.addEventListener("pause", () => setIsPlaying(false));
    
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [animeId, episodeId, server, category]);

  const togglePlay = () => {
    if (videoRef.current?.paused) videoRef.current.play();
    else videoRef.current?.pause();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const skipIntro = () => {
    if (videoRef.current && streamData?.intro?.end) {
      videoRef.current.currentTime = streamData.intro.end;
    }
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div ref={containerRef} className="relative w-full aspect-video bg-black group overflow-hidden rounded-2xl border border-white/5">
      <video ref={videoRef} className="w-full h-full" playsInline crossOrigin="anonymous">
        {streamData?.tracks?.map((track, i) => (
          <track
            key={i}
            kind={track.kind}
            label={track.label}
            src={track.file}
            default={track.default}
          />
        ))}
      </video>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-30">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30 p-6 text-center">
          <p className="text-white font-bold">{error}</p>
        </div>
      )}

      {/* Controls Overlay */}
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent">
        
        {/* Intro Skip */}
        {streamData?.intro && currentTime >= streamData.intro.start && currentTime <= streamData.intro.end && (
          <button
            onClick={skipIntro}
            className="absolute bottom-24 right-6 flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white font-black text-xs hover:bg-purple-500 transition-all shadow-2xl"
          >
            <SkipForward className="w-4 h-4 fill-current" />
            SKIP INTRO
          </button>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => videoRef.current && (videoRef.current.currentTime = parseFloat(e.target.value))}
            className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-purple-500"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button onClick={togglePlay} className="text-white hover:text-purple-400 transition-colors">
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
              </button>
              
              <div className="flex items-center gap-2 text-white font-medium text-sm tabular-nums">
                <span>{formatTime(currentTime)}</span>
                <span className="text-white/40">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setShowSubtitles(!showSubtitles)} className="text-white hover:text-purple-400">
                <Subtitles className="w-6 h-6" />
              </button>
              <button onClick={() => setShowSettings(!showSettings)} className="text-white hover:text-purple-400">
                <Settings className="w-6 h-6" />
              </button>
              <button onClick={toggleFullscreen} className="text-white hover:text-purple-400">
                {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
