import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#121316] text-white pt-20 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-zinc-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" aria-label="NESTORA Accueil">
              <Logo variant="light" size="lg" />
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              {t('footer.desc')} {language === 'FR' 
                ? 'Conseil sur-mesure, valorisation patrimoniale et sélection confidentielle de propriétés haut de gamme.' 
                : 'Bespoke advisory, heritage preservation and confidential marketing of architectural residences across the Tunisian coast.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-[#C59B63] hover:text-white flex items-center justify-center text-zinc-400 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-[#C59B63] hover:text-white flex items-center justify-center text-zinc-400 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-[#C59B63] hover:text-white flex items-center justify-center text-zinc-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C59B63]">
              {t('footer.company')}
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-white transition-colors">
                  {t('nav.properties')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-white transition-colors">
                  {t('nav.favorites')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Properties Categories */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C59B63]">
              {t('footer.properties')}
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link to="/properties?status=Sale" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>{t('hero.buy')}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link to="/properties?status=Rent" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>{t('hero.rent')}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Villa" className="hover:text-white transition-colors">
                  Villas & Estates
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Apartment" className="hover:text-white transition-colors">
                  Penthouses & Apartments
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Office" className="hover:text-white transition-colors">
                  Commercial & Offices
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C59B63]">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C59B63] shrink-0 mt-0.5" />
                <span>Rue du Lac d’Annecy, Les Berges du Lac 2, Tunis, Tunisia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C59B63] shrink-0" />
                <span>+216 71 889 400</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C59B63] shrink-0" />
                <a href="mailto:hello@nestora.tn" className="hover:text-white transition-colors">
                  hello@nestora.tn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 NESTORA. {t('footer.rights')}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">
              Tunis · Gammarth · La Marsa · Sidi Bou Said
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
