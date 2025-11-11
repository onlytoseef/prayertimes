'use client';

import { useLanguage } from '../context/LanguageContext';

interface CitySEOContentProps {
  cityName: string;
  cityNameAr: string;
  latitude: number;
  longitude: number;
}

export default function CitySEOContent({ cityName, cityNameAr, latitude, longitude }: CitySEOContentProps) {
  const { language, t } = useLanguage();

  // Content in all languages
  const content = {
    ar: {
      whyAccurate: {
        title: `لماذا نحتاج إلى مواقيت الصلاة الدقيقة في ${cityNameAr}؟`,
        intro: `الصلاة في أوقاتها المحددة هي من أهم أركان الإسلام. للمقيمين والزوار في ${cityNameAr}، فإن الحصول على مواقيت الصلاة الدقيقة يضمن أداء هذه الفريضة الدينية بشكل صحيح. يتم حساب أوقات الصلاة باستخدام:`,
        points: [
          `الإحداثيات الجغرافية الدقيقة (خط العرض: ${latitude}، خط الطول: ${longitude})`,
          'طريقة حساب جامعة أم القرى بمكة المكرمة (المستخدمة في المملكة العربية السعودية)',
          'حسابات فلكية يومية تأخذ في الاعتبار التغيرات الموسمية',
          'تعديلات تلقائية للتوقيت الصيفي إذا لزم الأمر'
        ]
      },
      fivePrayers: {
        title: `الصلوات الخمس اليومية في ${cityNameAr}`,
        prayers: [
          {
            name: 'الفجر',
            nameEn: 'Fajr',
            description: 'صلاة ما قبل الفجر، تُؤدى قبل شروق الشمس. هذه هي الصلاة الأولى في اليوم.'
          },
          {
            name: 'الظهر',
            nameEn: 'Dhuhr',
            description: 'صلاة الظهيرة، تُؤدى بعد أن تتجاوز الشمس ذروتها.'
          },
          {
            name: 'العصر',
            nameEn: 'Asr',
            description: 'صلاة العصر، تُؤدى في وقت متأخر من بعد الظهر.'
          },
          {
            name: 'المغرب',
            nameEn: 'Maghrib',
            description: 'صلاة الغروب، تُؤدى مباشرة بعد غروب الشمس.'
          },
          {
            name: 'العشاء',
            nameEn: 'Isha',
            description: 'صلاة الليل، تُؤدى بعد اختفاء الشفق.'
          }
        ]
      },
      faq: {
        title: 'الأسئلة الشائعة',
        questions: [
          {
            question: `كيف يتم حساب أوقات الصلاة في ${cityNameAr}؟`,
            answer: `يتم حساب أوقات الصلاة بناءً على موقع الشمس بالنسبة للإحداثيات الجغرافية لـ ${cityNameAr}. نستخدم طريقة جامعة أم القرى، وهي مقبولة على نطاق واسع وتستخدم في المملكة العربية السعودية والعديد من الدول الأخرى.`
          },
          {
            question: 'كم مرة يتم تحديث أوقات الصلاة؟',
            answer: 'يتم تحديث أوقات الصلاة يومياً لمراعاة التغير في موقع الشمس على مدار العام. تتكيف الأوقات تلقائياً بناءً على الموسم والتاريخ.'
          },
          {
            question: 'هل يمكنني الاعتماد على هذه الأوقات لصلواتي اليومية؟',
            answer: 'نعم! حساباتنا تستخدم بيانات فلكية موثقة وطريقة الحساب الإسلامية القياسية. ومع ذلك، نوصي بالتحقق من المسجد المحلي للحصول على أي تعديلات خاصة بالمجتمع.'
          }
        ]
      }
    },
    en: {
      whyAccurate: {
        title: `Why Accurate Prayer Times Matter for ${cityName}`,
        intro: `Performing the five daily prayers (Salah) at their designated times is one of the fundamental pillars of Islam. For residents and visitors in ${cityName}, having access to accurate prayer times ensures that you can fulfill this religious obligation correctly. Our prayer times are calculated using:`,
        points: [
          `Precise geographical coordinates (Latitude: ${latitude}, Longitude: ${longitude})`,
          'Umm Al-Qura University calculation method (used in Saudi Arabia)',
          'Daily astronomical calculations accounting for seasonal variations',
          'Automatic adjustments for daylight saving time if applicable'
        ]
      },
      fivePrayers: {
        title: `The Five Daily Prayers in ${cityName}`,
        prayers: [
          {
            name: 'Fajr',
            nameEn: 'الفجر',
            description: 'The pre-dawn prayer, performed before sunrise. This is the first prayer of the day.'
          },
          {
            name: 'Dhuhr',
            nameEn: 'الظهر',
            description: 'The midday prayer, performed after the sun passes its zenith.'
          },
          {
            name: 'Asr',
            nameEn: 'العصر',
            description: 'The afternoon prayer, performed in the late afternoon.'
          },
          {
            name: 'Maghrib',
            nameEn: 'المغرب',
            description: 'The sunset prayer, performed just after sunset.'
          },
          {
            name: 'Isha',
            nameEn: 'العشاء',
            description: 'The night prayer, performed after twilight disappears.'
          }
        ]
      },
      faq: {
        title: 'Frequently Asked Questions',
        questions: [
          {
            question: `How are prayer times calculated for ${cityName}?`,
            answer: `Prayer times are calculated based on the solar position relative to ${cityName}'s geographical coordinates. We use the Umm Al-Qura method, which is widely accepted and used in Saudi Arabia and many other countries.`
          },
          {
            question: 'How often are the prayer times updated?',
            answer: 'Our prayer times are updated daily to account for the changing position of the sun throughout the year. The times adjust automatically based on the season and date.'
          },
          {
            question: 'Can I rely on these times for my daily prayers?',
            answer: 'Yes! Our calculations use verified astronomical data and the standard Islamic calculation method. However, we recommend checking with your local mosque for any community-specific adjustments.'
          }
        ]
      }
    },
    ur: {
      whyAccurate: {
        title: `${cityNameAr} کے لیے درست نماز کے اوقات کیوں ضروری ہیں`,
        intro: `پانچ وقت کی نمازیں (صلوٰۃ) ان کے مقررہ اوقات میں ادا کرنا اسلام کے بنیادی ارکان میں سے ایک ہے۔ ${cityNameAr} میں رہنے والوں اور زائرین کے لیے، درست نماز کے اوقات تک رسائی اس مذہبی فریضے کو صحیح طریقے سے پورا کرنے کو یقینی بناتی ہے۔ ہمارے نماز کے اوقات کا حساب استعمال کرتے ہوئے کیا جاتا ہے:`,
        points: [
          `درست جغرافیائی نقاط (عرض البلد: ${latitude}، طول البلد: ${longitude})`,
          'ام القریٰ یونیورسٹی کا حساب کا طریقہ (سعودی عرب میں استعمال)',
          'موسمی تغیرات کو مدنظر رکھتے ہوئے روزانہ فلکیاتی حسابات',
          'اگر قابل اطلاق ہو تو ڈے لائٹ سیونگ ٹائم کے لیے خودکار ایڈجسٹمنٹ'
        ]
      },
      fivePrayers: {
        title: `${cityNameAr} میں پانچ وقت کی نمازیں`,
        prayers: [
          {
            name: 'فجر',
            nameEn: 'Fajr',
            description: 'طلوع فجر سے پہلے کی نماز، طلوع آفتاب سے پہلے ادا کی جاتی ہے۔ یہ دن کی پہلی نماز ہے۔'
          },
          {
            name: 'ظہر',
            nameEn: 'Dhuhr',
            description: 'دوپہر کی نماز، سورج اپنے عروج سے گزرنے کے بعد ادا کی جاتی ہے۔'
          },
          {
            name: 'عصر',
            nameEn: 'Asr',
            description: 'دوپہر کے بعد کی نماز، دیر دوپہر میں ادا کی جاتی ہے۔'
          },
          {
            name: 'مغرب',
            nameEn: 'Maghrib',
            description: 'غروب آفتاب کی نماز، سورج غروب ہونے کے فوراً بعد ادا کی جاتی ہے۔'
          },
          {
            name: 'عشاء',
            nameEn: 'Isha',
            description: 'رات کی نماز، شفق غائب ہونے کے بعد ادا کی جاتی ہے۔'
          }
        ]
      },
      faq: {
        title: 'اکثر پوچھے جانے والے سوالات',
        questions: [
          {
            question: `${cityNameAr} کے لیے نماز کے اوقات کا حساب کیسے لگایا جاتا ہے؟`,
            answer: `نماز کے اوقات کا حساب ${cityNameAr} کے جغرافیائی نقاط کے مقابلے میں سورج کی پوزیشن کی بنیاد پر لگایا جاتا ہے۔ ہم ام القریٰ طریقہ استعمال کرتے ہیں، جو وسیع پیمانے پر قبول کیا جاتا ہے اور سعودی عرب اور بہت سے دوسرے ممالک میں استعمال ہوتا ہے۔`
          },
          {
            question: 'نماز کے اوقات کتنی بار اپ ڈیٹ ہوتے ہیں؟',
            answer: 'ہمارے نماز کے اوقات روزانہ اپ ڈیٹ ہوتے ہیں تاکہ سال بھر میں سورج کی بدلتی ہوئی پوزیشن کا حساب لگایا جا سکے۔ اوقات موسم اور تاریخ کی بنیاد پر خودکار طور پر ایڈجسٹ ہوتے ہیں۔'
          },
          {
            question: 'کیا میں اپنی روزانہ کی نمازوں کے لیے ان اوقات پر انحصار کر سکتا ہوں؟',
            answer: 'جی ہاں! ہمارے حسابات تصدیق شدہ فلکیاتی ڈیٹا اور معیاری اسلامی حساب کے طریقہ کار استعمال کرتے ہیں۔ تاہم، ہم تجویز کرتے ہیں کہ کمیونٹی سے متعلق کسی بھی مخصوص ایڈجسٹمنٹ کے لیے اپنی مقامی مسجد سے چیک کریں۔'
          }
        ]
      }
    }
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          
          {/* Why Accurate Prayer Times Matter */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6 font-[var(--font-tajawal)]">
            {currentContent.whyAccurate.title}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 font-[var(--font-tajawal)]">
            {currentContent.whyAccurate.intro}
          </p>
          
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8 font-[var(--font-tajawal)]">
            {currentContent.whyAccurate.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          {/* Five Daily Prayers */}
          <h3 className="text-2xl font-bold text-gray-800 mb-6 mt-12 font-[var(--font-tajawal)]">
            {currentContent.fivePrayers.title}
          </h3>
          <div className="space-y-6 text-gray-700">
            {currentContent.fivePrayers.prayers.map((prayer, index) => (
              <div key={index} className="border-l-4 border-emerald-500 pl-4 py-2">
                <h4 className="font-bold text-lg text-emerald-700 mb-2 font-[var(--font-tajawal)]">
                  {prayer.name} ({prayer.nameEn})
                </h4>
                <p className="font-[var(--font-tajawal)]">{prayer.description}</p>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <h3 className="text-2xl font-bold text-gray-800 mb-6 mt-12 font-[var(--font-tajawal)]">
            {currentContent.faq.title}
          </h3>
          <div className="space-y-6">
            {currentContent.faq.questions.map((item, index) => (
              <div key={index} className="bg-emerald-50 rounded-lg p-6 border border-emerald-100">
                <h4 className="font-bold text-lg text-gray-800 mb-3 font-[var(--font-tajawal)]">
                  {item.question}
                </h4>
                <p className="text-gray-700 leading-relaxed font-[var(--font-tajawal)]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
