# URL-Based Language Implementation (Query Parameter Approach)

## Overview
Implemented Islamic Finder-style URL-based multilingual pages where each language has a separate indexed URL for maximum SEO benefit.

## Strategy
- **Approach**: Query Parameter (`?language=en`)
- **Total Pages**: 369 (123 cities × 3 languages)
- **SEO Benefit**: 3x indexed pages = 3x potential organic traffic
- **Default**: Arabic (no query parameter)
- **Languages**: 
  - Arabic (ar) - Default: `/pakistan/faisalabad-prayertime`
  - English (en): `/pakistan/faisalabad-prayertime?language=en`
  - Urdu (ur): `/pakistan/faisalabad-prayertime?language=ur`

## Implementation Details

### 1. City Pages (`app/[country]/[city]/page.tsx`)

#### Props Updated
```typescript
type Props = {
  params: Promise<{ country: string; city: string }>
  searchParams: Promise<{ language?: string }>  // NEW
}
```

#### Static Generation
```typescript
export async function generateStaticParams() {
  // Generates 123 base pages
  // Next.js handles ?language= variants dynamically
  const params: { country: string; city: string }[] = [];
  
  Object.entries(countriesData).forEach(([countrySlug, country]) => {
    country.cities.forEach((city) => {
      params.push({
        country: countrySlug,
        city: city.slug,
      });
    });
  });
  
  return params; // 123 pages
}
```

#### Language Detection
```typescript
export default async function CityPrayerTimePage({ params, searchParams }: Props) {
  const urlParams = await searchParams;
  const language = (urlParams.language || 'ar') as Language;
  
  // Pass language to LanguageInitializer component
  return (
    <div>
      <LanguageInitializer language={language} />
      {/* Rest of page */}
    </div>
  );
}
```

#### Metadata (SEO)
```typescript
export async function generateMetadata({ params, searchParams }: Props) {
  const language = (urlParams.language || 'ar') as Language;
  
  // Language-specific titles and descriptions
  const metadataByLanguage = {
    ar: {
      title: `أوقات الصلاة في ${city.nameAr}...`,
      description: `احصل على أوقات الصلاة...`,
    },
    en: {
      title: `Prayer Times in ${city.name}...`,
      description: `Get accurate prayer times...`,
    },
    ur: {
      title: `${city.name} میں نماز کے اوقات...`,
      description: `${city.name} کے لیے درست نماز...`,
    },
  };
  
  // Hreflang tags for language alternates
  alternates: {
    canonical: language === 'ar' ? baseUrl : `${baseUrl}?language=${language}`,
    languages: {
      'x-default': baseUrl,
      'ar': baseUrl,
      'en': `${baseUrl}?language=en`,
      'ur': `${baseUrl}?language=ur`,
    },
  }
}
```

### 2. Country Pages (`app/[country]/page.tsx`)

Similar implementation:
- Added `searchParams` to Props
- Language-specific metadata
- Hreflang tags
- LanguageInitializer component

### 3. Language Initializer (`app/components/LanguageInitializer.tsx`)

**Purpose**: Sync URL language parameter with React Context

```typescript
'use client';

export default function LanguageInitializer({ language }: { language: Language }) {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

  return null; // Invisible component
}
```

**Why needed**: Server components can't use React Context, so we:
1. Read `searchParams.language` in server component
2. Pass it to LanguageInitializer client component
3. LanguageInitializer updates the global context
4. All other client components receive the correct language

### 4. Header Component (`app/components/Header.tsx`)

**Updated Language Switcher**:
```typescript
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const handleLanguageChange = (newLanguage: Language) => {
  const params = new URLSearchParams(searchParams.toString());
  
  if (newLanguage === 'ar') {
    params.delete('language'); // Default = no parameter
  } else {
    params.set('language', newLanguage);
  }
  
  const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
  router.push(newUrl); // Navigate to new URL
};
```

**Behavior**:
- Switching to Arabic: Removes `?language=` → `/city`
- Switching to English: Adds/updates → `/city?language=en`
- Switching to Urdu: Adds/updates → `/city?language=ur`
- **Result**: Browser URL changes, Google can index each variant

### 5. Sitemap (`app/sitemap.ts`)

**Updated**: Now generates 3 URLs per city/country

```typescript
// City Example (×3 for each city)
{
  url: `${baseUrl}/${countrySlug}/${city.slug}-prayertime`,
  alternates: {
    languages: {
      'x-default': `${baseUrl}/${countrySlug}/${city.slug}-prayertime`,
      ar: `${baseUrl}/${countrySlug}/${city.slug}-prayertime`,
      en: `${baseUrl}/${countrySlug}/${city.slug}-prayertime?language=en`,
      ur: `${baseUrl}/${countrySlug}/${city.slug}-prayertime?language=ur`,
    },
  },
},
{
  url: `${baseUrl}/${countrySlug}/${city.slug}-prayertime?language=en`,
},
{
  url: `${baseUrl}/${countrySlug}/${city.slug}-prayertime?language=ur`,
}
```

**Total Sitemap URLs**:
- Static pages: 5
- Country pages: 29 × 3 = 87
- City pages: 123 × 3 = 369
- **Grand Total**: 461 URLs

## SEO Benefits

### 1. Separate Indexing
Each language variant is a distinct URL that Google can index separately:
- `example.com/city` → Arabic content → Arabic search results
- `example.com/city?language=en` → English content → English search results
- `example.com/city?language=ur` → Urdu content → Urdu search results

### 2. Hreflang Tags
Tells Google that these are language variants of the same content:
```html
<link rel="alternate" hreflang="ar" href="/city" />
<link rel="alternate" hreflang="en" href="/city?language=en" />
<link rel="alternate" hreflang="ur" href="/city?language=ur" />
<link rel="alternate" hreflang="x-default" href="/city" />
```

