const HIANIME_API = "https://ani-api20.vercel.app/api";

const FALLBACK_POSTER = "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg";

function getValidPoster(poster: string | undefined | null): string {
  if (!poster || typeof poster !== "string" || poster.trim() === "") {
    return FALLBACK_POSTER;
  }
  return poster;
}

export interface AnimeResult {
  id: string;
  name?: string;
  title?: string;
  poster: string;
  duration?: string;
  type?: string;
  rating?: string;
  rank?: number;
  alternativeTitle?: string;
  episodes?: {
    sub?: number;
    dub?: number;
    eps?: number;
  };
}

export interface SpotlightAnime {
  rank: number;
  id: string;
  title: string;
  alternativeTitle: string;
  poster: string;
  synopsis: string;
  type: string;
  quality: string;
  duration: string;
  aired: string;
  episodes: {
    sub: number;
    dub: number;
    eps: number;
  };
}

export interface HomeData {
  spotlight: SpotlightAnime[];
  trending: AnimeResult[];
  latestEpisode: AnimeResult[];
  topUpcoming: AnimeResult[];
  top10: {
    today: AnimeResult[];
    week: AnimeResult[];
    month: AnimeResult[];
  };
  topAiring: AnimeResult[];
  mostPopular: AnimeResult[];
  mostFavorite: AnimeResult[];
  latestCompleted: AnimeResult[];
  newAdded: AnimeResult[];
  genres?: string[];
}

export interface AnimeInfo {
  anime: {
    info: {
      id: string;
      anilistId: number;
      malId: number;
      name: string;
      poster: string;
      description: string;
      stats: {
        rating: string;
        quality: string;
        episodes: {
          sub: number;
          dub: number;
        };
        type: string;
        duration: string;
      };
      promotionalVideos: Array<{
        title: string;
        source: string;
        thumbnail: string;
      }>;
      charactersVoiceActors: Array<{
        character: {
          id: string;
          poster: string;
          name: string;
          cast: string;
        };
        voiceActor: {
          id: string;
          poster: string;
          name: string;
          cast: string;
        };
      }>;
    };
    moreInfo: {
      japanese: string;
      synonyms: string;
      aired: string;
      premiered: string;
      duration: string;
      status: string;
      malscore: string;
      genres: string[];
      studios: string;
      producers: string[];
    };
  };
  seasons: Array<{
    id: string;
    name: string;
    title: string;
    poster: string;
    isCurrent: boolean;
  }>;
  mostPopularAnimes: AnimeResult[];
  relatedAnimes: AnimeResult[];
  recommendedAnimes: AnimeResult[];
}

export interface Episode {
  title: string;
  episodeId: string;
  number: number;
  isFiller: boolean;
}

export interface EpisodesData {
  totalEpisodes: number;
  episodes: Episode[];
}

export interface Server {
  serverName: string;
  serverId: number;
}

export interface ServersData {
  sub: Server[];
  dub: Server[];
  raw: Server[];
  episodeId: string;
  episodeNo: number;
}

export interface StreamData {
  tracks: Array<{
    file: string;
    label: string;
    kind: string;
    default?: boolean;
  }>;
  intro: {
    start: number;
    end: number;
  };
  outro: {
    start: number;
    end: number;
  };
  sources: Array<{
    url: string;
    type: string;
  }>;
  anilistID: number;
  malID: number;
}

export interface SearchResult {
  animes: AnimeResult[];
  mostPopularAnimes: AnimeResult[];
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
  searchQuery: string;
  searchFilters: Record<string, string>;
}

interface NewApiAnime {
  id: string;
  title: string;
  poster: string;
  tvInfo?: {
    showType?: string;
    duration?: string;
    sub?: number;
    dub?: number;
    rating?: string;
  };
  rank?: number;
  description?: string;
}

