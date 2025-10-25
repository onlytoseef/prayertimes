import { MetadataRoute } from 'next'
import countriesData from '@/data/countries.json'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://prayertimes.com'
  
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar`,
          en: `${baseUrl}/en`,
          ur: `${baseUrl}/ur`,
        },
      },
    },
    {
      url: `${baseUrl}/prayer-times`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Generate dynamic routes for countries
  const countryRoutes: MetadataRoute.Sitemap = Object.keys(countriesData).map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // Generate dynamic routes for cities
  const cityRoutes: MetadataRoute.Sitemap = []
  Object.entries(countriesData).forEach(([countrySlug, country]) => {
    country.cities.forEach((city) => {
      cityRoutes.push({
        url: `${baseUrl}/${countrySlug}/${city.slug}-prayertime`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      })
    })
  })

  return [...staticRoutes, ...countryRoutes, ...cityRoutes]
}
