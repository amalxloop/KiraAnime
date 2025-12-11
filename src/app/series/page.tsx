"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import { Tv } from "lucide-react";

const bigCollectionSeries = [
  { id: "one-piece-100", title: "One Piece", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg", rating: "PG-13", episodes: 1122, type: "TV" },
  { id: "detective-conan-235", title: "Detective Conan (Case Closed)", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a1f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 1148, type: "TV" },
  { id: "naruto-shippuden-355", title: "Naruto Shippuden", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9cbcf87f54194742e7686119089478f8.jpg", rating: "PG-13", episodes: 500, type: "TV" },
  { id: "naruto-20", title: "Naruto", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b2f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 220, type: "TV" },
  { id: "bleach-806", title: "Bleach", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c3f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 366, type: "TV" },
  { id: "dragon-ball-z-43", title: "Dragon Ball Z", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/d4f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 291, type: "TV" },
  { id: "fairy-tail-124", title: "Fairy Tail", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/e5f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 328, type: "TV" },
  { id: "pokemon-horizons-the-series-19141", title: "Pokemon Series", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f6f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "G", episodes: 1000, type: "TV" },
  { id: "gintama-1140", title: "Gintama", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/g7f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 367, type: "TV" },
  { id: "hunter-x-hunter-2011-136", title: "Hunter x Hunter (2011)", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/h8f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 148, type: "TV" },
  { id: "inuyasha-9", title: "Inuyasha", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/i9f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 193, type: "TV" },
  { id: "black-clover-2404", title: "Black Clover", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/j0f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 170, type: "TV" },
  { id: "yu-gi-oh-duel-monsters-5322", title: "Yu-Gi-Oh! Duel Monsters", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/k1f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG", episodes: 224, type: "TV" },
  { id: "dragon-ball-gt-2539", title: "Dragon Ball GT", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/l2f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 64, type: "TV" },
  { id: "dragon-ball-super-3572", title: "Dragon Ball Super", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/m3f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 131, type: "TV" },
  { id: "my-hero-academia-3388", title: "My Hero Academia", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/n4f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 138, type: "TV" },
  { id: "sword-art-online-1408", title: "Sword Art Online", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/o5f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 96, type: "TV" },
  { id: "attack-on-titan-112", title: "Attack on Titan", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/p6f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "R", episodes: 87, type: "TV" },
  { id: "fullmetal-alchemist-brotherhood-2503", title: "Fullmetal Alchemist: Brotherhood", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/q7f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "R", episodes: 64, type: "TV" },
  { id: "boruto-naruto-next-generations-2922", title: "Boruto: Naruto Next Generations", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/r8f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 293, type: "TV" },
  { id: "jojo-no-kimyou-na-bouken-tv-3207", title: "JoJo's Bizarre Adventure", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/s9f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "R", episodes: 190, type: "TV" },
  { id: "haikyuu-3137", title: "Haikyuu!!", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/t0f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 85, type: "TV" },
  { id: "world-trigger-1867", title: "World Trigger", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/u1f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 101, type: "TV" },
  { id: "kingdom-4545", title: "Kingdom", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/v2f5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "R", episodes: 103, type: "TV" },
];

export default function SeriesPage() {
  return (
    <div className="min-h-screen bg-[#030014]">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Tv className="w-8 h-8 text-purple-500" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Big Collection Series
              </h1>
            </div>
            <p className="text-gray-400">
              Anime series with the most episodes - huge collections to binge
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {bigCollectionSeries.map((anime) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={anime.title}
                image={anime.poster}
                rating={anime.rating}
                episodes={anime.episodes}
                type={anime.type}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}