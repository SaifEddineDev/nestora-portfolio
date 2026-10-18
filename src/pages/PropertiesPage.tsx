import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Search, RotateCcw, Building2, Check } from 'lucide-react';
import { propertiesData } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { FilterPanel } from '../components/FilterPanel';
import { FilterState, SortOption } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const PropertiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language, t } = useLanguage();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Initialize filters from query params
  const [filters, setFilters] = useState<FilterState>(() => ({
    status: (searchParams.get('status') as any) || 'All',
    city: (searchParams.get('city') as any) || 'All',
    type: (searchParams.get('type') as any) || 'All',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || 'All',
    bathrooms: searchParams.get('bathrooms') || 'All',
    minSurface: searchParams.get('minSurface') || '',
    maxSurface: searchParams.get('maxSurface') || '',
    searchQuery: searchParams.get('q') || '',
  }));

  const [sortOption, setSortOption] = useState<SortOption>('recommended');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!sortMenuRef.current?.contains(event.target as Node)) setSortMenuOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  // Synchronize state when URL params change
  useEffect(() => {
    setFilters({
      status: (searchParams.get('status') as any) || 'All',
      city: (searchParams.get('city') as any) || 'All',
      type: (searchParams.get('type') as any) || 'All',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      bedrooms: searchParams.get('bedrooms') || 'All',
      bathrooms: searchParams.get('bathrooms') || 'All',
      minSurface: searchParams.get('minSurface') || '',
      maxSurface: searchParams.get('maxSurface') || '',
      searchQuery: searchParams.get('q') || '',
    });
  }, [searchParams]);

  const handleResetFilters = () => {
    const defaultState: FilterState = {
      status: 'All',
      city: 'All',
      type: 'All',
      minPrice: '',
      maxPrice: '',
      bedrooms: 'All',
      bathrooms: 'All',
      minSurface: '',
      maxSurface: '',
      searchQuery: '',
    };
    setFilters(defaultState);
    setSearchParams({});
  };

  // Filter properties dynamically
  const filteredProperties = useMemo(() => {
    return propertiesData.filter((item) => {
      // Status
      if (filters.status !== 'All' && item.status !== filters.status) {
        return false;
      }
      // City
      if (filters.city !== 'All' && item.city !== filters.city) {
        return false;
      }
      // Type
      if (filters.type !== 'All' && item.type !== filters.type) {
        return false;
      }
      // Min Price
      if (filters.minPrice && item.price < Number(filters.minPrice)) {
        return false;
      }
      // Max Price
      if (filters.maxPrice && item.price > Number(filters.maxPrice)) {
        return false;
      }
      // Bedrooms
      if (filters.bedrooms !== 'All') {
        if (filters.bedrooms === '4+' && item.bedrooms < 4) return false;
        if (filters.bedrooms !== '4+' && item.bedrooms !== Number(filters.bedrooms)) return false;
      }
      // Bathrooms
      if (filters.bathrooms !== 'All') {
        if (filters.bathrooms === '3+' && item.bathrooms < 3) return false;
        if (filters.bathrooms !== '3+' && item.bathrooms !== Number(filters.bathrooms)) return false;
      }
      // Min Surface
      if (filters.minSurface && item.surface < Number(filters.minSurface)) {
        return false;
      }
      // Max Surface
      if (filters.maxSurface && item.surface > Number(filters.maxSurface)) {
        return false;
      }
      // Search query in title, location or description
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query) || (item.titleFr && item.titleFr.toLowerCase().includes(query));
        const matchLoc = item.location.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        if (!matchTitle && !matchLoc && !matchDesc) return false;
      }

      return true;
    });
  }, [filters]);

  // Sort properties
  const sortedProperties = useMemo(() => {
    const list = [...filteredProperties];
    switch (sortOption) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'newest':
        return list.sort((a, b) => b.year - a.year);
      case 'surface-desc':
        return list.sort((a, b) => b.surface - a.surface);
      case 'recommended':
      default:
        // Featured first, then id
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProperties, sortOption]);

  return (
    <div className="min-h-screen bg-[#FAFAF9] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Top Header */}
        <div className="py-6 border-b border-zinc-200/80 mb-8">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A87B40] block mb-2">
            Catalog & Portfolio
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-zinc-900">
            {t('properties.heading')}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 max-w-xl">
            {language === 'FR'
              ? 'Découvrez nos propriétés de prestige à vendre et à louer en Tunisie, rigoureusement sélectionnées.'
              : 'Explore our curated portfolio of residential villas, penthouses and commercial spaces across prime Tunisian destinations.'}
          </p>
        </div>

        {/* Search Input Bar + Quick Sort Bar */}
        <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Keyword Search */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'FR' ? 'Rechercher par mot-clé, quartier, ville...' : 'Search by keyword, address, style...'}
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              className="w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
            />
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-700 bg-zinc-50 hover:bg-zinc-100"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C59B63]" />
              <span>{language === 'FR' ? 'Filtres' : 'Filters'}</span>
            </button>

            {/* Results Count */}
            <span className="text-xs font-semibold text-zinc-500 whitespace-nowrap">
              <strong className="text-zinc-900">{sortedProperties.length}</strong> {t('properties.found')}
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-dropdown" className="text-xs text-zinc-500 font-medium hidden sm:inline whitespace-nowrap">
                {t('properties.sortBy')}:
              </label>
              <div className="relative w-[212px] max-w-[52vw]" ref={sortMenuRef}>
                <button
                  id="sort-dropdown"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={sortMenuOpen}
                  onClick={() => setSortMenuOpen((open) => !open)}
                  onKeyDown={(event) => { if (event.key === 'Escape') setSortMenuOpen(false); }}
                  className="w-full flex items-center justify-between text-sm font-medium rounded-2xl border border-zinc-200 pl-4 pr-3 py-3 bg-white hover:border-[#C59B63]/60 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C59B63]/30 focus:border-[#C59B63] text-zinc-800 transition-all"
                >
                  <span>{t(`properties.sort${sortOption === 'recommended' ? 'Recommended' : sortOption === 'price-asc' ? 'PriceLow' : sortOption === 'price-desc' ? 'PriceHigh' : sortOption === 'newest' ? 'Newest' : 'Surface'}`)}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${sortMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {sortMenuOpen && (
                  <div role="listbox" aria-labelledby="sort-dropdown" className="absolute right-0 top-[calc(100%+8px)] z-30 w-full rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-xl shadow-zinc-900/10 animate-in fade-in slide-in-from-top-1 duration-150">
                    {([
                      ['recommended', t('properties.sortRecommended')],
                      ['price-asc', t('properties.sortPriceLow')],
                      ['price-desc', t('properties.sortPriceHigh')],
                      ['newest', t('properties.sortNewest')],
                      ['surface-desc', t('properties.sortSurface')],
                    ] as [SortOption, string][]).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        role="option"
                        aria-selected={sortOption === value}
                        onClick={() => { setSortOption(value); setSortMenuOpen(false); }}
                        className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${sortOption === value ? 'bg-[#C59B63]/10 font-semibold text-zinc-900' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}
                      >
                        <span>{label}</span>
                        {sortOption === value && <Check className="w-4 h-4 text-[#A87B40]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Property Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Left Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="filter-scrollbar sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-2xl">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
              />
            </div>
          </div>

          {/* Mobile Collapsible Filter Drawer/Panel */}
          {mobileFilterOpen && (
            <div className="filter-scrollbar lg:hidden col-span-1 mb-4 max-h-[calc(100dvh-10rem)] overflow-y-auto overscroll-contain rounded-2xl">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
              />
            </div>
          )}

          {/* Right Main Grid */}
          <div className="lg:col-span-3">
            {sortedProperties.length === 0 ? (
              <div className="bg-white rounded-3xl border border-zinc-200/80 p-12 text-center max-w-lg mx-auto shadow-sm my-8">
                <div className="w-16 h-16 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-[#C59B63]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-2">
                  {t('properties.noResults')}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 mb-6 leading-relaxed">
                  {t('properties.noResultsDesc')}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#121316] text-white text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('properties.reset')}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
