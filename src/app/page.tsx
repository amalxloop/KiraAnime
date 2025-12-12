import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { AnimeSection } from "@/components/AnimeSection";
import { Footer } from "@/components/Footer";
import { WatchHistory } from "@/components/WatchHistory";
import { getHome } from "@/lib/api";
import { Sparkles, Film, Flame, Clock } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch Anime Online Free - Stream HD Anime Series & Movies",
  description: "Watch thousands of anime series and movies online free in HD quality. Stream trending anime like One Piece, Jujutsu Kaisen, Demon Slayer, Attack on Titan, and more with English subs and dubs.",
  keywords: ["watch anime online", "free anime streaming", "anime HD", "trending anime", "popular anime series", "anime movies", "English subtitles", "anime dub"],
  openGraph: {
    title: "Watch Anime Online Free - Stream HD Anime Series & Movies",
    description: "Watch thousands of anime series and movies online free in HD quality. Stream trending anime with English subs and dubs.",
    type: "website",
    url: "https://kiraanime.com",
  },
  alternates: {
    canonical: "https://kiraanime.com",
  },
};

const fallbackAnime = [
  { id: "one-piece-100", title: "One Piece", image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg", rating: "9.2", episodes: 1100, type: "TV" },
  { id: "jujutsu-kaisen-2nd-season-18413", title: "Jujutsu Kaisen", image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bd5ae1d387a59c5abcf5e1a6a616728c.jpg", rating: "8.9", episodes: 47, type: "TV" },
  { id: "demon-slayer-kimetsu-no-yaiba-hashira-training-arc-19107", title: "Demon Slayer", image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/1f06eb0bff4e64ccdf9a64f6d0889839.jpg", rating: "8.7", episodes: 55, type: "TV" },
  { id: "attack-on-titan-112", title: "Attack on Titan", image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/3a06f85a922a00cc3add7bf17fa10afc.jpg", rating: "9.0", episodes: 88, type: "TV" },
  { id: "naruto-shippuden-355", title: "Naruto Shippuden", image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9cbcf87f54194742e7686119089478f8.jpg", rating: "8.6", episodes: 500, type: "TV" },
  { id: "my-hero-academia-1877", title: "My Hero Academia", image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/06f53b5c1d3e2d1f68c02acc5a87e8c8.jpg", rating: "8.4", episodes: 138, type: "TV" },
  { id: "solo-leveling-18718", title: "Solo Leveling", image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/366b0acb2d80a42e702ab4cfc59b8a82.jpg", rating: "8.8", episodes: 12, type: "TV" },
  { id: "chainsaw-man-17406", title: "Chainsaw Man", image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b3f668d0d8da5c9154c35baf62edc32d.jpg", rating: "8.6", episodes: 12, type: "TV" },
  { id: "spy-x-family-17977", title: "Spy x Family", image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/37f30a4cc99d5ec6b59e9a66df7e2d56.jpg", rating: "8.5", episodes: 37, type: "TV" },
  { id: "tokyo-revengers-17822", title: "Tokyo Revengers", image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9c25caf0e77f56b7b76ee5a52ca4290d.jpg", rating: "8.2", episodes: 37, type: "TV" },
  { id: "death-note-60", title: "Death Note", image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/696e9ec34fa4012ca77d8d32d9e10d85.jpg", rating: "9.0", episodes: 37, type: "TV" },
  { id: "fullmetal-alchemist-brotherhood-5", title: "Fullmetal Alchemist", image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/2ec8e50c6edf32dee9e7dfd651a5bf1d.jpg", rating: "9.1", episodes: 64, type: "TV" },
];

export default async function Home() {
  const homeData = await getHome();

  const hasData = homeData.trending?.length > 0 || homeData.mostPopular?.length > 0;

  const trendingAnime = hasData
    ? homeData.trending?.slice(0, 12).map((a) => ({
        id: a.id,
        title: a.title || a.name || "",
        image: a.poster,
        rating: a.rating || "N/A",
        episodes: a.episodes?.sub || a.episodes?.eps || 0,
        type: a.type || "TV",
      })) || []
    : fallbackAnime.slice(0, 6);

  const popularAnime = hasData
    ? homeData.mostPopular?.slice(0, 12).map((a) => ({
        id: a.id,
        title: a.title || a.name || "",
        image: a.poster,
        rating: a.rating || "N/A",
        episodes: a.episodes?.sub || a.episodes?.eps || 0,
        type: a.type || "TV",
      })) || []
    : fallbackAnime.slice(4, 10);

  const newReleases = hasData
    ? homeData.latestEpisode?.slice(0, 12).map((a) => ({
        id: a.id,
        title: a.title || a.name || "",
        image: a.poster,
        rating: a.rating || "N/A",
        episodes: a.episodes?.sub || a.episodes?.eps || 0,
        type: a.type || "TV",
      })) || []
    : fallbackAnime.slice(6, 12);

  const topAiring = hasData
    ? homeData.topAiring?.slice(0, 12).map((a) => ({
        id: a.id,
        title: a.title || a.name || "",
        image: a.poster,
        rating: a.rating || "N/A",
        episodes: a.episodes?.sub || a.episodes?.eps || 0,
        type: a.type || "TV",
      })) || []
    : fallbackAnime.slice(0, 6);

  const spotlightAnimes = homeData.spotlight || [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "KiraAnime",
    "description": "Stream thousands of anime series and movies free in HD quality",
    "url": "https://kiraanime.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://kiraanime.com/browse?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": trendingAnime.slice(0, 10).map((anime, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Movie",
        "name": anime.title,
        "image": anime.image,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": anime.rating,
          "bestRating": "10"
        }
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#030014]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }}
      />
      <Navbar />
      <HeroCarousel spotlightAnimes={spotlightAnimes} />
      
      <WatchHistory />

      <div className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { icon: Flame, label: "Trending", href: "/browse?filter=trending", color: "from-orange-500 to-red-500" },
              { icon: Sparkles, label: "New Releases", href: "/browse?filter=new", color: "from-purple-500 to-pink-500" },
              { icon: Film, label: "Movies", href: "/browse?type=movie", color: "from-blue-500 to-cyan-500" },
              { icon: Clock, label: "Recently Updated", href: "/browse?filter=recent", color: "from-green-500 to-emerald-500" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
              >
                <div className={`p-1.5 rounded-full bg-gradient-to-r ${item.color}`}>
                  <item.icon className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <AnimeSection
          title="Trending Now"
          subtitle="Most watched anime this week"
          animeList={trendingAnime}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=400&fit=crop')] bg-cover bg-center opacity-20" />
            <div className="relative p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Discover New Anime
                </h3>
                <p className="text-gray-300">
                  Explore thousands of anime series and movies
                </p>
              </div>
              <Link
                href="/browse"
                className="flex-shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium transition-all neon-glow"
              >
                Browse All Anime
              </Link>
            </div>
          </div>
        </div>

        <AnimeSection
          title="Popular Series"
          subtitle="All-time fan favorites"
          animeList={popularAnime}
        />

        <AnimeSection
          title="Latest Episodes"
          subtitle="Fresh anime episodes just released"
          animeList={newReleases}
        />

        <AnimeSection
          title="Top Airing"
          subtitle="Currently airing series"
          animeList={topAiring}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-white mb-6">Browse by Genre</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {(homeData.genres || [
              "Action", "Romance", "Comedy", "Fantasy", "Horror", "Sci-Fi",
              "Drama", "Adventure", "Sports", "Slice of Life", "Supernatural", "Thriller"
            ]).slice(0, 12).map((genre, idx) => {
              const colors = [
                "from-red-600 to-orange-600",
                "from-pink-600 to-rose-600",
                "from-yellow-600 to-amber-600",
                "from-purple-600 to-violet-600",
                "from-gray-800 to-gray-900",
                "from-cyan-600 to-blue-600",
                "from-indigo-600 to-purple-600",
                "from-green-600 to-emerald-600",
                "from-orange-600 to-red-600",
                "from-teal-600 to-cyan-600",
                "from-violet-600 to-purple-600",
                "from-slate-700 to-slate-800",
              ];
              return (
                <Link
                  key={genre}
                  href={`/browse?genre=${genre.toLowerCase().replace(" ", "-")}`}
                  className={`relative p-4 rounded-xl bg-gradient-to-br ${colors[idx % colors.length]} overflow-hidden group transition-transform hover:scale-105`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <span className="relative text-white font-medium text-sm">
                    {genre}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}