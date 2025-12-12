import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimeDetails } from "@/components/AnimeDetails";
import { getAnimeInfo, getEpisodes } from "@/lib/api";
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
      <AnimeDetails 
        id={id}
        anime={anime}
        moreInfo={moreInfo}
        episodes={episodes}
        characters={characters}
        relatedAnime={relatedAnime}
        recommendedAnime={recommendedAnime}
      />
      <Footer />
    </div>
  );
}