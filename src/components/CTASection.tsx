import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CTASection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-zinc-950 text-white">
      {/* Background Architectural Image with subtle luxury overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Architecture Background"
          className="w-full h-full object-cover opacity-25 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-xs uppercase tracking-[0.25em] font-semibold text-[#C59B63] mb-4 px-3 py-1 rounded-full border border-[#C59B63]/30 bg-[#C59B63]/10">
          Exclusive Portfolio
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight max-w-3xl mx-auto leading-tight">
          {t('cta.headline')}
        </h2>

        <p className="mt-5 text-base sm:text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed">
          {t('cta.desc')}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/properties"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-zinc-900 text-sm font-semibold tracking-wide hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 group shadow-xl"
          >
            <span>{t('cta.explore')}</span>
            <ArrowRight className="w-4 h-4 text-[#C59B63] transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 hover:border-white/50 bg-white/5 backdrop-blur-md text-white text-sm font-semibold tracking-wide hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-[#C59B63]" />
            <span>{t('cta.contact')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
