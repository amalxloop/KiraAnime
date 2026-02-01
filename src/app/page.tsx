import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { AnimeSection } from "@/components/AnimeSection";
import { Footer } from "@/components/Footer";
import { WatchHistory } from "@/components/WatchHistory";
import { getHome } from "@/lib/api";
import { Sparkles, Film, Flame, Clock, Play, TrendingUp, Heart, Plus } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KiraAnime - Stream Anime Online Free in HD",
  description: "Watch your favorite anime series and movies on KiraAnime. High quality streaming with English subtitles and dubs.",
  openGraph: {
    title: "KiraAnime - Stream Anime Online Free in HD",
    description: "Watch your favorite anime series and movies on KiraAnime.",
    type: "website",
    url: "https://kiraanime.com",
  },
};

export default async function Home() {
  const homeData = await getHome();

  const spotlightAnimes = homeData.spotlight || [];
  const trendingAnime = homeData.trending || [];
  const popularAnime = homeData.mostPopular || [];
  const latestEpisode = homeData.latestEpisode || [];
  const topAiring = homeData.topAiring || [];
  const mostFavorite = homeData.mostFavorite || [];

  return (
    <div className="min-h-screen bg-[#030014]">
      <Navbar />
      
      {/* Hero Section */}
      <HeroCarousel spotlightAnimes={spotlightAnimes} />
      
      {/* Watch History */}
      <WatchHistory />

      <main className="relative pb-24">
        {/* Glow Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px]" />
          <div className="absolute top-[50%] right-[-10%] w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px]" />
        </div>

        {/* Quick Links */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Flame, label: "Trending", href: "/browse?filter=trending", color: "from-orange-500/20 to-red-500/20", iconColor: "text-orange-500" },
              { icon: Sparkles, label: "New Added", href: "/browse?filter=new", color: "from-purple-500/20 to-pink-500/20", iconColor: "text-purple-500" },
              { icon: Film, label: "Movies", href: "/movies", color: "from-blue-500/20 to-cyan-500/20", iconColor: "text-blue-500" },
              { icon: TrendingUp, label: "Popular", href: "/popular", color: "from-green-500/20 to-emerald-500/20", iconColor: "text-green-500" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br ${item.color} border border-white/5 hover:border-white/20 transition-all group overflow-hidden relative`}
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`p-3 rounded-xl bg-black/40 ${item.iconColor}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          <AnimeSection
            title="Trending Now"
            subtitle="Most watched this week"
            animeList={trendingAnime}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="relative group overflow-hidden rounded-[2rem] bg-[#030014] border border-white/5">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=400&fit=crop')] bg-cover bg-center opacity-20 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-transparent" />
              <div className="relative p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div>
                  <h3 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tighter">
                    UNLEASH YOUR <span className="text-purple-500">OTA-SPIRIT</span>
                  </h3>
                  <p className="text-gray-400 text-lg max-w-md font-medium">
                    Dive into our massive collection of high-quality anime series and movies.
                  </p>
                </div>
                <Link
                  href="/browse"
                  className="flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-black hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
                >
                  <Play className="w-5 h-5 fill-current" />
                  EXPLORE ALL
                </Link>
              </div>
            </div>
          </div>

          <AnimeSection
            title="Latest Episodes"
            subtitle="Fresh from Japan"
            animeList={latestEpisode}
          />

          <AnimeSection
            title="Most Popular"
            subtitle="All-time community favorites"
            animeList={popularAnime}
          />

          <AnimeSection
            title="Most Favorite"
            subtitle="Anime that touched hearts"
            animeList={mostFavorite}
          />

          <AnimeSection
            title="Top Airing"
            subtitle="Currently airing masterpieces"
            animeList={topAiring}
          />

          {/* Genres Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-white tracking-tighter">BROWSE BY GENRE</h2>
                <div className="h-1 w-20 bg-purple-500 mt-2 rounded-full" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {(homeData.genres || []).slice(0, 18).map((genre) => (
                <Link
                  key={genre}
                  href={`/browse?genre=${genre.toLowerCase().replace(" ", "-")}`}
                  className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all text-center"
                >
                  <span className="text-gray-400 group-hover:text-white font-bold transition-colors">
                    {genre}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
