import React, { useEffect, useRef, useState } from 'react';
import { Filter, RotateCcw, MapPin, Home, Bed, Bath, Maximize2, Tag, Banknote, ChevronDown, Check } from 'lucide-react';
import { FilterState } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface FilterSelectProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  openUpward?: boolean;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({ value, options, onChange, openUpward = false }) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!selectRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <button type="button" aria-haspopup="listbox" aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}
        className="w-full flex items-center justify-between text-xs font-medium rounded-xl border border-zinc-200 px-3 py-2.5 bg-white hover:border-[#C59B63]/60 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C59B63]/30 focus:border-[#C59B63] transition-all text-zinc-800">
        <span>{selectedOption?.label}</span>
        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div role="listbox" className={`absolute left-0 right-0 z-40 max-h-56 overflow-y-auto rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl shadow-zinc-900/10 ${openUpward ? 'bottom-[calc(100%+6px)]' : 'top-[calc(100%+6px)]'}`}>
        {options.map((option) => <button key={option.value} type="button" role="option" aria-selected={value === option.value}
          onClick={() => { onChange(option.value); setOpen(false); }}
          className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition-colors ${value === option.value ? 'bg-[#C59B63]/10 font-semibold text-zinc-900' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}>
          <span>{option.label}</span>{value === option.value && <Check className="w-3.5 h-3.5 text-[#A87B40]" />}
        </button>)}
      </div>}
    </div>
  );
};

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onReset,
  className = '',
}) => {
  const { language, t } = useLanguage();

  const update = (key: keyof FilterState, value: any) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className={`bg-white rounded-2xl border border-zinc-200/80 p-5 shadow-sm space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-100">
        <div className="flex min-w-0 items-center gap-3">
          <div className="w-9 h-9 shrink-0 rounded-xl bg-[#C59B63]/10 ring-1 ring-inset ring-[#C59B63]/15 flex items-center justify-center">
            <Filter className="w-4 h-4 text-[#A87B40]" />
          </div>
          <h3 className="min-w-0 font-serif text-lg sm:text-xl font-bold leading-tight text-zinc-900">
            {language === 'FR' ? 'Filtrer la sélection' : 'Filter Properties'}
          </h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          aria-label={t('properties.reset')}
          title={t('properties.reset')}
          className="group w-10 h-10 shrink-0 rounded-xl border border-zinc-200 bg-white text-zinc-500 shadow-sm hover:border-[#C59B63]/50 hover:bg-[#C59B63]/5 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#C59B63]/30 transition-all flex items-center justify-center"
        >
          <span className="w-7 h-7 rounded-lg bg-zinc-50 group-hover:bg-[#C59B63]/10 flex items-center justify-center transition-colors">
            <RotateCcw className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>

      {/* Transaction Status Buy / Rent */}
      <div>
        <label className="text-xs font-semibold text-zinc-600 block mb-1.5 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-[#C59B63]" />
          <span>{t('hero.lookingFor')}</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-100 rounded-xl">
          {(['All', 'Sale', 'Rent'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => update('status', st)}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filters.status === st
                  ? 'bg-gradient-to-b from-[#c59b63] to-[#a87b40] text-white shadow-sm ring-1 ring-[#8f6738]/40'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {st === 'All'
                ? (language === 'FR' ? 'Tous' : 'All')
                : st === 'Sale'
                ? t('hero.buy')
                : t('hero.rent')}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="text-xs font-semibold text-zinc-600 block mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#C59B63]" />
          <span>{t('hero.location')}</span>
        </label>
        <FilterSelect
          value={filters.city}
          onChange={(value) => update('city', value)}
          options={[
            { value: 'All', label: t('hero.allLocations') },
            ...['Tunis', 'La Marsa', 'Gammarth', 'Carthage', 'Sidi Bou Said', 'Hammamet', 'Sousse'].map((city) => ({ value: city, label: city })),
          ]}
        />
      </div>

      {/* Property Type */}
      <div>
        <label className="text-xs font-semibold text-zinc-600 block mb-2 flex items-center gap-1.5">
          <Home className="w-3.5 h-3.5 text-[#C59B63]" />
          <span>{t('hero.propertyType')}</span>
        </label>
        <FilterSelect
          value={filters.type}
          onChange={(value) => update('type', value)}
          options={[
            { value: 'All', label: t('hero.allTypes') },
            ...['Villa', 'Apartment', 'House', 'Studio', 'Office'].map((type) => ({ value: type, label: type })),
          ]}
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs font-semibold text-zinc-600 block mb-2 flex items-center gap-1.5">
          <Banknote className="w-3.5 h-3.5 text-[#C59B63]" />
          <span>{t('hero.price')} (TND)</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder={t('hero.minPrice')}
            value={filters.minPrice}
            onChange={(e) => update('minPrice', e.target.value)}
            className="w-full text-xs rounded-xl border border-zinc-200 px-3 py-2 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
          />
          <input
            type="number"
            placeholder={t('hero.maxPrice')}
            value={filters.maxPrice}
            onChange={(e) => update('maxPrice', e.target.value)}
            className="w-full text-xs rounded-xl border border-zinc-200 px-3 py-2 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="text-xs font-semibold text-zinc-600 block mb-2 flex items-center gap-1.5">
          <Bed className="w-3.5 h-3.5 text-[#C59B63]" />
          <span>{t('details.bedrooms')}</span>
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {['All', '1', '2', '3', '4+'].map((beds) => (
            <button
              key={beds}
              type="button"
              onClick={() => update('bedrooms', beds)}
              className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                filters.bedrooms === beds
                  ? 'bg-gradient-to-b from-[#c59b63] to-[#a87b40] text-white border-[#8f6738] shadow-sm'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              {beds}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <label className="text-xs font-semibold text-zinc-600 block mb-2 flex items-center gap-1.5">
          <Bath className="w-3.5 h-3.5 text-[#C59B63]" />
          <span>{t('details.bathrooms')}</span>
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {['All', '1', '2', '3+'].map((baths) => (
            <button
              key={baths}
              type="button"
              onClick={() => update('bathrooms', baths)}
              className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                filters.bathrooms === baths
                  ? 'bg-gradient-to-b from-[#c59b63] to-[#a87b40] text-white border-[#8f6738] shadow-sm'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              {baths}
            </button>
          ))}
        </div>
      </div>

      {/* Surface Area (m²) */}
      <div>
        <label className="text-xs font-semibold text-zinc-600 block mb-2 flex items-center gap-1.5">
          <Maximize2 className="w-3.5 h-3.5 text-[#C59B63]" />
          <span>{t('details.surface')} (m²)</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min m²"
            value={filters.minSurface}
            onChange={(e) => update('minSurface', e.target.value)}
            className="w-full text-xs rounded-xl border border-zinc-200 px-3 py-2 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
          />
          <input
            type="number"
            placeholder="Max m²"
            value={filters.maxSurface}
            onChange={(e) => update('maxSurface', e.target.value)}
            className="w-full text-xs rounded-xl border border-zinc-200 px-3 py-2 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
          />
        </div>
      </div>
    </div>
  );
};
