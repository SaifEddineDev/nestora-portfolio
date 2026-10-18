import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Maximize2, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, className = '' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { language, t } = useLanguage();
  const favorited = isFavorite(property.id);

  const formattedPrice = new Intl.NumberFormat('fr-TN').format(property.price);

  const displayTitle = language === 'FR' && property.titleFr ? property.titleFr : property.title;

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden border border-zinc-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(18,19,22,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col ${className}`}
    >
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
        <img
          src={property.images[0]}
          alt={displayTitle}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 z-10">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-md tracking-wide shadow-sm backdrop-blur-md ${
              property.status === 'Sale'
                ? 'bg-[#121316]/85 text-white border border-white/10'
                : 'bg-[#C59B63]/90 text-white'
            }`}
          >
            {property.status === 'Sale' ? t('featured.forSale') : t('featured.forRent')}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/90 text-zinc-800 backdrop-blur-md shadow-sm">
            {property.type}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-sm active:scale-90 ${
            favorited
              ? 'bg-rose-50 text-rose-600 scale-105'
              : 'bg-white/80 text-zinc-700 hover:bg-white hover:text-rose-500'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              favorited ? 'fill-rose-600 stroke-rose-600' : 'stroke-current'
            }`}
          />
        </button>

        {/* Bottom Price in Image overlay */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-baseline justify-between text-white z-10">
          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight drop-shadow-sm font-sans">
              {formattedPrice} <span className="text-xs font-normal opacity-90">{property.currency}</span>
              {property.status === 'Rent' && (
                <span className="text-xs font-normal opacity-90"> {t('featured.month')}</span>
              )}
            </div>
          </div>
          {property.featured && (
            <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-amber-500/90 text-white backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C59B63] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Title */}
          <Link to={`/properties/${property.id}`} className="group-hover:text-[#A87B40] transition-colors">
            <h3 className="font-serif text-lg font-semibold text-zinc-900 line-clamp-1 mb-3">
              {displayTitle}
            </h3>
          </Link>

          {/* Metrics */}
          <div className="flex items-center justify-between py-3 border-y border-zinc-100 text-xs text-zinc-600">
            {property.bedrooms > 0 ? (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-zinc-400" />
                <span>
                  <strong>{property.bedrooms}</strong> {t('featured.beds')}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-zinc-400" />
                <span>Office</span>
              </div>
            )}

            <div className="h-3.5 w-[1px] bg-zinc-200" />

            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-zinc-400" />
              <span>
                <strong>{property.bathrooms}</strong> {t('featured.baths')}
              </span>
            </div>

            <div className="h-3.5 w-[1px] bg-zinc-200" />

            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>
                <strong>{property.surface}</strong> m²
              </span>
            </div>
          </div>
        </div>

        {/* View Property CTA with Arrow movement */}
        <div className="mt-4 pt-1 flex items-center justify-between">
          <span className="text-xs text-zinc-400">Ref: #{property.id.replace('prop-', 'TN0')}</span>
          <Link
            to={`/properties/${property.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#121316] group-hover:text-[#A87B40] transition-colors"
          >
            <span>{t('featured.viewProperty')}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
