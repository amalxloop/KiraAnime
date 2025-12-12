"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Star, Plus, Info, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useMyList } from "@/contexts/MyListContext";

interface AnimeCardProps {
  id: string;
  title: string;
  image: string;
  rating?: string | number;
  episodes?: number;
  type?: string;
}

const FALLBACK_IMAGE = "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg";

function isValidImageUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== "string") return false;
  if (url.trim() === "") return false;
  if (url.includes("undefined") || url.includes("null")) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function AnimeCard({
  id,
  title,
  image,
  rating,
  episodes,
  type = "TV",
}: AnimeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(() => isValidImageUrl(image) ? image : FALLBACK_IMAGE);
  const [hasError, setHasError] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const { isInList, addToList, removeFromList } = useMyList();
  const inList = isInList(id);

  useEffect(() => {
    const validImage = isValidImageUrl(image) ? image : FALLBACK_IMAGE;
    if (imgSrc !== validImage) {
      setImgSrc(validImage);
      setHasError(false);
      setImageKey(prev => prev + 1);
    }
  }, [image, imgSrc]);

  const handleAddToList = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading) return;
    setLoading(true);

    try {
      if (inList) {
        const success = await removeFromList(id);
        if (success) {
          toast.success("Removed from My List");
        } else {
          toast.error("Failed to remove from list");
        }
      } else {
        const success = await addToList({
          anime_id: id,
          anime_title: title,
          anime_poster: imgSrc,
          anime_type: type,
          anime_rating: String(rating || "N/A"),
          anime_episodes: episodes || 0,
        });
        if (success) {
          toast.success("Added to My List");
        } else {
          toast.error("Failed to add to list");
        }
      }
    } catch (error) {
      console.error("Error updating list:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const displayRating = typeof rating === "number" ? rating.toFixed(1) : rating || "N/A";

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(FALLBACK_IMAGE);
      setImageKey(prev => prev + 1);
    }
  };

  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-purple-900/20">
        <Image
          key={`${id}-${imageKey}`}
          src={imgSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={handleImageError}
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />

        <div className="absolute top-2 left-2 flex gap-2">
          <span className="px-2 py-1 rounded-md bg-purple-600/90 text-white text-xs font-medium">
            {type}
          </span>
        </div>

        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-medium">{displayRating}</span>
        </div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href={`/watch/${id}`}
            className="p-3 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors neon-glow"
          >
            <Play className="w-5 h-5 text-white fill-white" />
          </Link>
          <button 
            onClick={handleAddToList}
            disabled={loading}
            className={`p-3 rounded-full transition-colors backdrop-blur-sm ${
              inList 
                ? "bg-green-600 hover:bg-green-500" 
                : "bg-white/10 hover:bg-white/20"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {inList ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <Plus className="w-5 h-5 text-white" />
            )}
          </button>
          <Link
            href={`/anime/${id}`}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
          >
            <Info className="w-5 h-5 text-white" />
          </Link>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">{title}</h3>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            {episodes !== undefined && episodes > 0 && (
              <span>{episodes} EP</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}