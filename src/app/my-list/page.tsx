"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import { Heart, Loader2 } from "lucide-react";

interface MyListItem {
  id: string;
  anime_id: string;
  anime_title: string;
  anime_poster: string | null;
  anime_type: string | null;
  anime_rating: string | null;
  anime_episodes: number | null;
  added_at: string;
}

export default function MyListPage() {
  const [myList, setMyList] = useState<MyListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyList();
  }, []);

  const fetchMyList = async () => {
    try {
      const response = await fetch("/api/my-list");
      const result = await response.json();
      
      if (result.success) {
        setMyList(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching my list:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014]">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
            <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20">
                <Heart className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">My List</h1>
                <p className="text-gray-400">
                  {myList.length} {myList.length === 1 ? "anime" : "anime"} in your collection
                </p>
              </div>
            </div>

            {myList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  <Heart className="w-10 h-10 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Your list is empty</h2>
                <p className="text-gray-400 mb-6 max-w-md">
                  Start adding anime to your list by clicking the + button on any anime card
                </p>
                <a
                  href="/browse"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all neon-glow"
                >
                  Browse Anime
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {myList.map((item) => (
                  <AnimeCard
                    key={item.id}
                    id={item.anime_id}
                    title={item.anime_title}
                    image={item.anime_poster || ""}
                    rating={item.anime_rating || "N/A"}
                    episodes={item.anime_episodes || 0}
                    type={item.anime_type || "TV"}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
