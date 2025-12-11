"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import { search, filter, getGenres, type AnimeResult } from "@/lib/api";
import { Search, SlidersHorizontal, X, ChevronDown, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FallbackAnime extends AnimeResult {
  genres: string[];
}

const fallbackAnimeData: FallbackAnime[] = [
  { id: "one-piece-100", name: "One Piece", title: "One Piece", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg", rating: "9.2", type: "TV", episodes: { sub: 1100, dub: 1000, eps: 1100 }, genres: ["action", "adventure", "comedy", "fantasy"] },
  { id: "jujutsu-kaisen-2nd-season-18413", name: "Jujutsu Kaisen", title: "Jujutsu Kaisen", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bd5ae1d387a59c5abcf5e1a6a616728c.jpg", rating: "8.9", type: "TV", episodes: { sub: 47, dub: 47, eps: 47 }, genres: ["action", "supernatural", "horror"] },
  { id: "demon-slayer-kimetsu-no-yaiba-hashira-training-arc-19107", name: "Demon Slayer", title: "Demon Slayer", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/1f06eb0bff4e64ccdf9a64f6d0889839.jpg", rating: "8.7", type: "TV", episodes: { sub: 55, dub: 55, eps: 55 }, genres: ["action", "supernatural", "historical"] },
  { id: "attack-on-titan-112", name: "Attack on Titan", title: "Attack on Titan", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/3a06f85a922a00cc3add7bf17fa10afc.jpg", rating: "9.0", type: "TV", episodes: { sub: 88, dub: 88, eps: 88 }, genres: ["action", "drama", "fantasy", "military"] },
  { id: "naruto-shippuden-355", name: "Naruto Shippuden", title: "Naruto Shippuden", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9cbcf87f54194742e7686119089478f8.jpg", rating: "8.6", type: "TV", episodes: { sub: 500, dub: 500, eps: 500 }, genres: ["action", "adventure", "martial arts"] },
  { id: "my-hero-academia-1877", name: "My Hero Academia", title: "My Hero Academia", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/06f53b5c1d3e2d1f68c02acc5a87e8c8.jpg", rating: "8.4", type: "TV", episodes: { sub: 138, dub: 138, eps: 138 }, genres: ["action", "super power", "school"] },
  { id: "solo-leveling-18718", name: "Solo Leveling", title: "Solo Leveling", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/366b0acb2d80a42e702ab4cfc59b8a82.jpg", rating: "8.8", type: "TV", episodes: { sub: 12, dub: 12, eps: 12 }, genres: ["action", "adventure", "fantasy"] },
  { id: "chainsaw-man-17406", name: "Chainsaw Man", title: "Chainsaw Man", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b3f668d0d8da5c9154c35baf62edc32d.jpg", rating: "8.6", type: "TV", episodes: { sub: 12, dub: 12, eps: 12 }, genres: ["action", "supernatural", "horror"] },
  { id: "spy-x-family-17977", name: "Spy x Family", title: "Spy x Family", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/37f30a4cc99d5ec6b59e9a66df7e2d56.jpg", rating: "8.5", type: "TV", episodes: { sub: 37, dub: 37, eps: 37 }, genres: ["action", "comedy", "slice of life"] },
  { id: "tokyo-revengers-17822", name: "Tokyo Revengers", title: "Tokyo Revengers", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9c25caf0e77f56b7b76ee5a52ca4290d.jpg", rating: "8.2", type: "TV", episodes: { sub: 37, dub: 37, eps: 37 }, genres: ["action", "drama", "supernatural"] },
  { id: "death-note-60", name: "Death Note", title: "Death Note", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/696e9ec34fa4012ca77d8d32d9e10d85.jpg", rating: "9.0", type: "TV", episodes: { sub: 37, dub: 37, eps: 37 }, genres: ["mystery", "psychological", "thriller", "supernatural"] },
  { id: "fullmetal-alchemist-brotherhood-5", name: "Fullmetal Alchemist", title: "Fullmetal Alchemist", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/2ec8e50c6edf32dee9e7dfd651a5bf1d.jpg", rating: "9.1", type: "TV", episodes: { sub: 64, dub: 64, eps: 64 }, genres: ["action", "adventure", "drama", "fantasy"] },
  { id: "your-name-6", name: "Your Name", title: "Kimi no Na wa", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f58b0204c20ae3310f65ae7b8cb9987e.jpg", rating: "9.0", type: "Movie", episodes: { sub: 1, dub: 1, eps: 1 }, genres: ["romance", "drama", "supernatural"] },
  { id: "a-silent-voice-1728", name: "A Silent Voice", title: "Koe no Katachi", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/af6a1eea26cc29f2d2ef3a75a414b77f.jpg", rating: "8.9", type: "Movie", episodes: { sub: 1, dub: 1, eps: 1 }, genres: ["drama", "romance", "slice of life"] },
  { id: "spirited-away-889", name: "Spirited Away", title: "Sen to Chihiro", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a95dfdb22d2bc4eefaa9f4c1c1ff2e6e.jpg", rating: "9.3", type: "Movie", episodes: { sub: 1, dub: 1, eps: 1 }, genres: ["adventure", "drama", "fantasy", "supernatural"] },
  { id: "steins-gate-3", name: "Steins;Gate", title: "Steins;Gate", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/90cdf6f2c41ec2e52bdbb4f7b0b6c79d.jpg", rating: "9.1", type: "TV", episodes: { sub: 24, dub: 24, eps: 24 }, genres: ["sci-fi", "thriller", "drama", "psychological"] },
  { id: "code-geass-lelouch-of-the-rebellion-18", name: "Code Geass", title: "Code Geass", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/87e403c1c5f9fc82e1fa6ccb79d41c93.jpg", rating: "8.7", type: "TV", episodes: { sub: 25, dub: 25, eps: 25 }, genres: ["action", "drama", "mecha", "military", "sci-fi"] },
  { id: "hunter-x-hunter-2011-1028", name: "Hunter x Hunter", title: "Hunter x Hunter", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/eb50eb4bcbed7f2f740a83a8c1b4e58c.jpg", rating: "9.1", type: "TV", episodes: { sub: 148, dub: 148, eps: 148 }, genres: ["action", "adventure", "fantasy"] },
  { id: "violet-evergarden-10379", name: "Violet Evergarden", title: "Violet Evergarden", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/4a4c1b89b6e65e6a908ecb89d2f17a66.jpg", rating: "8.7", type: "TV", episodes: { sub: 13, dub: 13, eps: 13 }, genres: ["drama", "fantasy", "slice of life"] },
  { id: "sword-art-online-1686", name: "Sword Art Online", title: "Sword Art Online", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f0ad1f6aebb76c81a44e3fcc7fb8fffc.jpg", rating: "7.6", type: "TV", episodes: { sub: 25, dub: 25, eps: 25 }, genres: ["action", "adventure", "fantasy", "romance", "game"] },
  { id: "one-punch-man-1-15", name: "One Punch Man", title: "One Punch Man", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/3227d947edc11f4cc07fde02ee7d tried.jpg", rating: "8.5", type: "TV", episodes: { sub: 24, dub: 24, eps: 24 }, genres: ["action", "comedy", "parody", "super power"] },
  { id: "mob-psycho-100-2566", name: "Mob Psycho 100", title: "Mob Psycho 100", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/016a63a4c6af6bcf4ea9e18a72cc77b3.jpg", rating: "8.5", type: "TV", episodes: { sub: 12, dub: 12, eps: 12 }, genres: ["action", "comedy", "supernatural"] },
  { id: "bleach-thousand-year-blood-war-18411", name: "Bleach TYBW", title: "Bleach TYBW", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/1c960ac6ab22e66a81c4a5c59ef2b89a.jpg", rating: "9.0", type: "TV", episodes: { sub: 26, dub: 26, eps: 26 }, genres: ["action", "adventure", "supernatural"] },
  { id: "dragon-ball-super-1064", name: "Dragon Ball Super", title: "Dragon Ball Super", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/cf57c359f32e2c400a1a3df115df9dc9.jpg", rating: "7.4", type: "TV", episodes: { sub: 131, dub: 131, eps: 131 }, genres: ["action", "adventure", "comedy", "martial arts", "super power"] },
  { id: "black-clover-2404", name: "Black Clover", title: "Black Clover", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f58b0e0d84fd5f5f6dc10acb7e68e2c8.jpg", rating: "8.3", type: "TV", episodes: { sub: 170, dub: 170, eps: 170 }, genres: ["action", "comedy", "fantasy", "magic"] },
  { id: "horimiya-16919", name: "Horimiya", title: "Horimiya", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/8fc6c5f1ffdc7a0ad9e27df28fdc89bf.jpg", rating: "8.3", type: "TV", episodes: { sub: 13, dub: 13, eps: 13 }, genres: ["romance", "comedy", "slice of life", "school"] },
  { id: "toradora-1283", name: "Toradora!", title: "Toradora!", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/8af0e53b7f12f8af06fe3b6e5e7c1285.jpg", rating: "8.1", type: "TV", episodes: { sub: 25, dub: 25, eps: 25 }, genres: ["comedy", "romance", "slice of life", "school"] },
  { id: "kaguya-sama-love-is-war-14151", name: "Kaguya-sama", title: "Kaguya-sama", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f0c6b7b6c8db0c06e2a8cf741a1c5fb5.jpg", rating: "8.6", type: "TV", episodes: { sub: 12, dub: 12, eps: 12 }, genres: ["comedy", "romance", "psychological", "school"] },
  { id: "re-zero-starting-life-in-another-world-2099", name: "Re:Zero", title: "Re:Zero", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/88e08d8d3efb48bf0c49faacb8e36c17.jpg", rating: "8.3", type: "TV", episodes: { sub: 25, dub: 25, eps: 25 }, genres: ["drama", "fantasy", "psychological", "thriller", "isekai"] },
  { id: "konosuba-gods-blessing-on-this-wonderful-world-2107", name: "Konosuba", title: "Konosuba", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c11c5e7f8c1c2d55e8f94e07a7e6acae.jpg", rating: "8.1", type: "TV", episodes: { sub: 10, dub: 10, eps: 10 }, genres: ["adventure", "comedy", "fantasy", "isekai", "parody"] },
  { id: "that-time-i-got-reincarnated-as-a-slime-11382", name: "Slime Isekai", title: "Tensei Shitara Slime", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/e7b6be33af31d8c7db74aadd0028fa88.jpg", rating: "8.2", type: "TV", episodes: { sub: 24, dub: 24, eps: 24 }, genres: ["action", "adventure", "comedy", "fantasy", "isekai"] },
  { id: "the-rising-of-the-shield-hero-13618", name: "Shield Hero", title: "Tate no Yuusha", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/ffe9f5d7c86f91c9b0c8e3d45ee9d6f8.jpg", rating: "7.9", type: "TV", episodes: { sub: 25, dub: 25, eps: 25 }, genres: ["action", "adventure", "drama", "fantasy", "isekai"] },
  { id: "overlord-2477", name: "Overlord", title: "Overlord", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/1b847dfed83869c2d26c02b9bde6377c.jpg", rating: "7.9", type: "TV", episodes: { sub: 13, dub: 13, eps: 13 }, genres: ["action", "fantasy", "game", "supernatural", "isekai"] },
  { id: "mushoku-tensei-jobless-reincarnation-16963", name: "Mushoku Tensei", title: "Mushoku Tensei", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/aa3f2ce34cc3e52c8c4b7b2fc6be14e9.jpg", rating: "8.4", type: "TV", episodes: { sub: 23, dub: 23, eps: 23 }, genres: ["adventure", "drama", "fantasy", "isekai"] },
  { id: "haikyuu-2393", name: "Haikyuu!!", title: "Haikyuu!!", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/17f7c7f80e10b42fd5f2d12efcc2dc68.jpg", rating: "8.6", type: "TV", episodes: { sub: 25, dub: 25, eps: 25 }, genres: ["comedy", "drama", "sports", "school"] },
  { id: "kuroko-no-basket-1298", name: "Kuroko no Basket", title: "Kuroko no Basket", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/2ee89e9c9fe72b4d4e8ef5ae16a3e34c.jpg", rating: "8.2", type: "TV", episodes: { sub: 25, dub: 25, eps: 25 }, genres: ["comedy", "sports", "school"] },
  { id: "blue-lock-18422", name: "Blue Lock", title: "Blue Lock", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9e6c5c90e0f3f8e50edab7082b7f7b5e.jpg", rating: "8.4", type: "TV", episodes: { sub: 24, dub: 24, eps: 24 }, genres: ["sports", "drama"] },
  { id: "tokyo-ghoul-1574", name: "Tokyo Ghoul", title: "Tokyo Ghoul", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a89af3d777b2b3d6b4d9c2b0b5e8e5a7.jpg", rating: "7.8", type: "TV", episodes: { sub: 12, dub: 12, eps: 12 }, genres: ["action", "drama", "horror", "mystery", "psychological", "supernatural"] },
  { id: "parasyte-the-maxim-1937", name: "Parasyte", title: "Kiseijuu", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/6f90df0f3f0c9b8c68d3c37f1f15e0f0.jpg", rating: "8.4", type: "TV", episodes: { sub: 24, dub: 24, eps: 24 }, genres: ["action", "drama", "horror", "psychological", "sci-fi"] },
  { id: "another-5765", name: "Another", title: "Another", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/3f3c2f2d6ff54c7bcd3bad4c02d3c3cc.jpg", rating: "7.5", type: "TV", episodes: { sub: 12, dub: 12, eps: 12 }, genres: ["horror", "mystery", "supernatural", "thriller", "school"] },
  { id: "promised-neverland-13569", name: "Promised Neverland", title: "Yakusoku no Neverland", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/8bb9e1f8b2c8d1faebdb2e2c3e8f8b9a.jpg", rating: "8.5", type: "TV", episodes: { sub: 12, dub: 12, eps: 12 }, genres: ["mystery", "psychological", "thriller", "horror"] },
  { id: "erased-2078", name: "Erased", title: "Boku dake ga Inai Machi", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/0b6f1a6e2e39d3e2ca3c5e8b0f7a8e2a.jpg", rating: "8.4", type: "TV", episodes: { sub: 12, dub: 12, eps: 12 }, genres: ["mystery", "psychological", "supernatural", "thriller"] },
  { id: "neon-genesis-evangelion-1239", name: "Evangelion", title: "Evangelion", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/79cd6b8b1a0c6ee1e1a1f2f4e3d2c1b0.jpg", rating: "8.3", type: "TV", episodes: { sub: 26, dub: 26, eps: 26 }, genres: ["action", "drama", "mecha", "psychological", "sci-fi"] },
  { id: "cowboy-bebop-2", name: "Cowboy Bebop", title: "Cowboy Bebop", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/e0d6d5bb0c9c4f8b5c3e2a1f0d9c8b7a.jpg", rating: "8.8", type: "TV", episodes: { sub: 26, dub: 26, eps: 26 }, genres: ["action", "adventure", "drama", "sci-fi", "space"] },
  { id: "fruits-basket-1st-season-14720", name: "Fruits Basket", title: "Fruits Basket", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f7e6d5c4b3a2918070605040302010.jpg", rating: "8.3", type: "TV", episodes: { sub: 25, dub: 25, eps: 25 }, genres: ["comedy", "drama", "romance", "slice of life", "supernatural"] },
  { id: "clannad-after-story-1277", name: "Clannad After Story", title: "Clannad AS", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/5a4b3c2d1e0f9g8h7i6j5k4l3m2n1o0p.jpg", rating: "9.0", type: "TV", episodes: { sub: 24, dub: 24, eps: 24 }, genres: ["drama", "romance", "slice of life", "supernatural"] },
  { id: "bocchi-the-rock-18775", name: "Bocchi the Rock!", title: "Bocchi the Rock!", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/52cb7143f42f3abda05c5f19a52dbfb4.jpg", rating: "8.7", type: "TV", episodes: { sub: 12, dub: 12, eps: 12 }, genres: ["comedy", "music", "slice of life"] },
  { id: "frieren-beyond-journeys-end-19264", name: "Frieren", title: "Sousou no Frieren", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/efc0a5f6e9dc9a6b8e7f6d5c4b3a2918.jpg", rating: "9.1", type: "TV", episodes: { sub: 28, dub: 28, eps: 28 }, genres: ["adventure", "drama", "fantasy"] },
  { id: "oshi-no-ko-18869", name: "Oshi no Ko", title: "Oshi no Ko", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/0e7f6d5c4b3a29180706050403020100.jpg", rating: "8.9", type: "TV", episodes: { sub: 11, dub: 11, eps: 11 }, genres: ["drama", "mystery", "supernatural"] },
];

const defaultGenres = ["action", "adventure", "comedy", "drama", "fantasy", "horror", "mystery", "romance", "sci-fi", "slice of life", "sports", "supernatural", "isekai", "psychological", "thriller", "school", "mecha", "music"];

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialGenre = searchParams.get("genre");
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(initialGenre);
  const [selectedType, setSelectedType] = useState<string | null>(searchParams.get("type"));
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>("default");
  const [showFilters, setShowFilters] = useState(false);
  const [animeList, setAnimeList] = useState<AnimeResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<string[]>(defaultGenres);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    getGenres().then((g) => setGenres(g.map(genre => genre.toLowerCase()))).catch(() => setGenres(defaultGenres));
  }, []);

  const getFilteredFallbackAnime = useCallback(() => {
    let filtered = [...fallbackAnimeData];
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(a => 
        a.name?.toLowerCase().includes(query) ||
        a.title?.toLowerCase().includes(query)
      );
    }
    
    if (selectedGenre) {
      const genre = selectedGenre.toLowerCase();
      filtered = filtered.filter(a => a.genres.some(g => g.toLowerCase().includes(genre)));
    }
    
    if (selectedType) {
      filtered = filtered.filter(a => a.type?.toLowerCase() === selectedType.toLowerCase());
    }
    
    if (sortBy === "score") {
      filtered.sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"));
    } else if (sortBy === "name-a-z") {
      filtered.sort((a, b) => (a.title || a.name || "").localeCompare(b.title || b.name || ""));
    } else if (sortBy === "name-z-a") {
      filtered.sort((a, b) => (b.title || b.name || "").localeCompare(a.title || a.name || ""));
    }
    
    return filtered;
  }, [searchQuery, selectedGenre, selectedType, sortBy]);

  const fetchAnime = useCallback(async () => {
    setLoading(true);
    try {
      if (searchQuery.trim()) {
        const result = await search(searchQuery, page);
        if (result.animes && result.animes.length > 0) {
          setAnimeList(result.animes);
          setHasNextPage(result.hasNextPage);
          return;
        }
      } else if (selectedGenre || selectedType || selectedStatus) {
        const result = await filter({
          genre: selectedGenre || undefined,
          type: selectedType || undefined,
          status: selectedStatus || undefined,
          sort: sortBy && sortBy !== "default" ? sortBy : undefined,
          page,
        });
        if (result.animes && result.animes.length > 0) {
          setAnimeList(result.animes);
          setHasNextPage(result.hasNextPage);
          return;
        }
      }
      
      const fallbackFiltered = getFilteredFallbackAnime();
      setAnimeList(fallbackFiltered);
      setHasNextPage(false);
    } catch (error) {
      console.error("Error fetching anime:", error);
      const fallbackFiltered = getFilteredFallbackAnime();
      setAnimeList(fallbackFiltered);
      setHasNextPage(false);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedGenre, selectedType, selectedStatus, sortBy, page, getFilteredFallbackAnime]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchAnime();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchAnime]);

  const clearFilters = () => {
    setSelectedGenre(null);
    setSelectedType(null);
    setSelectedStatus(null);
    setSearchQuery("");
    setPage(1);
  };

  const hasActiveFilters = selectedGenre || selectedType || selectedStatus || searchQuery;

  return (
    <div className="min-h-screen bg-[#030014]">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Browse Anime
            </h1>
            <p className="text-gray-400">
              Discover your next favorite anime from our collection
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search anime by title..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setPage(1);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-purple-500" />
              )}
            </button>

            <div className="hidden lg:flex items-center gap-3">
              <FilterDropdown
                label="Genre"
                value={selectedGenre}
                options={genres}
                onChange={(v) => { setSelectedGenre(v); setPage(1); }}
              />
              <FilterDropdown
                label="Type"
                value={selectedType}
                options={["tv", "movie", "ova", "ona", "special"]}
                onChange={(v) => { setSelectedType(v); setPage(1); }}
              />
              <FilterDropdown
                label="Status"
                value={selectedStatus}
                options={["finished-airing", "currently-airing", "not-yet-aired"]}
                onChange={(v) => { setSelectedStatus(v); setPage(1); }}
              />
              <FilterDropdown
                label="Sort by"
                value={sortBy}
                options={["default", "recently-added", "recently-updated", "score", "name-a-z", "name-z-a"]}
                onChange={setSortBy}
                showClear={false}
              />
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden mb-6"
              >
                <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-white/5 border border-purple-500/20">
                  <FilterDropdown
                    label="Genre"
                    value={selectedGenre}
                    options={genres}
                    onChange={(v) => { setSelectedGenre(v); setPage(1); }}
                    fullWidth
                  />
                  <FilterDropdown
                    label="Type"
                    value={selectedType}
                    options={["tv", "movie", "ova", "ona", "special"]}
                    onChange={(v) => { setSelectedType(v); setPage(1); }}
                    fullWidth
                  />
                  <FilterDropdown
                    label="Status"
                    value={selectedStatus}
                    options={["finished-airing", "currently-airing", "not-yet-aired"]}
                    onChange={(v) => { setSelectedStatus(v); setPage(1); }}
                    fullWidth
                  />
                  <FilterDropdown
                    label="Sort by"
                    value={sortBy}
                    options={["default", "recently-added", "recently-updated", "score", "name-a-z", "name-z-a"]}
                    onChange={setSortBy}
                    showClear={false}
                    fullWidth
                  />
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="col-span-2 flex items-center justify-center gap-1 py-2 rounded-lg text-purple-400 hover:text-purple-300 transition-colors border border-purple-500/20"
                    >
                      <X className="w-4 h-4" />
                      Clear All Filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              Showing <span className="text-white font-medium">{animeList.length}</span> results
              {selectedGenre && <span className="text-purple-400"> in {selectedGenre}</span>}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
            </div>
          ) : animeList.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {animeList.map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    id={anime.id}
                    title={anime.title || anime.name || "Unknown"}
                    image={anime.poster || "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg"}
                    rating={anime.rating}
                    episodes={anime.episodes?.sub || anime.episodes?.dub || anime.episodes?.eps}
                    type={anime.type || "TV"}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 mt-12">
                {page > 1 && (
                  <button
                    onClick={() => setPage((p) => p - 1)}
                    className="px-6 py-3 rounded-full bg-white/5 border border-purple-500/20 text-white hover:bg-white/10 transition-colors"
                  >
                    Previous
                  </button>
                )}
                <span className="text-gray-400">Page {page}</span>
                {hasNextPage && (
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-gray-400 mb-4">
                Try adjusting your search or filters to find what you&apos;re looking for
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    }>
      <BrowseContent />
    </Suspense>
  );
}

interface FilterDropdownProps {
  label: string;
  value: string | null;
  options: string[];
  onChange: (value: string | null) => void;
  showClear?: boolean;
  fullWidth?: boolean;
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
  showClear = true,
  fullWidth = false,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatLabel = (str: string) => {
    return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className={`relative ${fullWidth ? "w-full" : ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 px-4 py-2 rounded-lg bg-white/5 border border-purple-500/20 text-white hover:bg-white/10 transition-colors ${
          fullWidth ? "w-full" : "min-w-[120px]"
        }`}
      >
        <span className={value ? "text-white" : "text-gray-400"}>
          {value ? formatLabel(value) : label}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 w-full min-w-[160px] max-h-60 overflow-auto rounded-xl bg-[#0f0a1e] border border-purple-500/20 shadow-xl z-50"
            >
              {showClear && value && (
                <button
                  onClick={() => {
                    onChange(null);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-purple-400 hover:bg-white/5 border-b border-purple-500/10"
                >
                  Clear
                </button>
              )}
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left transition-colors ${
                    value === option
                      ? "bg-purple-500/20 text-purple-300"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  {formatLabel(option)}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
