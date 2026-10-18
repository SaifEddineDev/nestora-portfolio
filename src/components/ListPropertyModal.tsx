import React, { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2, Home, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ListPropertyModal: React.FC<ListPropertyModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState('');
  const [draggingPhotos, setDraggingPhotos] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Villa',
    status: 'Sale',
    city: 'La Marsa',
    price: '',
    bedrooms: '3',
    bathrooms: '2',
    surface: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  useEffect(() => {
    const urls = photos.map((photo) => URL.createObjectURL(photo));
    setPhotoPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [photos]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep success state visible for user confirmation
    }, 400);
  };

  const addPhotos = (fileList: FileList | File[]) => {
    const accepted: File[] = [];
    const errors: string[] = [];
    Array.from(fileList).forEach((file) => {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        errors.push(`${file.name}: ${language === 'FR' ? 'format non pris en charge' : 'unsupported format'}`);
      } else if (file.size > 25 * 1024 * 1024) {
        errors.push(`${file.name}: ${language === 'FR' ? 'dÃ©passe 25 Mo' : 'larger than 25 MB'}`);
      } else accepted.push(file);
    });
    if (accepted.length) setPhotos((current) => [...current, ...accepted]);
    setPhotoError(errors.join(' Â· '));
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setPhotos([]);
    setPhotoError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#C59B63]/10 text-[#A87B40] flex items-center justify-center">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-zinc-900">
                {language === 'FR' ? 'DÃ©poser votre PropriÃ©tÃ©' : 'List Your Property with NESTORA'}
              </h3>
              <p className="text-xs text-zinc-500">
                {language === 'FR'
                  ? 'Nos experts vous accompagnent pour valoriser et commercialiser votre bien.'
                  : 'Let our luxury real estate advisors assist you in positioning and marketing your asset.'}
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-zinc-200/60 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-12 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-in zoom-in-50 duration-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-zinc-900 mb-2">
                {language === 'FR' ? 'Demande ReÃ§ue avec SuccÃ¨s' : 'Listing Proposal Submitted'}
              </h4>
              <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                {language === 'FR'
                  ? 'Un de nos directeurs de clientÃ¨le Ã©tudiera votre dossier et prendra contact avec vous dans un dÃ©lai de 24 heures.'
                  : 'Thank you for trusting NESTORA. One of our senior advisors will review your property information and contact you within 24 hours.'}
              </p>
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 rounded-xl bg-[#121316] text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                {language === 'FR' ? 'Fermer' : 'Done'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    {language === 'FR' ? 'Type de Transaction' : 'Transaction Type'}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full text-sm rounded-xl border border-zinc-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
                  >
                    <option value="Sale">{language === 'FR' ? 'Vente (Sale)' : 'For Sale'}</option>
                    <option value="Rent">{language === 'FR' ? 'Location (Rent)' : 'For Rent'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    {language === 'FR' ? 'Type de Bien' : 'Property Type'}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full text-sm rounded-xl border border-zinc-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
                  >
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Studio">Studio</option>
                    <option value="Office">Office</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  {language === 'FR' ? 'Titre indicatif ou description sommaire' : 'Property Title / Headline'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Villa with Sea View"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-sm rounded-xl border border-zinc-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    {language === 'FR' ? 'Ville' : 'City / Location'}
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-sm rounded-xl border border-zinc-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
                  >
                    <option value="Gammarth">Gammarth</option>
                    <option value="La Marsa">La Marsa</option>
                    <option value="Carthage">Carthage</option>
                    <option value="Sidi Bou Said">Sidi Bou Said</option>
                    <option value="Tunis">Tunis</option>
                    <option value="Hammamet">Hammamet</option>
                    <option value="Sousse">Sousse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    {language === 'FR' ? 'Prix estimÃ© (TND)' : 'Expected Price (TND)'}
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 750000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full text-sm rounded-xl border border-zinc-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    {language === 'FR' ? 'Surface (mÂ²)' : 'Surface (mÂ²)'}
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 280"
                    value={formData.surface}
                    onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                    className="w-full text-sm rounded-xl border border-zinc-200 px-3.5 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
                  />
                </div>
              </div>

              {/* Photo upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                multiple
                className="sr-only"
                onChange={(e) => {
                  if (e.target.files) addPhotos(e.target.files);
                  e.target.value = '';
                }}
              />
              {photos.length === 0 && <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); } }}
                onDragOver={(e) => { e.preventDefault(); setDraggingPhotos(true); }}
                onDragLeave={() => setDraggingPhotos(false)}
                onDrop={(e) => { e.preventDefault(); setDraggingPhotos(false); addPhotos(e.dataTransfer.files); }}
                className={`border border-dashed rounded-xl p-5 text-center bg-zinc-50/50 hover:bg-zinc-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40 ${draggingPhotos ? 'border-[#C59B63] bg-[#C59B63]/5' : 'border-zinc-300'}`}
              >
                <Upload className="w-5 h-5 text-zinc-400 mx-auto mb-1.5" />
                <span className="text-xs font-medium text-zinc-600">
                    {language === 'FR' ? 'Cliquez ou déposez vos photos ici' : 'Click or drop your photos here'}
                </span>
                <p className="text-[11px] text-zinc-400 mt-0.5">JPEG / PNG · 25 MB {language === 'FR' ? 'maximum par image' : 'max per image'}</p>
              </div>}
              {photoError && <p role="alert" className="text-xs text-red-600">{photoError}</p>}
              {photos.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {photos.map((photo, index) => (
                    <div key={`${photo.name}-${photo.lastModified}-${index}`} className="relative group aspect-square">
                      <img src={photoPreviews[index]} alt={photo.name} className="w-full h-full rounded-lg object-cover border border-zinc-200" />
                      <button
                        type="button"
                        aria-label={`${language === 'FR' ? 'Supprimer' : 'Remove'} ${photo.name}`}
                        onClick={() => setPhotos((current) => current.filter((_, i) => i !== index))}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                      ><X className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-lg border border-dashed border-zinc-300 text-zinc-500 flex flex-col items-center justify-center gap-1 hover:bg-zinc-50">
                    <ImageIcon className="w-5 h-5" /><span className="text-[10px]">{language === 'FR' ? 'Ajouter' : 'Add'}</span>
                  </button>
                </div>
              )}
              {/* Contact Information */}
              <div className="pt-2 border-t border-zinc-100">
                <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400 block mb-2">
                  {language === 'FR' ? 'Vos CoordonnÃ©es' : 'Owner Contact Details'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder={language === 'FR' ? 'Nom complet' : 'Full Name'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-sm rounded-xl border border-zinc-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
                  />
                  <input
                    type="tel"
                    required
                    placeholder={language === 'FR' ? 'NumÃ©ro de tÃ©lÃ©phone' : 'Phone Number'}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-sm rounded-xl border border-zinc-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-sm rounded-xl border border-zinc-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B63]/40"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  {language === 'FR' ? 'Annuler' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#121316] text-white text-xs font-semibold hover:bg-zinc-800 transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C59B63]" />
                  <span>{language === 'FR' ? 'Soumettre le bien' : 'Submit Property Proposal'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
