"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import { Film } from "lucide-react";
import { useEffect, useState } from "react";
import { getMovies, type AnimeResult } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function MoviesPage() {
  const [movies, setMovies] = useState<AnimeResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies(1);
        if (data.animes && data.animes.length > 0) {
          setMovies(data.animes);
        } else {
          setMovies(fallbackMovies as unknown as AnimeResult[]);
        }
      } catch {
        setMovies(fallbackMovies as unknown as AnimeResult[]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-[#030014]">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Film className="w-8 h-8 text-purple-500" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Anime Movies
              </h1>
            </div>
            <p className="text-gray-400">
              The best anime movies and feature films of all time
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movies.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  id={anime.id}
                  title={anime.title || anime.name || "Unknown"}
                  image={anime.poster}
                  rating={anime.rating}
                  type="Movie"
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