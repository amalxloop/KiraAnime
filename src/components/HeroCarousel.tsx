"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Plus, ChevronLeft, ChevronRight, Calendar, Clock, Star, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SpotlightAnime } from "@/lib/api";

interface HeroCarouselProps {
  spotlightAnimes?: SpotlightAnime[];
}

export function HeroCarousel({ spotlightAnimes }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const animeList = spotlightAnimes && spotlightAnimes.length > 0 ? spotlightAnimes : [];

  useEffect(() => {
    if (animeList.length === 0) return;
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

  if (animeList.length === 0) return null;

  const current = animeList[currentIndex];

  return (
    <div className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#030014]">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={current.poster}
            alt={current.title}
            fill
            className="object-cover scale-105"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030014] via-[#030014]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent z-10" />
          
          <div className="absolute inset-0 z-0">
             <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
             <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl">
          <motion.div
            key={`info-${currentIndex}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-purple-600 text-white text-xs font-bold tracking-wider uppercase shadow-lg shadow-purple-500/20">
                #{current.rank} Spotlight
              </span>
              <div className="flex items-center gap-2 text-gray-300 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">{current.type}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium">{current.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">{current.aired}</span>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              {current.title}
            </h1>

            <p className="text-gray-400 text-lg mb-4 font-medium italic">
              {current.alternativeTitle}
            </p>

            <p className="text-gray-300 text-lg sm:text-xl mb-10 line-clamp-3 max-w-2xl leading-relaxed">
              {current.synopsis}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link
                href={`/watch/${current.id}`}
                className="group relative flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-black hover:bg-purple-500 hover:text-white transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Play className="relative w-6 h-6 fill-current" />
                <span className="relative">WATCH NOW</span>
              </Link>
              
              <Link
                href={`/anime/${current.id}`}
                className="flex items-center gap-3 px-8 py-5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold backdrop-blur-md transition-all border border-white/10"
              >
                <Info className="w-6 h-6" />
                DETAIL
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
        {animeList.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`transition-all duration-500 rounded-full ${
              index === currentIndex
                ? "w-12 h-2.5 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute right-8 bottom-12 flex gap-4 z-30 hidden sm:flex">
        <button
          onClick={handlePrev}
          className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
