"use client";

import { useState, useEffect, use } from "react";
import { Navbar } from "@/components/Navbar";
import { AnimeCard } from "@/components/AnimeCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { getAnimeInfo, getEpisodes, getServers, type Episode, type AnimeInfo, type ServersData } from "@/lib/api";
import { Play, ChevronLeft, ChevronRight, Loader2, List, Server } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

function formatIdToTitle(id: string): string {
  return id
    .split("-")
    .filter(part => !/^\d+$/.test(part))
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function WatchPage({ params }: PageProps) {
  const { id: rawId } = use(params);
  const searchParams = useSearchParams();
  
  // Handle malformed URLs like "anime-id::ep=123" by splitting on "::"
  let id = rawId;
  let epParamFromId: string | null = null;
  
  if (rawId.includes("::ep=")) {
    const parts = rawId.split("::ep=");
    id = parts[0];
    epParamFromId = parts[1];
    
    // Redirect to correct URL format
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/watch/${id}?ep=${epParamFromId}`);
    }
  }
  
  const epParam = searchParams.get("ep") || epParamFromId;

  const [animeData, setAnimeData] = useState<AnimeInfo | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentEp, setCurrentEp] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [servers, setServers] = useState<ServersData | null>(null);
  const [selectedServer, setSelectedServer] = useState("hd-2");
  const [selectedCategory, setSelectedCategory] = useState<"sub" | "dub">("sub");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        console.log("[Watch] Loading data for id:", id, "epParam:", epParam);
        
        const epsData = await getEpisodes(id);
        console.log("[Watch] Episodes loaded:", epsData.episodes?.length, "episodes");
        setEpisodes(epsData.episodes || []);

        // Try to match by episode number or episode ID
        let ep: Episode | undefined;
        if (epParam) {
          // First try to match by episode number
          const epNumber = parseInt(epParam);
          if (!isNaN(epNumber)) {
            ep = epsData.episodes?.find((e) => e.number === epNumber);
            console.log("[Watch] Matched by episode number:", epNumber, "found:", !!ep);
          }
          
          // If not found, try to match by episode ID (full ID like "anime-id::ep=159297")
          if (!ep) {
            const fullEpisodeId = `${id}::ep=${epParam}`;
            ep = epsData.episodes?.find((e) => e.episodeId === fullEpisodeId);
            console.log("[Watch] Matched by full episode ID:", fullEpisodeId, "found:", !!ep);
          }
          
          // Try partial match on episode ID
          if (!ep) {
            ep = epsData.episodes?.find((e) => e.episodeId.includes(epParam));
            console.log("[Watch] Matched by partial episode ID:", epParam, "found:", !!ep);
          }
        }
        // Fall back to first episode if no match found
        if (!ep) {
          ep = epsData.episodes?.[0];
          console.log("[Watch] Falling back to first episode:", ep?.number);
        }
        
        if (ep) {
          setCurrentEp(ep);
          console.log("[Watch] Loading servers for episode:", ep.episodeId);
          getServers(ep.episodeId).then(setServers).catch((err) => {
            console.error("[Watch] Error loading servers:", err);
          });
        }

        try {
          const animeInfo = await getAnimeInfo(id);
          setAnimeData(animeInfo);
        } catch {
          const fallbackTitle = formatIdToTitle(id);
          setAnimeData({
            anime: {
              info: {
                id,
                anilistId: 0,
                malId: 0,
                name: fallbackTitle,
                poster: "",
                description: "Loading anime information...",
                stats: { rating: "N/A", quality: "HD", episodes: { sub: epsData.episodes?.length || 0, dub: 0 }, type: "TV", duration: "24 min" },
                promotionalVideos: [],
                charactersVoiceActors: [],
              },
              moreInfo: { japanese: "", synonyms: "", aired: "", premiered: "", duration: "", status: "", malscore: "", genres: [], studios: "", producers: [] },
            },
            seasons: [],
            mostPopularAnimes: [],
            relatedAnimes: [],
            recommendedAnimes: [],
          });
        }
      } catch (error) {
        console.error("Error loading anime:", error);
        setError(`Failed to load anime data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, epParam]);

  const handleEpisodeChange = async (ep: Episode) => {
    setCurrentEp(ep);
    window.history.replaceState(null, "", `/watch/${id}?ep=${ep.number}`);
    try {
      const serversData = await getServers(ep.episodeId);
      setServers(serversData);
    } catch (e) {
      console.error("Error loading servers:", e);
    }
  };

  const goToNextEp = () => {
    if (!currentEp) return;
    const nextEp = episodes.find((e) => e.number === currentEp.number + 1);
    if (nextEp) handleEpisodeChange(nextEp);
  };

  const goToPrevEp = () => {
    if (!currentEp) return;
    const prevEp = episodes.find((e) => e.number === currentEp.number - 1);
    if (prevEp) handleEpisodeChange(prevEp);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (error || (!animeData && episodes.length === 0)) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-white mb-4">Unable to load anime</h1>
          <p className="text-gray-400 mb-6">{error || "The anime data could not be fetched. Please try again later."}</p>
          <Link href="/browse" className="inline-block px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors">
            Browse Anime
          </Link>
        </div>
      </div>
    );
  }

  const anime = animeData?.anime.info || { id, name: formatIdToTitle(id), poster: "", description: "" };
  const recommendedAnime = animeData?.recommendedAnimes || [];

  return (
    <div className="min-h-screen bg-[#030014]">
      <Navbar />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-4">
                {currentEp ? (
                  <VideoPlayer
                    episodeId={currentEp.episodeId}
                    server={selectedServer}
                    category={selectedCategory}
                    onProgress={async (currentTime, duration) => {
                      try {
                        await fetch("/api/watch-history", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            anime_id: id,
                            anime_title: anime.name,
                            anime_poster: anime.poster,
                            episode_id: currentEp.episodeId,
                            episode_number: currentEp.number,
                            progress_seconds: Math.floor(currentTime),
                            duration_seconds: Math.floor(duration),
                          }),
                        });
                      } catch (error) {
                        console.error("Failed to save watch history:", error);
                      }
                    }}
                  />
                ) : (
                  <>
                    {anime.poster && (
                      <div className="absolute inset-0">
                        <Image
                          src={anime.poster}
                          alt={anime.name}
                          fill
                          className="object-cover opacity-30 blur-sm"
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-t from-black/80 via-black/50 to-black/80">
                      <Play className="w-16 h-16 text-purple-400 mb-4" />
                      <p className="text-gray-400">Select an episode to start watching</p>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-xl font-bold text-white">{anime.name}</h1>
                  <p className="text-gray-400">
                    Episode {currentEp?.number || 1}: {currentEp?.title || "Loading..."}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={goToPrevEp}
                    disabled={!currentEp || currentEp.number <= 1}
                    className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goToNextEp}
                    disabled={!currentEp || currentEp.number >= episodes.length}
                    className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400 text-sm">Server:</span>
                </div>
                {(servers?.sub || [{ serverName: "HD-2", serverId: "hd-2" }]).map((s) => (
                  <button
                    key={s.serverId}
                    onClick={() => setSelectedServer(String(s.serverId))}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      selectedServer === String(s.serverId)
                        ? "bg-purple-600 text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {s.serverName}
                  </button>
                ))}
                <div className="flex items-center gap-1 ml-4">
                  <button
                    onClick={() => setSelectedCategory("sub")}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      selectedCategory === "sub"
                        ? "bg-purple-600 text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    SUB
                  </button>
                  <button
                    onClick={() => setSelectedCategory("dub")}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      selectedCategory === "dub"
                        ? "bg-purple-600 text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    DUB
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-purple-500/20">
                <h2 className="text-lg font-semibold text-white mb-2">Synopsis</h2>
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                  {anime.description}
                </p>
                <Link
                  href={`/anime/${id}`}
                  className="text-purple-400 text-sm hover:underline mt-2 inline-block"
                >
                  View full details
                </Link>
              </div>
            </div>

            <div className="lg:w-80">
              <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <List className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-semibold text-white">
                    Episodes ({episodes.length})
                  </h2>
                </div>

                <div className="max-h-[600px] overflow-auto rounded-xl bg-white/5 border border-purple-500/20">
                  {episodes.length === 0 ? (
                    <div className="p-6 text-center">
                      <Play className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">No episodes available</p>
                    </div>
                  ) : (
                    episodes.map((ep) => (
                      <button
                        key={ep.episodeId}
                        onClick={() => handleEpisodeChange(ep)}
                        className={`w-full p-4 text-left border-b border-purple-500/10 last:border-b-0 transition-colors ${
                          currentEp?.episodeId === ep.episodeId
                            ? "bg-purple-600/20"
                            : "hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              ep.isFiller
                                ? "bg-orange-500/20 text-orange-400"
                                : currentEp?.episodeId === ep.episodeId
                                ? "bg-purple-600 text-white"
                                : "bg-white/10 text-gray-400"
                            }`}
                          >
                            {ep.number}
                          </span>
                          <div className="min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                              Episode {ep.number}
                            </p>
                            <p className="text-gray-400 text-xs truncate">
                              {ep.title || `Episode ${ep.number}`}
                            </p>
                            {ep.isFiller && (
                              <span className="text-orange-400 text-xs">Filler</span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {recommendedAnime.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-4">You May Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {recommendedAnime.slice(0, 6).map((a) => (
                  <AnimeCard
                    key={a.id}
                    id={a.id}
                    title={a.title || a.name || "Unknown"}
                    image={a.poster}
                    rating={a.rating}
                    episodes={a.episodes?.sub}
                    type={a.type}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}