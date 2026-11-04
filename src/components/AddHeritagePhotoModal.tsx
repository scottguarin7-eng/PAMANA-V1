import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Sparkles, MapPin } from 'lucide-react';
import {
  CATEGORIES,
  HeritageCategory,
  HeritageItem,
  IslandGroup,
} from '../data/pamanaData';
import { transliterateToBaybayin, kulintangAudio } from '../utils/heritageEngine';

interface AddHeritagePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateItem: (newItem: HeritageItem) => void;
}

export const AddHeritagePhotoModal: React.FC<AddHeritagePhotoModalProps> = ({
  isOpen,
  onClose,
  onCreateItem,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<Exclude<HeritageCategory, 'all'>>('kalikasan');
  const [islandGroup, setIslandGroup] = useState<IslandGroup>('Luzon');
  const [location, setLocation] = useState('');
  const [recognition, setRecognition] = useState('Ipinagmamalaking Pamana ng Pilipinas');
  const [summary, setSummary] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string>(
    'https://images.pexels.com/photos/3698534/pexels-photo-3698534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  );
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const catMeta = CATEGORIES.find((c) => c.id === category);
    const finalImage = photoUrlInput.trim() || photoPreview;
    const baybayin = transliterateToBaybayin(title);

    const newItem: HeritageItem = {
      id: `user-pamana-${Date.now()}`,
      catalogNo: `CAT-USR-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Idinagdag sa Koleksyon ng Pamana ng Lahi',
      baybayin,
      category,
      categoryLabel: catMeta?.label || 'Pamana ng Lahi',
      islandGroup,
      location: location.trim() || 'Kapuluan ng Pilipinas',
      coordinates: '12.8797° N, 121.7740° E',
      era: 'Kontemporaryo at Buhay na Pamana',
      recognition: recognition.trim() || 'Dangal ng Lahing Pilipino',
      image: finalImage,
      gallery: [
        {
          url: finalImage,
          caption: `${title.trim()} — ${location.trim() || 'Pilipinas'}`,
        },
      ],
      summary:
        summary.trim() ||
        'Isang natatanging yaman, tanawin, o sining na ipinagmamalaki ng sambayanang Pilipino.',
      fullStory:
        summary.trim() ||
        'Isang natatanging yaman, tanawin, o sining na ipinagmamalaki ng sambayanang Pilipino at idinagdag sa digital monograph ng PAMANA.',
      globalPride:
        'Bahagi ng mayamang pagkakakilanlan, husay, at kagandahan ng Pilipinas na hinahangaan sa buong daigdig.',
      keyFacts: [
        { label: 'Kategorya', value: catMeta?.label || 'Pamana' },
        { label: 'Rehiyon / Pulo', value: islandGroup },
        { label: 'Sulat Baybayin', value: baybayin },
        { label: 'Estado', value: 'Curated Community Archive' },
      ],
      accentColor: catMeta?.accent || '#E5B85C',
      mapPos: {
        x: islandGroup === 'Luzon' ? 46 : islandGroup === 'Visayas' ? 59 : 70,
        y: islandGroup === 'Luzon' ? 30 : islandGroup === 'Visayas' ? 60 : 80,
      },
      isUserAdded: true,
    };

    kulintangAudio.playChordFlourish();
    onCreateItem(newItem);
    onClose();
    setTitle('');
    setSubtitle('');
    setLocation('');
    setSummary('');
    setPhotoUrlInput('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070E]/90 backdrop-blur-2xl overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl capiz-glass rounded-3xl p-6 sm:p-8 border border-[#E5B85C]/40 shadow-2xl my-auto">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F7F2E7]/10">
          <div>
            <span className="text-xs font-mono-archival uppercase tracking-widest text-[#E5B85C]">
              CURATE YOUR OWN PHOTO & PRIDE • MAG-AMBAG SA GALERIYA
            </span>
            <h3 className="text-2xl font-serif-display font-bold text-[#F7F2E7] mt-0.5">
              Magdagdag ng Larawan at Ipinagmamalaki Natin
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#05070E]/80 hover:bg-[#E5B85C] text-[#F7F2E7] hover:text-[#05070E] border border-[#E5B85C]/30 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Photo Preview & Upload Trigger */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-5 relative h-40 rounded-2xl overflow-hidden border border-[#E5B85C]/30 bg-[#05070E]">
              <img
                src={photoUrlInput.trim() || photoPreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#05070E]/80 text-[10px] font-mono-archival text-[#FFD97D]">
                PREVIEW NG LARAWAN
              </div>
            </div>

            <div className="sm:col-span-7 space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-xl bg-[#E5B85C]/20 hover:bg-[#E5B85C]/30 border border-[#E5B85C]/50 text-[#FFD97D] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Mag-Upload ng Sariling Photo mula sa Device</span>
              </button>

              <div className="relative">
                <ImageIcon className="w-4 h-4 text-[#847C6D] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  placeholder="O mag-paste ng Image URL dito..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#05070E] border border-[#F7F2E7]/15 text-xs text-[#F7F2E7]"
                />
              </div>
            </div>
          </div>

          {/* Title & Auto Baybayin Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-archival uppercase text-[#C2B9A7] mb-1.5">
                Pangalan ng Pamana / Ipinagmamalaki *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Hal. Bulkang Taal, Jeepney, Lea Salonga..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070E] border border-[#F7F2E7]/20 text-sm text-[#F7F2E7]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono-archival uppercase text-[#C2B9A7] mb-1.5">
                Awtomatikong Baybayin Script
              </label>
              <div className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070E]/60 border border-[#E5B85C]/30 text-lg text-[#FFD97D] truncate">
                {transliterateToBaybayin(title || 'Pamana')}
              </div>
            </div>
          </div>

          {/* Category & Island Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono-archival uppercase text-[#C2B9A7] mb-1.5">
                Kategorya
              </label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as Exclude<HeritageCategory, 'all'>)
                }
                className="w-full px-3 py-2.5 rounded-xl bg-[#05070E] border border-[#F7F2E7]/20 text-xs text-[#F7F2E7]"
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono-archival uppercase text-[#C2B9A7] mb-1.5">
                Pulo / Kapuluan
              </label>
              <select
                value={islandGroup}
                onChange={(e) => setIslandGroup(e.target.value as IslandGroup)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#05070E] border border-[#F7F2E7]/20 text-xs text-[#F7F2E7]"
              >
                <option value="Luzon">Luzon</option>
                <option value="Visayas">Visayas</option>
                <option value="Mindanao">Mindanao</option>
                <option value="Buong Kapuluan">Buong Kapuluan</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono-archival uppercase text-[#C2B9A7] mb-1.5">
                Lalawigan o Lungsod
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-[#E5B85C] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Hal. Cebu, Batanes..."
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-[#05070E] border border-[#F7F2E7]/20 text-xs text-[#F7F2E7]"
                />
              </div>
            </div>
          </div>

          {/* Subtitle & Recognition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-archival uppercase text-[#C2B9A7] mb-1.5">
                Maikling Subtitle
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Hal. Iconic Cultural Symbol of the Philippines"
                className="w-full px-3.5 py-2 rounded-xl bg-[#05070E] border border-[#F7F2E7]/20 text-xs text-[#F7F2E7]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono-archival uppercase text-[#C2B9A7] mb-1.5">
                Pagkilala / Karangalan
              </label>
              <input
                type="text"
                value={recognition}
                onChange={(e) => setRecognition(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#05070E] border border-[#F7F2E7]/20 text-xs text-[#F7F2E7]"
              />
            </div>
          </div>

          {/* Story / Description */}
          <div>
            <label className="block text-xs font-mono-archival uppercase text-[#C2B9A7] mb-1.5">
              Bakit Natin Ito Ipinagmamalaki? (Kuwento at Kahalagahan)
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Isulat ang maikling kuwento o dahilan kung bakit kahanga-hanga ang pamanang ito..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070E] border border-[#F7F2E7]/20 text-sm text-[#F7F2E7]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#F7F2E7]/15 text-xs text-[#C2B9A7] hover:text-[#F7F2E7] cursor-pointer"
            >
              Kanselahin
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E5B85C] via-[#FFD97D] to-[#C86D51] text-[#05070E] font-bold text-xs tracking-wide inline-flex items-center gap-2 shadow-lg hover:brightness-110 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Idagdag sa PAMANA Gallery</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
