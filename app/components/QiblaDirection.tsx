'use client';

import { useLanguage } from '../context/LanguageContext';
import { Compass, Navigation } from 'lucide-react';

interface QiblaDirectionProps {
  cityName: string;
  cityNameAr: string;
  latitude: number;
  longitude: number;
}

export default function QiblaDirection({ cityName, cityNameAr, latitude, longitude }: QiblaDirectionProps) {
  const { language } = useLanguage();

  // Kaaba coordinates
  const kaabaLat = 21.4225;
  const kaabaLng = 39.8262;

  // Calculate Qibla direction using spherical trigonometry
  const calculateQiblaDirection = () => {
    const lat1 = (latitude * Math.PI) / 180;
    const lat2 = (kaabaLat * Math.PI) / 180;
    const dLng = ((kaabaLng - longitude) * Math.PI) / 180;

    const y = Math.sin(dLng);
    const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(dLng);
    
    let qibla = (Math.atan2(y, x) * 180) / Math.PI;
    qibla = (qibla + 360) % 360; // Normalize to 0-360
    
    return qibla;
  };

  // Calculate distance to Kaaba in km
  const calculateDistance = () => {
    const R = 6371; // Earth's radius in km
    const lat1 = (latitude * Math.PI) / 180;
    const lat2 = (kaabaLat * Math.PI) / 180;
    const dLat = ((kaabaLat - latitude) * Math.PI) / 180;
    const dLng = ((kaabaLng - longitude) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance.toFixed(0);
  };

  const qiblaAngle = calculateQiblaDirection();
  const distanceToKaaba = calculateDistance();

  // Get direction name based on angle
  const getDirectionName = (angle: number) => {
    const directions = {
      ar: ['شمال', 'شمال شرق', 'شرق', 'جنوب شرق', 'جنوب', 'جنوب غرب', 'غرب', 'شمال غرب'],
      en: ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'],
      ur: ['شمال', 'شمال مشرق', 'مشرق', 'جنوب مشرق', 'جنوب', 'جنوب مغرب', 'مغرب', 'شمال مغرب']
    };

    const index = Math.round(angle / 45) % 8;
    return directions[language as keyof typeof directions][index];
  };

  const displayName = language === 'ar' ? cityNameAr : cityName;

  return (
    <section 
      className="py-8 sm:py-12 bg-gradient-to-br from-teal-50 to-emerald-50"
      itemScope 
      itemType="https://schema.org/Place"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header with SEO-optimized heading */}
          <header className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" aria-hidden="true" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 font-[var(--font-tajawal)]" itemProp="name">
                {language === 'ar' 
                  ? `اتجاه القبلة من ${cityNameAr}` 
                  : language === 'ur' 
                  ? `${cityName} سے قبلہ کی سمت` 
                  : `Qibla Direction from ${cityName}`}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 font-[var(--font-tajawal)]" itemProp="description">
              {language === 'ar' 
                ? `احسب الاتجاه الدقيق للقبلة من ${cityNameAr} إلى الكعبة المشرفة في مكة المكرمة. المسافة ${distanceToKaaba} كيلومتر والزاوية ${qiblaAngle.toFixed(1)} درجة.`
                : language === 'ur'
                ? `${cityName} سے مکہ مکرمہ میں خانہ کعبہ کی جانب قبلہ کی درست سمت معلوم کریں۔ فاصلہ ${distanceToKaaba} کلومیٹر اور زاویہ ${qiblaAngle.toFixed(1)} ڈگری۔`
                : `Find the accurate Qibla direction from ${cityName} to the Holy Kaaba in Makkah. Distance ${distanceToKaaba} km at ${qiblaAngle.toFixed(1)}° angle.`}
            </p>
          </header>

          {/* Hidden structured data for SEO */}
          <div className="hidden" itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates">
            <meta itemProp="latitude" content={latitude.toString()} />
            <meta itemProp="longitude" content={longitude.toString()} />
          </div>

          {/* Main Card */}
          <article className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left: Compass Visual */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64" role="img" aria-label={`Qibla compass showing ${qiblaAngle.toFixed(1)} degrees ${getDirectionName(qiblaAngle)}`}>
                  {/* Compass Circle */}
                  <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/40">
                    {/* Compass Markers */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute top-2 text-white font-bold text-xs sm:text-sm" aria-label="North">N</div>
                      <div className="absolute right-2 text-white font-bold text-xs sm:text-sm" aria-label="East">E</div>
                      <div className="absolute bottom-2 text-white font-bold text-xs sm:text-sm" aria-label="South">S</div>
                      <div className="absolute left-2 text-white font-bold text-xs sm:text-sm" aria-label="West">W</div>
                    </div>
                    
                    {/* Qibla Arrow */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-1000"
                      style={{ transform: `rotate(${qiblaAngle}deg)` }}
                      aria-hidden="true"
                    >
                      <Navigation className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-400 drop-shadow-lg" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Angle Display */}
                <div className="mt-6 text-center">
                  <p className="text-white/80 text-sm mb-1 font-[var(--font-tajawal)]">
                    {language === 'ar' ? 'زاوية القبلة' : language === 'ur' ? 'قبلہ کا زاویہ' : 'Qibla Angle'}
                  </p>
                  <p className="text-4xl sm:text-5xl font-bold text-white font-mono" itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
                    <span itemProp="value">{qiblaAngle.toFixed(1)}</span><span itemProp="unitText">°</span>
                  </p>
                  <p className="text-emerald-100 mt-2 font-[var(--font-tajawal)] text-lg">
                    {getDirectionName(qiblaAngle)}
                  </p>
                </div>
              </div>

              {/* Right: Information */}
              <div className="p-6 sm:p-8 md:p-10 space-y-6">
                {/* Distance to Kaaba */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 sm:p-5 border border-emerald-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-emerald-600 rounded-full p-2" aria-hidden="true">
                      <Compass className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 font-[var(--font-tajawal)]">
                      {language === 'ar' ? 'المسافة إلى مكة المكرمة' : language === 'ur' ? 'مکہ مکرمہ تک فاصلہ' : 'Distance to Makkah'}
                    </h3>
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-emerald-700 font-mono">
                    <span itemProp="distance" itemScope itemType="https://schema.org/Distance">
                      <span itemProp="value">{distanceToKaaba}</span> 
                      <span className="text-lg sm:text-xl ml-2" itemProp="unitText">
                        {language === 'ar' ? 'كم' : language === 'ur' ? 'کلومیٹر' : 'km'}
                      </span>
                    </span>
                  </p>
                </div>

                {/* Coordinates */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600 text-sm sm:text-base font-[var(--font-tajawal)]">
                      {language === 'ar' ? `موقع ${cityNameAr}` : language === 'ur' ? `${cityName} کا مقام` : `${cityName} Location`}
                    </span>
                    <span className="text-gray-800 font-semibold font-mono text-sm sm:text-base">
                      {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base font-[var(--font-tajawal)]">
                      {language === 'ar' ? 'الكعبة المشرفة' : language === 'ur' ? 'خانہ کعبہ' : 'Holy Kaaba'}
                    </span>
                    <span className="text-gray-800 font-semibold font-mono text-sm sm:text-base">
                      {kaabaLat.toFixed(4)}°, {kaabaLng.toFixed(4)}°
                    </span>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="sr-only">
                    {language === 'ar' ? 'تعليمات الاستخدام' : language === 'ur' ? 'استعمال کی ہدایات' : 'Usage Instructions'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-[var(--font-tajawal)]">
                    {language === 'ar'
                      ? `لمعرفة اتجاه القبلة من ${cityNameAr}، استخدم البوصلة أو تطبيق الهاتف. اتجه نحو ${getDirectionName(qiblaAngle)} بزاوية ${qiblaAngle.toFixed(1)} درجة للصلاة في اتجاه الكعبة المشرفة.`
                      : language === 'ur'
                      ? `${cityName} سے قبلہ کی سمت معلوم کرنے کے لیے کمپاس یا موبائل ایپ استعمال کریں۔ نماز کے لیے ${getDirectionName(qiblaAngle)} کی طرف ${qiblaAngle.toFixed(1)} ڈگری پر رخ کریں۔`
                      : `To find Qibla direction from ${cityName}, use a compass or phone app. Face ${getDirectionName(qiblaAngle)} at ${qiblaAngle.toFixed(1)}° to pray towards the Holy Kaaba.`}
                  </p>
                </div>

                {/* Note */}
                <footer className="text-center pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-[var(--font-tajawal)]">
                    {language === 'ar'
                      ? 'الحسابات مبنية على الإحداثيات الجغرافية باستخدام حساب المثلثات الكروية'
                      : language === 'ur'
                      ? 'حسابات جغرافیائی محل وقوع اور کروی مثلثیات پر مبنی ہیں'
                      : 'Calculations based on geographical coordinates using spherical trigonometry'}
                  </p>
                </footer>
              </div>
            </div>
          </article>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-xs sm:text-sm text-gray-600 mb-1 font-[var(--font-tajawal)]">
                {language === 'ar' ? 'الاتجاه' : language === 'ur' ? 'سمت' : 'Direction'}
              </p>
              <p className="text-lg sm:text-xl font-bold text-emerald-600 font-[var(--font-tajawal)]">
                {getDirectionName(qiblaAngle)}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-xs sm:text-sm text-gray-600 mb-1 font-[var(--font-tajawal)]">
                {language === 'ar' ? 'دقة' : language === 'ur' ? 'درستگی' : 'Accuracy'}
              </p>
              <p className="text-lg sm:text-xl font-bold text-emerald-600">
                ±1°
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-xs sm:text-sm text-gray-600 mb-1 font-[var(--font-tajawal)]">
                {language === 'ar' ? 'الطريقة' : language === 'ur' ? 'طریقہ' : 'Method'}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-emerald-600 font-[var(--font-tajawal)]">
                {language === 'ar' ? 'حساب دقيق' : language === 'ur' ? 'درست حساب' : 'Accurate Calc'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
