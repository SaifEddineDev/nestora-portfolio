import React from 'react';
import { Maximize2, Bed, Bath, Car, Calendar } from 'lucide-react';
import { Property } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PropertyInfoProps {
  property: Property;
}

export const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => {
  const { t } = useLanguage();

  const specs = [
    {
      label: t('details.surface'),
      value: `${property.surface} m²`,
      icon: Maximize2,
    },
    {
      label: t('details.bedrooms'),
      value: property.bedrooms > 0 ? property.bedrooms : 'N/A',
      icon: Bed,
    },
    {
      label: t('details.bathrooms'),
      value: property.bathrooms,
      icon: Bath,
    },
    {
      label: t('details.parking'),
      value: property.parking,
      icon: Car,
    },
    {
      label: t('details.yearBuilt'),
      value: property.year,
      icon: Calendar,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 my-8">
      {specs.map((spec, index) => {
        const Icon = spec.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center hover:border-[#C59B63]/40 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-50 group-hover:bg-[#C59B63]/10 text-zinc-600 group-hover:text-[#A87B40] flex items-center justify-center mb-2.5 transition-colors">
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-serif text-zinc-900">
              {spec.value}
            </div>
            <div className="text-xs text-zinc-500 font-medium mt-0.5">
              {spec.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
