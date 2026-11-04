import React, { useState } from 'react';
import { History, MapPin, Sparkles } from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/pamanaData';
import { kulintangAudio } from '../utils/heritageEngine';

export const ChronicleTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const current = TIMELINE_MILESTONES[activeIndex];

  return (
    <section
      id="kasaysayan"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C86D51]/15 border border-[#C86D51]/40 text-[#FFD97D] text-xs font-mono-archival uppercase tracking-[0.2em] mb-4">
            <History className="w-3.5 h-3.5" />
            <span>Chronological Monograph • Daloy ng Panahon</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-bold tracking-tight text-[#F7F2E7]">
            67,000 Taon ng <span className="animate-gold-shimmer">Kabihasnang Pilipino</span>
          </h2>
        </div>
        <p className="text-[#C2B9A7] max-w-md text-sm sm:text-base">
          Pumili ng panahon sa ibaba upang lakbayin ang mga dakilang yugto na humubog sa pagkakakilanlan at dangal ng Pilipinas.
        </p>
      </div>

      {/* Horizontal Interactive Epoch Stepper */}
      <div className="relative mb-10">
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E5B85C]/40 to-transparent -translate-y-1/2" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 relative z-10">
          {TIMELINE_MILESTONES.map((milestone, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={milestone.year}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  kulintangAudio.playGongNote(idx);
                }}
                className={`p-3.5 rounded-2xl text-left transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#E5B85C]/30 via-[#151D32] to-[#C86D51]/25 border-[#FFD97D] shadow-[0_0_30px_rgba(229,184,92,0.25)] -translate-y-1'
                    : 'bg-[#0A0E1B]/90 border-[#F7F2E7]/10 hover:border-[#E5B85C]/40'
                }`}
              >
                <div
                  className={`text-xs font-mono-archival font-bold ${
                    isSelected ? 'text-[#FFD97D]' : 'text-[#E5B85C]'
                  }`}
                >
                  {milestone.year}
                </div>
                <div className="text-[11px] text-[#C2B9A7] mt-1 line-clamp-1">
                  {milestone.eraTag}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Epoch Split Showcase */}
      <div className="capiz-glass rounded-3xl overflow-hidden border border-[#E5B85C]/30 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Image Stage */}
        <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[380px] overflow-hidden bg-[#05070E]">
          <img
            key={current.image}
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover animate-reveal-up"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070E] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0B101D]" />
          <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#05070E]/85 backdrop-blur-md border border-[#E5B85C]/40 text-xs font-mono-archival text-[#FFD97D]">
            YUGTO 0{activeIndex + 1} / 0{TIMELINE_MILESTONES.length} • {current.year}
          </div>
        </div>

        {/* Right Narrative Stage */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono-archival uppercase tracking-[0.2em] text-[#E5B85C]">
                {current.eraTag}
              </span>
              <span className="text-xl text-[#FFD97D]/85">{current.baybayin}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-serif-display font-bold text-[#F7F2E7] leading-tight">
              {current.title}
            </h3>

            <p className="mt-4 text-base sm:text-lg text-[#C2B9A7] leading-relaxed">
              {current.description}
            </p>
          </div>

          <div className="mt-8 pt-5 border-t border-[#F7F2E7]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono-archival text-[#FFD97D]">
              <MapPin className="w-4 h-4 text-[#E5B85C]" />
              <span>{current.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex(
                    (prev) => (prev - 1 + TIMELINE_MILESTONES.length) % TIMELINE_MILESTONES.length
                  )
                }
                className="px-3.5 py-1.5 rounded-xl bg-[#05070E]/70 hover:bg-[#E5B85C]/20 border border-[#F7F2E7]/15 text-xs text-[#F7F2E7] cursor-pointer"
              >
                ← Nakaraan
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % TIMELINE_MILESTONES.length)
                }
                className="px-3.5 py-1.5 rounded-xl bg-[#E5B85C]/20 hover:bg-[#E5B85C]/35 border border-[#E5B85C]/40 text-xs text-[#FFD97D] font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Susunod na Yugto</span>
                <Sparkles className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
