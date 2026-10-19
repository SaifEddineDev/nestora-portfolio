import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, Banknote } from 'lucide-react';
import { FilterSelect } from './FilterPanel';
import { useLanguage } from '../context/LanguageContext';

interface SearchBarProps {
  initialStatus?: string;
  initialCity?: string;
  initialType?: string;
  initialMinPrice?: string;
  initialMaxPrice?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialStatus = 'Sale',
  initialCity = 'All',
  initialType = 'All',
  initialMinPrice = '',
  initialMaxPrice = '',
  className = '',
}) => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const [status, setStatus] = useState<string>(initialStatus);
  const [city, setCity] = useState<string>(initialCity);
  const [type, setType] = useState<string>(initialType);
  const [minPrice, setMinPrice] = useState<string>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<string>(initialMaxPrice);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (status && status !== 'All') params.set('status', status);
    if (city && city !== 'All') params.set('city', city);
    if (type && type !== 'All') params.set('type', type);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div
      className={`bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-[0_18px_44px_-16px_rgba(0,0,0,0.3)] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border border-white/70 ring-1 ring-black/5 ${className}`}
    >
      {/* Transaction Toggle Buy / Rent */}
      <div className="flex items-center gap-2 mb-3 pb-3 sm:mb-4 sm:pb-4 border-b border-zinc-100">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mr-2">
          {t('hero.lookingFor')}:
        </span>
        <div className="flex bg-zinc-100/80 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setStatus('Sale')}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
              status === 'Sale'
                ? 'bg-gradient-to-b from-[#c59b63] to-[#a87b40] text-white shadow-sm ring-1 ring-[#8f6738]/40'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            {t('hero.buy')}
          </button>
          <button
            type="button"
            onClick={() => setStatus('Rent')}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
              status === 'Rent'
                ? 'bg-gradient-to-b from-[#c59b63] to-[#a87b40] text-white shadow-sm ring-1 ring-[#8f6738]/40'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            {t('hero.rent')}
          </button>
        </div>
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Location Dropdown */}
        <div className="space-y-1 sm:space-y-1.5">
          <label className="text-[11px] sm:text-xs font-semibold text-zinc-600 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C59B63]" />
            <span>{t('hero.location')}</span>
          </label>
          <FilterSelect
            value={city}
            onChange={setCity}
            openUpward
            options={[
              { value: 'All', label: t('hero.allLocations') },
              ...['Tunis', 'La Marsa', 'Gammarth', 'Carthage', 'Sidi Bou Said', 'Hammamet', 'Sousse'].map((location) => ({ value: location, label: location })),
            ]}
          />
        </div>

        {/* Property Type Dropdown */}
        <div className="space-y-1 sm:space-y-1.5">
          <label className="text-[11px] sm:text-xs font-semibold text-zinc-600 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-[#C59B63]" />
            <span>{t('hero.propertyType')}</span>
          </label>
          <FilterSelect
            value={type}
            onChange={setType}
            openUpward
            options={[
              { value: 'All', label: t('hero.allTypes') },
              ...['Apartment', 'Villa', 'House', 'Studio', 'Office'].map((propertyType) => ({ value: propertyType, label: propertyType })),
            ]}
          />
        </div>

        {/* Price Inputs (Min / Max) */}
        <div className="space-y-1 sm:space-y-1.5">
          <label className="text-[11px] sm:text-xs font-semibold text-zinc-600 flex items-center gap-1.5">
            <Banknote className="w-3.5 h-3.5 text-[#C59B63]" />
            <span>{t('hero.price')}</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder={status === 'Rent' ? 'Min (e.g. 1000)' : 'Min (e.g. 300k)'}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full text-xs font-medium rounded-xl border border-zinc-200 px-3 py-3 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40 transition-colors text-zinc-800"
            />
            <input
              type="number"
              placeholder={status === 'Rent' ? 'Max (e.g. 8000)' : 'Max (e.g. 1.5M)'}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full text-xs font-medium rounded-xl border border-zinc-200 px-3 py-3 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40 transition-colors text-zinc-800"
            />
          </div>
        </div>

        {/* Search CTA */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full py-3 sm:py-3.5 px-6 rounded-xl bg-[#121316] hover:bg-[#252830] active:scale-[0.99] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-md group"
          >
            <Search className="w-4 h-4 text-[#C59B63] transition-transform group-hover:scale-110" />
            <span className="font-semibold tracking-wide">{t('hero.search')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
