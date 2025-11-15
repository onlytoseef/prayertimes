import { MetadataRoute } from 'next'
import countriesData from '@/data/countries.json'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://prayertimes.com'
  const currentDate = new Date()
  const languages = ['en', 'ur'] // Arabic is default (root), only en/ur need prefixes
  
  const staticRoutes: MetadataRoute.Sitemap = [
    // Root homepage (Arabic - default language)
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 1.0,
      alternates: {
        languages: {
          'x-default': baseUrl,
          ar: baseUrl, // Arabic is the root
          en: `${baseUrl}/en`,
          ur: `${baseUrl}/ur`,
        },
      },
    },
    // Home pages for English and Urdu
    ...languages.map(lang => ({
      url: `${baseUrl}/${lang}`,
      lastModified: currentDate,
      changeFrequency: 'hourly' as const,
      priority: 1.0,
      alternates: {
        languages: {
          'x-default': baseUrl,
          ar: baseUrl,
          en: `${baseUrl}/en`,
          ur: `${baseUrl}/ur`,
        },
      },
    })),
  ]

  // Generate dynamic routes for countries (29 countries × 2 languages = 58 pages for en/ur)
  // Arabic country pages are at root level: /country-slug
  const countryRoutes: MetadataRoute.Sitemap = []
  
  // Add Arabic country pages at root
  Object.keys(countriesData).forEach((slug) => {
    countryRoutes.push({
      url: `${baseUrl}/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
      alternates: {
        languages: {
          'x-default': `${baseUrl}/${slug}`,
          ar: `${baseUrl}/${slug}`,
          en: `${baseUrl}/en/${slug}`,
          ur: `${baseUrl}/ur/${slug}`,
        },
      },
    })
  })
  
  // Add English and Urdu country pages
  languages.forEach((lang) => {
    Object.keys(countriesData).forEach((slug) => {
      countryRoutes.push({
        url: `${baseUrl}/${lang}/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.85,
        alternates: {
          languages: {
            'x-default': `${baseUrl}/${slug}`,
            ar: `${baseUrl}/${slug}`,
            en: `${baseUrl}/en/${slug}`,
            ur: `${baseUrl}/ur/${slug}`,
          },
        },
      })
    })
  })

  // Generate dynamic routes for cities (123 cities × 3 languages = 369 pages)
  const cityRoutes: MetadataRoute.Sitemap = []
  
  // Add Arabic city pages at root (no /ar prefix)
  Object.entries(countriesData).forEach(([countrySlug, country]) => {
    country.cities.forEach((city) => {
      const cityUrl = `${baseUrl}/${countrySlug}/${city.slug}-prayertime`
      
      cityRoutes.push({
        url: cityUrl,
        lastModified: currentDate,
        changeFrequency: 'hourly',
        priority: 0.95,
        alternates: {
          languages: {
            'x-default': `${baseUrl}/${countrySlug}/${city.slug}-prayertime`,
            ar: `${baseUrl}/${countrySlug}/${city.slug}-prayertime`,
            en: `${baseUrl}/en/${countrySlug}/${city.slug}-prayertime`,
            ur: `${baseUrl}/ur/${countrySlug}/${city.slug}-prayertime`,
          },
        },
      })
    })
  })
  
  // Add English and Urdu city pages
  languages.forEach((lang) => {
    Object.entries(countriesData).forEach(([countrySlug, country]) => {
      country.cities.forEach((city) => {
        const cityUrl = `${baseUrl}/${lang}/${countrySlug}/${city.slug}-prayertime`
        
        cityRoutes.push({
          url: cityUrl,
          lastModified: currentDate,
          changeFrequency: 'hourly',
          priority: 0.95,
          alternates: {
            languages: {
              'x-default': `${baseUrl}/${countrySlug}/${city.slug}-prayertime`,
              ar: `${baseUrl}/${countrySlug}/${city.slug}-prayertime`,
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
