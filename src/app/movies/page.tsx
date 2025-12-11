"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import { Film } from "lucide-react";

const animeMovies = [
  { id: "your-name-zoku", title: "Your Name (Kimi no Na wa)", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/ed38e689a2f564f4fffb37e4f4de2c68.jpg", rating: "PG-13", type: "Movie" },
  { id: "spirited-away-154", title: "Spirited Away", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b4e0e3c8c8df7d5e6f0f0e3d8f3e0e3d.jpg", rating: "PG", type: "Movie" },
  { id: "a-silent-voice-3700", title: "A Silent Voice", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/5eb3c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", type: "Movie" },
  { id: "weathering-with-you-465", title: "Weathering With You", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a4b0c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", type: "Movie" },
  { id: "grave-of-the-fireflies-1081", title: "Grave of the Fireflies", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/d5e3c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", type: "Movie" },
  { id: "howls-moving-castle-1037", title: "Howl's Moving Castle", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c4b0c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG", type: "Movie" },
  { id: "princess-mononoke-1101", title: "Princess Mononoke", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f5e3c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", type: "Movie" },
  { id: "akira-77", title: "Akira", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a1b0c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "R", type: "Movie" },
  { id: "demon-slayer-mugen-train-6621", title: "Demon Slayer: Mugen Train", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg", rating: "R", type: "Movie" },
  { id: "jujutsu-kaisen-0-18009", title: "Jujutsu Kaisen 0", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c85d24e89c7a9ef0e37b85f9c2c79ab0.jpg", rating: "PG-13", type: "Movie" },
  { id: "one-piece-film-red-18335", title: "One Piece Film: Red", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/e2e8c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", type: "Movie" },
  { id: "dragon-ball-super-broly-3827", title: "Dragon Ball Super: Broly", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b2b8c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", type: "Movie" },
  { id: "suzume-18618", title: "Suzume", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f4e8c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG", type: "Movie" },
  { id: "the-boy-and-the-heron-19195", title: "The Boy and the Heron", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/g5e8c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", type: "Movie" },
  { id: "my-neighbor-totoro-1114", title: "My Neighbor Totoro", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/h6e8c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "G", type: "Movie" },
  { id: "5-centimeters-per-second-2588", title: "5 Centimeters Per Second", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/i7e8c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG", type: "Movie" },
  { id: "the-garden-of-words-1930", title: "The Garden of Words", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/j8e8c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", type: "Movie" },
  { id: "i-want-to-eat-your-pancreas-2632", title: "I Want to Eat Your Pancreas", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/k9e8c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", type: "Movie" },
  { id: "wolf-children-1561", title: "Wolf Children", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/l0e8c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG", type: "Movie" },
  { id: "the-girl-who-leapt-through-time-2418", title: "The Girl Who Leapt Through Time", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/m1e8c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG", type: "Movie" },
  { id: "summer-wars-1530", title: "Summer Wars", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/n2e8c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG", type: "Movie" },
  { id: "redline-1053", title: "Redline", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/o3e8c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG-13", type: "Movie" },
  { id: "paprika-1111", title: "Paprika", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/p4e8c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "R", type: "Movie" },
  { id: "ghost-in-the-shell-969", title: "Ghost in the Shell", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/q5e8c5a1e8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "R", type: "Movie" },
];

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-[#030014]">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Film className="w-8 h-8 text-purple-500" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Anime Movies
              </h1>
            </div>
            <p className="text-gray-400">
              The best anime movies and feature films of all time
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {animeMovies.map((anime) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={anime.title}
                image={anime.poster}
                rating={anime.rating}
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