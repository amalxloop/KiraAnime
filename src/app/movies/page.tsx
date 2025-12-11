"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import { Film } from "lucide-react";
import { useEffect, useState } from "react";
import { getMovies, type AnimeResult } from "@/lib/api";
import { Loader2 } from "lucide-react";

const fallbackMovies = [
  { id: "kimi-no-na-wa-your-name-1052", title: "Your Name (Kimi no Na wa)", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f58b0204c20ae3310f65ae7b8cb9987e.jpg", rating: "PG-13", type: "Movie" },
  { id: "spirited-away-889", title: "Spirited Away", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/a95dfdb22d2bc4eefaa9f4c1c1ff2e6e.jpg", rating: "PG", type: "Movie" },
  { id: "a-silent-voice-1728", title: "A Silent Voice", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/af6a1eea26cc29f2d2ef3a75a414b77f.jpg", rating: "PG-13", type: "Movie" },
  { id: "weathering-with-you-1953", title: "Weathering With You", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/536ec57538ae7f5e837cf1ecc16c5e5f.jpg", rating: "PG-13", type: "Movie" },
  { id: "hotaru-no-haka-578", title: "Grave of the Fireflies", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/f33e7f2e3c5d3f5a1c9e0e3d8f3e0e3d.jpg", rating: "PG-13", type: "Movie" },
  { id: "howls-moving-castle-1037", title: "Howl's Moving Castle", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/0ea4a6c957b41d75c3a5cc4b88dcd5c3.jpg", rating: "PG", type: "Movie" },
  { id: "princess-mononoke-1101", title: "Princess Mononoke", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/08d5ad6c7f16adc6c54f8eeee24d6d76.jpg", rating: "PG-13", type: "Movie" },
  { id: "akira-77", title: "Akira", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/90a26f4a3dcde2c5e7ac41eb9c9b6b18.jpg", rating: "R", type: "Movie" },
  { id: "demon-slayer-kimetsu-no-yaiba-movie-mugen-train-6621", title: "Demon Slayer: Mugen Train", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/1f06eb0bff4e64ccdf9a64f6d0889839.jpg", rating: "R", type: "Movie" },
  { id: "jujutsu-kaisen-0-movie-18009", title: "Jujutsu Kaisen 0", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c85d24e89c7a9ef0e37b85f9c2c79ab0.jpg", rating: "PG-13", type: "Movie" },
  { id: "one-piece-film-red-18335", title: "One Piece Film: Red", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/3ecc38c17bdd0d0ebbb8d9bd6b5f929b.jpg", rating: "PG-13", type: "Movie" },
  { id: "dragon-ball-super-broly-3827", title: "Dragon Ball Super: Broly", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/eb3f5b88ce3f3c1ff9ec7e67ec3a3c26.jpg", rating: "PG-13", type: "Movie" },
  { id: "suzume-no-tojimari-18618", title: "Suzume", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/0b3ea8bad89f08bad7a6ad39a294ab8b.jpg", rating: "PG", type: "Movie" },
  { id: "kimitachi-wa-dou-ikiru-ka-19195", title: "The Boy and the Heron", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b5a93d5b95e11f91e1e8c2d0f6dc5f32.jpg", rating: "PG-13", type: "Movie" },
  { id: "my-neighbor-totoro-1114", title: "My Neighbor Totoro", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/cf10dea1ece3bea0f44b9d8b6dc8e0e3.jpg", rating: "G", type: "Movie" },
  { id: "byousoku-5-centimeter-2588", title: "5 Centimeters Per Second", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b7e3c5a1d8a2a1e8b5e3c5a1e8a2a1e8.jpg", rating: "PG", type: "Movie" },
  { id: "kotonoha-no-niwa-1930", title: "The Garden of Words", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/5e8c9b7a6d4e3f2a1c0b9d8e7f6a5b4c.jpg", rating: "PG-13", type: "Movie" },
  { id: "kimi-no-suizou-wo-tabetai-2632", title: "I Want to Eat Your Pancreas", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d.jpg", rating: "PG-13", type: "Movie" },
  { id: "ookami-kodomo-no-ame-to-yuki-1561", title: "Wolf Children", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c.jpg", rating: "PG", type: "Movie" },
  { id: "toki-wo-kakeru-shoujo-2418", title: "The Girl Who Leapt Through Time", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d.jpg", rating: "PG", type: "Movie" },
  { id: "summer-wars-1530", title: "Summer Wars", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f.jpg", rating: "PG", type: "Movie" },
  { id: "redline-1053", title: "Redline", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b.jpg", rating: "PG-13", type: "Movie" },
  { id: "paprika-1111", title: "Paprika", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d.jpg", rating: "R", type: "Movie" },
  { id: "koukaku-kidoutai-969", title: "Ghost in the Shell", poster: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f.jpg", rating: "R", type: "Movie" },
];

export default function MoviesPage() {
  const [movies, setMovies] = useState<AnimeResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies(1);
        if (data.animes && data.animes.length > 0) {
          setMovies(data.animes);
        } else {
          setMovies(fallbackMovies as unknown as AnimeResult[]);
        }
      } catch {
        setMovies(fallbackMovies as unknown as AnimeResult[]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

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

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movies.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  id={anime.id}
                  title={anime.title || anime.name || "Unknown"}
                  image={anime.poster}
                  rating={anime.rating}
                  type="Movie"
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