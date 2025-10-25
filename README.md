# 🕌 أوقات الصلاة - Prayer Times Website

A comprehensive, SEO-focused Islamic prayer times website built with Next.js 16, featuring multilingual support (Arabic, English, Urdu) and real-time prayer schedules for cities worldwide.

## ✨ Features

### 🎯 Core Features
- **Real-time Prayer Times** - Accurate prayer times for Makkah, Madinah, and cities worldwide using Aladhan API
- **Hijri Calendar** - 30-day Gregorian and Hijri calendar for the current month
- **Multi-language Support** - Arabic (primary), English, and Urdu translations
- **Country Selection** - Interactive country list with flag emojis (Gulf countries + Pakistan, Turkey, Indonesia)
- **SEO Optimized** - Comprehensive meta tags, schema markup, sitemap, and robots.txt
- **Responsive Design** - Mobile-first, fully responsive across all devices
- **RTL Support** - Right-to-left layout for Arabic language

### 📱 Pages
1. **Home** - Hero section, Makkah/Madinah prayer times, calendar, countries list
2. **Prayer Times** - Detailed prayer times with explanations
3. **About Us** - Mission and information about the website
4. **Contact** - Contact form and FAQ section
5. **Privacy Policy** - Comprehensive privacy policy in Arabic and English

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd "d:\AA Current Projects\prayertimes"
```

2. Install dependencies (if needed):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Fonts**: Geist Sans, Geist Mono, Amiri (Arabic)
- **API**: Aladhan Prayer Times API
- **Deployment Ready**: Optimized for Vercel deployment

## 📂 Project Structure

```
prayertimes/
├── app/
│   ├── components/
│   │   ├── Header.tsx          # Navigation with language switcher
│   │   ├── Footer.tsx          # Footer component
│   │   ├── PrayerTimesCard.tsx # Prayer times display
│   │   ├── HijriCalendar.tsx   # 30-day calendar
│   │   └── CountriesList.tsx   # Countries with flags
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact page
│   ├── privacy/page.tsx        # Privacy policy
│   ├── prayer-times/page.tsx   # Prayer times page
│   ├── layout.tsx              # Root layout with SEO
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   ├── sitemap.ts              # XML sitemap
│   └── robots.ts               # Robots.txt
├── public/
│   └── schema.json             # JSON-LD schema
├── next.config.ts              # Next.js configuration
├── package.json
└── tsconfig.json
```

## 🎨 Key Components

### Header Component
- Multi-language switcher (Arabic, English, Urdu)
- Responsive navigation menu
- Mobile-friendly hamburger menu

### Prayer Times Card
- Fetches real-time data from Aladhan API
- Displays 6 prayer times: Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha
- Shows Hijri date
- Loading states and error handling

### Hijri Calendar
- Displays current month's 30 days
- Gregorian and Hijri dates side by side
- Highlights today's date
- Responsive grid layout

### Countries List
- Interactive country cards with flag emojis
- Click to view prayer times for that country's capital
- Covers Gulf countries + Pakistan, Turkey, Indonesia

## 🔍 SEO Features

### ✅ Implemented SEO Best Practices:
1. **Comprehensive Metadata**
   - Researched keywords for prayer times niche
   - Multi-language meta tags
   - Open Graph tags for social media
   - Twitter Card support

2. **Technical SEO**
   - XML Sitemap (`/sitemap.xml`)
   - Robots.txt configuration
   - JSON-LD Schema markup
   - Semantic HTML structure
   - Optimized page titles and descriptions

3. **Content Optimization**
   - H1, H2, H3 hierarchy
   - Alt text for images
   - Keyword-rich content in Arabic and English
   - Internal linking structure

4. **Performance**
   - Server-side rendering (SSR)
   - Optimized fonts with display swap
   - Lazy loading components
   - Fast page loads with Next.js

## 🌍 API Integration

The website uses the **Aladhan API** for prayer times:
- Endpoint: `https://api.aladhan.com/v1/`
- Methods used:
  - `timingsByCity` - Get prayer times for a city
  - `gToH` - Convert Gregorian to Hijri dates

## 🎯 SEO Keywords Targeted

**Arabic Keywords:**
- أوقات الصلاة
- مواقيت الصلاة
- التقويم الهجري
- اذان
- وقت الصلاة

**English Keywords:**
- prayer times
- salah times
- namaz times
- islamic prayer times
- hijri calendar
- adhan times
- fajr time, dhuhr time, asr time, maghrib time, isha time

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible grid layouts
- Touch-friendly buttons
- Optimized for all screen sizes

## 🌐 Internationalization

The website supports three languages:
- **Arabic (العربية)** - Primary language
- **English** - Secondary language
- **Urdu (اردو)** - Additional language

Language switching is available in the header component.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Deploy automatically

Or use Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Build for Production
```bash
npm run build
npm start
```

## 📝 Future Enhancements

- [ ] Add Qibla direction finder
- [ ] Implement notifications for prayer times
- [ ] Add monthly prayer time calendar
- [ ] Create mobile app version
- [ ] Add more Islamic content
- [ ] Implement user location detection
- [ ] Add dark mode toggle
- [ ] Create PWA (Progressive Web App)

## 🤝 Contributing

This is a private project. For any questions or suggestions, please contact the development team.

## 📄 License

All rights reserved. This is a proprietary project.

## 📞 Contact

- Email: info@prayertimes.com
- Website: www.prayertimes.com

---

**Built with ❤️ for the Muslim Ummah**

*"Indeed, prayer has been decreed upon the believers a decree of specified times." - Quran 4:103*

