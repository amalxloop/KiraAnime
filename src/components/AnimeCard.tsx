"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Star, Plus, Info, Check, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useMyList } from "@/contexts/MyListContext";

interface AnimeCardProps {
  id: string;
  title: string;
  image: string;
  rating?: string | number;
  episodes?: number;
  type?: string;
  duration?: string;
}

const FALLBACK_IMAGE = "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg";

export function AnimeCard({
  id,
  title,
  image,
  rating,
  episodes,
  type = "TV",
  duration,
}: AnimeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(image || FALLBACK_IMAGE);
  const [loading, setLoading] = useState(false);

  const { isInList, addToList, removeFromList } = useMyList();
  const inList = isInList(id);

  const handleAddToList = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading) return;
    setLoading(true);

    try {
      if (inList) {
        const success = await removeFromList(id);
        if (success) toast.success("Removed from My List");
      } else {
        const success = await addToList({
          anime_id: id,
          anime_title: title,
          anime_poster: imgSrc,
          anime_type: type,
          anime_rating: String(rating || "N/A"),
          anime_episodes: episodes || 0,
        });
        if (success) toast.success("Added to My List");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Link href={`/anime/${id}`} className="block relative aspect-[2/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="px-3 py-1 rounded-lg bg-[#030014]/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
            {type}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#030014]/80 backdrop-blur-md border border-white/10">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-[10px] font-black">{rating || "N/A"}</span>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-x-0 bottom-0 p-4 z-20"
            >
              <div className="flex items-center justify-between gap-2">
                <Link
                  href={`/watch/${id}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black text-xs font-black hover:bg-purple-500 hover:text-white transition-all transform active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current" />
                  PLAY
                </Link>
                <button
                  onClick={handleAddToList}
                  className={`p-3 rounded-xl backdrop-blur-md border border-white/10 transition-all transform active:scale-90 ${
                    inList ? "bg-purple-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      <div className="mt-4 px-1">
        <Link href={`/anime/${id}`}>
          <h3 className="text-white font-bold text-sm line-clamp-1 group-hover:text-purple-400 transition-colors mb-1.5">
            {title}
          </h3>
        </Link>
        <div className="flex items-center gap-3 text-[10px] font-medium text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{duration || "24m"}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-700" />
          <span>{episodes || 0} EPISODES</span>
        </div>
      </div>
    </motion.div>
  );
}
