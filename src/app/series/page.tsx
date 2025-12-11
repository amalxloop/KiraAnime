"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import { Tv, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getTV, type AnimeResult } from "@/lib/api";

const fallbackSeries = [
  { id: "one-piece-100", title: "One Piece", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg", rating: "PG-13", episodes: { sub: 1122, dub: 1000, eps: 1122 }, type: "TV" },
  { id: "detective-conan-235", title: "Detective Conan", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f.jpg", rating: "PG-13", episodes: { sub: 1148, dub: 0, eps: 1148 }, type: "TV" },
  { id: "naruto-shippuden-355", title: "Naruto Shippuden", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9cbcf87f54194742e7686119089478f8.jpg", rating: "PG-13", episodes: { sub: 500, dub: 500, eps: 500 }, type: "TV" },
  { id: "naruto-20", title: "Naruto", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9cbcf87f54194742e7686119089478f8.jpg", rating: "PG-13", episodes: { sub: 220, dub: 220, eps: 220 }, type: "TV" },
  { id: "bleach-269", title: "Bleach", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/1c960ac6ab22e66a81c4a5c59ef2b89a.jpg", rating: "PG-13", episodes: { sub: 366, dub: 366, eps: 366 }, type: "TV" },
  { id: "dragon-ball-z-43", title: "Dragon Ball Z", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/cf57c359f32e2c400a1a3df115df9dc9.jpg", rating: "PG-13", episodes: { sub: 291, dub: 291, eps: 291 }, type: "TV" },
  { id: "fairy-tail-124", title: "Fairy Tail", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/e5f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: { sub: 328, dub: 328, eps: 328 }, type: "TV" },
  { id: "pokemon-129", title: "Pokemon", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f6f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "G", episodes: { sub: 1000, dub: 1000, eps: 1000 }, type: "TV" },
  { id: "gintama-4543", title: "Gintama", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/7c3e5a9f8b2d1e4a0c6f3b8d2e5a1c7f.jpg", rating: "PG-13", episodes: { sub: 367, dub: 367, eps: 367 }, type: "TV" },
  { id: "hunter-x-hunter-2011-1028", title: "Hunter x Hunter (2011)", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/eb50eb4bcbed7f2f740a83a8c1b4e58c.jpg", rating: "PG-13", episodes: { sub: 148, dub: 148, eps: 148 }, type: "TV" },
  { id: "inuyasha-9", title: "Inuyasha", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/i9f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: { sub: 193, dub: 193, eps: 193 }, type: "TV" },
  { id: "black-clover-2404", title: "Black Clover", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f58b0e0d84fd5f5f6dc10acb7e68e2c8.jpg", rating: "PG-13", episodes: { sub: 170, dub: 170, eps: 170 }, type: "TV" },
  { id: "yu-gi-oh-duel-monsters-5322", title: "Yu-Gi-Oh!", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/k1f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG", episodes: { sub: 224, dub: 224, eps: 224 }, type: "TV" },
  { id: "dragon-ball-gt-2539", title: "Dragon Ball GT", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/cf57c359f32e2c400a1a3df115df9dc9.jpg", rating: "PG-13", episodes: { sub: 64, dub: 64, eps: 64 }, type: "TV" },
  { id: "dragon-ball-super-1064", title: "Dragon Ball Super", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/cf57c359f32e2c400a1a3df115df9dc9.jpg", rating: "PG-13", episodes: { sub: 131, dub: 131, eps: 131 }, type: "TV" },
  { id: "my-hero-academia-1877", title: "My Hero Academia", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/06f53b5c1d3e2d1f68c02acc5a87e8c8.jpg", rating: "PG-13", episodes: { sub: 138, dub: 138, eps: 138 }, type: "TV" },
  { id: "sword-art-online-1686", title: "Sword Art Online", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f0ad1f6aebb76c81a44e3fcc7fb8fffc.jpg", rating: "PG-13", episodes: { sub: 96, dub: 96, eps: 96 }, type: "TV" },
  { id: "attack-on-titan-112", title: "Attack on Titan", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/3a06f85a922a00cc3add7bf17fa10afc.jpg", rating: "R", episodes: { sub: 87, dub: 87, eps: 87 }, type: "TV" },
  { id: "fullmetal-alchemist-brotherhood-5", title: "Fullmetal Alchemist: Brotherhood", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/2ec8e50c6edf32dee9e7dfd651a5bf1d.jpg", rating: "R", episodes: { sub: 64, dub: 64, eps: 64 }, type: "TV" },
  { id: "boruto-naruto-next-generations-2922", title: "Boruto", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9cbcf87f54194742e7686119089478f8.jpg", rating: "PG-13", episodes: { sub: 293, dub: 293, eps: 293 }, type: "TV" },
  { id: "jojo-no-kimyou-na-bouken-tv-3207", title: "JoJo's Bizarre Adventure", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/s9f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "R", episodes: { sub: 190, dub: 190, eps: 190 }, type: "TV" },
  { id: "haikyuu-2393", title: "Haikyuu!!", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/17f7c7f80e10b42fd5f2d12efcc2dc68.jpg", rating: "PG-13", episodes: { sub: 85, dub: 85, eps: 85 }, type: "TV" },
  { id: "world-trigger-1867", title: "World Trigger", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/u1f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: { sub: 101, dub: 101, eps: 101 }, type: "TV" },
  { id: "kingdom-4545", title: "Kingdom", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/v2f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "R", episodes: { sub: 103, dub: 103, eps: 103 }, type: "TV" },
];

export default function SeriesPage() {
  const [seriesList, setSeriesList] = useState<AnimeResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await getTV(1);
        if (data.animes && data.animes.length > 0) {
          setSeriesList(data.animes);
        } else {
          setSeriesList(fallbackSeries as unknown as AnimeResult[]);
        }
      } catch {
        setSeriesList(fallbackSeries as unknown as AnimeResult[]);
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, []);

  return (
    <div className="min-h-screen bg-[#030014]">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Tv className="w-8 h-8 text-purple-500" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Anime Series
              </h1>
            </div>
            <p className="text-gray-400">
              Popular anime TV series with many episodes to enjoy
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {seriesList.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  id={anime.id}
                  title={anime.title || anime.name || "Unknown"}
                  image={anime.poster}
                  rating={anime.rating}
                  episodes={anime.episodes?.sub || anime.episodes?.eps}
                  type={anime.type || "TV"}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}