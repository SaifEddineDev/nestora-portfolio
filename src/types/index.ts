export type PropertyType = 'Apartment' | 'Villa' | 'House' | 'Studio' | 'Office';
export type PropertyStatus = 'Sale' | 'Rent';
export type CityLocation = 'Tunis' | 'La Marsa' | 'Gammarth' | 'Carthage' | 'Sidi Bou Said' | 'Hammamet' | 'Sousse';

export interface Agent {
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
  rating?: number;
  languages?: string[];
}

export interface Property {
  id: string;
  title: string;
  titleFr: string;
  type: PropertyType;
  status: PropertyStatus;
  location: string;
  city: CityLocation;
  price: number;
  currency: 'TND';
  pricePeriod?: 'month' | 'total';
  bedrooms: number;
  bathrooms: number;
  surface: number; // in m²
  year: number;
  parking: number;
  description: string;
  descriptionFr: string;
  images: string[];
  amenities: string[];
  featured: boolean;
  agent: Agent;
  coordinates?: {
    lat: number;
    lng: number;
  };
  highlights?: string[];
}

export interface FilterState {
  status: 'All' | PropertyStatus;
  city: 'All' | CityLocation;
  type: 'All' | PropertyType;
  minPrice: string;
  maxPrice: string;
  bedrooms: string; // 'All' | '1' | '2' | '3' | '4+'
  bathrooms: string; // 'All' | '1' | '2' | '3+'
  minSurface: string;
  maxSurface: string;
  searchQuery: string;
}

export type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'newest' | 'surface-desc';
