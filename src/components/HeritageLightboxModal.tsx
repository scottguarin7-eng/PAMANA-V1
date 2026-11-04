import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  MapPin,
  Award,
  Calendar,
  Globe2,
  Camera,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import { HeritageItem } from '../data/pamanaData';
import { kulintangAudio } from '../utils/heritageEngine';

interface HeritageLightboxModalProps {
  item: HeritageItem | null;
  onClose: () => void;
  onAddPhotoToItem: (itemId: string, photoUrl: string, caption: string, setAsCover: boolean) => void;
}

export const HeritageLightboxModal: React.FC<HeritageLightboxModalProps> = ({
  item,
  onClose,
  onAddPhotoToItem,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [showPhotoUploader, setShowPhotoUploader] = useState<boolean>(false);
  const [customCaption, setCustomCaption] = useState<string>('');
  const [customUrl, setCustomUrl] = useState<string>('');
  const [setAsMainCover, setSetAsMainCover] = useState<boolean>(true);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setActiveSlide(0);
    setShowPhotoUploader(false);
    setUploadSuccess(false);
  }, [item?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const slides =
    item.gallery && item.gallery.length > 0
      ? item.gallery
      : [{ url: item.image, caption: item.title }];

  const currentSlide = slides[activeSlide] || slides[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const caption = customCaption.trim() || `Idinagdag na larawan para sa ${item.title}`;
        onAddPhotoToItem(item.id, reader.result, caption, setAsMainCover);
        setActiveSlide(slides.length);
        setUploadSuccess(true);
        setCustomCaption('');
        kulintangAudio.playChordFlourish();
        setTimeout(() => {
          setUploadSuccess(false);
          setShowPhotoUploader(false);
        }, 1200);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    const caption = customCaption.trim() || `Idinagdag na larawan para sa ${item.title}`;
    onAddPhotoToItem(item.id, customUrl.trim(), caption, setAsMainCover);
    setActiveSlide(slides.length);
    setUploadSuccess(true);
    setCustomUrl('');
    setCustomCaption('');
    kulintangAudio.playChordFlourish();
    setTimeout(() => {
      setUploadSuccess(false);
      setShowPhotoUploader(false);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#05070E]/90 backdrop-blur-2xl overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-6xl capiz-glass rounded-3xl overflow-hidden border border-[#E5B85C]/40 shadow-[0_30px_90px_rgba(0,0,0,0.95)] my-auto max-h-[92vh] flex flex-col lg:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-[#05070E]/85 hover:bg-[#E5B85C] text-[#F7F2E7] hover:text-[#05070E] border border-[#E5B85C]/40 flex items-center justify-center transition-all cursor-pointer"
          aria-label="Isara ang Monograph"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Multi-Photo Museum Lightbox Stage */}
        <div className="lg:w-7/12 bg-[#05070E] relative flex flex-col justify-between min-h-[340px] sm:min-h-[460px] lg:min-h-[640px]">
          {/* Main Image */}
          <div className="relative flex-1 overflow-hidden flex items-center justify-center bg-[#060913]">
            <img
              src={currentSlide.url}
              alt={currentSlide.caption}
              className="w-full h-full object-cover max-h-[540px] lg:max-h-none transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070E] via-transparent to-[#05070E]/40 pointer-events-none" />

            {/* Top Left Catalog Stamp */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#05070E]/85 backdrop-blur-md border border-[#E5B85C]/40 text-[#FFD97D] text-xs font-mono-archival">
                {item.catalogNo}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#05070E]/85 backdrop-blur-md border border-[#F7F2E7]/15 text-[#F7F2E7] text-xs font-mono-archival">
                {item.categoryLabel}
              </span>
            </div>

            {/* Prev / Next Controls if multiple photos */}
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#05070E]/80 hover:bg-[#E5B85C] text-[#F7F2E7] hover:text-[#05070E] border border-[#E5B85C]/30 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Nakaraang Larawan"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#05070E]/80 hover:bg-[#E5B85C] text-[#F7F2E7] hover:text-[#05070E] border border-[#E5B85C]/30 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Susunod na Larawan"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Caption Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-[#05070E] via-[#05070E]/90 to-transparent">
              <p className="text-xs sm:text-sm text-[#F7F2E7]/90 leading-relaxed">
                {currentSlide.caption}
              </p>
            </div>
          </div>

          {/* Thumbnail Strip + Add Your Own Photo Button */}
          <div className="p-4 bg-[#080C17] border-t border-[#F7F2E7]/10 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {slides.map((s, idx) => (
                <button
                  key={`${s.url}-${idx}`}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`relative w-14 h-11 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeSlide === idx
                      ? 'border-[#FFD97D] scale-105 shadow-[0_0_12px_rgba(229,184,92,0.5)]'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={s.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowPhotoUploader((prev) => !prev)}
              className="px-3.5 py-2 rounded-xl bg-[#E5B85C]/15 hover:bg-[#E5B85C]/30 border border-[#E5B85C]/40 text-[#FFD97D] text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>+ Magdagdag ng Larawan Dito</span>
            </button>
          </div>

          {/* Expandable Photo Upload Drawer inside Lightbox */}
          {showPhotoUploader && (
            <div className="p-4 sm:p-5 bg-[#0D1324] border-t border-[#E5B85C]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-archival uppercase tracking-wider text-[#FFD97D]">
                  Mag-upload o Magkabit ng Larawan sa {item.title}
                </span>
                {uploadSuccess && (
                  <span className="text-xs text-[#2A9D8F] flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5" /> Naidagdag na ang larawan!
                  </span>
                )}
              </div>

              <input
                type="text"
                value={customCaption}
                onChange={(e) => setCustomCaption(e.target.value)}
                placeholder="Deskripsyon o caption ng larawan (opsyonal)..."
                className="w-full px-3 py-2 rounded-xl bg-[#05070E] border border-[#F7F2E7]/15 text-xs text-[#F7F2E7]"
              />

              <div className="flex items-center gap-2 text-xs text-[#C2B9A7]">
                <input
                  type="checkbox"
                  id="setCoverCheck"
                  checked={setAsMainCover}
                  onChange={(e) => setSetAsMainCover(e.target.checked)}
                  className="accent-[#E5B85C]"
                />
                <label htmlFor="setCoverCheck">
                  Gawing pangunahing larawan (cover photo) ng kard na ito
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl bg-[#E5B85C] text-[#05070E] font-bold text-xs inline-flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer shrink-0"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Pumili ng Photo sa Device</span>
                </button>

                <form onSubmit={handleUrlSubmit} className="flex-1 flex gap-2">
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="O i-paste ang Image URL dito..."
                    className="flex-1 px-3 py-2 rounded-xl bg-[#05070E] border border-[#F7F2E7]/15 text-xs text-[#F7F2E7]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-[#2A9D8F] text-[#05070E] font-bold text-xs cursor-pointer"
                  >
                    Idagdag
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Archival Monograph Narrative & Metadata */}
        <div className="lg:w-5/12 p-6 sm:p-8 overflow-y-auto space-y-6 bg-gradient-to-b from-[#0E1424] to-[#070A14]">
          <div>
            <div className="flex items-center gap-2 text-sm text-[#E5B85C] mb-2">
              <span className="font-serif-display text-xl">{item.baybayin}</span>
              <span className="text-[#847C6D]">•</span>
              <span className="text-xs font-mono-archival uppercase tracking-widest text-[#FFD97D]">
                {item.islandGroup}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#F7F2E7] leading-tight">
              {item.title}
            </h2>
            <p className="text-sm text-[#C2B9A7] italic mt-1">{item.subtitle}</p>
          </div>

          {/* Recognition Banner */}
          <div className="p-3.5 rounded-2xl bg-[#E5B85C]/10 border border-[#E5B85C]/30 flex items-start gap-3">
            <Award className="w-5 h-5 text-[#FFD97D] shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-mono-archival uppercase tracking-widest text-[#FFD97D]">
                OPISYAL NA PAGKILALA AT DANGAL
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#F7F2E7] mt-0.5">
                {item.recognition}
              </div>
            </div>
          </div>

          {/* Full Archival Narrative */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-archival uppercase tracking-[0.2em] text-[#E5B85C]">
              KASAYSAYAN AT KAHALAGAHAN
            </h4>
            <p className="text-sm sm:text-base text-[#F7F2E7]/90 leading-relaxed">
              {item.fullStory}
            </p>
          </div>

          {/* Why the World Admires It (Global Pride Highlight) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#2A9D8F]/15 to-[#05070E] border border-[#2A9D8F]/35 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono-archival uppercase tracking-wider text-[#2A9D8F]">
              <Globe2 className="w-4 h-4" />
              <span>BAKIT IPINAGMAMALAKI SA BUONG MUNDO</span>
            </div>
            <p className="text-xs sm:text-sm text-[#F7F2E7]/90 leading-relaxed">
              {item.globalPride}
            </p>
          </div>

          {/* 4-Cell Archival Metadata Grid */}
          <div>
            <h4 className="text-xs font-mono-archival uppercase tracking-[0.2em] text-[#847C6D] mb-3">
              ARCHIVAL DOSSIER METADATA
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {item.keyFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="p-3 rounded-xl bg-[#05070E]/75 border border-[#F7F2E7]/10"
                >
                  <div className="text-[10px] font-mono-archival uppercase tracking-wider text-[#847C6D]">
                    {fact.label}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#FFD97D] mt-0.5">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coordinates & Era Footer */}
          <div className="pt-4 border-t border-[#F7F2E7]/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-archival text-[#847C6D]">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E5B85C]" />
              {item.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C86D51]" />
              {item.era}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
