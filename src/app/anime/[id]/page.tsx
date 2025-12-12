import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimeDetails } from "@/components/AnimeDetails";
import { getAnimeInfo, getEpisodes } from "@/lib/api";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const animeData = await getAnimeInfo(id);
    const anime = animeData.anime.info;
    const moreInfo = animeData.anime.moreInfo;
    
    const title = `Watch ${anime.name} Online Free - HD Anime Streaming`;
    const description = anime.description
      .replace(/<[^>]*>/g, '')
      .slice(0, 155) + '...';
    
    return {
      title,
      description,
      keywords: [
        anime.name,
        'watch anime online',
        'anime streaming',
        ...(moreInfo.genres || []),
        anime.stats.type,
        'English subtitles',
        'anime episodes',
      ],
      openGraph: {
        title,
        description,
        type: 'video.tv_show',
        url: `https://kiraanime.com/anime/${id}`,
        images: [
          {
            url: anime.poster,
            width: 300,
            height: 400,
            alt: anime.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [anime.poster],
      },
      alternates: {
        canonical: `https://kiraanime.com/anime/${id}`,
      },
    };
  } catch {
    return {
      title: 'Anime Not Found',
      description: 'The anime you are looking for could not be found.',
    };
  }
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    "name": anime.name,
    "image": anime.poster,
    "description": anime.description.replace(/<[^>]*>/g, ''),
    "genre": moreInfo.genres,
    "contentRating": "PG-13",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": anime.stats.rating,
      "bestRating": "10"
    },
    "numberOfEpisodes": anime.stats.episodes.sub,
    "datePublished": moreInfo.aired,
    "productionCompany": {
      "@type": "Organization",
      "name": moreInfo.studios
    }
  };

  return (
    <div className="min-h-screen bg-[#030014]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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