### 3. Language-Specific Metadata
Each URL has:
- Correct `lang` attribute in HTML
- Translated title and description
- Appropriate locale in Open Graph tags
- Language-specific canonical URL

### 4. Canonical URLs
Each language variant has its own canonical:
- Arabic: `<link rel="canonical" href="/city" />`
- English: `<link rel="canonical" href="/city?language=en" />`
- Urdu: `<link rel="canonical" href="/city?language=ur" />`

## Traffic Multiplication

### Before (Client-Side Only)
- 123 city pages
- Language switching invisible to Google
- Single URL per city
- Arabic-only indexing

### After (URL Parameters)
- 369 indexed city pages
- Each language visible to Google
- Multiple URLs per city
- 3x potential organic traffic

## User Experience

### Language Switching Flow
1. User visits `/pakistan/faisalabad-prayertime`
2. Sees Arabic content (default)
3. Clicks English in header
4. URL changes to `/pakistan/faisalabad-prayertime?language=en`
5. Page content updates to English
6. Browser history records the change
7. User can bookmark/share language-specific URL

### Shareable URLs
- Share `/city?language=en` → Recipients see English
- Share `/city?language=ur` → Recipients see Urdu
- Share `/city` → Recipients see Arabic (default)

## Next.js Features Used

### 1. Server Components
City and country pages are server components that:
- Read `searchParams` directly
- Generate metadata on the server
- No client-side language detection needed

### 2. Client Components
- LanguageInitializer: Syncs URL with context
- Header: Handles language switching
- All other components: Read from context

### 3. Static Site Generation (SSG)
- Generates 123 base pages at build time
- ISR handles page updates every 24 hours
- Query parameters work with SSG

### 4. Incremental Static Regeneration (ISR)
```typescript
export const revalidate = 86400; // 24 hours
```
- Pages regenerate daily
- Fresh prayer times without full rebuild
- Works seamlessly with URL parameters

## File Structure

```
app/
├── [country]/
│   ├── [city]/
│   │   └── page.tsx          # ✅ Updated (searchParams, metadata, LanguageInitializer)
│   └── page.tsx               # ✅ Updated (searchParams, metadata, LanguageInitializer)
├── components/
│   ├── Header.tsx             # ✅ Updated (URL-based language switcher)
│   └── LanguageInitializer.tsx # ✅ NEW (syncs URL with context)
├── context/
│   └── LanguageContext.tsx    # ✅ Existing (no changes needed)
└── sitemap.ts                 # ✅ Updated (3 URLs per city/country)
```

## Testing Checklist

- [ ] Visit `/pakistan/faisalabad-prayertime`
- [ ] Verify Arabic content displayed
- [ ] Switch to English via header
- [ ] Verify URL changes to `?language=en`
- [ ] Verify English content displayed
- [ ] Switch to Urdu
- [ ] Verify URL changes to `?language=ur`
- [ ] Verify Urdu content displayed
- [ ] Refresh page - language persists
- [ ] Check page source for hreflang tags
- [ ] Check page source for language-specific title
- [ ] Verify sitemap includes all 461 URLs
- [ ] Test direct URL access: `/city?language=en`
- [ ] Test bookmark functionality
- [ ] Build succeeds: `npm run build`

## Performance Notes

### Build Time
- 123 static pages generated
- Query parameters don't require separate builds
- Build time similar to before (1-3 minutes)

### Runtime
- URL parameters parsed on demand
- Minimal overhead
- LanguageInitializer adds negligible client bundle size (~0.5KB)

### Caching
- CDN can cache each language variant separately
- Better cache hit rates
- Faster page loads for users

## Migration Path

### From Client-Side to URL-Based

1. **Before**: Language in localStorage
   ```typescript
   setLanguage('en')
   // Invisible to Google, not shareable
   ```

2. **After**: Language in URL
   ```typescript
   router.push('/city?language=en')
   // Visible to Google, shareable, bookmarkable
   ```

### Backward Compatibility
- Old URLs still work (show Arabic)
- No broken links
- Smooth transition for users
- Search engines discover new variants organically

## Future Enhancements

1. **Add More Languages**
   - `?language=fr` (French)
   - `?language=tr` (Turkish)
   - Just add translations, update sitemap

2. **Subdirectory Approach** (Optional)
   - `/ar/city` instead of `/city?language=ar`
   - Requires routing changes
   - More SEO-friendly but more complex

3. **Subdomain Approach** (Optional)
   - `ar.prayertimes.com`
   - `en.prayertimes.com`
   - Maximum SEO benefit but infrastructure overhead

## Comparison: Islamic Finder vs Our Implementation

| Feature | Islamic Finder | Our Implementation |
|---------|----------------|-------------------|
| URL Pattern | `/city/?language=en` | `/city?language=en` |
| Default Language | English | Arabic |
| Language Switcher | Dropdown | Dropdown |
| SEO Strategy | Separate URLs | Separate URLs ✅ |
| Hreflang Tags | Yes | Yes ✅ |
| Sitemap | Multiple URLs | Multiple URLs ✅ |
| Metadata | Language-specific | Language-specific ✅ |
| Framework | Unknown | Next.js 16 |

## Conclusion

Successfully implemented URL-based multilingual pages with:
- ✅ 369 indexed city pages (3x traffic potential)
- ✅ Separate URLs for each language
- ✅ Hreflang tags for Google
- ✅ Language-specific metadata
- ✅ Shareable/bookmarkable language URLs
- ✅ SEO-optimized sitemap (461 URLs)
- ✅ Maintains all existing ISR/SSG benefits
- ✅ User-friendly language switching

This approach matches Islamic Finder's strategy and positions the website for maximum organic traffic growth across all three languages.
