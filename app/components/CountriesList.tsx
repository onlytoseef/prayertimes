import Link from 'next/link';
import { Globe } from 'lucide-react';
import countriesData from '@/data/countries.json';

export default function CountriesList() {
  const countries = Object.entries(countriesData).map(([slug, country]) => ({
    ...country,
    slug,
  }));

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 font-[var(--font-tajawal)] mb-2">
          مواقيت الصلاة حول العالم
        </h2>
        <p className="text-gray-600 mb-4">Prayer Times Around the World</p>
        <p className="text-sm text-gray-500 font-[var(--font-tajawal)]">
          انقر على أي دولة لعرض المدن ومواقيت الصلاة
        </p>
        <p className="text-sm text-gray-500">Click any country to view cities and prayer times</p>
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {countries.map((country) => (
          <Link
            key={country.slug}
            href={`/${country.slug}`}
            className="group p-4 rounded-lg border-2 bg-white border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all hover:scale-105 text-center"
          >
            <div className="text-4xl mb-2">{country.flag}</div>
            <div className="font-semibold mb-1 font-[var(--font-tajawal)] text-sm text-gray-800 group-hover:text-emerald-600 transition-colors">
              {country.nameAr}
            </div>
            <div className="text-xs text-gray-500">
              {country.name}
            </div>
            <div className="text-xs text-gray-400 mt-2">
              {country.cities.length} {country.cities.length === 1 ? 'city' : 'cities'}
            </div>
          </Link>
        ))}
      </div>

      {/* Info Message */}
      <div className="text-center py-8 mt-8 border-t border-gray-200">
        <Globe className="w-12 h-12 mx-auto mb-3 text-emerald-600" />
        <p className="font-[var(--font-tajawal)] text-gray-700 mb-1">
          اختر دولة للوصول إلى جميع مدنها
        </p>
        <p className="text-sm text-gray-600">Select a country to access all its cities</p>
      </div>
    </div>
  );
}
