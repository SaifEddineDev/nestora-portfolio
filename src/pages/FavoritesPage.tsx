import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Trash2, Home } from 'lucide-react';
import { propertiesData } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';

export const FavoritesPage: React.FC = () => {
  const { favorites, toggleFavorite, favoritesCount } = useFavorites();
  const { language } = useLanguage();

  const favoriteProperties = propertiesData.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAFAF9] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="py-6 border-b border-zinc-200/80 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#A87B40] mb-2">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{language === 'FR' ? 'Vos Coups de Cœur' : 'Saved Collection'}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-zinc-900">
              {language === 'FR' ? 'Mes Propriétés Favorites' : 'My Favorites'}
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              {language === 'FR'
                ? 'Retrouvez facilement les villas, appartements et résidences que vous avez mémorisés.'
                : 'Review, compare and contact our team about your shortlisted residences.'}
            </p>
          </div>

          <div className="text-sm font-semibold text-zinc-600 bg-white px-4 py-2 rounded-xl border border-zinc-200/80 shadow-xs self-start sm:self-auto">
            <span className="text-zinc-900 font-bold">{favoritesCount}</span>{' '}
            {language === 'FR' ? 'propriété(s) enregistrée(s)' : 'saved properties'}
          </div>
        </div>

        {/* Content */}
        {favoriteProperties.length === 0 ? (
          <div className="bg-white rounded-3xl border border-zinc-200/80 p-12 sm:p-16 text-center max-w-lg mx-auto shadow-sm my-12">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-2">
              {language === 'FR' ? 'Aucune propriété enregistrée' : 'No favorites saved yet'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 mb-8 leading-relaxed">
              {language === 'FR'
                ? 'Cliquez sur l’icône cœur sur n’importe quelle propriété pour la sauvegarder dans votre liste personnelle.'
                : 'Tap the heart icon on any residence to curate your private list of preferred properties.'}
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#121316] text-white text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <span>{language === 'FR' ? 'Explorer les propriétés' : 'Explore Properties'}</span>
              <ArrowRight className="w-4 h-4 text-[#C59B63]" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteProperties.map((property) => (
                <div key={property.id} className="relative group">
                  <PropertyCard property={property} />
                  <div className="mt-2 text-right">
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-rose-600 transition-colors py-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{language === 'FR' ? 'Retirer des favoris' : 'Remove from favorites'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-[#121316] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-white">
                  {language === 'FR' ? 'Vous hésitez entre plusieurs biens ?' : 'Ready to compare or visit?'}
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  {language === 'FR'
                    ? 'Transmettez votre sélection à nos conseillers pour organiser un circuit de visites privées groupées.'
                    : 'Our advisory team can organize a synchronized private tour itinerary for your favorite homes.'}
                </p>
              </div>
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-xl bg-[#C59B63] text-white text-xs font-semibold hover:bg-[#b08750] transition-colors whitespace-nowrap shadow-sm"
              >
                {language === 'FR' ? 'Organiser une visite groupée' : 'Request Private Tour'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
