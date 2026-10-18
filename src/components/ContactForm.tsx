import React, { useState } from 'react';
import { Send, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactFormProps {
  propertyTitle?: string;
  agentName?: string;
  onSuccess?: () => void;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  propertyTitle,
  agentName,
  onSuccess,
  className = '',
}) => {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: propertyTitle
      ? language === 'FR'
        ? `Bonjour, je souhaite obtenir de plus amples informations ou planifier une visite privée pour la propriété : "${propertyTitle}". Merci.`
        : `Hello, I would like to schedule a private viewing and receive comprehensive documentation regarding "${propertyTitle}". Thank you.`
      : '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errs.name = language === 'FR' ? 'Veuillez saisir votre nom.' : 'Please enter your name.';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = language === 'FR' ? 'Adresse email valide requise.' : 'Valid email address is required.';
    }
    if (!formData.phone.trim() || formData.phone.length < 6) {
      errs.phone = language === 'FR' ? 'Numéro de téléphone requis.' : 'Phone number is required.';
    }
    if (!formData.message.trim()) {
      errs.message = language === 'FR' ? 'Veuillez rédiger votre message.' : 'Please enter your message.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate real network request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div className={`bg-white rounded-2xl border border-zinc-200/80 p-6 shadow-sm ${className}`}>
      {submitted ? (
        <div className="py-8 text-center animate-in zoom-in-95 duration-300">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="font-serif text-xl font-bold text-zinc-900 mb-2">
            {t('details.inquirySent')}
          </h4>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-sm mx-auto mb-6 leading-relaxed">
            {agentName ? (
              language === 'FR' ? (
                <>Votre conseiller <strong>{agentName}</strong> a bien reçu votre demande et vous contactera rapidement par téléphone ou WhatsApp.</>
              ) : (
                <>Your luxury advisor <strong>{agentName}</strong> has received your inquiry and will follow up shortly via telephone or WhatsApp.</>
              )
            ) : (
              language === 'FR'
                ? 'Notre équipe NESTORA vous recontactera sous 24h.'
                : 'Our NESTORA advisory team will be in touch within 24 hours.'
            )}
          </p>
          <button
            onClick={handleReset}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors"
          >
            {language === 'FR' ? 'Envoyer une autre demande' : 'Send another inquiry'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <h4 className="font-serif font-bold text-lg text-zinc-900">
              {language === 'FR' ? 'Demande de Visite & Renseignements' : 'Inquire About This Property'}
            </h4>
            <Sparkles className="w-4 h-4 text-[#C59B63]" />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              {language === 'FR' ? 'Nom et Prénom *' : 'Full Name *'}
            </label>
            <input
              type="text"
              placeholder="e.g. Yassine Cherif"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full text-xs font-medium rounded-xl border px-3.5 py-2.5 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40 transition-colors ${
                errors.name ? 'border-rose-400' : 'border-zinc-200'
              }`}
            />
            {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full text-xs font-medium rounded-xl border px-3.5 py-2.5 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40 transition-colors ${
                errors.email ? 'border-rose-400' : 'border-zinc-200'
              }`}
            />
            {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              {language === 'FR' ? 'Téléphone *' : 'Phone Number *'}
            </label>
            <input
              type="tel"
              placeholder="+216 20 000 000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full text-xs font-medium rounded-xl border px-3.5 py-2.5 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40 transition-colors ${
                errors.phone ? 'border-rose-400' : 'border-zinc-200'
              }`}
            />
            {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Message *
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full text-xs font-medium rounded-xl border px-3.5 py-2.5 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40 transition-colors ${
                errors.message ? 'border-rose-400' : 'border-zinc-200'
              }`}
            />
            {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-5 rounded-xl bg-[#121316] hover:bg-zinc-800 active:scale-[0.99] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-[#C59B63]" />
                <span>{t('details.sendInquiry')}</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-zinc-400">
            <Shield className="w-3 h-3 text-zinc-400" />
            <span>
              {language === 'FR'
                ? 'Données confidentielles et strictement protégées.'
                : '100% confidential. No spam or unsolicited calls.'}
            </span>
          </div>
        </form>
      )}
    </div>
  );
};
