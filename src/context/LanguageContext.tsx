import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'EN' | 'FR';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Nav
    'nav.home': 'Home',
    'nav.properties': 'Properties',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.favorites': 'Saved',
    'nav.listProperty': 'List a Property',

    // Hero
    'hero.tagline': 'Find a place you\'ll love to call home.',
    'hero.subtitle': 'Discover carefully selected homes, apartments and villas in Tunisia\'s most desirable locations.',
    'hero.lookingFor': 'Looking for',
    'hero.buy': 'Buy',
    'hero.rent': 'Rent',
    'hero.location': 'Location',
    'hero.allLocations': 'All Locations',
    'hero.propertyType': 'Property type',
    'hero.allTypes': 'All Types',
    'hero.price': 'Price (TND)',
    'hero.minPrice': 'Min Price',
    'hero.maxPrice': 'Max Price',
    'hero.search': 'Search Properties',

    // Featured
    'featured.title': 'Featured Properties',
    'featured.subtitle': 'Explore some of our most exceptional properties.',
    'featured.viewProperty': 'View Property',
    'featured.forSale': 'For Sale',
    'featured.forRent': 'For Rent',
    'featured.beds': 'Beds',
    'featured.baths': 'Baths',
    'featured.month': '/month',

    // Properties Page
    'properties.heading': 'Find your next property',
    'properties.found': 'properties found',
    'properties.reset': 'Reset Filters',
    'properties.sortBy': 'Sort by',
    'properties.sortRecommended': 'Recommended',
    'properties.sortPriceLow': 'Price: Low to High',
    'properties.sortPriceHigh': 'Price: High to Low',
    'properties.sortNewest': 'Newest',
    'properties.sortSurface': 'Largest Surface',
    'properties.noResults': 'No properties found matching your criteria.',
    'properties.noResultsDesc': 'Try adjusting your search criteria or resetting filters to see more available luxury listings.',

    // About Section
    'about.badge': 'About NESTORA',
    'about.headline': 'More than properties. We help you find your place.',
    'about.desc1': 'Nestora is a premier luxury real estate agency dedicated to exceptional residences across Tunisia’s most prestigious coastlines and heritage districts.',
    'about.desc2': 'Whether acquiring a Mediterranean sea-view villa in Gammarth, an iconic historic estate in Sidi Bou Said, or prime corporate premises in Tunis, our team combines discreet advisory with transparent market intelligence.',
    'about.statProperties': 'Properties',
    'about.statClients': 'Happy Clients',
    'about.statLocations': 'Prime Locations',
    'about.statExperience': 'Years Experience',

    // Why Choose Us
    'why.title': 'Why Choose NESTORA',
    'why.subtitle': 'Uncompromising quality and bespoke architectural advisory.',
    'why.careful.title': 'Carefully Selected',
    'why.careful.desc': 'Every property is reviewed and presented with accurate information.',
    'why.local.title': 'Local Expertise',
    'why.local.desc': 'Discover properties with people who understand the local market.',
    'why.support.title': 'Personal Support',
    'why.support.desc': 'From your first search to your final decision, we\'re here to help.',
    'why.simple.title': 'Simple Experience',
    'why.simple.desc': 'Search, compare and contact an agent easily.',

    // CTA
    'cta.headline': 'Ready to find your next home?',
    'cta.desc': 'Explore our properties and discover a place that feels right.',
    'cta.explore': 'Explore Properties',
    'cta.contact': 'Contact Us',

    // Footer
    'footer.desc': 'Premium real estate experiences across Tunisia.',
    'footer.company': 'Company',
    'footer.properties': 'Properties',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',

    // Property details
    'details.aboutProperty': 'About this property',
    'details.amenities': 'Amenities & Features',
    'details.location': 'Location & Neighborhood',
    'details.contactAgent': 'Contact Agent',
    'details.sendInquiry': 'Send Inquiry',
    'details.inquirySent': 'Thank you! Your inquiry has been sent successfully.',
    'details.surface': 'Surface',
    'details.bedrooms': 'Bedrooms',
    'details.bathrooms': 'Bathrooms',
    'details.parking': 'Parking spaces',
    'details.yearBuilt': 'Year built',
    'details.readMore': 'Read more',
    'details.readLess': 'Read less',
    'details.similar': 'Similar Properties in',
  },
  FR: {
    // Nav
    'nav.home': 'Accueil',
    'nav.properties': 'Propriétés',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.favorites': 'Favoris',
    'nav.listProperty': 'Déposer un Bien',

    // Hero
    'hero.tagline': 'Trouvez le lieu que vous aimerez appeler chez vous.',
    'hero.subtitle': 'Découvrez une sélection exclusive de villas, appartements et résidences d\'exception en Tunisie.',
    'hero.lookingFor': 'Je recherche',
    'hero.buy': 'Acheter',
    'hero.rent': 'Louer',
    'hero.location': 'Localisation',
    'hero.allLocations': 'Toutes les villes',
    'hero.propertyType': 'Type de bien',
    'hero.allTypes': 'Tous les types',
    'hero.price': 'Prix (TND)',
    'hero.minPrice': 'Prix Min',
    'hero.maxPrice': 'Prix Max',
    'hero.search': 'Rechercher',

    // Featured
    'featured.title': 'Propriétés en Vedette',
    'featured.subtitle': 'Explorez nos biens les plus exceptionnels et exclusifs.',
    'featured.viewProperty': 'Voir la Propriété',
    'featured.forSale': 'À Vendre',
    'featured.forRent': 'À Louer',
    'featured.beds': 'Chambres',
    'featured.baths': 'Salles de bain',
    'featured.month': '/mois',

    // Properties Page
    'properties.heading': 'Trouvez votre prochaine propriété',
    'properties.found': 'biens trouvés',
    'properties.reset': 'Réinitialiser les Filtres',
    'properties.sortBy': 'Trier par',
    'properties.sortRecommended': 'Recommandés',
    'properties.sortPriceLow': 'Prix : Croissant',
    'properties.sortPriceHigh': 'Prix : Décroissant',
    'properties.sortNewest': 'Plus Récents',
    'properties.sortSurface': 'Plus Grande Surface',
    'properties.noResults': 'Aucun bien ne correspond à vos critères.',
    'properties.noResultsDesc': 'Modifiez vos filtres ou réinitialisez votre recherche pour découvrir d\'autres résidences de prestige.',

    // About Section
    'about.badge': 'À Propos de NESTORA',
    'about.headline': 'Bien plus qu\'un bien. Nous vous aidons à trouver votre place.',
    'about.desc1': 'Nestora est une agence immobilière haut de gamme dédiée aux résidences de prestige situées dans les secteurs les plus prisés de Tunisie.',
    'about.desc2': 'Qu’il s’agisse d’une villa pieds dans l’eau à Gammarth, d’une demeure historique à Sidi Bou Said ou de bureaux prestigieux à Tunis, nous allions discrétion, expertise locale et conseil personnalisé.',
    'about.statProperties': 'Biens Disponibles',
    'about.statClients': 'Clients Satisfaits',
    'about.statLocations': 'Destinations Phares',
    'about.statExperience': 'Années d’Expérience',

    // Why Choose Us
    'why.title': 'Pourquoi Choisir NESTORA',
    'why.subtitle': 'Une exigence absolue et un accompagnement sur-mesure.',
    'why.careful.title': 'Soigneusement Sélectionnés',
    'why.careful.desc': 'Chaque propriété est rigoureusement auditée et présentée avec clarté.',
    'why.local.title': 'Expertise Locale',
    'why.local.desc': 'Bénéficiez de la connaissance intime du marché tunisien haut de gamme.',
    'why.support.title': 'Accompagnement Dédié',
    'why.support.desc': 'De la première visite jusqu’à la signature, nos conseillers sont à vos côtés.',
    'why.simple.title': 'Expérience Fluide',
    'why.simple.desc': 'Recherchez, comparez et échangez avec votre conseiller en toute sérénité.',

    // CTA
    'cta.headline': 'Prêt à trouver votre prochaine résidence ?',
    'cta.desc': 'Parcourez notre collection et découvrez un lieu qui vous ressemble.',
    'cta.explore': 'Explorer les Biens',
    'cta.contact': 'Contactez-nous',

    // Footer
    'footer.desc': 'L\'art de vivre l\'immobilier d\'exception en Tunisie.',
    'footer.company': 'Agence',
    'footer.properties': 'Propriétés',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',

    // Property details
    'details.aboutProperty': 'À propos de cette propriété',
    'details.amenities': 'Prestations & Équipements',
    'details.location': 'Localisation & Quartier',
    'details.contactAgent': 'Contacter l’Agent',
    'details.sendInquiry': 'Envoyer la Demande',
    'details.inquirySent': 'Merci ! Votre demande a été transmise avec succès.',
    'details.surface': 'Surface',
    'details.bedrooms': 'Chambres',
    'details.bathrooms': 'Salles de bain',
    'details.parking': 'Places de parking',
    'details.yearBuilt': 'Année de construction',
    'details.readMore': 'Lire la suite',
    'details.readLess': 'Réduire',
    'details.similar': 'Biens similaires à',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('nestora_lang');
      return (stored === 'FR' || stored === 'EN') ? stored : 'EN';
    } catch {
      return 'EN';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('nestora_lang', lang);
    } catch (e) {
      console.error(e);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['EN'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
