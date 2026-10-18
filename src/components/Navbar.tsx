import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, PlusCircle, Menu, X, Globe, PhoneCall } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { ListPropertyModal } from './ListPropertyModal';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);

  const { favoritesCount } = useFavorites();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  // The transparent header is only displayed when on the Home page and before scrolling down the hero section
  const isHeroSection = location.pathname === '/' && !isScrolled;
  const isScrolledStyle = !isHeroSection;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.properties'), path: '/properties' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolledStyle
            ? 'py-3 bg-white/90 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-zinc-200/70'
            : 'py-5 bg-gradient-to-b from-black/40 via-black/15 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" aria-label="NESTORA Accueil">
              <Logo isScrolled={isScrolledStyle} size="md" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative text-sm font-medium tracking-wide transition-colors py-1 ${
                      isScrolledStyle
                        ? active
                          ? 'text-[#C59B63] font-semibold'
                          : 'text-zinc-700 hover:text-zinc-900'
                        : active
                        ? 'text-white font-semibold'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C59B63] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side: Language + Favorites + List a Property */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Selector FR | EN */}
              <div
                className={`flex items-center text-xs font-semibold rounded-full p-1 transition-colors border ${
                  isScrolledStyle
                    ? 'border-zinc-200 bg-zinc-100/70 text-zinc-700'
                    : 'border-white/20 bg-black/20 text-white backdrop-blur-sm'
                }`}
              >
                <button
                  onClick={() => setLanguage('FR')}
                  className={`px-2 py-0.5 rounded-full transition-all ${
                    language === 'FR'
                      ? 'bg-white text-zinc-900 shadow-sm font-bold'
                      : 'hover:text-zinc-900 opacity-70 hover:opacity-100'
                  }`}
                >
                  FR
                </button>
                <span className="text-[10px] opacity-40">|</span>
                <button
                  onClick={() => setLanguage('EN')}
                  className={`px-2 py-0.5 rounded-full transition-all ${
                    language === 'EN'
                      ? 'bg-white text-zinc-900 shadow-sm font-bold'
                      : 'hover:text-zinc-900 opacity-70 hover:opacity-100'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Favorites Icon */}
              <Link
                to="/favorites"
                aria-label="View Favorites"
                className={`relative p-2 rounded-full transition-colors ${
                  isScrolledStyle
                    ? 'text-zinc-700 hover:bg-zinc-100'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Heart className="w-5 h-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#C59B63] text-white text-[10px] font-bold flex items-center justify-center animate-in zoom-in-75">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* List a Property Button */}
              <button
                onClick={() => setListModalOpen(true)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm ${
                  isScrolledStyle
                    ? 'bg-[#121316] text-white hover:bg-[#252830]'
                    : 'bg-white text-[#121316] hover:bg-white/90'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-[#C59B63]" />
                <span>{t('nav.listProperty')}</span>
              </button>
            </div>

            {/* Mobile Actions & Hamburger Toggle */}
            <div className="flex md:hidden items-center gap-3">
              {/* Language toggle mobile */}
              <button
                onClick={() => setLanguage(language === 'EN' ? 'FR' : 'EN')}
                className={`text-xs font-semibold px-2 py-1 rounded-md border ${
                  isScrolledStyle
                    ? 'border-zinc-300 text-zinc-800'
                    : 'border-white/30 text-white bg-black/20'
                }`}
              >
                {language}
              </button>

              {/* Favorites icon */}
              <Link
                to="/favorites"
                className={`relative p-1.5 ${isScrolledStyle ? 'text-zinc-800' : 'text-white'}`}
              >
                <Heart className="w-5 h-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C59B63] text-white text-[10px] font-bold flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className={`p-2 rounded-xl transition-colors ${
                  isScrolledStyle ? 'text-zinc-800 hover:bg-zinc-100' : 'text-white hover:bg-white/10'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200">
          <div className="fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              {/* Top Header in Drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} aria-label="NESTORA">
                  <Logo variant="dark" size="sm" />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="mt-6 flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-[#C59B63]/10 text-[#A87B40] font-semibold'
                        : 'text-zinc-700 hover:bg-zinc-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  to="/favorites"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-base font-medium text-zinc-700 hover:bg-zinc-50 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>{t('nav.favorites')}</span>
                  </span>
                  {favoritesCount > 0 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-[#C59B63] text-white font-bold">
                      {favoritesCount}
                    </span>
                  )}
                </Link>
              </nav>
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="pt-6 border-t border-zinc-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setListModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#121316] text-white font-medium text-sm hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <PlusCircle className="w-4 h-4 text-[#C59B63]" />
                <span>{t('nav.listProperty')}</span>
              </button>

              <div className="flex items-center justify-between pt-2 px-2 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#C59B63]" />
                  <span>Language</span>
                </span>
                <div className="flex gap-2 font-semibold">
                  <button
                    onClick={() => setLanguage('FR')}
                    className={`px-2 py-1 rounded ${language === 'FR' ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-500'}`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => setLanguage('EN')}
                    className={`px-2 py-1 rounded ${language === 'EN' ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-500'}`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Listing Modal */}
      <ListPropertyModal isOpen={listModalOpen} onClose={() => setListModalOpen(false)} />
    </>
  );
};
