"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import { TrendingUp } from "lucide-react";

const mostPopularAnime = [
  { id: "one-piece-100", title: "One Piece", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg", rating: "PG-13", episodes: 1122, type: "TV" },
  { id: "naruto-shippuden-355", title: "Naruto Shippuden", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9cbcf87f54194742e7686119089478f8.jpg", rating: "PG-13", episodes: 500, type: "TV" },
  { id: "attack-on-titan-112", title: "Attack on Titan", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c71e2d5e02eb7ceb5c9e087b2b6fc9a8.jpg", rating: "R", episodes: 87, type: "TV" },
  { id: "demon-slayer-kimetsu-no-yaiba-47", title: "Demon Slayer", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bd5ae1d387a59c5abcf5e1a6a616728c.jpg", rating: "R", episodes: 55, type: "TV" },
  { id: "jujutsu-kaisen-tv-534", title: "Jujutsu Kaisen", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c85d24e89c7a9ef0e37b85f9c2c79ab0.jpg", rating: "R", episodes: 47, type: "TV" },
  { id: "fullmetal-alchemist-brotherhood-2503", title: "Fullmetal Alchemist: Brotherhood", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/aef2de1a82d34a64e4c3f9bea80fc8f7.jpg", rating: "R", episodes: 64, type: "TV" },
  { id: "death-note-130", title: "Death Note", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/81b239c320c3d3e4a7e3f5e7d2c79c69.jpg", rating: "R", episodes: 37, type: "TV" },
  { id: "dragon-ball-z-43", title: "Dragon Ball Z", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/3d2e5e1e3c5a1e8a2a1e8b5e3c5a1e8a.jpg", rating: "PG-13", episodes: 291, type: "TV" },
  { id: "hunter-x-hunter-2011-136", title: "Hunter x Hunter (2011)", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/04b9b16f0b5f7e8a2a1e8b5e3c5a1e8a.jpg", rating: "PG-13", episodes: 148, type: "TV" },
  { id: "my-hero-academia-3388", title: "My Hero Academia", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a5e5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 138, type: "TV" },
  { id: "tokyo-ghoul-125", title: "Tokyo Ghoul", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b6e5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "R", episodes: 48, type: "TV" },
  { id: "sword-art-online-1408", title: "Sword Art Online", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c7e5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 96, type: "TV" },
  { id: "spy-x-family-17977", title: "Spy x Family", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/d8e5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 50, type: "TV" },
  { id: "chainsaw-man-17406", title: "Chainsaw Man", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/e9e5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "R", episodes: 12, type: "TV" },
  { id: "solo-leveling-19318", title: "Solo Leveling", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/8c40d1a64d8fd4063ca3cf9660d4f0ba.png", rating: "R", episodes: 24, type: "TV" },
  { id: "bleach-806", title: "Bleach", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f0e5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 366, type: "TV" },
  { id: "code-geass-lelouch-of-the-rebellion-227", title: "Code Geass", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/g1e5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "R", episodes: 50, type: "TV" },
  { id: "steinsgate-65", title: "Steins;Gate", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/h2e5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 48, type: "TV" },
  { id: "black-clover-2404", title: "Black Clover", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/i3e5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 170, type: "TV" },
  { id: "one-punch-man-1244", title: "One Punch Man", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/j4e5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 24, type: "TV" },
  { id: "mob-psycho-100-2544", title: "Mob Psycho 100", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/k5e5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 37, type: "TV" },
  { id: "vinland-saga-237", title: "Vinland Saga", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/l6e5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "R", episodes: 48, type: "TV" },
  { id: "tokyo-revengers-16608", title: "Tokyo Revengers", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/m7e5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "R", episodes: 62, type: "TV" },
  { id: "the-promised-neverland-2788", title: "The Promised Neverland", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/n8e5c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", episodes: 23, type: "TV" },
];

export default function PopularPage() {
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {mostPopularAnime.map((anime) => (
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