function transformNewApiAnime(anime: NewApiAnime): AnimeResult {
  return {
    id: anime.id,
    title: anime.title,
    name: anime.title,
    poster: getValidPoster(anime.poster),
    type: anime.tvInfo?.showType || "TV",
    rating: anime.tvInfo?.rating,
    rank: anime.rank,
    duration: anime.tvInfo?.duration,
    episodes: {
      sub: anime.tvInfo?.sub || 0,
      dub: anime.tvInfo?.dub || 0,
      eps: anime.tvInfo?.sub || 0,
    },
  };
}

async function fetchNewApi<T>(endpoint: string, retries = 3): Promise<T> {
  const isBrowser = typeof window !== "undefined";
  
  let url: string;
  if (isBrowser) {
    url = `/api/hianime?endpoint=${encodeURIComponent(endpoint)}`;
  } else {
    url = `${HIANIME_API}${endpoint}`;
  }
  
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, {
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      });
      
      if (!res.ok) {
        if (res.status >= 500 && attempt < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }
        throw new Error(`API Error: ${res.status}`);
      }
      
      const json = await res.json();
      if (json.success === false) throw new Error(json.message || "API unavailable");
      return json.results || json;
    } catch (error) {
      lastError = error as Error;
      if (attempt < retries - 1 && (error as Error).name !== 'AbortError') {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }
    }
  }
  
  throw lastError || new Error("Failed to fetch data");
}

