import { MetadataRoute } from 'next'
import countriesData from '@/data/countries.json'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://prayertimes.com'
  const currentDate = new Date()
  const languages = ['ar', 'en', 'ur']
  
  const staticRoutes: MetadataRoute.Sitemap = [
    // Root redirect (will redirect to /ar)
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Home pages for each language
    ...languages.map(lang => ({
      url: `${baseUrl}/${lang}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
      alternates: {
        languages: {
          'x-default': `${baseUrl}/ar`,
          ar: `${baseUrl}/ar`,
          en: `${baseUrl}/en`,
          ur: `${baseUrl}/ur`,
        },
      },
    })),
  ]

  // Generate dynamic routes for countries (29 countries × 3 languages = 87 pages)
  const countryRoutes: MetadataRoute.Sitemap = []
  languages.forEach((lang) => {
    Object.keys(countriesData).forEach((slug) => {
      countryRoutes.push({
        url: `${baseUrl}/${lang}/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.85,
        alternates: {
          languages: {
            'x-default': `${baseUrl}/ar/${slug}`,
            ar: `${baseUrl}/ar/${slug}`,
            en: `${baseUrl}/en/${slug}`,
            ur: `${baseUrl}/ur/${slug}`,
          },
        },
      })
    })
  })

  // Generate dynamic routes for cities (123 cities × 3 languages = 369 pages)
  const cityRoutes: MetadataRoute.Sitemap = []
  languages.forEach((lang) => {
    Object.entries(countriesData).forEach(([countrySlug, country]) => {
      country.cities.forEach((city) => {
        const cityUrl = `${baseUrl}/${lang}/${countrySlug}/${city.slug}-prayertime`
        
        cityRoutes.push({
          url: cityUrl,
          lastModified: currentDate,
          changeFrequency: 'daily',
          priority: 0.90,
          alternates: {
            languages: {
              'x-default': `${baseUrl}/ar/${countrySlug}/${city.slug}-prayertime`,
              ar: `${baseUrl}/ar/${countrySlug}/${city.slug}-prayertime`,
              en: `${baseUrl}/en/${countrySlug}/${city.slug}-prayertime`,
              ur: `${baseUrl}/ur/${countrySlug}/${city.slug}-prayertime`,
            },
          },
        })
      })
    })
  })

  const totalPages = staticRoutes.length + countryRoutes.length + cityRoutes.length
  console.log(`📄 Sitemap generated: ${totalPages} URLs (${languages.length} home + ${countryRoutes.length} countries + ${cityRoutes.length} cities)`)
  
  return [...staticRoutes, ...countryRoutes, ...cityRoutes]
}
