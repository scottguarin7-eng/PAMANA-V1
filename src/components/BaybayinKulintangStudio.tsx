import React, { useState } from 'react';
import { Feather, Volume2, Copy, Check, Sparkles, Music } from 'lucide-react';
import { BAYBAYIN_PRESETS } from '../data/pamanaData';
import { transliterateToBaybayin, kulintangAudio } from '../utils/heritageEngine';

interface BaybayinKulintangStudioProps {
  soundEnabled: boolean;
  onEnableSound: () => void;
}

const GONG_LABELS = [
  { note: 'Pamantikan', pitch: 'C4', baybayin: 'ᜉ' },
  { note: 'Pananggisa', pitch: 'D4', baybayin: 'ᜋ' },
  { note: 'Pamaruzan', pitch: 'E4', baybayin: 'ᜈ' },
  { note: 'Pamakulod', pitch: 'G4', baybayin: 'ᜎ' },
  { note: 'Panggika', pitch: 'A4', baybayin: 'ᜑ' },
  { note: 'Pamabaw', pitch: 'C5', baybayin: 'ᜊ' },
  { note: 'Panulon', pitch: 'D5', baybayin: 'ᜌ' },
  { note: 'Pamatay', pitch: 'E5', baybayin: 'ᜈ᜔' },
];

