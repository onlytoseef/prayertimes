import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import countriesData from '@/data/countries.json'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Don't process special routes
  const specialRoutes = ['api', '_next', 'favicon.ico', 'robots.txt', 'sitemap.xml', 'manifest.json', 'about', 'contact', 'privacy', 'prayer-times']
  const firstSegment = pathname.split('/')[1]
  if (specialRoutes.includes(firstSegment) || firstSegment?.startsWith('_')) {
    return NextResponse.next()
  }
  
  // Language prefixes
  const languagePrefixes = ['ar', 'en', 'ur', 'de', 'fr', 'es', 'fa', 'id', 'tr'];
  const countrySlugs = Object.keys(countriesData)
  
  // If path starts with /ar, redirect to root (Arabic is default)
  if (pathname.startsWith('/ar/') || pathname === '/ar') {
    const newPath = pathname.replace(/^\/ar/, '') || '/'
    return NextResponse.redirect(new URL(newPath, request.url))
  }
  
  // If path starts with a country slug (not a language), rewrite to /ar/country
  if (firstSegment && countrySlugs.includes(firstSegment) && !languagePrefixes.includes(firstSegment)) {
    const url = request.nextUrl.clone()
    url.pathname = `/ar${pathname}`
    return NextResponse.rewrite(url)
  }
  
  // If root path, rewrite to /ar
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/ar'
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
