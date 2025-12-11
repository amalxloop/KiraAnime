import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import { getAnimeInfo, getEpisodes } from "@/lib/api";
import { Play, Plus, Star, Calendar, Clock, Film, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnimePage({ params }: PageProps) {
  const { id } = await params;

  let animeData;
  let episodes;
  try {
    [animeData, episodes] = await Promise.all([
      getAnimeInfo(id),
      getEpisodes(id),
    ]);
  } catch {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Anime Not Found</h1>
          <Link href="/browse" className="text-purple-400 hover:underline">
            Browse Anime
          </Link>
        </div>
      </div>
    );
  }

  const anime = animeData.anime.info;
  const moreInfo = animeData.anime.moreInfo;
  const relatedAnime = animeData.relatedAnimes || [];
  const recommendedAnime = animeData.recommendedAnimes || [];
  const characters = anime.charactersVoiceActors || [];

  return (
    <div className="min-h-screen bg-[#030014]">
      <Navbar />

      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src={anime.poster}
          alt={anime.name}
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
                src={anime.poster}
                alt={anime.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {anime.name}
            </h1>
            {moreInfo.japanese && (
              <p className="text-gray-400 mb-4">{moreInfo.japanese}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6">
              {anime.stats.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-medium">{anime.stats.rating}</span>
                </div>
              )}
              {moreInfo.malscore && (
                <span className="text-gray-400">MAL: {moreInfo.malscore}</span>
              )}
              <span className="px-3 py-1 rounded-full bg-purple-600/80 text-white text-sm">
                {anime.stats.quality}
              </span>
              <span className="text-gray-400">{anime.stats.type}</span>
              <span className="text-gray-400">{anime.stats.duration}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {moreInfo.genres?.map((genre) => (
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
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur-sm transition-colors border border-white/20">
                <Plus className="w-5 h-5" />
                Add to List
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Film className="w-4 h-4" />
                  <span className="text-sm">Episodes</span>
                </div>
                <p className="text-white font-medium">
                  Sub: {anime.stats.episodes.sub} | Dub: {anime.stats.episodes.dub}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Aired</span>
                </div>
                <p className="text-white font-medium">{moreInfo.aired || "N/A"}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Status</span>
                </div>
                <p className="text-white font-medium">{moreInfo.status || "N/A"}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Studios</span>
                </div>
                <p className="text-white font-medium text-sm">{moreInfo.studios || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
          <p className="text-gray-300 leading-relaxed">{anime.description}</p>
        </div>

        {episodes && episodes.episodes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Episodes ({episodes.totalEpisodes})
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-[300px] overflow-auto">
              {episodes.episodes.map((ep) => (
                <Link
                  key={ep.episodeId}
                  href={`/watch/${id}?ep=${ep.number}`}
                  className={`p-3 rounded-lg text-center transition-colors ${
                    ep.isFiller
                      ? "bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:bg-orange-500/30"
                      : "bg-white/5 border border-purple-500/20 text-white hover:bg-purple-500/20"
                  }`}
                >
                  {ep.number}
                </Link>
              ))}
            </div>
          </div>
        )}

        {characters.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Characters & Voice Actors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {characters.slice(0, 6).map((char, idx) => (
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

        {recommendedAnime.length > 0 && (
          <div className="mt-12 pb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Recommended</h2>
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

      <Footer />
    </div>
  );
}