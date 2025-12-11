"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Plus, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SpotlightAnime } from "@/lib/api";

interface HeroCarouselProps {
  spotlightAnimes?: SpotlightAnime[];
}

const fallbackAnime: SpotlightAnime[] = [
  {
    rank: 1,
    id: "one-piece-100",
    title: "One Piece",
    alternativeTitle: "ワンピース",
    synopsis: "Monkey D. Luffy sets out on an adventure to find the legendary treasure, One Piece, and become the King of the Pirates.",
    poster: "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/4b13e2faf7c875ecf0e826c0408e88e0.jpg",
    type: "TV",
    quality: "HD",
    duration: "24m",
    aired: "1999",
    episodes: { sub: 1100, dub: 1100, eps: 1100 },
  },
  {
    rank: 2,
    id: "jujutsu-kaisen-2nd-season-18413",
    title: "Jujutsu Kaisen",
    alternativeTitle: "呪術廻戦",
    synopsis: "A boy swallows a cursed talisman and becomes host to a powerful demon. Now he must navigate the world of curses to save humanity.",
    poster: "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/c1b123edceac7b7e978c5bb0f2a91d7c.jpg",
    type: "TV",
    quality: "HD",
    duration: "24m",
    aired: "2023",
    episodes: { sub: 23, dub: 23, eps: 23 },
  },
  {
    rank: 3,
    id: "attack-on-titan-112",
    title: "Attack on Titan",
    alternativeTitle: "進撃の巨人",
    synopsis: "Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans.",
    poster: "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/3a06f85a922a00cc3add7bf17fa10afc.jpg",
    type: "TV",
    quality: "HD",
    duration: "24m",
    aired: "2013",
    episodes: { sub: 88, dub: 88, eps: 88 },
  },
];

export function HeroCarousel({ spotlightAnimes }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const animeList = spotlightAnimes && spotlightAnimes.length > 0 ? spotlightAnimes : fallbackAnime;

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % animeList.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [animeList.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + animeList.length) % animeList.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % animeList.length);
  };

  const current = animeList[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={current.poster}
            alt={current.title}
            fill
            className="object-cover"
            priority
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-[#030014] via-[#030014]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-[#030014]/50" />
          
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <motion.div
          key={`content-${currentIndex}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-purple-600/80 text-white text-xs font-medium backdrop-blur-sm">
              #{current.rank} Spotlight
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-medium">{current.type || "TV"}</span>
            </div>
            <span className="text-gray-400">{current.aired || "2024"}</span>
            {current.episodes && (
              <span className="text-gray-400">{current.episodes.sub || current.episodes.eps} Episodes</span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {current.title}
          </h1>

          <p className="text-gray-400 text-sm mb-2">{current.alternativeTitle}</p>

          <p className="text-gray-300 text-lg mb-8 line-clamp-3">
            {current.synopsis}
          </p>

          <div className="flex items-center gap-4">
            <Link
              href={`/watch/${current.id}`}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold transition-all neon-glow"
            >
              <Play className="w-5 h-5 fill-white" />
              Watch Now
            </Link>
            <Link 
              href={`/anime/${current.id}`}
              className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur-sm transition-colors border border-white/20"
            >
              <Plus className="w-5 h-5" />
              More Info
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {animeList.slice(0, 10).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-purple-500"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors hidden sm:block z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors hidden sm:block z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}