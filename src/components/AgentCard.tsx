import React from 'react';
import { Phone, Mail, MessageSquare, Star, ShieldCheck } from 'lucide-react';
import { Agent } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AgentCardProps {
  agent: Agent;
  onContactClick?: () => void;
  className?: string;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  onContactClick,
  className = '',
}) => {
  const { language } = useLanguage();

  const handleWhatsApp = () => {
    const cleanPhone = agent.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello ${agent.name}, I am inquiring via NESTORA regarding properties in Tunisia.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-zinc-200/80 p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="relative">
          <img
            src={agent.avatar}
            alt={agent.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-zinc-100 shadow-sm"
          />
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]"
            title="Verified NESTORA Advisor"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <h4 className="font-serif font-bold text-lg text-zinc-900">{agent.name}</h4>
          </div>
          <p className="text-xs text-zinc-500 font-medium">{agent.role}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-amber-500 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            <span>{agent.rating || 4.9}</span>
            <span className="text-zinc-400 font-normal">
              ({language === 'FR' ? '42 ventes & locations' : '42 deals completed'})
            </span>
          </div>
        </div>
      </div>

      {/* Languages */}
      {agent.languages && (
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-5 pb-4 border-b border-zinc-100">
          <span className="font-semibold text-zinc-600">
            {language === 'FR' ? 'Langues :' : 'Languages:'}
          </span>
          <span>{agent.languages.join(' · ')}</span>
        </div>
      )}

      {/* Contact Quick Links */}
      <div className="space-y-2.5 mb-5 text-xs text-zinc-600">
        <a
          href={`tel:${agent.phone}`}
          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-zinc-50 transition-colors"
        >
          <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-zinc-800">{agent.phone}</span>
        </a>

        <a
          href={`mailto:${agent.email}`}
          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-zinc-50 transition-colors"
        >
          <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-zinc-800 truncate">{agent.email}</span>
        </a>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleWhatsApp}
          className="py-2.5 px-3 rounded-xl border border-emerald-500/40 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          <span>WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={onContactClick}
          className="py-2.5 px-3 rounded-xl bg-[#121316] hover:bg-zinc-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>{language === 'FR' ? 'Message' : 'Inquire Now'}</span>
        </button>
      </div>
    </div>
  );
};
