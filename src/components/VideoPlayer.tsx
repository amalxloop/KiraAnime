"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Loader2, Settings, Subtitles, Maximize, Minimize, Volume2, VolumeX, Play, Pause } from "lucide-react";

interface VideoPlayerProps {
  episodeId: string;
  server?: string;
  category?: "sub" | "dub";
  onProgress?: (currentTime: number, duration: number) => void;
}

interface Track {
  file: string;
  label: string;
  kind: string;
  default?: boolean;
}

interface QualityLevel {
  height: number;
  bitrate: number;
  index: number;
}

export function VideoPlayer({ episodeId, server = "hd-2", category = "sub", onProgress }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subtitles, setSubtitles] = useState<Track[]>([]);
  const [selectedSubtitle, setSelectedSubtitle] = useState<string | null>(null);
  const [qualityLevels, setQualityLevels] = useState<QualityLevel[]>([]);
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

    const loadVideo = async () => {
      setLoading(true);
      setError(null);

      try {
        const isBrowser = typeof window !== "undefined";
        const endpoint = `/stream?id=${encodeURIComponent(episodeId)}&server=${server}&type=${category}`;
        const url = isBrowser 
          ? `/api/hianime?endpoint=${encodeURIComponent(endpoint)}`
          : `https://animo.qzz.io/api/v1${endpoint}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch stream");
        
        const data = await res.json();
        const streamData = data.data || data;
        
        const directUrl = streamData.link?.directUrl;
        const videoUrl = directUrl || streamData.link?.file || streamData.sources?.[0]?.url;
        
        if (!videoUrl) {
          throw new Error("No video source available");
        }

        // Load subtitles if available
        if (streamData.tracks && Array.isArray(streamData.tracks)) {
          const subtitleTracks = streamData.tracks.filter((t: Track) => t.kind === "captions" || t.kind === "subtitles");
          setSubtitles(subtitleTracks);
          const defaultTrack = subtitleTracks.find((t: Track) => t.default);
          if (defaultTrack) {
            setSelectedSubtitle(defaultTrack.file);
          } else if (subtitleTracks.length > 0) {
            // Enable first subtitle track if no default
            setSelectedSubtitle(subtitleTracks[0].file);
          }
        }

        const loadSource = async (sourceUrl: string, isRetry = false) => {
          return new Promise<void>((resolve, reject) => {
            if (Hls.isSupported()) {
              if (hlsRef.current) {
                hlsRef.current.destroy();
              }

              const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
                backBufferLength: 90,
                xhrSetup: (xhr) => {
                  xhr.timeout = 30000;
                },
              });

              hlsRef.current = hls;
              hls.loadSource(sourceUrl);
              hls.attachMedia(video);

              hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                setLoading(false);
                
                // Extract quality levels
                const levels: QualityLevel[] = data.levels.map((level: any, index: number) => ({
                  height: level.height,
                  bitrate: level.bitrate,
                  index,
                }));
                setQualityLevels(levels);
                
                // Set default quality to 1080p or highest available
                const q1080 = levels.findIndex(l => l.height === 1080);
                if (q1080 !== -1) {
                  hls.currentLevel = q1080;
                  setSelectedQuality(q1080);
                } else {
                  hls.currentLevel = levels.length - 1;
                  setSelectedQuality(levels.length - 1);
                }
                
                video.play().catch(() => {});
                resolve();
              });

              hls.on(Hls.Events.ERROR, (event, data) => {
                console.error("HLS Error:", data);
                if (data.fatal) {
                  switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                      if (!isRetry && streamData.link?.file && streamData.link.file !== sourceUrl) {
                        console.log("Network error, trying proxy URL");
                        hls.destroy();
                        loadSource(streamData.link.file, true).catch(reject);
                      } else {
                        reject(new Error("Network error loading video"));
                      }
                      break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                      hls.recoverMediaError();
                      break;
                    default:
                      reject(new Error("Fatal error loading video"));
                      break;
                  }
                }
              });
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
              video.src = sourceUrl;
              video.addEventListener("loadedmetadata", () => {
                setLoading(false);
                video.play().catch(() => {});
                resolve();
              });
              video.addEventListener("error", () => {
                if (!isRetry && streamData.link?.file && streamData.link.file !== sourceUrl) {
                  video.src = streamData.link.file;
                } else {
                  reject(new Error("Failed to load video"));
                }
              });
            } else {
              reject(new Error("HLS not supported in this browser"));
            }
          });
        };

        await loadSource(videoUrl);
      } catch (err) {
        console.error("Video load error:", err);
        setError(err instanceof Error ? err.message : "Failed to load video");
        setLoading(false);
      }
    };

    loadVideo();

    const handleTimeUpdate = () => {
      if (onProgress && video) {
        onProgress(video.currentTime, video.duration);
      }
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("volumechange", handleVolumeChange);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("volumechange", handleVolumeChange);
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [episodeId, server, category, onProgress]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = parseFloat(e.target.value);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = parseFloat(e.target.value);
  };

  const changeQuality = (index: number) => {
    const hls = hlsRef.current;
    if (!hls) return;
    
    hls.currentLevel = index;
    setSelectedQuality(index);
    setShowSettings(false);
  };

  const changeSubtitle = (trackFile: string | null) => {
    setSelectedSubtitle(trackFile);
    setShowSubtitles(false);
    
    const video = videoRef.current;
    if (!video) return;

    // Disable all text tracks first
    Array.from(video.textTracks).forEach(track => {
      track.mode = "disabled";
    });

    if (trackFile) {
      // Find and enable the selected track
      const track = Array.from(video.textTracks).find(t => 
        subtitles.find(s => s.file === trackFile)?.label === t.label
      );
      if (track) {
        track.mode = "showing";
      }
    }
  };

  // Enable default subtitle on video load
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !selectedSubtitle) return;

    const enableSubtitle = () => {
      const track = Array.from(video.textTracks).find(t => 
        subtitles.find(s => s.file === selectedSubtitle)?.label === t.label
      );
      if (track) {
        track.mode = "showing";
      }
    };

    video.addEventListener("loadedmetadata", enableSubtitle);
    
    // Try to enable immediately if metadata is already loaded
    if (video.readyState >= 1) {
      enableSubtitle();
    }

    return () => {
      video.removeEventListener("loadedmetadata", enableSubtitle);
    };
  }, [selectedSubtitle, subtitles]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-red-400 mb-2">{error}</p>
          <p className="text-gray-500 text-sm">Try selecting a different server</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full bg-black group">
      <video
        ref={videoRef}
        className="w-full h-full"
        playsInline
        preload="auto"
        crossOrigin="anonymous"
      >
        {subtitles.map((track, idx) => (
          <track
            key={idx}
            kind={track.kind}
            label={track.label}
            src={track.file}
            default={track.default}
          />
        ))}
      </video>
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
        </div>
      )}

      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 mb-4 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />

        {/* Controls Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button onClick={togglePlay} className="text-white hover:text-purple-400 transition-colors">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-white hover:text-purple-400 transition-colors">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Time */}
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Subtitles */}
            {subtitles.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`p-2 rounded hover:bg-white/10 transition-colors ${selectedSubtitle ? "text-purple-400" : "text-white"}`}
                >
                  <Subtitles className="w-5 h-5" />
                </button>
                {showSubtitles && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/95 border border-purple-500/20 rounded-lg p-2 min-w-[200px]">
                    <button
                      onClick={() => changeSubtitle(null)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${!selectedSubtitle ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-white/10"}`}
                    >
                      Off
                    </button>
                    {subtitles.map((track, idx) => (
                      <button
                        key={idx}
                        onClick={() => changeSubtitle(track.file)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${selectedSubtitle === track.file ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-white/10"}`}
                      >
                        {track.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Quality Settings */}
            {qualityLevels.length > 1 && (
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded hover:bg-white/10 text-white transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/95 border border-purple-500/20 rounded-lg p-2 min-w-[150px]">
                    <div className="text-gray-400 text-xs font-semibold px-3 py-1 mb-1">Quality</div>
                    <button
                      onClick={() => {
                        if (hlsRef.current) {
                          hlsRef.current.currentLevel = -1;
                          setSelectedQuality(-1);
                          setShowSettings(false);
                        }
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${selectedQuality === -1 ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-white/10"}`}
                    >
                      Auto
                    </button>
                    {qualityLevels.sort((a, b) => b.height - a.height).map((level) => (
                      <button
                        key={level.index}
                        onClick={() => changeQuality(level.index)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${selectedQuality === level.index ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-white/10"}`}
                      >
                        {level.height}p
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Fullscreen */}
            <button onClick={toggleFullscreen} className="p-2 rounded hover:bg-white/10 text-white transition-colors">
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}