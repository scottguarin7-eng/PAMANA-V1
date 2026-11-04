import React from 'react';
import { Camera, Expand, Plus, Sparkles } from 'lucide-react';
import { HeritageItem } from '../data/pamanaData';

interface PhotoPrideWallProps {
  items: HeritageItem[];
  onSelectItem: (item: HeritageItem) => void;
  onOpenAddModal: () => void;
}

export const PhotoPrideWall: React.FC<PhotoPrideWallProps> = ({
  items,
  onSelectItem,
  onOpenAddModal,
}) => {
  // Flatten all gallery photos with references back to their parent HeritageItem
  const allPhotos = items.flatMap((item) =>
    (item.gallery && item.gallery.length > 0
      ? item.gallery
      : [{ url: item.image, caption: item.title }]
    ).map((photo) => ({
      url: photo.url,
      caption: photo.caption,
      item,
    }))
  );

  return (
    <section
      id="larawan"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A9D8F]/15 border border-[#2A9D8F]/40 text-[#2A9D8F] text-xs font-mono-archival uppercase tracking-[0.2em] mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Monograph • Eksibisyon ng mga Larawan</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-bold tracking-tight text-[#F7F2E7]">
            Mukha at Kulay ng <span className="animate-gold-shimmer">Pilipinas</span>
          </h2>
          <p className="mt-3 text-[#C2B9A7] max-w-2xl text-base sm:text-lg">
            Isang biswal na pagpupugay sa bawat sulok ng kapuluan—mula sa ginintuang pamana at luntiang hagdan-hagdang palayan hanggang sa ngiti, sining, at pagkain ng lahing Pilipino.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#E5B85C] via-[#FFD97D] to-[#C86D51] text-[#05070E] font-bold text-xs sm:text-sm tracking-wide inline-flex items-center gap-2 shadow-[0_10px_30px_rgba(229,184,92,0.25)] hover:brightness-110 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Magdagdag ng Sariling Photo at Pamana</span>
        </button>
      </div>

      {/* Bento Photographic Mosaic Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {allPhotos.slice(0, 16).map((entry, idx) => {
          const isWide = idx === 0 || idx === 5 || idx === 10;
          return (
            <div
              key={`${entry.item.id}-${idx}`}
              onClick={() => onSelectItem(entry.item)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-[#F7F2E7]/10 hover:border-[#E5B85C]/60 bg-[#0A0E1C] transition-all duration-500 ${
                isWide ? 'col-span-2 h-64 sm:h-72' : 'col-span-1 h-64 sm:h-72'
              }`}
            >
              <img
                src={entry.url}
                alt={entry.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070E] via-[#05070E]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Right Expand Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#05070E]/75 backdrop-blur-md border border-[#E5B85C]/40 flex items-center justify-center text-[#FFD97D] opacity-0 group-hover:opacity-100 transition-all">
                <Expand className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4">
                <div className="text-[10px] font-mono-archival uppercase tracking-widest text-[#E5B85C] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>{entry.item.categoryLabel}</span>
                </div>
                <div className="text-sm sm:text-base font-serif-display font-bold text-[#F7F2E7] line-clamp-1 mt-0.5">
                  {entry.item.title}
                </div>
                <p className="text-xs text-[#C2B9A7] line-clamp-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {entry.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
