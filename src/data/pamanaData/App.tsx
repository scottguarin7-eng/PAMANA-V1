import { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Search,
  Volume2,
  VolumeX,
  Camera,
  Compass,
  Award,
  ArrowRight,
  Globe2,
  ShieldCheck,
  BookOpen,
  RotateCcw,
} from 'lucide-react';
import {
  CATEGORIES,
  HERITAGE_ITEMS,
  HeritageCategory,
  HeritageItem,
  MUSEUM_IMAGES,
  PRIDE_TICKER_ITEMS,
} from './data/pamanaData';
import { AmbientGoldCanvas } from './components/AmbientGoldCanvas';
import { HeritageCard } from './components/HeritageCard';
import { InteractiveArchipelagoMap } from './components/InteractiveArchipelagoMap';
import { ChronicleTimeline } from './components/ChronicleTimeline';
import { BaybayinKulintangStudio } from './components/BaybayinKulintangStudio';
import { PhotoPrideWall } from './components/PhotoPrideWall';
import { HeritageLightboxModal } from './components/HeritageLightboxModal';
import { AddHeritagePhotoModal } from './components/AddHeritagePhotoModal';
import { kulintangAudio } from './utils/heritageEngine';

const STORAGE_KEY = 'pamana_heritage_collection_v1';