export async function getHome(): Promise<HomeData> {
  try {
    const data = await fetchNewApi<{
      spotlights?: any[];
      trending?: any[];
      latestEpisode?: any[];
      topUpcoming?: any[];
      top10?: { today?: any[]; week?: any[]; month?: any[] };
      topAiring?: any[];
      mostPopular?: any[];
      mostFavorite?: any[];
      latestCompleted?: any[];
      newAdded?: any[];
      genres?: string[];
    }>("/");

    // Top 10 might need a separate call if not in home
    let top10 = data.top10 || { today: [], week: [], month: [] };
    if (!data.top10) {
      try {
        const top10Data = await fetchNewApi<any>("/top-ten");
        top10 = top10Data.topTen || top10;
      } catch (e) {
        console.error("Error fetching top 10:", e);
      }
    }

    return {
      spotlight: (data.spotlights || []).map((a, i) => ({
        rank: i + 1,
        id: a.id,
        title: a.title,
        alternativeTitle: a.title,
        poster: getValidPoster(a.poster),
        synopsis: a.description || "No description available.",
        type: a.tvInfo?.showType || "TV",
        quality: "HD",
        duration: a.tvInfo?.duration || "24 min",
        aired: "TBA",
        episodes: {
          sub: a.tvInfo?.sub || 0,
          dub: a.tvInfo?.dub || 0,
          eps: a.tvInfo?.sub || 0,
        },
      })),
      trending: (data.trending || []).map(transformNewApiAnime),
      latestEpisode: (data.latestEpisode || []).map(transformNewApiAnime),
      topUpcoming: (data.topUpcoming || []).map(transformNewApiAnime),
      top10: {
        today: (top10.today || []).map(transformNewApiAnime),
        week: (top10.week || []).map(transformNewApiAnime),
        month: (top10.month || []).map(transformNewApiAnime),
      },
      topAiring: (data.topAiring || []).map(transformNewApiAnime),
      mostPopular: (data.mostPopular || []).map(transformNewApiAnime),
      mostFavorite: (data.mostFavorite || []).map(transformNewApiAnime),
      latestCompleted: (data.latestCompleted || []).map(transformNewApiAnime),
      newAdded: (data.newAdded || []).map(transformNewApiAnime),
      genres: data.genres || ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural"],
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return {
      spotlight: [],
      trending: [],
      latestEpisode: [],
      topUpcoming: [],
      top10: { today: [], week: [], month: [] },
      topAiring: [],
      mostPopular: [],
      mostFavorite: [],
      latestCompleted: [],
      newAdded: [],
      genres: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural"],
    };
  }
}

export async function getAnimeInfo(id: string): Promise<AnimeInfo> {
  const res = await fetchNewApi<any>(`/info?id=${id}`);
  const data = res.data;

  return {
    anime: {
      info: {
        id: data.id,
        anilistId: data.anilistId || 0,
        malId: data.malId || 0,
        name: data.title,
        poster: getValidPoster(data.poster),
        description: data.description || "No description available.",
        stats: {
          rating: data.animeInfo?.Rating || "N/A",
          quality: data.animeInfo?.Quality || "HD",
          episodes: {
            sub: parseInt(data.animeInfo?.Episodes?.sub) || 0,
            dub: parseInt(data.animeInfo?.Episodes?.dub) || 0,
          },
          type: data.animeInfo?.Type || "TV",
          duration: data.animeInfo?.Duration || "24 min",
        },
        promotionalVideos: [],
        charactersVoiceActors: [],
      },
      moreInfo: {
        japanese: data.animeInfo?.Japanese || "",
        synonyms: data.animeInfo?.Synonyms || "",
        aired: data.animeInfo?.Aired || "TBA",
        premiered: data.animeInfo?.Premiered || "TBA",
        duration: data.animeInfo?.Duration || "24 min",
        status: data.animeInfo?.Status || "Unknown",
        malscore: data.animeInfo?.["MAL Score"] || "N/A",
        genres: data.animeInfo?.Genres || [],
        studios: data.animeInfo?.Studios || "",
        producers: data.animeInfo?.Producers || [],
      },
    },
    seasons: (res.seasons || []).map((s: any) => ({
      id: s.id,
      name: s.title,
      title: s.title,
      poster: s.poster,
      isCurrent: s.isCurrent || false,
    })),
    mostPopularAnimes: [],
    relatedAnimes: (res.relatedAnime || []).map(transformNewApiAnime),
    recommendedAnimes: (res.recommendedAnime || []).map(transformNewApiAnime),
  };
}

export async function getEpisodes(id: string): Promise<EpisodesData> {
  const data = await fetchNewApi<any>(`/episodes/${id}`);
  return {
    totalEpisodes: data.totalEpisodes || 0,
    episodes: (data.episodes || []).map((ep: any) => ({
      title: ep.title || `Episode ${ep.episode_no}`,
      episodeId: ep.id,
      number: ep.episode_no,
      isFiller: ep.isFiller || false,
    })),
  };
}

export async function getServers(animeId: string, episodeId: string): Promise<ServersData> {
  const data = await fetchNewApi<any[]>(`/servers/${animeId}?ep=${episodeId}`);
  const sub = data.filter(s => s.type === "sub").map((s, i) => ({ serverName: s.serverName, serverId: i }));
  const dub = data.filter(s => s.type === "dub").map((s, i) => ({ serverName: s.serverName, serverId: i }));
  const raw = data.filter(s => s.type === "raw").map((s, i) => ({ serverName: s.serverName, serverId: i }));
  
  return {
    sub,
    dub,
    raw,
    episodeId: episodeId,
    episodeNo: 1, // Will be updated by caller if needed
  };
}

export async function getStream(animeId: string, episodeId: string, server: string = "hd-1", category: string = "sub"): Promise<StreamData> {
  const data = await fetchNewApi<any>(`/stream?id=${animeId}&ep=${episodeId}&server=${server}&type=${category}`);
  const link = data.streamingLink?.[0] || {};
  
  return {
    tracks: link.tracks || [],
    intro: link.intro || { start: 0, end: 0 },
    outro: link.outro || { start: 0, end: 0 },
    sources: link.link ? [{ url: link.link.file, type: "hls" }] : [],
    anilistID: 0,
    malID: 0,
  };
}

export async function search(keyword: string, page: number = 1): Promise<SearchResult> {
  const data = await fetchNewApi<any[]>(`/search?keyword=${encodeURIComponent(keyword)}&page=${page}`);
  return {
    animes: data.map(transformNewApiAnime),
    mostPopularAnimes: [],
    currentPage: page,
    hasNextPage: false,
    totalPages: 1,
    searchQuery: keyword,
    searchFilters: {},
  };
}

export async function filter(params: { genre?: string; type?: string; status?: string; season?: string; sort?: string; page?: number }): Promise<SearchResult> {
  const queryParams = new URLSearchParams();
  if (params.genre) queryParams.set("genres", params.genre);
  if (params.type) queryParams.set("type", params.type);
  if (params.status) queryParams.set("status", params.status);
  if (params.sort) queryParams.set("sort", params.sort);
  queryParams.set("page", String(params.page || 1));

  const data = await fetchNewApi<any>(`/filter?${queryParams.toString()}`);
  return {
    animes: (data.data || []).map(transformNewApiAnime),
    mostPopularAnimes: [],
    currentPage: params.page || 1,
    hasNextPage: data.totalPages > (params.page || 1),
    totalPages: data.totalPages || 1,
    searchQuery: "",
    searchFilters: params as Record<string, string>,
  };
}

export async function getTopAiring(page: number = 1): Promise<{ animes: AnimeResult[]; hasNextPage: boolean }> {
  const data = await fetchNewApi<any>(`/top-airing?page=${page}`);
  return { animes: (data.data || []).map(transformNewApiAnime), hasNextPage: data.totalPages > page };
}

export async function getMostPopular(page: number = 1): Promise<{ animes: AnimeResult[]; hasNextPage: boolean }> {
  const data = await fetchNewApi<any>(`/most-popular?page=${page}`);
  return { animes: (data.data || []).map(transformNewApiAnime), hasNextPage: data.totalPages > page };
}

export async function getRecentlyAdded(page: number = 1): Promise<{ animes: AnimeResult[]; hasNextPage: boolean }> {
  const data = await fetchNewApi<any>(`/recently-updated?page=${page}`);
  return { animes: (data.data || []).map(transformNewApiAnime), hasNextPage: data.totalPages > page };
}

export async function getMovies(page: number = 1): Promise<{ animes: AnimeResult[]; hasNextPage: boolean }> {
  const data = await fetchNewApi<any>(`/movie?page=${page}`);
  return { animes: (data.data || []).map(transformNewApiAnime), hasNextPage: data.totalPages > page };
}

export async function getTV(page: number = 1): Promise<{ animes: AnimeResult[]; hasNextPage: boolean }> {
  const data = await fetchNewApi<any>(`/tv?page=${page}`);
  return { animes: (data.data || []).map(transformNewApiAnime), hasNextPage: data.totalPages > page };
}

export async function getGenres(): Promise<string[]> {
  const data = await fetchNewApi<string[]>("/genres");
  return data || [];
}

export async function getSchedule(date?: string): Promise<{ scheduledAnimes: AnimeResult[] }> {
  const data = await fetchNewApi<any[]>(`/schedule${date ? `?date=${date}` : ""}`);
  return { scheduledAnimes: data.map(transformNewApiAnime) || [] };
}

export async function getRandom(): Promise<AnimeInfo> {
  const data = await fetchNewApi<any>("/random");
  if (data.results?.data?.id) return getAnimeInfo(data.results.data.id);
  throw new Error("No random anime found");
}

export async function getSuggestions(keyword: string): Promise<{ suggestions: AnimeResult[] }> {
  const data = await fetchNewApi<any[]>(`/search/suggest?keyword=${encodeURIComponent(keyword)}`);
  return { suggestions: data.map(transformNewApiAnime) || [] };
}

export function getEmbedUrl(episodeId: string, server: string = "hd-1", type: string = "sub"): string {
  // The new API doesn't seem to have a direct embed URL in the docs, 
  // but we can use our own player with the stream link.
  return `/api/stream/embed?id=${episodeId}&server=${server}&type=${type}`;
}