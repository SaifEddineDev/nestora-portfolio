import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Heart,
  Share2,
  ArrowLeft,
  Check,
  Building,
  ShieldCheck,
  Compass,
  Waves,
  TreePine,
  Wifi,
  Car,
  Utensils,
  Flame,
  Sun,
  Lock,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { propertiesData } from '../data/properties';
import { PropertyGallery } from '../components/PropertyGallery';
import { PropertyInfo } from '../components/PropertyInfo';
import { AgentCard } from '../components/AgentCard';
import { ContactForm } from '../components/ContactForm';
import { PropertyCard } from '../components/PropertyCard';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { language, t } = useLanguage();

  const [copied, setCopied] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Find current property
  const property = propertiesData.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] pt-36 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif text-3xl font-bold text-zinc-900 mb-2">
          {language === 'FR' ? 'Propriété introuvable' : 'Property Not Found'}
        </h2>
        <p className="text-zinc-500 mb-6 text-sm">
          {language === 'FR'
            ? 'La référence demandée n’est plus disponible ou a été déplacée.'
            : 'The property you are looking for has either been sold or is temporarily unlisted.'}
        </p>
        <Link
          to="/properties"
          className="px-6 py-2.5 rounded-xl bg-[#121316] text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
        >
          {language === 'FR' ? 'Retour aux propriétés' : 'Back to Properties'}
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(property.id);
  const formattedPrice = new Intl.NumberFormat('fr-TN').format(property.price);
  const displayTitle = language === 'FR' && property.titleFr ? property.titleFr : property.title;
  const displayDesc = language === 'FR' && property.descriptionFr ? property.descriptionFr : property.description;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-agent-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Icon mapping for amenities
  const getAmenityIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('pool') || lower.includes('piscine')) return Waves;
    if (lower.includes('garden') || lower.includes('jardin')) return TreePine;
    if (lower.includes('wifi') || lower.includes('internet')) return Wifi;
    if (lower.includes('park') || lower.includes('garage')) return Car;
    if (lower.includes('kitchen') || lower.includes('cuisine')) return Utensils;
    if (lower.includes('fire') || lower.includes('cheminée')) return Flame;
    if (lower.includes('sea') || lower.includes('mer')) return Sun;
    if (lower.includes('security') || lower.includes('sécurité')) return Lock;
    return Check;
  };

  // Similar properties in same city or same type
  const similarProperties = propertiesData
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAFAF9] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6 font-medium">
          <Link to="/" className="hover:text-zinc-900 transition-colors">
            {t('nav.home')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <Link to="/properties" className="hover:text-zinc-900 transition-colors">
            {t('nav.properties')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-800 truncate font-semibold">{property.city}</span>
        </div>

        {/* 10. TOP SECTION: Title, Location, Price, Badges, Actions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-200/80 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-md ${
                  property.status === 'Sale'
                    ? 'bg-[#121316] text-white'
                    : 'bg-[#C59B63] text-white'
                }`}
              >
                {property.status === 'Sale' ? t('featured.forSale') : t('featured.forRent')}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-md bg-zinc-200/80 text-zinc-800">
                {property.type}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Ref: #{property.id.replace('prop-', 'TN0')}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-900 max-w-3xl leading-tight">
              {displayTitle}
            </h1>

            <div className="flex items-center gap-2 text-sm text-zinc-600 font-medium mt-3">
              <MapPin className="w-4 h-4 text-[#C59B63] shrink-0" />
              <span>{property.location}, Tunisia</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4">
            <div className="text-left lg:text-right">
              <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-0.5">
                {language === 'FR' ? 'Prix Demandé' : 'Listing Price'}
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900">
                {formattedPrice} <span className="text-sm font-sans font-normal text-zinc-600">{property.currency}</span>
                {property.status === 'Rent' && (
                  <span className="text-sm font-sans font-normal text-zinc-500"> {t('featured.month')}</span>
                )}
              </div>
            </div>

            {/* Actions: Favorite & Share */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(property.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  favorited
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-600 stroke-rose-600' : ''}`} />
                <span>{favorited ? (language === 'FR' ? 'Enregistré' : 'Saved') : (language === 'FR' ? 'Favoris' : 'Save')}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? (language === 'FR' ? 'Lien copié !' : 'Link Copied!') : (language === 'FR' ? 'Partager' : 'Share')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 10. IMAGE GALLERY */}
        <PropertyGallery images={property.images} title={displayTitle} />

        {/* 11. PROPERTY INFORMATION METRICS */}
        <PropertyInfo property={property} />

        {/* Main Content Layout: Left Details + Right Agent/Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
          {/* Left Details (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* 12. DESCRIPTION */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-zinc-900 mb-4">
                {t('details.aboutProperty')}
              </h2>
              <div className="prose text-zinc-600 text-sm sm:text-base leading-relaxed">
                <p className={!isDescriptionExpanded ? 'line-clamp-4' : ''}>
                  {displayDesc}
                </p>
                {displayDesc.length > 200 && (
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="mt-3 text-xs font-bold text-[#A87B40] hover:underline transition-all"
                  >
                    {isDescriptionExpanded ? t('details.readLess') : t('details.readMore')}
                  </button>
                )}
              </div>

              {/* Highlights Pill Row */}
              {property.highlights && (
                <div className="mt-6 pt-6 border-t border-zinc-100 flex flex-wrap gap-2">
                  {property.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C59B63]/10 text-[#A87B40] text-xs font-semibold"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{highlight}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 13. AMENITIES GRID */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-zinc-900 mb-6">
                {t('details.amenities')}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50/70 border border-zinc-100 hover:border-zinc-200 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white shadow-xs text-[#A87B40] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-zinc-700 capitalize">
                        {amenity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 14. LOCATION SECTION & STYLED MAP PLACEHOLDER */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-zinc-900">
                    {t('details.location')}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                    {property.location}, {property.city}, Tunisia
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#C59B63]/10 text-[#A87B40] flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
              </div>

              {/* Styled Interactive Map Representation */}
              <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden border border-zinc-200 bg-[#E8EDE8] flex items-center justify-center shadow-inner group">
                {/* Stylized Map Grid & Roads overlay */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Simulated Geographic Coastline & Water */}
                <div className="absolute top-0 right-0 bottom-0 w-2/5 bg-sky-100/70 border-l border-sky-200" />
                <div className="absolute top-6 right-8 text-[11px] font-semibold text-sky-700/60 uppercase tracking-widest pointer-events-none">
                  Mediterranean Sea / Golfe de Tunis
                </div>

                {/* Simulated Neighborhood Roads */}
                <div className="absolute inset-x-0 top-1/2 h-4 bg-white/70 shadow-xs border-y border-zinc-300 -rotate-3" />
                <div className="absolute inset-y-0 left-1/3 w-4 bg-white/70 shadow-xs border-x border-zinc-300 rotate-6" />

                {/* Pin in Center */}
                <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
                  <div className="px-3.5 py-1.5 rounded-xl bg-[#121316] text-white text-xs font-semibold shadow-xl flex items-center gap-1.5 whitespace-nowrap">
                    <MapPin className="w-3.5 h-3.5 text-[#C59B63]" />
                    <span>{displayTitle}</span>
                  </div>
                  <div className="w-3 h-3 bg-[#121316] rotate-45 -mt-1.5 shadow-sm" />
                </div>

                {/* Neighborhood Highlights Badge */}
                <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-md rounded-xl p-2.5 border border-zinc-200 text-[11px] text-zinc-600 shadow-sm flex items-center gap-3">
                  <span>🏖️ Beach: 4 mins</span>
                  <span>✈️ Tunis-Carthage Airport: 18 mins</span>
                  <span>☕ Cafes & Dining: 2 mins</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                <span>Exact address provided upon confidential appointment.</span>
                <span className="font-semibold text-zinc-700">Tunisia Coastal Zone</span>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Agent Card & Contact Form (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6" id="contact-agent-section">
              {/* 15. CONTACT AGENT CARD */}
              <AgentCard agent={property.agent} onContactClick={scrollToContact} />

              {/* 16. CONTACT FORM */}
              <ContactForm
                propertyTitle={displayTitle}
                agentName={property.agent.name}
              />
            </div>
          </div>
        </div>

        {/* Similar / Related Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-zinc-200/80">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A87B40] block mb-1">
                  Recommendations
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900">
                  {t('details.similar')} {property.city}
                </h3>
              </div>
              <Link
                to={`/properties?city=${property.city}`}
                className="text-xs font-semibold text-zinc-900 hover:text-[#A87B40] transition-colors"
              >
                {language === 'FR' ? 'Voir tout dans ce secteur' : 'View All in Sector'} →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((simProp) => (
                <PropertyCard key={simProp.id} property={simProp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
