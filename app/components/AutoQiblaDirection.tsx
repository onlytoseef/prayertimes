'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Compass, Navigation, MapPin, Loader } from 'lucide-react';
import countriesData from '@/data/countries.json';

export default function AutoQiblaDirection() {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationData, setLocationData] = useState<{
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  } | null>(null);
  const [qiblaAngle, setQiblaAngle] = useState(0);
  const [distance, setDistance] = useState(0);

  // Kaaba coordinates
  const kaabaLat = 21.4225;
  const kaabaLng = 39.8262;

  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError(language === 'ar' 
        ? 'المتصفح لا يدعم تحديد الموقع الجغرافي' 
        : language === 'ur'
        ? 'براؤزر جغرافیائی محل وقوع کی حمایت نہیں کرتا'
        : language === 'de'
        ? 'Geolokalisierung wird von Ihrem Browser nicht unterstützt'
        : language === 'fr'
        ? 'La géolocalisation n\'est pas supportée par votre navigateur'
        : language === 'es'
        ? 'La geolocalización no es compatible con su navegador'
        : language === 'fa'
        ? 'مرورگر شما از مکان‌یابی پشتیبانی نمی‌کند'
        : language === 'id'
        ? 'Geolokasi tidak didukung oleh browser Anda'
        : language === 'tr'
        ? 'Konumlandırma tarayıcınız tarafından desteklenmiyor'
        : 'Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Calculate Qibla
        const qibla = calculateQiblaDirection(lat, lng);
        const dist = calculateDistance(lat, lng);

        setQiblaAngle(qibla);
        setDistance(dist);

        // Get city name from coordinates using reverse geocoding
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
          );
          const data = await response.json();
          
          // Find matching country in our data to get translated name
          const countryNameEn = data.countryName || '';
          let translatedCountryName = countryNameEn;
          
          // Search for country in our countries.json
          if (countryNameEn) {
            const countryEntry = Object.values(countriesData).find(
              (country: any) => country.name.toLowerCase() === countryNameEn.toLowerCase()
            );
            
            if (countryEntry) {
              const country = countryEntry as { name: string; nameAr: string };
              // Use nameAr for RTL languages, name for LTR languages
              translatedCountryName = (language === 'ar' || language === 'ur' || language === 'fa') 
                ? country.nameAr 
                : country.name;
            }
          }
          
          setLocationData({
            latitude: lat,
            longitude: lng,
            city: data.city || data.locality || language === 'ar' ? 'موقعك' : language === 'ur' ? 'آپ کا مقام' : language === 'de' ? 'Ihr Standort' : language === 'fr' ? 'Votre emplacement' : language === 'es' ? 'Su ubicación' : language === 'fa' ? 'مکان شما' : language === 'id' ? 'Lokasi Anda' : language === 'tr' ? 'Konumunuz' : 'Your Location',
            country: translatedCountryName
          });
        } catch (err) {
          setLocationData({
            latitude: lat,
            longitude: lng,
            city: language === 'ar' ? 'موقعك' : language === 'ur' ? 'آپ کا مقام' : language === 'de' ? 'Ihr Standort' : language === 'fr' ? 'Votre emplacement' : language === 'es' ? 'Su ubicación' : language === 'fa' ? 'مکان شما' : language === 'id' ? 'Lokasi Anda' : language === 'tr' ? 'Konumunuz' : 'Your Location',
            country: ''
          });
        }

        setLoading(false);
      },
      (err) => {
        setError(language === 'ar' 
          ? 'الرجاء السماح بالوصول إلى موقعك' 
          : language === 'ur'
          ? 'براہ کرم اپنے مقام تک رسائی کی اجازت دیں'
          : language === 'de'
          ? 'Fehler beim Abrufen Ihres Standorts'
          : language === 'fr'
          ? 'Veuillez autoriser l\'accès à votre position'
          : language === 'es'
          ? 'Permita el acceso a su ubicación'
          : language === 'fa'
          ? 'لطفاً اجازه دسترسی به مکان خود را بدهید'
          : language === 'id'
          ? 'Harap izinkan akses ke lokasi Anda'
          : language === 'tr'
          ? 'Lütfen konumunuza erişime izin verin'
          : 'Please allow access to your location');
        setLoading(false);
      }
    );
  };

  const calculateQiblaDirection = (lat: number, lng: number) => {
    const lat1 = (lat * Math.PI) / 180;
    const lat2 = (kaabaLat * Math.PI) / 180;
    const dLng = ((kaabaLng - lng) * Math.PI) / 180;

    const y = Math.sin(dLng);
    const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(dLng);
    
    let qibla = (Math.atan2(y, x) * 180) / Math.PI;
    qibla = (qibla + 360) % 360;
    
    return qibla;
  };

  const calculateDistance = (lat: number, lng: number) => {
    const R = 6371;
    const lat1 = (lat * Math.PI) / 180;
    const lat2 = (kaabaLat * Math.PI) / 180;
    const dLat = ((kaabaLat - lat) * Math.PI) / 180;
    const dLng = ((kaabaLng - lng) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return parseFloat(distance.toFixed(0));
  };

  const getDirectionName = (angle: number) => {
    const directions = {
      ar: ['شمال', 'شمال شرق', 'شرق', 'جنوب شرق', 'جنوب', 'جنوب غرب', 'غرب', 'شمال غرب'],
      en: ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'],
      ur: ['شمال', 'شمال مشرق', 'مشرق', 'جنوب مشرق', 'جنوب', 'جنوب مغرب', 'مغرب', 'شمال مغرب'],
      de: ['Norden', 'Nordosten', 'Osten', 'Südosten', 'Süden', 'Südwesten', 'Westen', 'Nordwesten'],
      fr: ['Nord', 'Nord-Est', 'Est', 'Sud-Est', 'Sud', 'Sud-Ouest', 'Ouest', 'Nord-Ouest'],
      es: ['Norte', 'Noreste', 'Este', 'Sureste', 'Sur', 'Suroeste', 'Oeste', 'Noroeste'],
      fa: ['شمال', 'شمال شرقی', 'شرق', 'جنوب شرقی', 'جنوب', 'جنوب غربی', 'غرب', 'شمال غربی'],
      id: ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'],
      tr: ['Kuzey', 'Kuzeydoğu', 'Doğu', 'Güneydoğu', 'Güney', 'Güneybatı', 'Batı', 'Kuzeybatı']
    };

    const index = Math.round(angle / 45) % 8;
    return directions[language as keyof typeof directions][index];
  };

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 text-center">
            <Loader className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
            <p className="text-lg text-gray-600 font-[var(--font-tajawal)]">
              {language === 'ar' 
                ? 'جاري تحديد موقعك...' 
                : language === 'ur'
                ? 'آپ کے مقام کا پتہ لگایا جا رہا ہے...'
                : language === 'de'
                ? 'Ihr Standort wird ermittelt...'
                : language === 'fr'
                ? 'Détection de votre position...'
                : language === 'es'
                ? 'Detectando su ubicación...'
                : language === 'id'
                ? 'Mendeteksi lokasi Anda...'
                : 'Detecting your location...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 text-center">
            <MapPin className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg text-red-600 font-[var(--font-tajawal)] mb-4">{error}</p>
            <button
              onClick={detectLocation}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-[var(--font-tajawal)]"
            >
              {language === 'ar' ? 'حاول مرة أخرى' : language === 'ur' ? 'دوبارہ کوشش کریں' : language === 'de' ? 'Versuchen Sie es erneut' : language === 'fr' ? 'Réessayer' : language === 'es' ? 'Intentar de nuevo' : language === 'fa' ? 'تلاش مجدد' : language === 'id' ? 'Coba Lagi' : 'Try Again'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!locationData) return null;

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-8 sm:mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Compass className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-600" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 font-[var(--font-tajawal)]">
                {language === 'ar' 
                  ? 'اتجاه القبلة من موقعك' 
                  : language === 'ur'
                  ? 'Âp کے مقام سے قبلہ کی سمت'
                  : language === 'de'
                  ? 'Qibla-Richtung von Ihrem Standort'
                  : language === 'fr'
                  ? 'Direction de la Qibla depuis votre position'
                  : language === 'es'
                  ? 'Dirección de la Qibla desde su ubicación'
                  : language === 'fa'
                  ? 'جهت قبله از موقعیت شما'
                  : language === 'id'
                  ? 'Arah Kiblat dari Lokasi Anda'
                  : language === 'tr'
                  ? 'Konumunuzdan Kıble Yönü'
                  : 'Qibla Direction from Your Location'}
              </h2>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <p className="text-base sm:text-lg font-[var(--font-tajawal)]">
                {locationData.city}{locationData.country ? `, ${locationData.country}` : ''}
              </p>
            </div>
          </header>

          {/* Qibla Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 border-emerald-100">
            {/* Compass Visual */}
            <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 p-8 sm:p-12 md:p-16">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto">
                {/* Compass Circle */}
                <div className="absolute inset-0 border-8 border-white/30 rounded-full"></div>
                <div className="absolute inset-4 border-4 border-white/20 rounded-full"></div>
                
                {/* Center Kaaba Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
                </div>

                {/* Qibla Arrow */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000"
                  style={{ transform: `translate(-50%, -50%) rotate(${qiblaAngle}deg)` }}
                >
                  <Navigation 
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 text-white drop-shadow-2xl" 
                    fill="white"
                  />
                </div>

                {/* Cardinal Directions */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 text-white font-bold text-lg sm:text-xl">
                  {language === 'ar' ? 'ش' : 'N'}
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 text-white font-bold text-lg sm:text-xl">
                  {language === 'ar' ? 'ج' : 'S'}
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 text-white font-bold text-lg sm:text-xl">
                  {language === 'ar' ? 'ش' : 'E'}
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 text-white font-bold text-lg sm:text-xl">
                  {language === 'ar' ? 'غ' : 'W'}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {/* Qibla Angle */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 text-center border-2 border-emerald-100">
                  <p className="text-sm sm:text-base text-gray-600 mb-2 font-[var(--font-tajawal)]">
                    {language === 'ar' ? 'زاوية القبلة' : language === 'ur' ? 'قبلہ کا زاویہ' : language === 'de' ? 'Qibla-Winkel' : language === 'fr' ? 'Angle de la Qibla' : language === 'es' ? 'Ángulo de la Qibla' : language === 'fa' ? 'زاویه قبله' : language === 'id' ? 'Sudut Kiblat' : language === 'tr' ? 'Kıble Açısı' : 'Qibla Angle'}
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">
                    {qiblaAngle.toFixed(1)}°
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 font-[var(--font-tajawal)]">
                    {getDirectionName(qiblaAngle)}
                  </p>
                </div>

                {/* Distance to Kaaba */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 text-center border-2 border-emerald-100">
                  <p className="text-sm sm:text-base text-gray-600 mb-2 font-[var(--font-tajawal)]">
                    {language === 'ar' ? 'المسافة إلى الكعبة' : language === 'ur' ? 'کعبہ تک فاصلہ' : language === 'de' ? 'Entfernung zur Kaaba' : language === 'fr' ? 'Distance jusqu\'\u00e0 la Kaaba' : language === 'es' ? 'Distancia a la Kaaba' : language === 'fa' ? 'فاصله تا کعبه' : language === 'id' ? 'Jarak ke Ka\'bah' : language === 'tr' ? 'Kabe\'ye Uzaklık' : 'Distance to Kaaba'}
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">
                    {distance.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 font-[var(--font-tajawal)]">
                    {language === 'ar' ? 'كيلومتر' : language === 'ur' ? 'کلومیٹر' : language === 'de' ? 'Kilometer' : language === 'fr' ? 'kilom\u00e8tres' : language === 'es' ? 'kil\u00f3metros' : language === 'fa' ? 'کیلومتر' : language === 'id' ? 'kilometer' : language === 'tr' ? 'kilometre' : 'kilometers'}
                  </p>
                </div>

                {/* Coordinates */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 text-center border-2 border-emerald-100">
                  <p className="text-sm sm:text-base text-gray-600 mb-2 font-[var(--font-tajawal)]">
                    {language === 'ar' ? 'الإحداثيات' : language === 'ur' ? 'متناسقات' : language === 'de' ? 'Koordinaten' : language === 'fr' ? 'Coordonn\u00e9es' : language === 'es' ? 'Coordenadas' : language === 'fa' ? 'مختصات' : language === 'id' ? 'Koordinat' : language === 'tr' ? 'Koordinatlar' : 'Coordinates'}
                  </p>
                  <p className="text-base sm:text-lg font-bold text-emerald-600">
                    {locationData.latitude.toFixed(4)}°
                  </p>
                  <p className="text-base sm:text-lg font-bold text-emerald-600">
                    {locationData.longitude.toFixed(4)}°
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-emerald-50 rounded-xl border-2 border-emerald-100">
                <p className="text-sm sm:text-base text-gray-700 font-[var(--font-tajawal)] leading-relaxed text-center">
                  {language === 'ar' 
                    ? 'استخدم هذا السهم للعثور على اتجاه القبلة الدقيق من موقعك الحالي نحو الكعبة المشرفة في مكة المكرمة. قم بمحاذاة جهازك مع الاتجاه المشار إليه للصلاة.'
                    : language === 'ur'
                    ? 'اپنے موجودہ مقام سے مکہ مکرمہ میں خانہ کعبہ کی طرف قبلہ کی درست سمت تلاش کرنے کے لیے اس تیر کا استعمال کریں۔ نماز کے لیے اپنے آلے کو اشارہ شدہ سمت کے ساتھ سیدھ میں لائیں۔'
                    : language === 'de'
                    ? 'Verwenden Sie diesen Pfeil, um die genaue Qibla-Richtung von Ihrem aktuellen Standort zur Heiligen Kaaba in Mekka zu finden. Richten Sie Ihr Gerät für das Gebet in die angezeigte Richtung aus.'
                    : language === 'fr'
                    ? 'Utilisez cette flèche pour trouver la direction exacte de la Qibla depuis votre position actuelle vers la Sainte Kaaba à La Mecque. Alignez votre appareil avec la direction indiquée pour la prière.'
                    : language === 'es'
                    ? 'Use esta flecha para encontrar la dirección exacta de la Qibla desde su ubicación actual hacia la Sagrada Kaaba en La Meca. Alinee su dispositivo con la dirección indicada para la oración.'
                    : language === 'fa'
                    ? 'از این پیکان برای یافتن جهت دقیق قبله از موقعیت فعلی خود به سمت کعبه مشرفه در مکه استفاده کنید. دستگاه خود را با جهت نشان داده شده برای نماز تراز کنید.'
                    : language === 'id'
                    ? 'Gunakan panah ini untuk menemukan arah Kiblat yang akurat dari lokasi Anda saat ini menuju Ka\'bah Suci di Makkah. Sejajarkan perangkat Anda dengan arah yang ditunjukkan untuk sholat.'
                    : language === 'tr'
                    ? 'Mevcut konumunuzdan Mekke\'deki Kutsal Kabe\'ye doğru doğru Kıble yönünü bulmak için bu oku kullanın. Namaz için cihazınızı belirtilen yöne hizalayın.'
                    : 'Use this arrow to find the accurate Qibla direction from your current location towards the Holy Kaaba in Makkah. Align your device with the indicated direction for prayer.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