const HERO_SPOTLIGHTS = [
  {
    id: 'banaue-rice-terraces',
    tag: 'UNESCO LIVING CULTURAL LANDSCAPE • IFUGAO',
    title: 'Hagdan-Hagdang Palayan ng Cordillera',
    baybayin: 'ᜉᜌ᜔ᜌᜓ ᜈᜅ᜔ ᜁᜉᜓᜄᜏ᜔',
    caption: 'Inukit sa bundok mahigit 2,000 taon na ang nakalilipas gamit ang kamay, bato, at sagradong tubig ng Muyong.',
    image:
      'https://images.pexels.com/photos/37445545/pexels-photo-37445545.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    id: 'surigao-royal-gold',
    tag: '10TH CENTURY PRE-COLONIAL ROYAL REGALIA • BUTUAN & SURIGAO',
    title: 'Gintong Pamana ng Sinaunang Pilipino',
    baybayin: 'ᜄᜒᜈ᜔ᜆᜓᜅ᜔ ᜉᜋᜈ',
    caption: 'Masinsing 24-karat na gintong habi, Kinnari, at alahas na nagpapatunay ng maunlad na sibilisasyon bago pa ang kolonyalismo.',
    image: MUSEUM_IMAGES.surigaoGold,
  },
  {
    id: 'palawan-el-nido-coron',
    tag: 'VOTED #1 BEST ISLAND IN THE WORLD • PALAWAN',
    title: 'Paraiso ng El Nido, Coron at Underground River',
    baybayin: 'ᜉᜎᜏᜈ᜔',
    caption: '250-milyong taong Permian limestone cathedrals at malinaw na turquoise lagoons sa huling prontera ng kalikasan.',
    image:
      'https://images.pexels.com/photos/13874296/pexels-photo-13874296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    id: 'manunggul-jar',
    tag: 'NATIONAL CULTURAL TREASURE • 890–710 BCE PALAWAN',
    title: 'Tapayang Manunggul ng Yungib ng Tabon',
    baybayin: 'ᜆᜉᜌᜅ᜔ ᜋᜈᜓᜅ᜔ᜄᜓᜎ᜔',
    caption: 'Obra maestra ng sinaunang seramika sa Timog-Silangang Asya na naglalarawan sa paglalakbay ng kaluluwa.',
    image: MUSEUM_IMAGES.manunggulJar,
  },
  {
    id: 'bulkang-mayon',
    tag: 'UNESCO BIOSPHERE RESERVE • ALBAY, BICOL',
    title: 'Bulkang Mayon: Daragang Magayon',
    baybayin: 'ᜊᜓᜎ᜔ᜃᜅ᜔ ᜋᜌᜓᜈ᜔',
    caption: 'Hinahangaan sa buong daigdig bilang ang bulkan na may pinakaperpektong simetriya ng kono.',
    image:
      'https://images.pexels.com/photos/27505023/pexels-photo-27505023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
];

export default function App() {
  const [items, setItems] = useState<HeritageItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= HERITAGE_ITEMS.length) {
          return parsed;
        }
      }
    } catch {
      // Fallback to default dataset
    }
    return HERITAGE_ITEMS;
  });

  const [selectedCategory, setSelectedCategory] = useState<HeritageCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [heroIndex, setHeroIndex] = useState<number>(0);
  const [activeLightboxItem, setActiveLightboxItem] = useState<HeritageItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Persist custom photos & entries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors
    }
  }, [items]);

  // Auto-advance hero spotlight every 6.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SPOTLIGHTS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    kulintangAudio.enabled = next;
    if (next) {
      kulintangAudio.playChordFlourish();
    }
  };

  const enableSoundFromStudio = () => {
    setSoundEnabled(true);
    kulintangAudio.enabled = true;
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;
      const matchesQuery =
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.islandGroup.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [items, selectedCategory, searchQuery]);

  const activeCategoryMeta =
    CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  const handleAddPhotoToItem = (
    itemId: string,
    photoUrl: string,
    caption: string,
    setAsCover: boolean
  ) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== itemId) return it;
        const updatedGallery = [...(it.gallery || []), { url: photoUrl, caption }];
        const updatedItem: HeritageItem = {
          ...it,
          image: setAsCover ? photoUrl : it.image,
          gallery: updatedGallery,
        };
        setActiveLightboxItem(updatedItem);
        return updatedItem;
      })
    );
  };

  const handleCreateCustomItem = (newItem: HeritageItem) => {
    setItems((prev) => [newItem, ...prev]);
    setSelectedCategory('all');
    setActiveLightboxItem(newItem);
  };

  const handleResetDefaultArchive = () => {
    localStorage.removeItem(STORAGE_KEY);
    setItems(HERITAGE_ITEMS);
  };

  const currentHero = HERO_SPOTLIGHTS[heroIndex];

  return (
    <div className="min-h-screen bg-[#05070E] text-[#F7F2E7] relative selection:bg-[#E5B85C]/30 selection:text-[#FFD97D]">
      {/* Ambient 24k Gold Dust & Cursor Spotlight Canvas */}
      <AmbientGoldCanvas />

      {/* Top Inabel Geometric Heritage Ribbon */}
      <div className="h-1.5 w-full inabel-border relative z-40" />

      {/* Floating Translucent Capiz Navigation Bar */}
      <header className="sticky top-3 z-40 px-3 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <nav
          className="capiz-glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4 border border-[#E5B85C]/30"
          aria-label="Pangunahing Nabigasyon"
        >
          {/* Brand Crest */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={() => kulintangAudio.playGongNote(0)}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E5B85C] via-[#FFD97D] to-[#C86D51] p-0.5 shadow-[0_0_20px_rgba(229,184,92,0.3)]">
              <div className="w-full h-full bg-[#05070E] rounded-[10px] flex items-center justify-center text-[#FFD97D] font-serif-display text-lg font-bold">
                ᜉ
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-display font-bold text-lg sm:text-xl tracking-tight text-[#F7F2E7] group-hover:text-[#FFD97D] transition-colors">
                  PAMANA
                </span>
                <span className="hidden sm:inline-block text-xs text-[#E5B85C] font-serif-display">
                  ᜉᜋᜈ ᜈᜅ᜔ ᜎᜑᜒ
                </span>
              </div>
              <div className="text-[10px] font-mono-archival uppercase tracking-[0.2em] text-[#847C6D]">
                Digital National Monograph
              </div>
            </div>
          </a>

          {/* 4 Chapter Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono-archival uppercase tracking-widest text-[#C2B9A7]">
            <a
              href="#koleksyon"
              className="hover:text-[#FFD97D] transition-colors py-1"
            >
              I. Koleksyon ({items.length})
            </a>
            <a href="#mapa" className="hover:text-[#FFD97D] transition-colors py-1">
              II. Mapa ng Kapuluan
            </a>
            <a
              href="#kasaysayan"
              className="hover:text-[#FFD97D] transition-colors py-1"
            >
              III. 67,000 Taon
            </a>
            <a
              href="#baybayin"
              className="hover:text-[#FFD97D] transition-colors py-1"
            >
              IV. Baybayin at Kulintang
            </a>
          </div>

          {/* Right Controls: Sound Toggle + Add Photo CTA */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleSound}
              className={`px-3 py-2 rounded-xl border text-xs font-mono-archival inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-[#2A9D8F]/20 border-[#2A9D8F]/50 text-[#2A9D8F]'
                  : 'bg-[#05070E]/70 border-[#F7F2E7]/15 text-[#C2B9A7] hover:border-[#E5B85C]/40 hover:text-[#FFD97D]'
              }`}
              title="Buksan o Isara ang Tunog ng Kulintang"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">
                {soundEnabled ? 'Kulintang: ON' : 'Tunog'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(true);
                kulintangAudio.playGongNote(4);
              }}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#E5B85C] via-[#FFD97D] to-[#C86D51] text-[#05070E] font-bold text-xs tracking-wide inline-flex items-center gap-1.5 shadow-[0_0_25px_rgba(229,184,92,0.3)] hover:brightness-110 transition-all cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>+ Magdagdag ng Photo</span>
            </button>
          </div>
        </nav>
      </header>

      {/* ================= HERO STAGE: MONUMENTAL NATIONAL EXHIBITION ================= */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Editorial Typography Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#E5B85C]/12 border border-[#E5B85C]/35 text-[#FFD97D] text-xs font-mono-archival uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PAMANA NG LAHING PILIPINO • ARCHIVAL EDITION</span>
            </div>

            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl text-[#E5B85C]/90 font-serif-display tracking-widest">
                ᜉᜋᜈ ᜈᜅ᜔ ᜉᜒᜎᜒᜉᜒᜈᜐ᜔
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-serif-display font-bold tracking-tight leading-[1.04] text-[#F7F2E7]">
                Lahat ng Kaya Nating{' '}
                <span className="animate-gold-shimmer">Ipagmalaki sa Mundo.</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#C2B9A7] leading-relaxed max-w-xl">
              Isang interaktibong digital na museo ng ating gintong sinaunang kabihasnan, mga likas na paraiso, UNESCO World Heritage sites, habi, lutuin, bayani, at pandaigdigang tagumpay ng Pilipino.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#koleksyon"
                onClick={() => kulintangAudio.playGongNote(3)}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-[#E5B85C] via-[#FFD97D] to-[#C86D51] text-[#05070E] font-bold text-sm tracking-wide inline-flex items-center gap-2.5 shadow-[0_15px_40px_rgba(229,184,92,0.3)] hover:brightness-110 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Galugarin ang {items.length} Pambansang Yaman</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-4 rounded-2xl capiz-glass text-[#F7F2E7] hover:text-[#FFD97D] hover:border-[#E5B85C] text-sm font-semibold inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#E5B85C]" />
                <span>Lagyan ng Sariling Larawan</span>
              </button>
            </div>

            {/* Quick Category Jump Pills */}
            <div className="pt-4 border-t border-[#F7F2E7]/10">
              <div className="text-[11px] font-mono-archival uppercase tracking-widest text-[#847C6D] mb-2.5">
                MGA HALIGI NG DANGAL PILIPINO:
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.filter((c) => c.id !== 'all').map((cat, idx) => (
                  <a
                    key={cat.id}
                    href="#koleksyon"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      kulintangAudio.playGongNote(idx);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#0D1322]/90 hover:bg-[#E5B85C]/20 border border-[#F7F2E7]/10 hover:border-[#E5B85C]/50 text-xs text-[#C2B9A7] hover:text-[#FFD97D] transition-all"
                  >
                    {cat.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Multi-Slide Photographic Exhibition Showcase Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-2.5 sm:p-3.5 capiz-glass border border-[#E5B85C]/40 shadow-[0_30px_80px_rgba(0,0,0,0.85)]">
              {/* Decorative Corner Filigree Accents */}
              <div className="relative h-[380px] sm:h-[470px] rounded-2xl overflow-hidden bg-[#05070E]">
                <img
                  key={currentHero.image}
                  src={currentHero.image}
                  alt={currentHero.title}
                  className="w-full h-full object-cover object-center animate-reveal-up"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070E] via-[#05070E]/30 to-transparent" />

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#05070E]/85 backdrop-blur-md border border-[#E5B85C]/40 text-[11px] font-mono-archival text-[#FFD97D]">
                    {currentHero.tag}
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-[#05070E]/80 backdrop-blur-md border border-[#F7F2E7]/15 text-base font-serif-display text-[#E5B85C]">
                    {currentHero.baybayin}
                  </span>
                </div>

                {/* Bottom Spotlight Narrative Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7">
                  <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#F7F2E7]">
                    {currentHero.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#C2B9A7] mt-1.5 line-clamp-2">
                    {currentHero.caption}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        const match = items.find((it) => it.id === currentHero.id);
                        if (match) setActiveLightboxItem(match);
                      }}
                      className="text-xs font-mono-archival uppercase tracking-wider text-[#FFD97D] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Buksan ang Monograph Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Slide Selector Dots */}
                    <div className="flex items-center gap-1.5">
                      {HERO_SPOTLIGHTS.map((spot, i) => (
                        <button
                          key={spot.id}
                          type="button"
                          onClick={() => setHeroIndex(i)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            heroIndex === i
                              ? 'w-7 bg-[#FFD97D]'
                              : 'w-2 bg-[#F7F2E7]/30 hover:bg-[#F7F2E7]/60'
                          }`}
                          aria-label={`Slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monumental National Pride Telemetry Strip */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              stat: '7,641',
              unit: 'PULO AT BAYBAYIN',
              desc: 'Mula Batanes hanggang Tawi-Tawi sa puso ng Indo-Pacific.',
              baybayin: 'ᜃᜉᜓᜎᜓᜀᜈ᜔',
            },
            {
              stat: '67,000+',
              unit: 'TAON NG KABIHASNAN',
              desc: 'Mula sa Homo luzonensis ng Callao at Tapayang Manunggul.',
              baybayin: 'ᜐᜒᜈᜂᜈ',
            },
            {
              stat: '#1',
              unit: 'MARINE BIODIVERSITY',
              desc: 'Sentro ng Coral Triangle at tahanan ng Tubbataha at Palawan.',
              baybayin: 'ᜃᜇᜄᜆᜈ᜔',
            },
            {
              stat: '1899',
              unit: 'UNANG REPUBLIKA SA ASYA',
              desc: 'Unang demokratikong konstitusyon sa buong kontinente ng Asya.',
              baybayin: 'ᜃᜎᜌᜀᜈ᜔',
            },
          ].map((metric) => (
            <div
              key={metric.unit}
              className="capiz-glass rounded-2xl p-5 border border-[#E5B85C]/20 relative overflow-hidden group"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-serif-display font-bold animate-gold-shimmer">
                  {metric.stat}
                </span>
                <span className="text-base text-[#E5B85C]/70 font-serif-display">
                  {metric.baybayin}
                </span>
              </div>
              <div className="text-xs font-mono-archival uppercase tracking-widest text-[#FFD97D] mt-1">
                {metric.unit}
              </div>
              <p className="text-xs text-[#C2B9A7] mt-1.5 leading-relaxed">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Infinite Gold Ticker of Filipino Global Pride */}
      <div className="border-y border-[#E5B85C]/25 bg-[#080C18]/90 py-3.5 overflow-hidden relative z-10">
        <div className="animate-marquee flex items-center gap-10 text-xs font-mono-archival uppercase tracking-[0.22em] text-[#FFD97D]">
          {[...PRIDE_TICKER_ITEMS, ...PRIDE_TICKER_ITEMS].map((item, idx) => (
            <span key={idx} className="whitespace-nowrap flex items-center gap-3">
              <span>{item}</span>
              <span className="text-[#C86D51]">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ================= CHAPTER I: COMPLETE CURATED HERITAGE COLLECTION ================= */}
      <section
        id="koleksyon"
        className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto z-10"
      >
        {/* Section Title & Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5B85C]/10 border border-[#E5B85C]/30 text-[#FFD97D] text-xs font-mono-archival uppercase tracking-[0.2em] mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>Chapter I • Pambansang Arkibo ng Dangal</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif-display font-bold tracking-tight text-[#F7F2E7]">
              Halos Lahat ng <span className="animate-gold-shimmer">Ipinagmamalaki Natin</span>
            </h2>
            <p className="mt-3 text-[#C2B9A7] max-w-2xl text-base sm:text-lg">
              {activeCategoryMeta.description}
            </p>
          </div>

          {/* Search Input + Add Custom Photo Trigger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-[260px] sm:min-w-[300px]">
              <Search className="w-4 h-4 text-[#E5B85C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Maghanap: Mayon, Sinigang, Yulo, Ginto..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#0B101E] border border-[#E5B85C]/30 text-sm text-[#F7F2E7] placeholder-[#847C6D] focus:outline-none focus:border-[#FFD97D]"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-[#E5B85C]/15 hover:bg-[#E5B85C]/30 border border-[#E5B85C]/45 text-[#FFD97D] text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
            >
              <Camera className="w-4 h-4" />
              <span>+ Magdagdag ng Photo</span>
            </button>
          </div>
        </div>

        {/* 8 Interactive Category Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;
            const count =
              cat.id === 'all'
                ? items.length
                : items.filter((i) => i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  kulintangAudio.playGongNote(idx);
                }}
                className={`px-4 py-3 rounded-2xl text-left transition-all duration-300 shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#E5B85C] via-[#FFD97D] to-[#C86D51] text-[#05070E] border-[#FFD97D] font-bold shadow-[0_10px_25px_rgba(229,184,92,0.3)]'
                    : 'bg-[#0B101E]/90 text-[#C2B9A7] border-[#F7F2E7]/10 hover:border-[#E5B85C]/40 hover:text-[#F7F2E7]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm">{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono-archival ${
                      isSelected
                        ? 'bg-[#05070E]/20 text-[#05070E]'
                        : 'bg-[#F7F2E7]/10 text-[#FFD97D]'
                    }`}
                  >
                    {count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bento Exhibition Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((item, idx) => (
              <HeritageCard
                key={item.id}
                item={item}
                index={idx}
                featured={idx === 0 && selectedCategory === 'all' && !searchQuery}
                onSelect={(selected) => {
                  setActiveLightboxItem(selected);
                  kulintangAudio.playGongNote(idx);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="capiz-glass rounded-3xl p-12 text-center max-w-xl mx-auto">
            <Compass className="w-10 h-10 text-[#E5B85C] mx-auto mb-3" />
            <h3 className="text-xl font-serif-display font-bold text-[#F7F2E7]">
              Walang nahanap sa "{searchQuery}"
            </h3>
            <p className="text-sm text-[#C2B9A7] mt-2">
              Subukang maghanap ng ibang salita o magdagdag ng sarili mong larawan at pamana sa koleksyon!
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-[#F7F2E7]/10 text-xs text-[#F7F2E7] cursor-pointer"
              >
                Ipakita Lahat
              </button>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#E5B85C] text-[#05070E] font-bold text-xs cursor-pointer"
              >
                + Magdagdag ng Pamana
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Subtle Inabel Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E5B85C]/35 to-transparent" />
      </div>

      {/* ================= CHAPTER II: INTERACTIVE ARCHIPELAGO MAP ================= */}
      <InteractiveArchipelagoMap
        items={items}
        onSelectItem={(item) => setActiveLightboxItem(item)}
      />

      {/* Subtle Inabel Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C86D51]/35 to-transparent" />
      </div>

      {/* ================= CHAPTER III: 67,000-YEAR CHRONICLE TIMELINE ================= */}
      <ChronicleTimeline />

      {/* Subtle Inabel Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#2A9D8F]/35 to-transparent" />
      </div>

      {/* ================= CHAPTER IV: BAYBAYIN & KULINTANG STUDIO ================= */}
      <BaybayinKulintangStudio
        soundEnabled={soundEnabled}
        onEnableSound={enableSoundFromStudio}
      />

      {/* Subtle Inabel Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E5B85C]/35 to-transparent" />
      </div>

      {/* ================= CHAPTER V: PHOTOGRAPHIC PRIDE WALL ================= */}
      <PhotoPrideWall
        items={items}
        onSelectItem={(item) => setActiveLightboxItem(item)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* ================= MONUMENTAL MUSEUM COLOPHON FOOTER ================= */}
      <footer className="relative border-t border-[#E5B85C]/25 bg-[#04060C] pt-16 pb-12 px-4 sm:px-6 lg:px-10 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#F7F2E7]/10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-serif-display font-bold text-[#FFD97D]">
                PAMANA — ᜉᜋᜈ ᜈᜅ᜔ ᜎᜑᜒ
              </span>
            </div>
            <p className="text-sm text-[#C2B9A7] leading-relaxed">
              Isang digital na dambana para sa kultura, kalikasan, kasaysayan, at hindi matatawarang galing ng Pilipino. Ang hindi lumingon sa pinanggalingan ay hindi makararating sa paroroonan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-[#E5B85C]/20 hover:bg-[#E5B85C]/30 border border-[#E5B85C]/45 text-[#FFD97D] text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Mag-upload ng Iyong Larawan</span>
            </button>
            <button
              type="button"
              onClick={handleResetDefaultArchive}
              className="px-4 py-3 rounded-xl bg-[#0D1322] hover:bg-[#161F36] border border-[#F7F2E7]/10 text-[#847C6D] hover:text-[#C2B9A7] text-xs inline-flex items-center gap-1.5 transition-all cursor-pointer"
              title="Ibalik sa orihinal na listahan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>I-reset ang Arkibo</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-archival text-[#847C6D]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E5B85C]" />
            <span>PAMANA DIGITAL NATIONAL HERITAGE MONOGRAPH • REPUBLIKA NG PILIPINAS</span>
          </div>
          <div className="flex items-center gap-2 text-[#C2B9A7]">
            <Globe2 className="w-4 h-4 text-[#2A9D8F]" />
            <span>MABUHAY ANG LAHING PILIPINO • ᜋᜊᜓᜑᜌ᜔</span>
          </div>
        </div>
      </footer>

      {/* Full-Bleed Monograph Lightbox Dossier */}
      <HeritageLightboxModal
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
        onAddPhotoToItem={handleAddPhotoToItem}
      />

      {/* Custom Photo & Pride Uploader Modal */}
      <AddHeritagePhotoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreateItem={handleCreateCustomItem}
      />
    </div>
  );
}
