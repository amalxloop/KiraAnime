"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimeCard } from "./AnimeCard";

interface Anime {
  id: string;
  title: string;
  image: string;
  rating?: string | number;
  episodes?: number;
  type?: string;
}

interface AnimeSectionProps {
  title: string;
  subtitle?: string;
  animeList: Anime[];
}

export function AnimeSection({ title, subtitle, animeList }: AnimeSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            {subtitle && (
              <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {animeList.map((anime) => (
            <div key={anime.id} className="flex-shrink-0 w-[180px] sm:w-[200px]">
              <AnimeCard {...anime} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
