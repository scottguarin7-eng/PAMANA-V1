import React, { useState } from 'react';
import { Compass, MapPin, Sparkles, ArrowUpRight, Layers } from 'lucide-react';
import { HeritageItem, IslandGroup } from '../data/pamanaData';
import { kulintangAudio } from '../utils/heritageEngine';

interface InteractiveArchipelagoMapProps {
  items: HeritageItem[];
  onSelectItem: (item: HeritageItem) => void;
}

const ISLAND_FILTERS: { id: 'All' | IslandGroup; label: string; subtitle: string; baybayin: string }[] = [
  { id: 'All', label: 'Buong Kapuluan', subtitle: '7,641 Islands', baybayin: 'ᜊᜓᜂᜅ᜔ ᜃᜉᜓᜎᜓᜀᜈ᜔' },
  { id: 'Luzon', label: 'Luzon at Palawan', subtitle: 'Cordillera • Maynila • Bicol • Palawan', baybayin: 'ᜎᜓᜐᜓᜈ᜔' },
  { id: 'Visayas', label: 'Kabisayaan (Visayas)', subtitle: 'Cebu • Bohol • Aklan • Iloilo', baybayin: 'ᜊᜒᜐᜌᜐ᜔' },
  { id: 'Mindanao', label: 'Mindanao at Sulu', subtitle: 'Butuan • Davao • Lake Sebu • Lanao', baybayin: 'ᜋᜒᜈ᜔ᜇᜈᜏ᜔' },
];

