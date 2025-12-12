"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import { TrendingUp, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getMostPopular, type AnimeResult } from "@/lib/api";

export default function PopularPage() {
  const [animeList, setAnimeList] = useState<AnimeResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const data = await getMostPopular(1);
        if (data.animes && data.animes.length > 0) {
          setAnimeList(data.animes);
        } else {
          setAnimeList(fallbackAnime as unknown as AnimeResult[]);
        }
      } catch {
        setAnimeList(fallbackAnime as unknown as AnimeResult[]);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  return (
    <div className="min-h-screen bg-[#030014]">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Most Popular Anime
              </h1>
            </div>
            <p className="text-gray-400">
              The most popular and highly-rated anime of all time
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {animeList.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  id={anime.id}
                  title={anime.title || anime.name || "Unknown"}
                  image={anime.poster}
                  rating={anime.rating}
                  episodes={anime.episodes?.sub || anime.episodes?.eps}
                  type={anime.type || "TV"}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}