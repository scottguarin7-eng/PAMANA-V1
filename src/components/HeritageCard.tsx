import React, { useState } from 'react';
import { MapPin, ArrowUpRight, Images, Award } from 'lucide-react';
import { HeritageItem } from '../data/pamanaData';

interface HeritageCardProps {
  item: HeritageItem;
  index: number;
  onSelect: (item: HeritageItem) => void;
  featured?: boolean;
}

export const HeritageCard: React.FC<HeritageCardProps> = ({
  item,
  index,
  onSelect,
  featured = false,
}) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = x / rect.width;
    const pctY = y / rect.height;

    const rotateY = (pctX - 0.5) * 8;
    const rotateX = (0.5 - pctY) * 8;

    setTilt({
      rotateX,
      rotateY,
      glareX: pctX * 100,
      glareY: pctY * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  return (
    <article
      onClick={() => onSelect(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-6px)`
          : 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        animationDelay: `${(index % 6) * 70}ms`,
      }}
      className={`capiz-card group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between select-none ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      {/* Dynamic Gold Specular Glare Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 217, 125, 0.14) 0%, transparent 60%)`,
        }}
      />

      <div>
        {/* Image Frame */}
        <div
          className={`relative overflow-hidden bg-[#090D1A] ${
            featured ? 'h-72 sm:h-80' : 'h-60 sm:h-64'
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-[#090D18]/25 to-transparent" />

          {/* Top Left Category & Catalog Badge */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-[#05070E]/85 backdrop-blur-md border border-[#E5B85C]/40 text-[#FFD97D] text-[11px] font-mono-archival">
                {item.catalogNo}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#05070E]/80 backdrop-blur-md border border-[#F7F2E7]/15 text-[#F7F2E7] text-[11px] font-medium">
                {item.categoryLabel}
              </span>
            </div>

            {/* Multi-photo counter badge */}
            <span className="px-2.5 py-1 rounded-full bg-[#05070E]/80 backdrop-blur-md border border-[#F7F2E7]/15 text-[#FFD97D] text-[11px] font-mono-archival inline-flex items-center gap-1">
              <Images className="w-3 h-3" />
              <span>{item.gallery?.length || 1}</span>
            </span>
          </div>

          {/* Bottom Baybayin & Island Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between z-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono-archival text-[#F7F2E7]/90 drop-shadow">
              <MapPin className="w-3.5 h-3.5 text-[#E5B85C] shrink-0" />
              <span className="truncate max-w-[210px]">{item.location}</span>
            </span>
            <span className="text-lg text-[#FFD97D]/90 font-serif-display drop-shadow">
              {item.baybayin}
            </span>
          </div>
        </div>

        {/* Text Body */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-1.5 text-[11px] font-mono-archival uppercase tracking-wider text-[#E5B85C] mb-1.5 truncate">
            <Award className="w-3.5 h-3.5 shrink-0 text-[#FFD97D]" />
            <span className="truncate">{item.recognition}</span>
          </div>

          <h3
            className={`font-serif-display font-bold text-[#F7F2E7] group-hover:text-[#FFD97D] transition-colors leading-snug ${
              featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            }`}
          >
            {item.title}
          </h3>

          <p className="mt-2 text-sm text-[#C2B9A7] leading-relaxed line-clamp-2">
            {item.summary}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#F7F2E7]/10 flex items-center justify-between text-xs">
        <span className="font-mono-archival text-[#847C6D] uppercase tracking-wider">
          {item.islandGroup} • {item.era.split('(')[0].trim()}
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-[#E5B85C] group-hover:text-[#FFD97D] group-hover:translate-x-0.5 transition-all">
          <span>Suriin</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};
