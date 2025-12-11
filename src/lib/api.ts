const HIANIME_API = "https://animo.qzz.io/api/v1";

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

interface HiAnimeResult {
  id: string;
  name?: string;
  title?: string;
  alternativeTitle?: string;
  poster: string;
  duration?: string;
  type?: string;
  rating?: string;
  rank?: number;
  episodes?: { sub?: number; dub?: number; eps?: number };
}

interface HiAnimeSpotlight {
  rank: number;
  id: string;
  name?: string;
  title?: string;
  alternativeTitle?: string;
  jname?: string;
  poster: string;
  description?: string;
  synopsis?: string;
  type: string;
  quality: string;
  duration: string;
  otherInfo?: string[];
  aired?: string;
  episodes: { sub: number; dub: number; eps?: number };
}

function transformHiAnime(anime: HiAnimeResult): AnimeResult {
  const title = anime.title || anime.name || "";
  return {
    id: anime.id,
    title: title,
    name: title,
    poster: getValidPoster(anime.poster),
    type: anime.type || "TV",
    rating: anime.rating,
    rank: anime.rank,
    duration: anime.duration,
    alternativeTitle: anime.alternativeTitle,
    episodes: {
      sub: anime.episodes?.sub || 0,
      dub: anime.episodes?.dub || 0,
      eps: anime.episodes?.eps || anime.episodes?.sub || 0,
    },
  };
}

function transformHiSpotlight(anime: HiAnimeSpotlight): SpotlightAnime {
  const title = anime.title || anime.name || "";
  return {
    rank: anime.rank,
    id: anime.id,
    title: title,
    alternativeTitle: anime.alternativeTitle || anime.jname || title,
    poster: getValidPoster(anime.poster),
    synopsis: anime.synopsis || anime.description || "No description available.",
    type: anime.type || "TV",
    quality: anime.quality || "HD",
    duration: anime.duration || "24 min",
    aired: anime.aired || anime.otherInfo?.[2] || "TBA",
    episodes: {
      sub: anime.episodes?.sub || 0,
      dub: anime.episodes?.dub || 0,
      eps: anime.episodes?.eps || anime.episodes?.sub || 0,
    },
  };
}

async function fetchHiAnime<T>(endpoint: string): Promise<T> {
  const isBrowser = typeof window !== "undefined";
  
  let url: string;
  if (isBrowser) {
    url = `/api/hianime?endpoint=${encodeURIComponent(endpoint)}`;
  } else {
    url = `${HIANIME_API}${endpoint}`;
  }
  
  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  const json = await res.json();
  if (json.success === false) throw new Error(json.message || "API unavailable");
  return json.data || json;
}

