import type { MetadataRoute } from 'next';
import { getHome, getGenres } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kiraanime.com';
  
  try {
    const homeData = await getHome();
    const genres = await getGenres();

    const staticRoutes: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 1,
      },
      {
        url: `${baseUrl}/browse`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/popular`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/movies`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/series`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/my-list`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
    ];

    const animeRoutes: MetadataRoute.Sitemap = [];
    
    const allAnime = [
      ...(homeData.trending || []),
      ...(homeData.mostPopular || []),
      ...(homeData.topAiring || []),
      ...(homeData.latestEpisode || []),
    ];

    const uniqueAnime = Array.from(
      new Map(allAnime.map(anime => [anime.id, anime])).values()
    );

    uniqueAnime.forEach(anime => {
      if (anime.id) {
        animeRoutes.push({
          url: `${baseUrl}/anime/${anime.id}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    });

    const genreRoutes: MetadataRoute.Sitemap = genres.map(genre => ({
      url: `${baseUrl}/browse?genre=${genre.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    }));

    return [...staticRoutes, ...animeRoutes, ...genreRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 1,
      },
      {
        url: `${baseUrl}/browse`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.9,
      },
    ];
  }
}
