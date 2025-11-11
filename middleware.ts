import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Redirect root to /ar (default language)
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/ar', request.url))
  }
  
  // Redirect old non-language URLs to Arabic version
  // e.g., /pakistan/faisalabad-prayertime -> /ar/pakistan/faisalabad-prayertime
  const languagePrefixes = ['ar', 'en', 'ur']
  const firstSegment = pathname.split('/')[1]
  
  if (firstSegment && !languagePrefixes.includes(firstSegment)) {
    // Check if it's a valid country or special route
    const specialRoutes = ['prayer-times', 'about', 'contact', 'privacy', 'api', '_next', 'favicon.ico', 'robots.txt', 'sitemap.xml']
    
    if (!specialRoutes.includes(firstSegment)) {
      // Redirect to Arabic version
      return NextResponse.redirect(new URL(`/ar${pathname}`, request.url))
    }
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
