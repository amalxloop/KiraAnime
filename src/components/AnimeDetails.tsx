"use client";

import { Play, Plus, Star, Calendar, Clock, Film, Users, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimeCard } from "@/components/AnimeCard";
import { toast } from "sonner";
import { useMyList } from "@/contexts/MyListContext";

interface AnimeDetailsProps {
  id: string;
  anime: {
    info: {
      name: string;
      poster: string;
      description: string;
      stats: {
        rating: string;
        quality: string;
        episodes: { sub: number; dub: number };
        type: string;
        duration: string;
      };
    };
    moreInfo: {
      japanese: string;
      aired: string;
      premiered: string;
      status: string;
      malscore: string;
      genres: string[];
      studios: string;
      producers: string[];
    };
  };
  moreInfo: Record<string, unknown>;
  episodes: { totalEpisodes: number };
  characters: Array<{ character: { name: string; poster: string }; voiceActor: { name: string; poster: string } }>;
  relatedAnime: Array<{ id: string; title: string; image: string; type: string; episodes: number; rating: string }>;
  recommendedAnime: Array<{ id: string; title: string; image: string; type: string; episodes: number; rating: string }>;
}

export function AnimeDetails({
  id,
  anime,
  episodes,
  characters,
  relatedAnime,
  recommendedAnime,
}: AnimeDetailsProps) {
  const { isInList, addToList, removeFromList, isLoading } = useMyList();
  const inList = isInList(id);

  const handleAddToList = async () => {
    if (isLoading) return;

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
          anime_title: anime.info.name,
          anime_poster: anime.info.poster,
          anime_type: anime.info.stats.type,
          anime_rating: anime.info.stats.rating,
          anime_episodes: anime.info.stats.episodes.sub,
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
    }
  };

  return (
    <>
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src={anime.info.poster}
          alt={anime.info.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030014] via-[#030014]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-[#030014]/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-48">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <div className="relative w-48 md:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={anime.info.poster}
                alt={anime.info.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {anime.info.name}
            </h1>
            {anime.moreInfo.japanese && (
              <p className="text-gray-400 mb-4">{anime.moreInfo.japanese}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6">
              {anime.info.stats.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-medium">{anime.info.stats.rating}</span>
                </div>
              )}
              {anime.moreInfo.malscore && (
                <span className="text-gray-400">MAL: {anime.moreInfo.malscore}</span>
              )}
              <span className="px-3 py-1 rounded-full bg-purple-600/80 text-white text-sm">
                {anime.info.stats.quality}
              </span>
              <span className="text-gray-400">{anime.info.stats.type}</span>
              <span className="text-gray-400">{anime.info.stats.duration}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {anime.moreInfo.genres?.map((genre: string) => (
                <Link
                  key={genre}
                  href={`/browse?genre=${genre.toLowerCase()}`}
                  className="px-3 py-1 rounded-full border border-purple-500/50 text-purple-300 text-sm hover:bg-purple-500/20 transition-colors"
                >
                  {genre}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <Link
                href={`/watch/${id}`}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold transition-all neon-glow"
              >
                <Play className="w-5 h-5 fill-white" />
                Watch Now
              </Link>
              <button 
                onClick={handleAddToList}
                disabled={isLoading}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium backdrop-blur-sm transition-colors border ${
                  inList 
                    ? "bg-green-600/20 hover:bg-green-600/30 border-green-500/50 text-green-300" 
                    : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {inList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {inList ? "In My List" : "Add to List"}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Film className="w-4 h-4" />
                  <span className="text-sm">Episodes</span>
                </div>
                <p className="text-white font-medium">
                  Sub: {anime.info.stats.episodes.sub} | Dub: {anime.info.stats.episodes.dub}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Aired</span>
                </div>
                <p className="text-white font-medium">{anime.moreInfo.aired || "N/A"}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Status</span>
                </div>
                <p className="text-white font-medium">{anime.moreInfo.status || "N/A"}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Studios</span>
                </div>
                <p className="text-white font-medium text-sm">{anime.moreInfo.studios || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
          <p className="text-gray-300 leading-relaxed">{anime.info.description}</p>
        </div>

        {episodes && episodes.totalEpisodes > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Episodes ({episodes.totalEpisodes})
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-[300px] overflow-auto">
              {Array.from({ length: episodes.totalEpisodes }, (_, i) => i + 1).map((ep: number) => (
                <Link
                  key={ep}
                  href={`/watch/${id}?ep=${ep}`}
                  className={`p-3 rounded-lg text-center transition-colors ${
                    ep === 1
                      ? "bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:bg-orange-500/30"
                      : "bg-white/5 border border-purple-500/20 text-white hover:bg-purple-500/20"
                  }`}
                >
                  {ep}
                </Link>
              ))}
            </div>
          </div>
        )}

        {characters.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Characters & Voice Actors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {characters.slice(0, 6).map((char, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-purple-500/20"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={char.character.poster}
                      alt={char.character.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{char.character.name}</p>
                    <p className="text-gray-400 text-sm">{char.character.cast}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-purple-300 font-medium text-sm truncate">{char.voiceActor.name}</p>
                    <p className="text-gray-500 text-xs">{char.voiceActor.cast}</p>
                  </div>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={char.voiceActor.poster}
                      alt={char.voiceActor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {relatedAnime.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Related Anime</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedAnime.slice(0, 6).map((a) => (
                <AnimeCard
                  key={a.id}
                  id={a.id}
                  title={a.title || "Unknown"}
                  image={a.image}
                  rating={a.rating}
                  episodes={a.episodes}
                  type={a.type}
                />
              ))}
            </div>
          </div>
        )}

        {recommendedAnime.length > 0 && (
          <div className="mt-12 pb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Recommended</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recommendedAnime.slice(0, 6).map((a) => (
                <AnimeCard
                  key={a.id}
                  id={a.id}
                  title={a.title || "Unknown"}
                  image={a.image}
                  rating={a.rating}
                  episodes={a.episodes}
                  type={a.type}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}