export async function getHome(): Promise<HomeData> {
  try {
    const data = await fetchHiAnime<{
      spotlight?: HiAnimeSpotlight[];
      spotlightAnimes?: HiAnimeSpotlight[];
      trending?: HiAnimeResult[];
      trendingAnimes?: HiAnimeResult[];
      latestEpisode?: HiAnimeResult[];
      latestEpisodeAnimes?: HiAnimeResult[];
      topUpcoming?: HiAnimeResult[];
      topUpcomingAnimes?: HiAnimeResult[];
      top10?: { today?: HiAnimeResult[]; week?: HiAnimeResult[]; month?: HiAnimeResult[] };
      top10Animes?: { today?: HiAnimeResult[]; week?: HiAnimeResult[]; month?: HiAnimeResult[] };
      topAiring?: HiAnimeResult[];
      topAiringAnimes?: HiAnimeResult[];
      mostPopular?: HiAnimeResult[];
      mostPopularAnimes?: HiAnimeResult[];
      mostFavorite?: HiAnimeResult[];
      mostFavoriteAnimes?: HiAnimeResult[];
      latestCompleted?: HiAnimeResult[];
      latestCompletedAnimes?: HiAnimeResult[];
      newAdded?: HiAnimeResult[];
      genres?: string[];
    }>("/home");

    const top10Data = data.top10 || data.top10Animes || {};

    return {
      spotlight: (data.spotlight || data.spotlightAnimes || []).map(transformHiSpotlight),
      trending: (data.trending || data.trendingAnimes || []).map(transformHiAnime),
      latestEpisode: (data.latestEpisode || data.latestEpisodeAnimes || []).map(transformHiAnime),
      topUpcoming: (data.topUpcoming || data.topUpcomingAnimes || []).map(transformHiAnime),
      top10: {
        today: (top10Data.today || []).map(transformHiAnime),
        week: (top10Data.week || []).map(transformHiAnime),
        month: (top10Data.month || []).map(transformHiAnime),
      },
      topAiring: (data.topAiring || data.topAiringAnimes || []).map(transformHiAnime),
      mostPopular: (data.mostPopular || data.mostPopularAnimes || []).map(transformHiAnime),
      mostFavorite: (data.mostFavorite || data.mostFavoriteAnimes || []).map(transformHiAnime),
      latestCompleted: (data.latestCompleted || data.latestCompletedAnimes || []).map(transformHiAnime),
      newAdded: (data.newAdded || data.latestEpisode || data.latestEpisodeAnimes || []).map(transformHiAnime),
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
  const data = await fetchHiAnime<{
    title?: string;
    alternativeTitle?: string;
    japanese?: string;
    id?: string;
    poster?: string;
    rating?: string;
    type?: string;
    is18Plus?: boolean;
    episodes?: { sub?: number; dub?: number; eps?: number };
    synopsis?: string;
    synonyms?: string | null;
    aired?: { from?: string; to?: string };
    premiered?: string;
    duration?: string;
    status?: string;
    MAL_score?: string;
    genres?: string[];
    studios?: string[];
    producers?: string[];
    moreSeasons?: Array<{ id: string; title: string; alternativeTitle: string; poster: string; isActive: boolean }>;
    related?: Array<{ id: string; title: string; alternativeTitle?: string; poster: string; type?: string; episodes?: { sub?: number; dub?: number; eps?: number } }>;
    mostPopular?: Array<{ id: string; title: string; alternativeTitle?: string; poster: string; type?: string; episodes?: { sub?: number; dub?: number; eps?: number } }>;
    recommended?: Array<{ id: string; title: string; alternativeTitle?: string; poster: string; type?: string; duration?: string; episodes?: { sub?: number; dub?: number; eps?: number }; is18Plus?: boolean }>;
    anime?: {
      info?: {
        id: string;
        anilistId?: number;
        malId?: number;
        name: string;
        poster: string;
        description?: string;
        stats?: { rating?: string; quality?: string; episodes?: { sub?: number; dub?: number }; type?: string; duration?: string };
        promotionalVideos?: Array<{ title: string; source: string; thumbnail: string }>;
        charactersVoiceActors?: Array<{ character: { id: string; poster: string; name: string; cast: string }; voiceActor: { id: string; poster: string; name: string; cast: string } }>;
      };
      moreInfo?: {
        japanese?: string;
        synonyms?: string;
        aired?: string;
        premiered?: string;
        duration?: string;
        status?: string;
        malscore?: string;
        genres?: string[];
        studios?: string;
        producers?: string[];
      };
    };
    seasons?: Array<{ id: string; name: string; title: string; poster: string; isCurrent: boolean }>;
    mostPopularAnimes?: HiAnimeResult[];
    relatedAnimes?: HiAnimeResult[];
    recommendedAnimes?: HiAnimeResult[];
  }>(`/anime/${id}`);

  if (data.anime?.info) {
    return {
      anime: {
        info: {
          id: data.anime.info.id,
          anilistId: data.anime.info.anilistId || 0,
          malId: data.anime.info.malId || 0,
          name: data.anime.info.name,
          poster: data.anime.info.poster,
          description: data.anime.info.description || "No description available.",
          stats: {
            rating: data.anime.info.stats?.rating || "N/A",
            quality: data.anime.info.stats?.quality || "HD",
            episodes: {
              sub: data.anime.info.stats?.episodes?.sub || 0,
              dub: data.anime.info.stats?.episodes?.dub || 0,
            },
            type: data.anime.info.stats?.type || "TV",
            duration: data.anime.info.stats?.duration || "24 min",
          },
          promotionalVideos: data.anime.info.promotionalVideos || [],
          charactersVoiceActors: data.anime.info.charactersVoiceActors || [],
        },
        moreInfo: {
          japanese: data.anime.moreInfo?.japanese || "",
          synonyms: data.anime.moreInfo?.synonyms || "",
          aired: data.anime.moreInfo?.aired || "TBA",
          premiered: data.anime.moreInfo?.premiered || "TBA",
          duration: data.anime.moreInfo?.duration || "24 min",
          status: data.anime.moreInfo?.status || "Unknown",
          malscore: data.anime.moreInfo?.malscore || "N/A",
          genres: data.anime.moreInfo?.genres || [],
          studios: data.anime.moreInfo?.studios || "",
          producers: data.anime.moreInfo?.producers || [],
        },
      },
      seasons: data.seasons || [],
      mostPopularAnimes: data.mostPopularAnimes?.map(transformHiAnime) || [],
      relatedAnimes: data.relatedAnimes?.map(transformHiAnime) || [],
      recommendedAnimes: data.recommendedAnimes?.map(transformHiAnime) || [],
    };
  }

  if (!data.title && !data.id) throw new Error("Anime not found");

  const transformRelated = (items: typeof data.related) => 
    items?.map(item => ({
      id: item.id,
      title: item.title,
      name: item.title,
      poster: item.poster,
      type: item.type || "TV",
      episodes: { sub: item.episodes?.sub || 0, dub: item.episodes?.dub || 0, eps: item.episodes?.eps || 0 },
    })) || [];

  return {
    anime: {
      info: {
        id: data.id || id,
        anilistId: 0,
        malId: 0,
        name: data.title || "Unknown",
        poster: data.poster || "",
        description: data.synopsis || "No description available.",
        stats: {
          rating: data.rating || "N/A",
          quality: "HD",
          episodes: {
            sub: data.episodes?.sub || 0,
            dub: data.episodes?.dub || 0,
          },
          type: data.type || "TV",
          duration: data.duration || "24 min",
        },
        promotionalVideos: [],
        charactersVoiceActors: [],
      },
      moreInfo: {
        japanese: data.japanese || "",
        synonyms: data.synonyms || "",
        aired: data.aired?.from ? `${data.aired.from} to ${data.aired.to || "?"}` : "TBA",
        premiered: data.premiered || "TBA",
        duration: data.duration || "24 min",
        status: data.status || "Unknown",
        malscore: data.MAL_score || "N/A",
        genres: data.genres || [],
        studios: Array.isArray(data.studios) ? data.studios.join(", ") : (data.studios || ""),
        producers: data.producers || [],
      },
    },
    seasons: data.moreSeasons?.map(s => ({
      id: s.id,
      name: s.alternativeTitle || s.title,
      title: s.title,
      poster: s.poster,
      isCurrent: s.isActive,
    })) || [],
    mostPopularAnimes: transformRelated(data.mostPopular),
    relatedAnimes: transformRelated(data.related),
    recommendedAnimes: transformRelated(data.recommended),
  };
}

export async function getEpisodes(id: string): Promise<EpisodesData> {
  const response = await fetchHiAnime<
    | Array<{ title?: string; id: string; episodeNumber: number; isFiller?: boolean }>
    | { totalEpisodes?: number; episodes?: Array<{ title?: string; episodeId: string; number: number; isFiller?: boolean }> }
  >(`/episodes/${id}`);
  
  if (Array.isArray(response)) {
    return {
      totalEpisodes: response.length,
      episodes: response.map((ep) => ({
        title: ep.title || `Episode ${ep.episodeNumber}`,
        episodeId: ep.id,
        number: ep.episodeNumber,
        isFiller: ep.isFiller || false,
      })),
    };
  }
  
  return {
    totalEpisodes: response.totalEpisodes || response.episodes?.length || 0,
    episodes: response.episodes?.map((ep) => ({
      title: ep.title || `Episode ${ep.number}`,
      episodeId: ep.episodeId,
      number: ep.number,
      isFiller: ep.isFiller || false,
    })) || [],
  };
}

export async function getServers(episodeId: string): Promise<ServersData> {
  const data = await fetchHiAnime<{ sub?: Server[]; dub?: Server[]; raw?: Server[]; episodeId?: string; episodeNo?: number }>(`/servers?id=${encodeURIComponent(episodeId)}`);
  return {
    sub: data.sub || [],
    dub: data.dub || [],
    raw: data.raw || [],
    episodeId: data.episodeId || episodeId,
    episodeNo: data.episodeNo || 1,
  };
}

export async function getStream(episodeId: string, server: string = "hd-2", category: string = "sub"): Promise<StreamData> {
  const data = await fetchHiAnime<{ tracks?: StreamData["tracks"]; intro?: StreamData["intro"]; outro?: StreamData["outro"]; sources?: StreamData["sources"]; anilistID?: number; malID?: number }>(`/stream?id=${encodeURIComponent(episodeId)}&server=${server}&type=${category}`);
  return {
    tracks: data.tracks || [],
    intro: data.intro || { start: 0, end: 0 },
    outro: data.outro || { start: 0, end: 0 },
    sources: data.sources || [],
    anilistID: data.anilistID || 0,
    malID: data.malID || 0,
  };
}

export async function search(keyword: string, page: number = 1): Promise<SearchResult> {
  const data = await fetchHiAnime<{ 
    response?: HiAnimeResult[];
    animes?: HiAnimeResult[];
    mostPopularAnimes?: HiAnimeResult[];
    pageInfo?: { currentPage?: number; hasNextPage?: boolean; totalPages?: number };
    currentPage?: number;
    hasNextPage?: boolean;
    totalPages?: number;
  }>(`/search?keyword=${encodeURIComponent(keyword)}&page=${page}`);
  
  const animeList = data.response || data.animes || [];
  const pageInfo = data.pageInfo || {};
  
  return {
    animes: animeList.map(transformHiAnime),
    mostPopularAnimes: data.mostPopularAnimes?.map(transformHiAnime) || [],
    currentPage: pageInfo.currentPage || data.currentPage || page,
    hasNextPage: pageInfo.hasNextPage ?? data.hasNextPage ?? false,
    totalPages: pageInfo.totalPages || data.totalPages || 1,
    searchQuery: keyword,
    searchFilters: {},
  };
}

export async function filter(params: { genre?: string; type?: string; status?: string; season?: string; sort?: string; page?: number }): Promise<SearchResult> {
  const queryParams = new URLSearchParams();
  if (params.genre) queryParams.set("genres", params.genre);
  if (params.type) queryParams.set("type", params.type);
  if (params.status) queryParams.set("status", params.status.replace(/-/g, "_"));
  if (params.season) queryParams.set("season", params.season);
  if (params.sort) queryParams.set("sort", params.sort);
  queryParams.set("page", String(params.page || 1));

  const data = await fetchHiAnime<{ 
    response?: HiAnimeResult[];
    animes?: HiAnimeResult[];
    pageInfo?: { currentPage?: number; hasNextPage?: boolean; totalPages?: number };
    currentPage?: number;
    hasNextPage?: boolean;
    totalPages?: number;
  }>(`/filter?${queryParams.toString()}`);
  
  const animeList = data.response || data.animes || [];
  const pageInfo = data.pageInfo || {};
  
  return {
    animes: animeList.map(transformHiAnime),
    mostPopularAnimes: [],
    currentPage: pageInfo.currentPage || data.currentPage || params.page || 1,
    hasNextPage: pageInfo.hasNextPage ?? data.hasNextPage ?? false,
    totalPages: pageInfo.totalPages || data.totalPages || 1,
    searchQuery: "",
    searchFilters: params as Record<string, string>,
  };
}

export async function getTopAiring(page: number = 1): Promise<{ animes: AnimeResult[]; hasNextPage: boolean }> {
  const data = await fetchHiAnime<{ response?: HiAnimeResult[]; animes?: HiAnimeResult[]; pageInfo?: { hasNextPage?: boolean }; hasNextPage?: boolean }>(`/animes/top-airing?page=${page}`);
  const animeList = data.response || data.animes || [];
  return { animes: animeList.map(transformHiAnime), hasNextPage: data.pageInfo?.hasNextPage ?? data.hasNextPage ?? false };
}

export async function getMostPopular(page: number = 1): Promise<{ animes: AnimeResult[]; hasNextPage: boolean }> {
  const data = await fetchHiAnime<{ response?: HiAnimeResult[]; animes?: HiAnimeResult[]; pageInfo?: { hasNextPage?: boolean }; hasNextPage?: boolean }>(`/animes/most-popular?page=${page}`);
  const animeList = data.response || data.animes || [];
  return { animes: animeList.map(transformHiAnime), hasNextPage: data.pageInfo?.hasNextPage ?? data.hasNextPage ?? false };
}

export async function getRecentlyAdded(page: number = 1): Promise<{ animes: AnimeResult[]; hasNextPage: boolean }> {
  const data = await fetchHiAnime<{ response?: HiAnimeResult[]; animes?: HiAnimeResult[]; pageInfo?: { hasNextPage?: boolean }; hasNextPage?: boolean }>(`/animes/recently-added?page=${page}`);
  const animeList = data.response || data.animes || [];
  return { animes: animeList.map(transformHiAnime), hasNextPage: data.pageInfo?.hasNextPage ?? data.hasNextPage ?? false };
}

export async function getMovies(page: number = 1): Promise<{ animes: AnimeResult[]; hasNextPage: boolean }> {
  const data = await fetchHiAnime<{ response?: HiAnimeResult[]; animes?: HiAnimeResult[]; pageInfo?: { hasNextPage?: boolean }; hasNextPage?: boolean }>(`/animes/movie?page=${page}`);
  const animeList = data.response || data.animes || [];
  return { animes: animeList.map(transformHiAnime), hasNextPage: data.pageInfo?.hasNextPage ?? data.hasNextPage ?? false };
}

export async function getTV(page: number = 1): Promise<{ animes: AnimeResult[]; hasNextPage: boolean }> {
  const data = await fetchHiAnime<{ response?: HiAnimeResult[]; animes?: HiAnimeResult[]; pageInfo?: { hasNextPage?: boolean }; hasNextPage?: boolean }>(`/animes/tv?page=${page}`);
  const animeList = data.response || data.animes || [];
  return { animes: animeList.map(transformHiAnime), hasNextPage: data.pageInfo?.hasNextPage ?? data.hasNextPage ?? false };
}

export async function getGenres(): Promise<string[]> {
  const data = await fetchHiAnime<{ genres?: string[] }>("/genres");
  return data.genres || ["Action", "Adventure", "Cars", "Comedy", "Dementia", "Demons", "Drama", "Ecchi", "Fantasy", "Game", "Harem", "Historical", "Horror", "Isekai", "Josei", "Kids", "Magic", "Martial Arts", "Mecha", "Military", "Music", "Mystery", "Parody", "Police", "Psychological", "Romance", "Samurai", "School", "Sci-Fi", "Seinen", "Shoujo", "Shoujo Ai", "Shounen", "Shounen Ai", "Slice of Life", "Space", "Sports", "Super Power", "Supernatural", "Thriller", "Vampire"];
}

export async function getSchedule(): Promise<{ scheduledAnimes: AnimeResult[] }> {
  const data = await fetchHiAnime<{ scheduledAnimes?: HiAnimeResult[] }>("/schedules");
  return { scheduledAnimes: data.scheduledAnimes?.map(transformHiAnime) || [] };
}

export async function getRandom(): Promise<AnimeInfo> {
  const data = await fetchHiAnime<{ id?: string }>("/random");
  if (data.id) return getAnimeInfo(data.id);
  throw new Error("No random anime found");
}

export async function getSuggestions(keyword: string): Promise<{ suggestions: AnimeResult[] }> {
  const data = await fetchHiAnime<{ animes?: HiAnimeResult[] }>(`/suggestion?q=${encodeURIComponent(keyword)}`);
  return { suggestions: data.animes?.map(transformHiAnime) || [] };
}

export function getEmbedUrl(episodeId: string, server: string = "hd-2", type: string = "sub"): string {
  return `https://animo.qzz.io/api/v1/embed/${server}/${episodeId}/${type}`;
}