export const BaybayinKulintangStudio: React.FC<BaybayinKulintangStudioProps> = ({
  soundEnabled,
  onEnableSound,
}) => {
  const [inputText, setInputText] = useState<string>('Pamana ng Lahi');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeGong, setActiveGong] = useState<number | null>(null);

  const baybayinOutput = transliterateToBaybayin(inputText);

  const handleCopy = () => {
    navigator.clipboard.writeText(baybayinOutput);
    setCopied(true);
    kulintangAudio.playGongNote(5);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGongHit = (idx: number) => {
    if (!soundEnabled) {
      onEnableSound();
    }
    setActiveGong(idx);
    kulintangAudio.playGongNote(idx);
    setTimeout(() => {
      setActiveGong((prev) => (prev === idx ? null : prev));
    }, 550);
  };

  return (
    <section
      id="baybayin"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5B85C]/10 border border-[#E5B85C]/30 text-[#FFD97D] text-xs font-mono-archival uppercase tracking-[0.2em] mb-4">
          <Feather className="w-3.5 h-3.5" />
          <span>Interactive Living Heritage • Panulat at Musika</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-display font-bold tracking-tight text-[#F7F2E7]">
          Sulat <span className="animate-gold-shimmer">Baybayin</span> at Ritmo ng{' '}
          <span className="text-[#E5B85C]">Kulintang</span>
        </h2>
        <p className="mt-3 text-[#C2B9A7] text-base sm:text-lg leading-relaxed">
          Isalin ang iyong pangalan o salita sa sinaunang panulat na Baybayin, at patugtugin ang walong tansong agung ng Kulintang mula sa Mindanao.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Interactive Baybayin Script Translator Studio */}
        <div className="lg:col-span-7 capiz-glass rounded-3xl p-6 sm:p-9 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-8 -top-8 text-[140px] text-[#E5B85C]/5 select-none pointer-events-none font-serif-display">
            ᜉᜋᜈ
          </div>

          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono-archival uppercase tracking-widest text-[#E5B85C]">
                  SINAUNANG ABUGIDA • PRE-COLONIAL SCRIPT
                </span>
                <h3 className="text-2xl font-serif-display font-bold text-[#F7F2E7] mt-1">
                  Tagapagsalin ng Baybayin
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#E5B85C]/15 hover:bg-[#E5B85C]/25 border border-[#E5B85C]/40 text-[#FFD97D] text-xs font-mono-archival transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Nakopya na!' : 'Kopyahin ang Baybayin'}</span>
              </button>
            </div>

            {/* Input Field */}
            <label className="block text-xs font-mono-archival uppercase tracking-wider text-[#C2B9A7] mb-2">
              Mag-type ng Pangalan o Salitang Pilipino:
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Halimbawa: Mabuhay Pilipinas..."
              className="w-full px-4 py-3.5 rounded-2xl bg-[#05070E]/90 border border-[#E5B85C]/35 text-[#F7F2E7] placeholder-[#847C6D] text-base focus:outline-none focus:border-[#FFD97D] focus:ring-2 focus:ring-[#E5B85C]/25 transition-all"
            />

            {/* Calligraphic Display Stage */}
            <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#05070E] via-[#0B101E] to-[#141A2C] border border-[#E5B85C]/30 text-center relative overflow-hidden">
              <div className="text-[11px] font-mono-archival uppercase tracking-[0.25em] text-[#847C6D] mb-3">
                INSKRIPSIYONG BAYBAYIN (UNICODE U+1700)
              </div>
              <div className="text-4xl sm:text-6xl text-[#FFD97D] tracking-widest py-3 drop-shadow-[0_0_25px_rgba(229,184,92,0.35)] break-words">
                {baybayinOutput}
              </div>
              <div className="mt-3 text-sm font-serif-display italic text-[#C2B9A7]">
                “{inputText || 'Pamana'}”
              </div>
            </div>
          </div>

          {/* Preset Patriotic Phrases */}
          <div className="mt-6 pt-5 border-t border-[#F7F2E7]/10">
            <div className="text-xs font-mono-archival uppercase tracking-wider text-[#847C6D] mb-3">
              Pumili ng Makabayang Salita:
            </div>
            <div className="flex flex-wrap gap-2">
              {BAYBAYIN_PRESETS.map((preset, idx) => (
                <button
                  key={preset.latin}
                  type="button"
                  onClick={() => {
                    setInputText(preset.latin);
                    kulintangAudio.playGongNote(idx);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border ${
                    inputText.toLowerCase() === preset.latin.toLowerCase()
                      ? 'bg-[#E5B85C] text-[#05070E] font-bold border-[#FFD97D]'
                      : 'bg-[#05070E]/70 text-[#C2B9A7] border-[#F7F2E7]/10 hover:border-[#E5B85C]/40 hover:text-[#F7F2E7]'
                  }`}
                >
                  {preset.latin} • <span className="opacity-85">{preset.baybayin}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interactive 8-Gong Bronze Kulintang Instrument */}
        <div className="lg:col-span-5 capiz-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-mono-archival uppercase tracking-widest text-[#2A9D8F] flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" />
                TUNOG NG MINDANAO • PENTATONIC BRONZE
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-archival ${
                  soundEnabled
                    ? 'bg-[#2A9D8F]/20 text-[#2A9D8F] border border-[#2A9D8F]/40'
                    : 'bg-[#E5B85C]/15 text-[#FFD97D] border border-[#E5B85C]/30'
                }`}
              >
                {soundEnabled ? 'AUDIO LIVE' : 'CLICK GONG TO PLAY'}
              </span>
            </div>

            <h3 className="text-2xl font-serif-display font-bold text-[#F7F2E7]">
              Patugtugin ang Kulintang
            </h3>
            <p className="text-sm text-[#C2B9A7] mt-1 leading-relaxed">
              Pindutin ang alinmang gintong agung sa ibaba upang marinig ang pentatonic resonance ng tradisyunal na Kulintang ng Maranao at Maguindanao.
            </p>

            {/* 8 Bronze Gongs Grid (2x4 Layout on wooden Okir rack) */}
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-b from-[#1A120B] via-[#0F0B08] to-[#05070E] border border-[#C86D51]/40 shadow-inner">
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {GONG_LABELS.map((gong, idx) => {
                  const isStruck = activeGong === idx;
                  return (
                    <button
                      key={gong.note}
                      type="button"
                      onClick={() => handleGongHit(idx)}
                      className="group flex flex-col items-center focus:outline-none cursor-pointer"
                    >
                      <div
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isStruck
                            ? 'scale-92 shadow-[0_0_35px_#FFD97D]'
                            : 'hover:scale-105 shadow-[0_8px_20px_rgba(0,0,0,0.75)]'
                        }`}
                        style={{
                          background:
                            'radial-gradient(circle at 35% 35%, #FFE599 0%, #E5B85C 42%, #9E6B24 78%, #4A2F0B 100%)',
                        }}
                      >
                        {/* Outer Rim Ring */}
                        <span className="absolute inset-1.5 rounded-full border border-[#05070E]/40" />
                        {/* Central Raised Boss (Busel) */}
                        <span
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#05070E] shadow-md transition-transform ${
                            isStruck ? 'scale-125 bg-white' : 'bg-[#FFD97D]'
                          }`}
                        >
                          {gong.baybayin}
                        </span>
                      </div>
                      <span className="mt-2 text-[11px] font-mono-archival text-[#F7F2E7]/90">
                        {gong.pitch}
                      </span>
                      <span className="text-[10px] text-[#847C6D] truncate max-w-full">
                        {gong.note}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Play Royal Flourish Button */}
          <div className="mt-6 pt-4 border-t border-[#F7F2E7]/10 flex items-center justify-between gap-3">
            <div className="text-xs text-[#C2B9A7]">
              Subukan ang maringal na tugtog ng Kapuluan:
            </div>
            <button
              type="button"
              onClick={() => {
                if (!soundEnabled) onEnableSound();
                setTimeout(() => kulintangAudio.playChordFlourish(), 40);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#E5B85C]/20 hover:bg-[#E5B85C]/30 border border-[#E5B85C]/50 text-[#FFD97D] text-xs font-semibold inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Tugtugin ang Kulintang Flourish</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
