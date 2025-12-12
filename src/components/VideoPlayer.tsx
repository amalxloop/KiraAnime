"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Loader2 } from "lucide-react";

interface VideoPlayerProps {
  episodeId: string;
  server?: string;
  category?: "sub" | "dub";
  onProgress?: (currentTime: number, duration: number) => void;
}

export function VideoPlayer({ episodeId, server = "hd-2", category = "sub", onProgress }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

              hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setLoading(false);
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
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [episodeId, server, category, onProgress]);

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
    <div className="relative w-full h-full bg-black group">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        playsInline
        preload="auto"
      />
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
        </div>
      )}
    </div>
  );
}
