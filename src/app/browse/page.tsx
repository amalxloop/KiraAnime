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
];

const defaultGenres = ["action", "adventure", "comedy", "drama", "fantasy", "horror", "mystery", "romance", "sci-fi", "slice of life", "sports", "supernatural", "isekai", "psychological", "thriller", "school", "mecha", "music"];

const FALLBACK_POSTER = "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg";

function getValidPoster(poster: string | undefined | null): string {
  if (!poster || typeof poster !== "string" || poster.trim() === "") {
    return FALLBACK_POSTER;
  }
  return poster;
}

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
          const animesWithValidPosters = result.animes.map(a => ({
            ...a,
            poster: getValidPoster(a.poster)
          }));
          setAnimeList(animesWithValidPosters);
          setHasNextPage(result.hasNextPage);
          return;
        }
      }
      
      const result = await filter({
        genre: selectedGenre || undefined,
        type: selectedType || undefined,
        status: selectedStatus || undefined,
        sort: sortBy && sortBy !== "default" ? sortBy : undefined,
        page,
      });
      
      if (result.animes && result.animes.length > 0) {
        const animesWithValidPosters = result.animes.map(a => ({
          ...a,
          poster: getValidPoster(a.poster)
        }));
        setAnimeList(animesWithValidPosters);
        setHasNextPage(result.hasNextPage);
        return;
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