export const InteractiveArchipelagoMap: React.FC<InteractiveArchipelagoMapProps> = ({
  items,
  onSelectItem,
}) => {
  const [selectedIsland, setSelectedIsland] = useState<'All' | IslandGroup>('All');
  const [activePin, setActivePin] = useState<HeritageItem>(items[0]);

  const filteredPins = items.filter((item) => {
    if (selectedIsland === 'All') return true;
    return item.islandGroup === selectedIsland || item.islandGroup === 'Buong Kapuluan';
  });

  const handlePinHoverOrClick = (item: HeritageItem, index: number) => {
    setActivePin(item);
    kulintangAudio.playGongNote(index);
  };

  return (
    <section id="mapa" className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E5B85C]/10 border border-[#E5B85C]/30 text-[#FFD97D] text-xs font-mono-archival uppercase tracking-[0.2em] mb-4">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Interactive Cartography • Mapa ng Kayamanan</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-bold tracking-tight text-[#F7F2E7]">
            Atlas ng <span className="animate-gold-shimmer">Kapuluang Pilipinas</span>
          </h2>
          <p className="mt-3 text-[#C2B9A7] max-w-2xl text-base sm:text-lg leading-relaxed">
            Galugarin ang mga pambansang kayamanan mula sa bulubundukin ng Cordillera at paraiso ng Palawan hanggang sa Kabisayaan at gintong lupain ng Mindanao.
          </p>
        </div>

        {/* Island Group Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {ISLAND_FILTERS.map((island) => {
            const isActive = selectedIsland === island.id;
            return (
              <button
                key={island.id}
                onClick={() => {
                  setSelectedIsland(island.id);
                  const firstMatch = items.find(
                    (it) => island.id === 'All' || it.islandGroup === island.id
                  );
                  if (firstMatch) setActivePin(firstMatch);
                  kulintangAudio.playGongNote(2);
                }}
                className={`px-4 py-2.5 rounded-xl text-left transition-all duration-300 border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E5B85C]/25 to-[#C86D51]/20 border-[#E5B85C] text-[#F7F2E7] shadow-[0_0_25px_rgba(229,184,92,0.2)]'
                    : 'bg-[#0D1322]/80 border-[#F7F2E7]/10 text-[#C2B9A7] hover:border-[#E5B85C]/40 hover:text-[#F7F2E7]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-wide">{island.label}</span>
                  <span className="text-[11px] text-[#E5B85C] opacity-80">{island.baybayin}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Cartographic Split Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Stylized Interactive SVG Map of the Philippines */}
        <div className="lg:col-span-7 capiz-glass rounded-3xl p-6 sm:p-8 relative overflow-hidden min-h-[520px] flex flex-col justify-between">
          {/* Top Archival Coordinates Bar */}
          <div className="flex items-center justify-between text-xs font-mono-archival text-[#847C6D] border-b border-[#F7F2E7]/10 pb-4 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2A9D8F] animate-ping" />
              <span className="text-[#C2B9A7]">ARCHIPELAGO RADAR ACTIVE</span>
            </div>
            <span>12.8797° N, 121.7740° E • {filteredPins.length} PINPOINTS</span>
          </div>

          {/* Stylized SVG Map & Interactive Pinpoints */}
          <div className="relative flex-1 my-4 flex items-center justify-center select-none">
            {/* Decorative Compass Rose & Graticule Grid */}
            <div className="absolute inset-0 capiz-lattice opacity-50 pointer-events-none" />
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-[#E5B85C]/10 animate-spin-slow pointer-events-none" />
            <div className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full border border-dashed border-[#2A9D8F]/20 animate-spin-reverse-slow pointer-events-none" />

            {/* Stylized Silhouette SVG of Philippine Islands */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-[410px] max-w-[440px] drop-shadow-[0_0_25px_rgba(229,184,92,0.14)]"
              aria-label="Stylized Map of the Philippines"
            >
              <defs>
                <linearGradient id="islandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1D2842" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#141E33" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#0D1424" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5B85C" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#2A9D8F" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#C86D51" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Batanes & Babuyan North */}
              <circle cx="46" cy="5" r="1.1" fill="url(#islandGrad)" stroke="url(#goldStroke)" strokeWidth="0.4" />
              <circle cx="47" cy="8" r="1.4" fill="url(#islandGrad)" stroke="url(#goldStroke)" strokeWidth="0.4" />

              {/* Luzon Main Mass */}
              <path
                d="M42,11 L51,11 L53,21 L50,28 L53,33 L49,38 L61,42 L59,46 L51,44 L45,41 L42,36 L41,28 L43,21 Z"
                fill="url(#islandGrad)"
                stroke="url(#goldStroke)"
                strokeWidth="0.6"
              />

              {/* Mindoro */}
              <path
                d="M39,43 L44,44 L45,50 L40,51 L38,47 Z"
                fill="url(#islandGrad)"
                stroke="url(#goldStroke)"
                strokeWidth="0.5"
              />

              {/* Palawan Long Corridor */}
              <path
                d="M34,52 L36,54 L22,70 L19,68 L31,53 Z"
                fill="url(#islandGrad)"
                stroke="url(#goldStroke)"
                strokeWidth="0.6"
              />

              {/* Visayas Cluster (Panay, Negros, Cebu, Bohol, Samar, Leyte) */}
              <path
                d="M49,52 L55,52 L54,59 L48,58 Z"
                fill="url(#islandGrad)"
                stroke="url(#goldStroke)"
                strokeWidth="0.5"
              />
              <path
                d="M55,58 L59,57 L58,66 L54,65 Z"
                fill="url(#islandGrad)"
                stroke="url(#goldStroke)"
                strokeWidth="0.5"
              />
              <path
                d="M60,57 L62,57 L61,66 L59,66 Z"
                fill="url(#islandGrad)"
                stroke="url(#goldStroke)"
                strokeWidth="0.5"
              />
              <circle
                cx="63.5"
                cy="65.5"
                r="2.2"
                fill="url(#islandGrad)"
                stroke="url(#goldStroke)"
                strokeWidth="0.5"
              />
              <path
                d="M63,48 L70,50 L69,58 L64,56 Z"
                fill="url(#islandGrad)"
                stroke="url(#goldStroke)"
                strokeWidth="0.5"
              />
              <path
                d="M64,57 L68,58 L67,65 L63,63 Z"
                fill="url(#islandGrad)"
                stroke="url(#goldStroke)"
                strokeWidth="0.5"
              />

              {/* Mindanao Main Mass & Sulu Archipelago */}
              <path
                d="M65,70 L76,69 L79,77 L75,88 L67,91 L61,85 L62,79 L54,82 L52,79 L61,74 Z"
                fill="url(#islandGrad)"
                stroke="url(#goldStroke)"
                strokeWidth="0.6"
              />
              <circle cx="48" cy="86" r="1.4" fill="url(#islandGrad)" stroke="url(#goldStroke)" strokeWidth="0.4" />
              <circle cx="44" cy="89" r="1.2" fill="url(#islandGrad)" stroke="url(#goldStroke)" strokeWidth="0.4" />

              {/* Golden Maritime Trade Connection Lines */}
              <path
                d="M45,36 Q33,48 24,64 T60,62 T74,74"
                fill="none"
                stroke="#E5B85C"
                strokeWidth="0.25"
                strokeDasharray="1.5 1.5"
                opacity="0.45"
              />
            </svg>

            {/* Interactive Glowing Pinpoints Overlay */}
            <div className="absolute inset-0 max-w-[440px] mx-auto">
              {filteredPins.map((item, idx) => {
                const isSelected = activePin?.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    style={{ left: `${item.mapPos.x}%`, top: `${item.mapPos.y}%` }}
                    onClick={() => handlePinHoverOrClick(item, idx)}
                    onMouseEnter={() => handlePinHoverOrClick(item, idx)}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none z-20"
                    aria-label={`Inspect ${item.title}`}
                  >
                    {/* Pulse ring */}
                    <span
                      className={`block absolute -inset-2 rounded-full transition-all duration-500 ${
                        isSelected
                          ? 'bg-[#E5B85C]/40 animate-ping scale-125'
                          : 'bg-[#E5B85C]/0 group-hover:bg-[#E5B85C]/30'
                      }`}
                    />
                    {/* Core Pin Dot */}
                    <span
                      className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'w-5 h-5 bg-[#FFD97D] text-[#05070E] ring-4 ring-[#E5B85C]/40 shadow-[0_0_20px_#FFD97D]'
                          : 'w-3.5 h-3.5 bg-[#E5B85C]/85 hover:bg-[#FFD97D] ring-2 ring-[#05070E]'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#05070E]" />}
                    </span>

                    {/* Floating Mini Label on Hover/Select */}
                    <span
                      className={`pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-mono-archival transition-all duration-300 ${
                        isSelected
                          ? 'opacity-100 translate-x-0 bg-[#05070E]/95 text-[#FFD97D] border border-[#E5B85C]/50 shadow-lg'
                          : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 bg-[#05070E]/90 text-[#F7F2E7] border border-[#F7F2E7]/15'
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Quick Pin Selector Strip */}
          <div className="z-10 pt-3 border-t border-[#F7F2E7]/10 flex items-center justify-between gap-4 flex-wrap">
            <span className="text-xs text-[#C2B9A7] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#E5B85C]" />
              Pumili ng tuldok sa mapa upang silipin ang larawan at kasaysayan
            </span>
            <span className="text-xs font-mono-archival text-[#E5B85C]">
              AKTIBO: {activePin.catalogNo}
            </span>
          </div>
        </div>

        {/* Right: Active Pin Photographic Spotlight Dossier */}
        <div className="lg:col-span-5 flex flex-col">
          {activePin && (
            <div className="capiz-glass rounded-3xl overflow-hidden flex-1 flex flex-col justify-between border border-[#E5B85C]/30 group">
              <div>
                {/* Featured Photo with Archival Overlay */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-[#0D1322]">
                  <img
                    src={activePin.image}
                    alt={activePin.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070E] via-[#05070E]/35 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#05070E]/85 backdrop-blur-md border border-[#E5B85C]/40 text-[#FFD97D] text-xs font-mono-archival">
                      {activePin.catalogNo} • {activePin.islandGroup.toUpperCase()}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#05070E]/80 backdrop-blur-md border border-[#F7F2E7]/15 text-[#E5B85C] text-sm">
                      {activePin.baybayin}
                    </span>
                  </div>

                  {/* Bottom Location Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-archival text-[#F7F2E7]/90">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E5B85C]" />
                      {activePin.location}
                    </span>
                    <span className="text-[#FFD97D]/80">{activePin.coordinates}</span>
                  </div>
                </div>

                {/* Dossier Content */}
                <div className="p-6 sm:p-7">
                  <div className="text-xs font-mono-archival uppercase tracking-widest text-[#E5B85C] mb-1.5">
                    {activePin.recognition}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#F7F2E7] leading-snug">
                    {activePin.title}
                  </h3>
                  <p className="text-xs text-[#C2B9A7] italic mt-0.5 mb-4">
                    {activePin.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-[#C2B9A7] leading-relaxed line-clamp-3">
                    {activePin.summary}
                  </p>

                  {/* Mini Key Facts */}
                  <div className="grid grid-cols-2 gap-2.5 mt-5">
                    {activePin.keyFacts.slice(0, 2).map((fact) => (
                      <div
                        key={fact.label}
                        className="p-3 rounded-xl bg-[#05070E]/60 border border-[#F7F2E7]/10"
                      >
                        <div className="text-[10px] font-mono-archival uppercase tracking-wider text-[#847C6D]">
                          {fact.label}
                        </div>
                        <div className="text-xs font-semibold text-[#F7F2E7] mt-0.5 truncate">
                          {fact.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-6 sm:px-7 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectItem(activePin)}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#E5B85C] via-[#FFD97D] to-[#C86D51] text-[#05070E] font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_10px_30px_rgba(229,184,92,0.25)] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Buksan ang Buong Monograph at Galeriya</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
