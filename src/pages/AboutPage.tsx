import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, Compass, CheckCircle2, ArrowRight, Building, Sparkles } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();

  const teamMembers = [
    {
      name: 'Sarah Ben Ali',
      role: 'Senior Property Consultant & Partner',
      experience: '11 Years in Luxury Sector',
      bio: 'Specialist in high-standing estates in Gammarth and architectural heritage in Sidi Bou Said.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      email: 's.benali@nestora.tn',
    },
    {
      name: 'Karim Mansour',
      role: 'Commercial & Prime Residential Lead',
      experience: '9 Years in Corporate & Residential',
      bio: 'Advisor to international corporate headquarters in Tunis Lac and Carthage diplomatic enclaves.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      email: 'k.mansour@nestora.tn',
    },
    {
      name: 'Youssef Trabelsi',
      role: 'Coastal & Vacation Estates Director',
      experience: '8 Years in Waterfront Properties',
      bio: 'Leading premier beachfront listings, private golf villas and seasonal leases across Hammamet & Sousse.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      email: 'y.trabelsi@nestora.tn',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Story Header */}
        <div className="py-8 lg:py-16 text-center max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A87B40] px-4 py-1.5 rounded-full border border-[#C59B63]/30 bg-[#C59B63]/10 inline-block mb-4">
            {t('about.badge')}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-900 leading-[1.18]">
            {t('about.headline')}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-zinc-600 leading-relaxed font-light">
            {language === 'FR'
              ? 'Fondée avec la volonté de redéfinir l’expérience immobilière haut de gamme en Tunisie, NESTORA combine discrétion absolue, excellence esthétique et rigueur juridique.'
              : 'Established to redefine upscale real estate across Tunisia, NESTORA marries confidential advisory, architectural integrity, and stringent legal compliance.'}
          </p>
        </div>

        {/* Large Brand Visual Banner */}
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-20 border border-zinc-200">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Nestora Architectural Excellence"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#C59B63] uppercase tracking-wider">
                Tunisia Coastal Collection
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Carthage · Gammarth · La Marsa · Sidi Bou Said
              </h3>
            </div>
            <div className="text-xs text-zinc-300 font-light max-w-xs">
              Curated by local architectural connoisseurs and licensed legal real estate partners.
            </div>
          </div>
        </div>

        {/* 18. Animated Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          <div className="bg-white rounded-2xl p-8 border border-zinc-200/80 shadow-sm text-center">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-zinc-900 mb-2">150+</div>
            <div className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
              {t('about.statProperties')}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-zinc-200/80 shadow-sm text-center">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-zinc-900 mb-2">80+</div>
            <div className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
              {t('about.statClients')}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-zinc-200/80 shadow-sm text-center">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-zinc-900 mb-2">12</div>
            <div className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
              {t('about.statLocations')}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-zinc-200/80 shadow-sm text-center">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-zinc-900 mb-2">8+</div>
            <div className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
              {t('about.statExperience')}
            </div>
          </div>
        </div>

        {/* 19. WHY CHOOSE US (4 CARDS) */}
        <div className="mb-24">
          <SectionTitle
            badge="Our Pillars"
            title={t('why.title')}
            subtitle={t('why.subtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-zinc-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#C59B63]/10 text-[#A87B40] flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 mb-3">
                {t('why.careful.title')}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {t('why.careful.desc')}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-zinc-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#C59B63]/10 text-[#A87B40] flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 mb-3">
                {t('why.local.title')}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {t('why.local.desc')}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-zinc-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#C59B63]/10 text-[#A87B40] flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 mb-3">
                {t('why.support.title')}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {t('why.support.desc')}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-zinc-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#C59B63]/10 text-[#A87B40] flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 mb-3">
                {t('why.simple.title')}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {t('why.simple.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* TEAM SHOWCASE */}
        <div className="mb-24">
          <SectionTitle
            badge="Consultants"
            title={language === 'FR' ? 'Notre Équipe d’Experts' : 'Our Senior Advisory Board'}
            subtitle={language === 'FR' ? 'Des professionnels aguerris au service de vos projets de vie et d’investissement.' : 'Discreet property specialists dedicated to private acquisitions and high-return investments.'}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl overflow-hidden border border-zinc-200/80 shadow-sm group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/4] overflow-hidden bg-zinc-100">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] text-[#C59B63] font-semibold uppercase tracking-wider block mb-0.5">
                      {member.experience}
                    </span>
                    <h4 className="font-serif text-xl font-bold">{member.name}</h4>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <p className="text-xs font-semibold text-zinc-700">{member.role}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{member.bio}</p>
                  <div className="pt-2">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-xs font-semibold text-[#A87B40] hover:underline"
                    >
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <CTASection />
    </div>
  );
};
