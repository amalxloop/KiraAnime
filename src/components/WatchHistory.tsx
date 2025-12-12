"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Play } from "lucide-react";
import { motion } from "framer-motion";

interface WatchHistoryItem {
  id: string;
  anime_id: string;
  anime_title: string;
  anime_poster: string | null;
  episode_id: string;
  episode_number: number | null;
  progress_seconds: number;
  duration_seconds: number | null;
  watched_at: string;
}

export function WatchHistory() {
  const [history, setHistory] = useState<WatchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch("/api/watch-history");
      const result = await response.json();
      
      if (result.success) {
        setHistory(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching watch history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-purple-600/20">
          <Clock className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Continue Watching</h2>
          <p className="text-gray-400 text-sm">Pick up where you left off</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {history.map((item) => {
          const progress = item.duration_seconds
            ? (item.progress_seconds / item.duration_seconds) * 100
            : 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative"
            >
              <Link href={`/watch/${item.episode_id}`} className="block">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-purple-900/20">
                  <img
                    src={item.anime_poster || "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg"}
                    alt={item.anime_title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-3 rounded-full bg-purple-600 neon-glow">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2">
                      {item.anime_title}
                    </h3>
                    {item.episode_number && (
                      <p className="text-gray-300 text-xs mb-2">
                        Episode {item.episode_number}
                      </p>
                    )}
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 transition-all"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
