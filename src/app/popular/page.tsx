"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import { TrendingUp, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getMostPopular, type AnimeResult } from "@/lib/api";

const fallbackAnime = [
  { id: "one-piece-100", title: "One Piece", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg", rating: "PG-13", episodes: { sub: 1122, dub: 1000, eps: 1122 }, type: "TV" },
  { id: "naruto-shippuden-355", title: "Naruto Shippuden", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9cbcf87f54194742e7686119089478f8.jpg", rating: "PG-13", episodes: { sub: 500, dub: 500, eps: 500 }, type: "TV" },
  { id: "attack-on-titan-112", title: "Attack on Titan", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/3a06f85a922a00cc3add7bf17fa10afc.jpg", rating: "R", episodes: { sub: 87, dub: 87, eps: 87 }, type: "TV" },
  { id: "demon-slayer-kimetsu-no-yaiba-38", title: "Demon Slayer", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bd5ae1d387a59c5abcf5e1a6a616728c.jpg", rating: "R", episodes: { sub: 55, dub: 55, eps: 55 }, type: "TV" },
  { id: "jujutsu-kaisen-tv-534", title: "Jujutsu Kaisen", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c85d24e89c7a9ef0e37b85f9c2c79ab0.jpg", rating: "R", episodes: { sub: 47, dub: 47, eps: 47 }, type: "TV" },
  { id: "fullmetal-alchemist-brotherhood-5", title: "Fullmetal Alchemist: Brotherhood", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/2ec8e50c6edf32dee9e7dfd651a5bf1d.jpg", rating: "R", episodes: { sub: 64, dub: 64, eps: 64 }, type: "TV" },
  { id: "death-note-60", title: "Death Note", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/696e9ec34fa4012ca77d8d32d9e10d85.jpg", rating: "R", episodes: { sub: 37, dub: 37, eps: 37 }, type: "TV" },
  { id: "dragon-ball-z-43", title: "Dragon Ball Z", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/cf57c359f32e2c400a1a3df115df9dc9.jpg", rating: "PG-13", episodes: { sub: 291, dub: 291, eps: 291 }, type: "TV" },
  { id: "hunter-x-hunter-2011-1028", title: "Hunter x Hunter (2011)", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/eb50eb4bcbed7f2f740a83a8c1b4e58c.jpg", rating: "PG-13", episodes: { sub: 148, dub: 148, eps: 148 }, type: "TV" },
  { id: "my-hero-academia-1877", title: "My Hero Academia", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/06f53b5c1d3e2d1f68c02acc5a87e8c8.jpg", rating: "PG-13", episodes: { sub: 138, dub: 138, eps: 138 }, type: "TV" },
  { id: "tokyo-ghoul-1574", title: "Tokyo Ghoul", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a89af3d777b2b3d6b4d9c2b0b5e8e5a7.jpg", rating: "R", episodes: { sub: 48, dub: 48, eps: 48 }, type: "TV" },
  { id: "sword-art-online-1686", title: "Sword Art Online", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f0ad1f6aebb76c81a44e3fcc7fb8fffc.jpg", rating: "PG-13", episodes: { sub: 96, dub: 96, eps: 96 }, type: "TV" },
  { id: "spy-x-family-17977", title: "Spy x Family", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/37f30a4cc99d5ec6b59e9a66df7e2d56.jpg", rating: "PG-13", episodes: { sub: 50, dub: 50, eps: 50 }, type: "TV" },
  { id: "chainsaw-man-17406", title: "Chainsaw Man", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b3f668d0d8da5c9154c35baf62edc32d.jpg", rating: "R", episodes: { sub: 12, dub: 12, eps: 12 }, type: "TV" },
  { id: "solo-leveling-18718", title: "Solo Leveling", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/366b0acb2d80a42e702ab4cfc59b8a82.jpg", rating: "R", episodes: { sub: 24, dub: 24, eps: 24 }, type: "TV" },
  { id: "bleach-269", title: "Bleach", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/1c960ac6ab22e66a81c4a5c59ef2b89a.jpg", rating: "PG-13", episodes: { sub: 366, dub: 366, eps: 366 }, type: "TV" },
  { id: "code-geass-lelouch-of-the-rebellion-18", title: "Code Geass", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/87e403c1c5f9fc82e1fa6ccb79d41c93.jpg", rating: "R", episodes: { sub: 50, dub: 50, eps: 50 }, type: "TV" },
  { id: "steins-gate-3", title: "Steins;Gate", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/90cdf6f2c41ec2e52bdbb4f7b0b6c79d.jpg", rating: "PG-13", episodes: { sub: 48, dub: 48, eps: 48 }, type: "TV" },
  { id: "black-clover-2404", title: "Black Clover", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f58b0e0d84fd5f5f6dc10acb7e68e2c8.jpg", rating: "PG-13", episodes: { sub: 170, dub: 170, eps: 170 }, type: "TV" },
  { id: "one-punch-man-1-15", title: "One Punch Man", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9c25caf0e77f56b7b76ee5a52ca4290d.jpg", rating: "PG-13", episodes: { sub: 24, dub: 24, eps: 24 }, type: "TV" },
  { id: "mob-psycho-100-2566", title: "Mob Psycho 100", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/016a63a4c6af6bcf4ea9e18a72cc77b3.jpg", rating: "PG-13", episodes: { sub: 37, dub: 37, eps: 37 }, type: "TV" },
  { id: "vinland-saga-14092", title: "Vinland Saga", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/179831d6c8c32e47c8de6e0f8e4f5bcd.jpg", rating: "R", episodes: { sub: 48, dub: 48, eps: 48 }, type: "TV" },
  { id: "tokyo-revengers-17822", title: "Tokyo Revengers", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9c25caf0e77f56b7b76ee5a52ca4290d.jpg", rating: "R", episodes: { sub: 62, dub: 62, eps: 62 }, type: "TV" },
  { id: "yakusoku-no-neverland-13569", title: "The Promised Neverland", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/8bb9e1f8b2c8d1faebdb2e2c3e8f8b9a.jpg", rating: "PG-13", episodes: { sub: 23, dub: 23, eps: 23 }, type: "TV" },
];

export default function PopularPage() {
  const [animeList, setAnimeList] = useState<AnimeResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const data = await getMostPopular(1);
        if (data.animes && data.animes.length > 0) {
          setAnimeList(data.animes);
        } else {
          setAnimeList(fallbackAnime as unknown as AnimeResult[]);
        }
      } catch {
        setAnimeList(fallbackAnime as unknown as AnimeResult[]);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  return (
    <div className="min-h-screen bg-[#030014]">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Most Popular Anime
              </h1>
            </div>
            <p className="text-gray-400">
              The most popular and highly-rated anime of all time
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {animeList.map((anime) => (
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