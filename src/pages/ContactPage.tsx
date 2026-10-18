import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, ChevronDown } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Buying a Property',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const faqs = [
    {
      q: language === 'FR' ? 'Comment se déroule l’acquisition d’un bien immobilier en Tunisie ?' : 'How does property acquisition work in Tunisia for international clients?',
      a: language === 'FR'
        ? 'L’acquisition fait l’objet d’une promesse de vente notariée avec versement d’un acompte séquestré, suivie de la vérification du titre foncier individuel (Titre Bleu auprès de la Conservation de la Propriété Foncière) avant l’acte définitif.'
        : 'Purchases are formalized via a notarized preliminary agreement with escrow deposit, followed by rigorous legal title blue deed verification at the Land Registry (Conservation de la Propriété Foncière) before final deed execution.',
    },
    {
      q: language === 'FR' ? 'Les non-résidents peuvent-ils acheter une propriété en Tunisie ?' : 'Can non-residents and foreign nationals purchase residential properties in Tunisia?',
      a: language === 'FR'
        ? 'Oui, les étrangers peuvent acquérir des biens résidentiels ou commerciaux situés en zone urbaine, sous réserve de l’obtention de l’autorisation du Gouvernorat territorial compétent.'
        : 'Yes, international buyers can acquire residential or commercial property situated within approved urban planning boundaries, subject to standard Governor’s authorization protocol handled smoothly by our legal advisors.',
    },
    {
      q: language === 'FR' ? 'Comment NESTORA vérifie-t-elle l’authenticité des biens ?' : 'How does NESTORA guarantee property legal authenticity and compliance?',
      a: language === 'FR'
        ? 'Chaque propriété de notre portefeuille fait l’objet d’un audit exhaustif : certificat de propriété actualisé, absence de litiges fonciers, conformité des plans d’architecte et permis de bâtir.'
        : 'Every property accepted into our collection undergoes strict legal auditing: certified title deed, architectural blueprint compliance, municipal building occupancy permits, and tax clearance.',
    },
    {
      q: language === 'FR' ? 'Proposez-vous un service de gestion locative haut de gamme ?' : 'Do you provide bespoke property and rental management?',
      a: language === 'FR'
        ? 'Absolument. Nous offrons une gestion locative complète pour les propriétaires de villas et d’appartements de prestige : sélection rigoureuse des locataires, conciergerie et maintenance.'
        : 'Yes. We offer turnkey asset management for villa and penthouse owners: rigorous tenant vetting, international diplomatic leases, and maintenance oversight.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="py-8 lg:py-12 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A87B40] px-4 py-1.5 rounded-full border border-[#C59B63]/30 bg-[#C59B63]/10 inline-block mb-4">
            Connect
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-zinc-900">
            {language === 'FR' ? 'Prendre Contact avec Notre Agence' : 'Contact NESTORA'}
          </h1>
          <p className="mt-3 text-base text-zinc-500 font-light">
            {language === 'FR'
              ? 'Nos conseillers privés vous accueillent dans nos salons de Tunis Lac et La Marsa pour échanger sur vos projets.'
              : 'Our senior advisors welcome you to our private salons in Tunis Lake and La Marsa to discuss your real estate aspirations.'}
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-7 border border-zinc-200/80 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#C59B63]/10 text-[#A87B40] flex items-center justify-center mb-5">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-1">
              {language === 'FR' ? 'Siège & Salons Privés' : 'Headquarters & Salons'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Rue du Lac d’Annecy, Les Berges du Lac 2, Tunis<br />
              <span className="text-xs text-zinc-400">Branch: Corniche, La Marsa</span>
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-zinc-200/80 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#C59B63]/10 text-[#A87B40] flex items-center justify-center mb-5">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-1">
              {language === 'FR' ? 'Téléphone & WhatsApp' : 'Phone & WhatsApp'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Office: +216 71 889 400<br />
              Mobile / WhatsApp: +216 29 450 120
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-zinc-200/80 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#C59B63]/10 text-[#A87B40] flex items-center justify-center mb-5">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-1">
              Email & Horaires
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              hello@nestora.tn<br />
              Mon - Sat: 08:30 – 19:30 CET
            </p>
          </div>
        </div>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-zinc-900 mb-2">
              {language === 'FR' ? 'Transmettez votre demande' : 'Send an Inquiry'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mb-6">
              {language === 'FR'
                ? 'Remplissez le formulaire ci-dessous. Un conseiller dédié vous répondra sous 24h.'
                : 'Complete the form below. A dedicated property specialist will respond within 24 hours.'}
            </p>

            {submitted ? (
              <div className="py-12 text-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-2">
                  {language === 'FR' ? 'Message Envoyé avec Succès' : 'Inquiry Received'}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto mb-6">
                  {language === 'FR'
                    ? 'Merci de votre confiance. Notre équipe vous recontactera très prochainement.'
                    : 'Thank you for reaching out to NESTORA. Our team will review your requirements and get in touch promptly.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#121316] text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
                >
                  {language === 'FR' ? 'Envoyer un autre message' : 'Send another inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      {language === 'FR' ? 'Nom et Prénom *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Leila Bouazizi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs font-medium rounded-xl border border-zinc-200 px-3.5 py-2.5 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs font-medium rounded-xl border border-zinc-200 px-3.5 py-2.5 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      {language === 'FR' ? 'Téléphone / WhatsApp *' : 'Phone / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+216 20 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs font-medium rounded-xl border border-zinc-200 px-3.5 py-2.5 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      {language === 'FR' ? 'Objet de la demande' : 'Subject of Inquiry'}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-xs font-medium rounded-xl border border-zinc-200 px-3.5 py-2.5 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
                    >
                      <option value="Buying a Property">{language === 'FR' ? 'Projet d’Achat' : 'Buying a Property'}</option>
                      <option value="Renting a Property">{language === 'FR' ? 'Location Résidentielle' : 'Renting a Property'}</option>
                      <option value="Listing / Selling">{language === 'FR' ? 'Vendre / Déposer un Bien' : 'Selling / Listing with Nestora'}</option>
                      <option value="Valuation">{language === 'FR' ? 'Estimation Patrimoniale' : 'Property Valuation'}</option>
                      <option value="General Inquiry">{language === 'FR' ? 'Autre demande' : 'General Inquiry'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={
                      language === 'FR'
                        ? 'Décrivez votre recherche (secteurs souhaités, budget, délais...)'
                        : 'Describe your requirements (preferred areas, timeline, budget, specific features...)'
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs font-medium rounded-xl border border-zinc-200 px-3.5 py-2.5 bg-zinc-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#121316] hover:bg-zinc-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-60"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#C59B63]" />
                      <span>{language === 'FR' ? 'Envoyer la Demande' : 'Submit Inquiry'}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Map & Direct Access */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-zinc-900">
                {language === 'FR' ? 'Notre Agence à Tunis' : 'Our Tunis Central Agency'}
              </h3>
              
              {/* Styled map container */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-200 bg-[#E8EDE8] flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-sky-100/70 border-l border-sky-200" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="px-3 py-1.5 rounded-xl bg-[#121316] text-white text-xs font-semibold shadow-lg flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C59B63] animate-ping" />
                    <span>NESTORA Agency - Lac 2</span>
                  </div>
                  <div className="w-3 h-3 bg-[#121316] rotate-45 -mt-1.5" />
                </div>
              </div>

              <div className="pt-2 text-xs text-zinc-600 space-y-1">
                <p className="font-semibold text-zinc-900">Les Berges du Lac 2, Tunis</p>
                <p className="text-zinc-500">Valet parking available for visiting clients.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto mt-20">
          <SectionTitle
            badge="FAQ"
            title={language === 'FR' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
            subtitle={language === 'FR' ? 'Tout savoir sur le marché immobilier de prestige en Tunisie.' : 'Insights into legal processes, title deeds and foreign acquisitions.'}
          />

          <div className="space-y-3 mt-8">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4"
                  >
                    <span className="font-serif text-base font-semibold text-zinc-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#C59B63]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
