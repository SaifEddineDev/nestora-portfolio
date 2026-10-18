import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Compass, Users, CheckCircle2, MapPin } from 'lucide-react';
import { propertiesData } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { SearchBar } from '../components/SearchBar';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';
import { useLanguage } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();

  // 6 Featured properties
  const featuredProperties = propertiesData.filter((p) => p.featured).slice(0, 6);

  // Statistics counters animation
  const [counts, setCounts] = useState({
    properties: 0,
    clients: 0,
    locations: 0,
    experience: 0,
  });

  useEffect(() => {
    const duration = 1200;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        properties: Math.round(progress * 150),
        clients: Math.round(progress * 80),
        locations: Math.round(progress * 12),
        experience: Math.round(progress * 8),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({
          properties: 150,
          clients: 80,
          locations: 12,
          experience: 8,
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const destinations = [
    {
      name: 'Gammarth',
      subtitle: language === 'FR' ? 'Collines & Vues Mer' : 'Cliffs & Mediterranean Views',
      count: '8 Properties',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'La Marsa',
      subtitle: language === 'FR' ? 'Corniche & Douceur de Vivre' : 'Corniche & Seaside Living',
      count: '11 Properties',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Sidi Bou Said',
      subtitle: language === 'FR' ? 'Art & Patrimoine Mythique' : 'Iconic White & Blue Heritage',
      count: '5 Properties',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Hammamet',
      subtitle: language === 'FR' ? 'Villas Pieds dans l’Eau' : 'Beachfront Estates & Golf',
      count: '7 Properties',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* 5. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:pb-24 overflow-hidden">
        {/* Background Image / Architectural Collage */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=85"
            alt="Nestora Luxury Architecture in Tunisia"
            className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-black/40 to-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
          {/* Top Tagline Pill */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[9px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] font-medium mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-[#C59B63]" />
            <span className="whitespace-nowrap">Tunisia’s Premier Real Estate Agency</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white text-center max-w-4xl leading-[1.15] drop-shadow-md">
            {t('hero.tagline')}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-zinc-200 text-center max-w-2xl leading-relaxed drop-shadow-sm font-light">
            {t('hero.subtitle')}
          </p>

          {/* Floating Search Panel */}
          <div className="w-full max-w-5xl mt-10 sm:mt-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <SearchBar />
          </div>

          {/* Quick Stats Highlights below Hero */}
          <div className="hidden lg:flex items-center justify-center gap-12 mt-12 text-white/80 text-xs tracking-wider uppercase">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B63]" />
              Tunis · Gammarth · La Marsa · Sidi Bou Said
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B63]" />
              Tailored Buyer & Seller Advisory
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B63]" />
              Verified Legal Title & Authenticity
            </span>
          </div>
        </div>
      </section>

      {/* 6. FEATURED PROPERTIES SECTION */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A87B40] block mb-2">
              Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-zinc-900">
              {t('featured.title')}
            </h2>
            <p className="mt-2 text-zinc-500 text-sm sm:text-base max-w-xl">
              {t('featured.subtitle')}
            </p>
          </div>
          <Link
            to="/properties"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-[#A87B40] transition-colors group"
          >
            <span>{language === 'FR' ? 'Voir toutes les propriétés' : 'Explore All Properties'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#121316] text-white text-xs uppercase tracking-wider font-semibold hover:bg-zinc-800 transition-all shadow-md group"
          >
            <span>{language === 'FR' ? 'Parcourir la collection complète' : 'Browse Complete Collection'}</span>
            <ArrowRight className="w-4 h-4 text-[#C59B63] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* 18. ABOUT SECTION WITH ANIMATED STATISTICS */}
      <section className="py-20 bg-zinc-900 text-white relative overflow-hidden">
        {/* Subtle decorative motif */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#C59B63]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C59B63] px-3 py-1 rounded-full border border-[#C59B63]/30 bg-[#C59B63]/10 inline-block">
                {t('about.badge')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
                {t('about.headline')}
              </h2>
              <p className="text-zinc-300 text-base leading-relaxed font-light">
                {t('about.desc1')}
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                {t('about.desc2')}
              </p>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#C59B63] hover:text-white transition-colors"
                >
                  <span>{language === 'FR' ? 'En savoir plus sur notre histoire' : 'Learn More About NESTORA'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Statistics Box */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                <div className="font-serif text-4xl sm:text-5xl font-bold text-white mb-1">
                  {counts.properties}+
                </div>
                <div className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                  {t('about.statProperties')}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                <div className="font-serif text-4xl sm:text-5xl font-bold text-white mb-1">
                  {counts.clients}+
                </div>
                <div className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                  {t('about.statClients')}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                <div className="font-serif text-4xl sm:text-5xl font-bold text-white mb-1">
                  {counts.locations}
                </div>
                <div className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                  {t('about.statLocations')}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                <div className="font-serif text-4xl sm:text-5xl font-bold text-white mb-1">
                  {counts.experience}+
                </div>
                <div className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                  {t('about.statExperience')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 19. WHY CHOOSE US */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Excellence"
          title={t('why.title')}
          subtitle={t('why.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-7 border border-zinc-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#C59B63]/10 text-[#A87B40] flex items-center justify-center mb-5">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 mb-2">
              {t('why.careful.title')}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {t('why.careful.desc')}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-7 border border-zinc-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#C59B63]/10 text-[#A87B40] flex items-center justify-center mb-5">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 mb-2">
              {t('why.local.title')}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {t('why.local.desc')}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-7 border border-zinc-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#C59B63]/10 text-[#A87B40] flex items-center justify-center mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 mb-2">
              {t('why.support.title')}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {t('why.support.desc')}
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-7 border border-zinc-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#C59B63]/10 text-[#A87B40] flex items-center justify-center mb-5">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 mb-2">
              {t('why.simple.title')}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {t('why.simple.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* PRIME DESTINATIONS SHOWCASE */}
      <section className="py-20 bg-zinc-100/70 border-y border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A87B40] block mb-2">
                Prime Locations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-zinc-900">
                {language === 'FR' ? 'Destinations Emblématiques' : 'Iconic Tunisian Destinations'}
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                {language === 'FR'
                  ? 'Explorez les adresses les plus exclusives du littoral tunisien'
                  : 'Explore coastal sanctuaries, historic villages and dynamic business districts'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                to={`/properties?city=${dest.name}`}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-[#C59B63] font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.name}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold">{dest.name}</h3>
                  <p className="text-xs text-zinc-300 mt-1">{dest.subtitle}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase text-white/90 group-hover:text-[#C59B63] transition-colors">
                    <span>{language === 'FR' ? 'Découvrir' : 'Discover'}</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 20. CTA SECTION */}
      <CTASection />
    </div>
  );
};
