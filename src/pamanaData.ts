import manunggulJarImg from '../assets/images/manunggul-jar.jpg';
import surigaoGoldImg from '../assets/images/surigao-gold.jpg';
import spoliariumArtImg from '../assets/images/spoliarium-art.jpg';
import sinulogFestivalImg from '../assets/images/sinulog-festival.jpg';
import pinaBarongImg from '../assets/images/pina-barong.jpg';
import haribonEagleImg from '../assets/images/haribon-eagle.jpg';

export const MUSEUM_IMAGES = {
  manunggulJar: manunggulJarImg,
  surigaoGold: surigaoGoldImg,
  spoliariumArt: spoliariumArtImg,
  sinulogFestival: sinulogFestivalImg,
  pinaBarong: pinaBarongImg,
  haribonEagle: haribonEagleImg,
};

export type HeritageCategory =
  | 'all'
  | 'sinauna'
  | 'unesco'
  | 'kalikasan'
  | 'sining'
  | 'lutuin'
  | 'kultura'
  | 'dangal';

export type IslandGroup = 'Luzon' | 'Visayas' | 'Mindanao' | 'Buong Kapuluan';

export interface HeritageItem {
  id: string;
  catalogNo: string;
  title: string;
  subtitle: string;
  baybayin: string;
  category: Exclude<HeritageCategory, 'all'>;
  categoryLabel: string;
  islandGroup: IslandGroup;
  location: string;
  coordinates: string;
  era: string;
  recognition: string;
  image: string;
  gallery: { url: string; caption: string }[];
  summary: string;
  fullStory: string;
  globalPride: string;
  keyFacts: { label: string; value: string }[];
  accentColor: string;
  mapPos: { x: number; y: number }; // percentage on stylized archipelago SVG map
  isUserAdded?: boolean;
}

export interface CategoryMeta {
  id: HeritageCategory;
  label: string;
  englishLabel: string;
  baybayin: string;
  description: string;
  accent: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'all',
    label: 'Lahat ng Pamana',
    englishLabel: 'Complete National Archive',
    baybayin: 'ᜎᜑᜆ᜔ ᜈᜅ᜔ ᜉᜋᜈ',
    description: 'Ang kabuuang koleksyon ng mga kayamanan, kalikasan, sining, kasaysayan, at tagumpay na ipinagmamalaki ng lahing Pilipino sa buong daigdig.',
    accent: '#E5B85C',
  },
  {
    id: 'sinauna',
    label: 'Gintong Sinauna',
    englishLabel: 'Pre-Colonial Gold & Artifacts',
    baybayin: 'ᜄᜒᜈ᜔ᜆᜓᜅ᜔ ᜐᜒᜈᜂᜈ',
    description: 'Mga patunay ng mataas na antas ng kabihasnan, ginto, pandaragat, at panulat bago pa dumating ang mga mananakop.',
    accent: '#E5B85C',
  },
  {
    id: 'unesco',
    label: 'Arkitektura at UNESCO',
    englishLabel: 'Sacred Stones & World Heritage',
    baybayin: 'ᜀᜇ᜔ᜃᜒᜆᜒᜃ᜔ᜆᜓᜇ',
    description: 'Mga hagdan-hagdang palayan na inukit sa bundok, simbahang bato, at mga makasaysayang lungsod na kinilala ng UNESCO.',
    accent: '#C86D51',
  },
  {
    id: 'kalikasan',
    label: 'Paraiso at Kalikasan',
    englishLabel: 'Natural Wonders & Biodiversity',
    baybayin: 'ᜃᜎᜒᜃᜐᜈ᜔',
    description: 'Isa sa 18 megadiverse na bansa sa mundo—tahanan ng Haribon, Tarsier, Bulkang Mayon, Palawan, at Coral Triangle.',
    accent: '#2A9D8F',
  },
  {
    id: 'sining',
    label: 'Habi at Sining',
    englishLabel: 'Master Textiles & Fine Arts',
    baybayin: 'ᜑᜊᜒ ᜀᜆ᜔ ᜐᜒᜈᜒᜅ᜔',
    description: 'Mula sa panaginip na T’nalak ng T’boli at Piña-Seda ng Aklan hanggang sa Spoliarium ni Juan Luna sa Madrid.',
    accent: '#D97757',
  },
  {
    id: 'lutuin',
    label: 'Lutuing Pilipino',
    englishLabel: 'World-Class Culinary Heritage',
    baybayin: 'ᜎᜓᜆᜓᜁᜅ᜔ ᜉᜒᜎᜒᜉᜒᜈᜓ',
    description: 'Ang matapang na timpla ng asim, alat, tamis, at linamnam—kinilala sa buong mundo mula Sinigang hanggang Sisig at Adobo.',
    accent: '#E5B85C',
  },
  {
    id: 'kultura',
    label: 'Kapistahan at Diwa',
    englishLabel: 'Festivals, Martial Arts & Values',
    baybayin: 'ᜇᜒᜏᜅ᜔ ᜊᜌᜈ᜔',
    description: 'Ang kulay ng Sinulog, ritmo ng Kulintang, talim ng Arnis, at ang walang-katumbas na diwa ng Bayanihan at Kapwa.',
    accent: '#F4A261',
  },
  {
    id: 'dangal',
    label: 'Bayani at Dangal',
    englishLabel: 'Heroes & Global Champions',
    baybayin: 'ᜇᜅᜎ᜔ ᜈᜅ᜔ ᜎᜑᜒ',
    description: 'Mula sa unang republika sa Asya hanggang sa mga gintong medalya sa Olympics, entablado ng Broadway, at agham.',
    accent: '#FFD97D',
  },
];

export const HERITAGE_ITEMS: HeritageItem[] = [
  // ================= I. SINAUNA (PRE-COLONIAL GOLD & ARTIFACTS) =================
  {
    id: 'manunggul-jar',
    catalogNo: 'CAT-PH-001',
    title: 'Tapayang Manunggul',
    subtitle: 'Neolithic Secondary Burial Vessel of Tabon Caves',
    baybayin: 'ᜆᜉᜌᜅ᜔ ᜋᜈᜓᜅ᜔ᜄᜓᜎ᜔',
    category: 'sinauna',
    categoryLabel: 'Gintong Sinauna',
    islandGroup: 'Luzon',
    location: 'Lipuun Point, Quezon, Palawan',
    coordinates: '9.2804° N, 117.9841° E',
    era: '890 – 710 BCE (Panahong Neolitiko)',
    recognition: 'National Cultural Treasure • Pambansang Kayamanan',
    image: MUSEUM_IMAGES.manunggulJar,
    gallery: [
      {
        url: MUSEUM_IMAGES.manunggulJar,
        caption: 'Ang takip ng Tapayang Manunggul na nagpapakita ng Bangka ng Kaluluwa patungo sa kabilang-buhay.',
      },
      {
        url: 'https://images.pexels.com/photos/13256466/pexels-photo-13256466.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang mga kuweba at apog na dalisdis ng Palawan kung saan natagpuan ang sinaunang pamana.',
      },
    ],
    summary:
      'Kinikilala bilang obra maestra ng pre-kolonyal na seramika sa Timog-Silangang Asya. Sa takip nito ay nakaukit ang dalawang pigurang namamangka patungo sa kabilang-buhay.',
    fullStory:
      'Natuklasan nina Dr. Robert Fox at Miguel Santiago noong 1964 sa Yungib ng Manunggul sa Palawan, ang tapayang ito ay patunay ng malalim na pilosopiya sa kaluluwa at pandaragat ng mga sinaunang Pilipino halos tatlong libong taon na ang nakalilipas. Ang mga ukit na alon na pinintahan ng pulang hematite ay sumasalamin sa pagkakaugnay ng ating mga ninuno sa karagatan.',
    globalPride:
      'Itinuturing ng mga arkeologo sa buong mundo bilang isa sa pinakamataas na antas ng sining-seramika sa buong Indo-Pacific region noong Panahong Neolitiko.',
    keyFacts: [
      { label: 'Tanda ng Artepakto', value: '~2,900 Taon (890–710 BCE)' },
      { label: 'Kasalukuyang Lokasyon', value: 'National Museum of Anthropology' },
      { label: 'Simbolismo', value: 'Paglalakbay ng Kaluluwa sa Dagat' },
      { label: 'Antas ng Pagkilala', value: 'National Cultural Treasure #1' },
    ],
    accentColor: '#E5B85C',
    mapPos: { x: 24, y: 64 },
  },
  {
    id: 'surigao-royal-gold',
    catalogNo: 'CAT-PH-002',
    title: 'Gintong Pamana ng Butuan at Surigao',
    subtitle: '10th–13th Century Pre-Colonial Royal Gold Regalia',
    baybayin: 'ᜄᜒᜈ᜔ᜆᜓᜅ᜔ ᜉᜋᜈ',
    category: 'sinauna',
    categoryLabel: 'Gintong Sinauna',
    islandGroup: 'Mindanao',
    location: 'Butuan at Surigao del Sur, Caraga',
    coordinates: '8.9475° N, 125.5406° E',
    era: '900 – 1200 CE (Klasikong Panahon)',
    recognition: 'World-Renowned Archaeological Gold Collection',
    image: MUSEUM_IMAGES.surigaoGold,
    gallery: [
      {
        url: MUSEUM_IMAGES.surigaoGold,
        caption: 'Masinsing habi ng gintong Sablay (Sacred Sash), Kinnari, at mga kuwintas na Kamagi.',
      },
    ],
    summary:
      'Bago pa man dumating ang mga Europeo, ang mga panday-ginto ng Butuan at Surigao ay lumilikha na ng mga 24-karat na gintong habi, korona, at Kinnari na walang kapantay sa lambot at detalye.',
    fullStory:
      'Ang Koleksyong Ginto ng Pilipinas—kabilang ang Surigao Treasure na natuklasan noong 1981—ay nagtatampok ng "Upavata" o gintong sablay ng maharlika na hinabi mula sa libu-libong maliliit na hibla ng purong ginto na tumitimbang ng higit apat na kilo, pati na ang ginintuang Kinnari (kalahating babae, kalahating ibon) na nagpapakita ng sopistikadong kalakalan at sining ng Kaharian ng Butuan.',
    globalPride:
      'Nang itanghal sa Asia Society Museum sa New York at Musée du Quai Branly sa Paris, hinangaan ng mundo ang "kamagi" gear-beads na sa sobrang liit ay kailangan pang silipin sa mikroskopyo.',
    keyFacts: [
      { label: 'Puridad ng Metal', value: '18k hanggang 24k Purong Ginto' },
      { label: 'Obra Maestra', value: '4-Kilo Woven Gold Royal Sash' },
      { label: 'Sibilisasyon', value: 'Rajahnate of Butuan (Caraga)' },
      { label: 'Pandaigdigang Eksibit', value: 'New York • Paris • Manila' },
    ],
    accentColor: '#FFD97D',
    mapPos: { x: 74, y: 74 },
  },
  {
    id: 'balangay-butuan-boat',
    catalogNo: 'CAT-PH-003',
    title: 'Balangay: Sinaunang Sasakyang-Dagat',
    subtitle: 'Oldest Pre-Hispanic Wooden Watercraft in Southeast Asia',
    baybayin: 'ᜊᜎᜅᜌ᜔',
    category: 'sinauna',
    categoryLabel: 'Gintong Sinauna',
    islandGroup: 'Mindanao',
    location: 'Ambangan, Libertad, Butuan City',
    coordinates: '8.9512° N, 125.4981° E',
    era: '320 CE (Radiocarbon Dated)',
    recognition: 'National Cultural Treasure • Pambansang Bangka',
    image: 'https://images.pexels.com/photos/12267682/pexels-photo-12267682.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/12267682/pexels-photo-12267682.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang tradisyong maritima ng kapuluan na nagdugtong sa mga isla at kalapit-bansa sa Asya.',
      },
      {
        url: 'https://images.pexels.com/photos/13874296/pexels-photo-13874296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Malinaw na katubigan ng kapuluan kung saan naglayag ang mga sinaunang mandaragat na Pilipino.',
      },
    ],
    summary:
      'Ginawa nang walang kahit isang pako na bakal—gamit lamang ang kahoy na dungon at mga pasak na kahoy (wooden dowels)—ang Balangay ang pinagmulan ng salitang "Barangay".',
    fullStory:
      'Ang mga nahukay na Balangay sa Butuan na itinayo noon pang 320 CE ay patunay na ang mga sinaunang Pilipino ay mga dalubhasang inhinyero ng dagat at nabigador gamit ang mga bituin, agos ng tubig, at hangin. Sa pamamagitan ng Balangay, nakipagkalakalan ang ating mga ninuno hanggang Champa (Vietnam), Tsina, at India.',
    globalPride:
      'Noong 2009–2010, matagumpay na nilayag ng replica na Balangay ("Diwata ng Lahi") ang 14,000 kilometro sa buong Timog-Silangang Asya gamit ang sinaunang kaalaman sa nabigasyon.',
    keyFacts: [
      { label: 'Inhinyeriya', value: 'Edge-Pegged Plank (Walang Pako)' },
      { label: 'Kahoy na Ginamit', value: 'Matibay na Kahoy ng Dungon' },
      { label: 'Pinagmulan ng Salita', value: 'Barangay (Pamayanang Pilipino)' },
      { label: 'Panahon', value: '320 CE (Higit 1,700 Taon)' },
    ],
    accentColor: '#E5B85C',
    mapPos: { x: 72, y: 76 },
  },
  {
    id: 'batok-whang-od',
    catalogNo: 'CAT-PH-004',
    title: 'Sining ng Batok at Apo Whang-Od',
    subtitle: 'Thousand-Year Kalinga Hand-Tapped Tattoo Heritage',
    baybayin: 'ᜊᜆᜓᜃ᜔ ᜈᜅ᜔ ᜃᜎᜒᜅ',
    category: 'sinauna',
    categoryLabel: 'Gintong Sinauna',
    islandGroup: 'Luzon',
    location: 'Buscalan, Tinglayan, Kalinga, Cordillera',
    coordinates: '17.2564° N, 121.1489° E',
    era: 'Sinaunang Tradisyon – Kasalukuyan',
    recognition: 'Living Heritage of the Cordillera • Vogue Global Cover Icon',
    image: 'https://images.pexels.com/photos/18227278/pexels-photo-18227278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/18227278/pexels-photo-18227278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang buhay na pamana ng mga nakatatandang manghahabi at mambabatok sa kabundukan ng Hilagang Luzon.',
      },
      {
        url: 'https://images.pexels.com/photos/10046458/pexels-photo-10046458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang hamog sa kabundukan ng Cordillera na nagsilbing kanlungan ng di-nasakop na kultura.',
      },
    ],
    summary:
      'Gamit ang tinik ng suha (pomelo thorn), uling, at tubig, ang Batok ay sagradong sining sa balat na nagpapahayag ng katapangan, kagandahan, at pagkakakilanlan sa Cordillera.',
    fullStory:
      'Si Maria Oggay—kilala sa buong mundo bilang Apo Whang-Od—ang pinakamatandang mambabatok ng Butbut tribe sa Kalinga. Sa loob ng mahigit isang siglo, pinanatili niyang buhay ang libong-taong sining ng hand-tapped tattooing at ipinasa ito sa bagong henerasyon ng mga kababaihang mambabatok sa Buscalan.',
    globalPride:
      'Sa edad na 106, si Apo Whang-Od ang naging pinakamatandang tao sa kasaysayan na tampok sa pabalat ng Vogue magazine sa buong daigdig, na nagpakilala sa sining ng Batok sa bawat kontinente.',
    keyFacts: [
      { label: 'Kasangkapan', value: 'Tinik ng Suha + Uling ng Pino' },
      { label: 'Sentro ng Tradisyon', value: 'Buscalan, Tinglayan, Kalinga' },
      { label: 'Simbolismo', value: 'Katapangan,Angkan, at Kalikasan' },
      { label: 'Tagapag-ingat', value: 'Apo Whang-Od Oggay' },
    ],
    accentColor: '#C86D51',
    mapPos: { x: 48, y: 18 },
  },

  // ================= II. ARKITEKTURA AT UNESCO HERITAGE =================
  {
    id: 'banaue-rice-terraces',
    catalogNo: 'CAT-PH-005',
    title: 'Payyo: Hagdan-Hagdang Palayan ng Cordillera',
    subtitle: '2,000-Year Living Cultural Landscape of the Ifugao',
    baybayin: 'ᜉᜌ᜔ᜌᜓ ᜈᜅ᜔ ᜁᜉᜓᜄᜏ᜔',
    category: 'unesco',
    categoryLabel: 'Arkitektura at UNESCO',
    islandGroup: 'Luzon',
    location: 'Batad, Bangaan, Mayoyao, Hungduan at Nagacadan, Ifugao',
    coordinates: '16.9240° N, 121.0558° E',
    era: 'Inukit mahigit 2,000 Taon na ang Nakalilipas',
    recognition: 'UNESCO World Heritage Site • Globally Important Agricultural Heritage',
    image: 'https://images.pexels.com/photos/37445545/pexels-photo-37445545.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/37445545/pexels-photo-37445545.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang mala-ampiteatrong Payyo sa kabundukan ng Cordillera na inukit gamit ang kamay at bato.',
      },
      {
        url: 'https://images.pexels.com/photos/10046455/pexels-photo-10046455.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Maulap na umaga sa Banaue kung saan dumadaloy ang tubig mula sa sagradong kagubatan (Muyong).',
      },
      {
        url: 'https://images.pexels.com/photos/11283650/pexels-photo-11283650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Aerial view ng masalimuot na inhinyeriyang agrikultural ng mga Ifugao.',
      },
    ],
    summary:
      'Inukit sa matarik na bundok ng Cordillera gamit ang lakas-bisig at katutubong kaalaman sa haydrolika, ang Payyo ay patunay ng pagkakaisa ng tao at kalikasan.',
    fullStory:
      'Sa taas na 1,500 metro mula sa pantay-dagat, ang Hagdan-Hagdang Palayan ng Ifugao ay sinusuportahan ng "Muyong"—isang katutubong sistema ng pangangalaga sa kagubatan sa tuktok ng bundok na nagbibigay ng walang-patid na irigasyon sa bawat baitang ng palayan. Kung idudugtong-dugtong ang mga pader na bato nito, tinatayang aabot ito sa kalahati ng paikot ng mundo.',
    globalPride:
      'Kinilala ng UNESCO noong 1995 bilang "Living Cultural Landscape" at patuloy na hinahangaan ng mga inhinyero sa buong mundo bilang himala ng sustainable eco-engineering.',
    keyFacts: [
      { label: 'Taas sa Bundok', value: '1,500 Metro Above Sea Level' },
      { label: 'Sistema ng Tubig', value: 'Muyong Sacred Forest Watershed' },
      { label: 'UNESCO Inscription', value: '1995 World Heritage Cultural Landscape' },
      { label: '5 Kumpol ng UNESCO', value: 'Batad • Bangaan • Mayoyao • Hungduan • Nagacadan' },
    ],
    accentColor: '#2A9D8F',
    mapPos: { x: 49, y: 22 },
  },
  {
    id: 'intramuros-san-agustin',
    catalogNo: 'CAT-PH-006',
    title: 'Intramuros at Simbahan ng San Agustin',
    subtitle: '16th-Century Walled City & Oldest Stone Church in the Philippines',
    baybayin: 'ᜁᜈ᜔ᜆ᜔ᜇᜋᜓᜇᜓᜐ᜔',
    category: 'unesco',
    categoryLabel: 'Arkitektura at UNESCO',
    islandGroup: 'Luzon',
    location: 'Intramuros, Lungsod ng Maynila',
    coordinates: '14.5890° N, 120.9751° E',
    era: 'Itinatag noong 1571 – 1607 CE',
    recognition: 'UNESCO World Heritage Site (Baroque Churches of the Philippines)',
    image: 'https://images.pexels.com/photos/37345765/pexels-photo-37345765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/37345765/pexels-photo-37345765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang makasaysayang harapan ng Simbahan ng San Agustin sa loob ng Intramuros, Maynila.',
      },
      {
        url: 'https://images.pexels.com/photos/36834832/pexels-photo-36834832.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang maringal na Manila Cathedral sa gabi sa puso ng Ciudad Murada.',
      },
      {
        url: 'https://images.pexels.com/photos/18048425/pexels-photo-18048425.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Kampanaryo at arkitekturang bato na nakaligtas sa malalakas na lindol at digmaan.',
      },
    ],
    summary:
      'Ang pinakamatandang simbahang bato sa Pilipinas (1607) sa loob ng makasaysayang pader ng Intramuros—isang obra ng Earthquake Baroque architecture.',
    fullStory:
      'Sa loob ng mahigit apat na raang taon, nakatayo pa rin ang Simbahan ng San Agustin sa kabila ng malalakas na lindol at ang pagkawasak ng Maynila noong Ikalawang Digmaang Pandaigdig. Ang kisame nitong trompe-l’œil na tila inukit na bato, mga pintuang molave, at mga kuta ng Fort Santiago ay saksi sa tapang at sining ng mga manggagawang Pilipino at Tsino.',
    globalPride:
      'Kabilang sa apat na Baroque Churches ng Pilipinas (kasama ang Paoay, Miagao, at Santa Maria) na itinala ng UNESCO bilang natatanging pagsasanib ng disenyong Europeo at sining-Asyano.',
    keyFacts: [
      { label: 'Taon ng Pagkatapos', value: '1607 CE (419+ Taon)' },
      { label: 'Istilo ng Arkitektura', value: 'Philippine Earthquake Baroque' },
      { label: 'UNESCO Status', value: 'Inscribed 1993 World Heritage' },
      { label: 'Tampok na Sining', value: '3D Trompe-l’œil Ceiling Frescoes' },
    ],
    accentColor: '#E5B85C',
    mapPos: { x: 45, y: 36 },
  },
  {
    id: 'vigan-heritage-city',
    catalogNo: 'CAT-PH-007',
    title: 'Makasaysayang Lungsod ng Vigan',
    subtitle: 'Calle Crisologo & Best-Preserved Spanish-Asian Trading Town',
    baybayin: 'ᜎᜓᜅ᜔ᜐᜓᜇ᜔ ᜈᜅ᜔ ᜊᜒᜄᜈ᜔',
    category: 'unesco',
    categoryLabel: 'Arkitektura at UNESCO',
    islandGroup: 'Luzon',
    location: 'Vigan City, Ilocos Sur',
    coordinates: '17.5747° N, 120.3869° E',
    era: 'Ika-16 hanggang Ika-19 na Siglo',
    recognition: 'UNESCO World Heritage Site • New7Wonders Cities of the World',
    image: 'https://images.pexels.com/photos/37940822/pexels-photo-37940822.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/37940822/pexels-photo-37940822.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ginintuang liwanag sa gabi sa mga makasaysayang gusaling bato at ladrilyo.',
      },
      {
        url: 'https://images.pexels.com/photos/20359301/pexels-photo-20359301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang makasaysayang kampanaryo ng Vigan na patuloy na pinangangalagaan para sa susunod na salinlahi.',
      },
    ],
    summary:
      'Tanyag sa Calle Crisologo, mga kalesa, at mga Bahay na Bato na may bintanang Capiz—ang Vigan ay buhay na museo ng arkitekturang Ilocano, Tsino, at Espanyol.',
    fullStory:
      'Bago pa man dumating ang mga Espanyol, ang Bigan ay isa nang masiglang daungan ng kalakalan ng ginto, pagkit (beeswax), at tapayang burnay. Ang mga Bahay na Bato sa Vigan ay may makakapal na pader na ladrilyo sa ibaba at matitibay na kahoy na may Capiz shells sa itaas upang labanan ang bagyo at lindol.',
    globalPride:
      'Kinilala ng UNESCO bilang pinakamahusay na napangalagaang halimbawa ng Spanish colonial town sa buong Asya at napabilang sa New7Wonders Cities ng mundo.',
    keyFacts: [
      { label: 'UNESCO Inscription', value: '1999 Cultural World Heritage' },
      { label: 'Arkitektura', value: 'Bahay na Bato at Bintanang Capiz' },
      { label: 'Lokal na Sining', value: 'Burnay Pottery & Inabel Weaving' },
      { label: 'Pandaigdigang Titulo', value: 'New7Wonders Cities Winner' },
    ],
    accentColor: '#C86D51',
    mapPos: { x: 43, y: 15 },
  },

  // ================= III. KALIKASAN (NATURAL WONDERS & BIODIVERSITY) =================
  {
    id: 'palawan-el-nido-coron',
    catalogNo: 'CAT-PH-008',
    title: 'Paraiso ng Palawan: El Nido, Coron at Underground River',
    subtitle: '250-Million-Year Karst Cathedrals & UNESCO Subterranean River',
    baybayin: 'ᜉᜎᜏᜈ᜔',
    category: 'kalikasan',
    categoryLabel: 'Paraiso at Kalikasan',
    islandGroup: 'Luzon',
    location: 'Puerto Princesa, El Nido at Coron, Palawan',
    coordinates: '11.1956° N, 119.4180° E',
    era: '250 Milyong Taong Permian Limestone',
    recognition: 'UNESCO World Heritage • Voted Best Island in the World Multiple Times',
    image: 'https://images.pexels.com/photos/13874296/pexels-photo-13874296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/13874296/pexels-photo-13874296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Mala-kristal na turquoise lagoon ng El Nido na napaliligiran ng matatarik na limestone cliffs.',
      },
      {
        url: 'https://images.pexels.com/photos/38230334/pexels-photo-38230334.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Aerial panorama ng Coron Bay sa hilagang Palawan.',
      },
      {
        url: 'https://images.pexels.com/photos/36521036/pexels-photo-36521036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Sinaunang Permian karst formations ng Bacuit Archipelago.',
      },
    ],
    summary:
      'Tinaguriang "The Last Ecological Frontier of the Philippines", ang Palawan ay tahanan ng Puerto Princesa Underground River at ng mga mala-paraisong lagoon ng El Nido at Coron.',
    fullStory:
      'Mula sa 8.2-kilometrong ilog sa ilalim ng kuweba sa Puerto Princesa (isa sa New7Wonders of Nature at UNESCO World Heritage Site) hanggang sa Big Lagoon ng El Nido at Kayangan Lake ng Coron, ang Palawan ay nagtataglay ng pambihirang mountain-to-sea ecosystem at ilan sa pinakamalinis na tubig sa planeta.',
    globalPride:
      'Ilang ulit nang hinirang ng Travel + Leisure, Condé Nast Traveler, at National Geographic bilang #1 Best Island in the World.',
    keyFacts: [
      { label: 'Pandaigdigang Ranggo', value: '#1 Best Island in the World' },
      { label: 'Underground River', value: '8.2 km Navigable Subterranean Cave' },
      { label: 'Edad ng Batong Apog', value: '250 Milyong Taon (Permian Era)' },
      { label: 'Biosphere Status', value: 'UNESCO Man and the Biosphere Reserve' },
    ],
    accentColor: '#2A9D8F',
    mapPos: { x: 22, y: 56 },
  },
  {
    id: 'bulkang-mayon',
    catalogNo: 'CAT-PH-009',
    title: 'Bulkang Mayon (Daragang Magayon)',
    subtitle: 'World’s Most Symmetrical Perfect Cone Stratovolcano',
    baybayin: 'ᜊᜓᜎ᜔ᜃᜅ᜔ ᜋᜌᜓᜈ᜔',
    category: 'kalikasan',
    categoryLabel: 'Paraiso at Kalikasan',
    islandGroup: 'Luzon',
    location: 'Albay, Rehiyon ng Bicol',
    coordinates: '13.2548° N, 123.6861° E',
    era: 'Aktibong Stratovolcano (2,463 Metro)',
    recognition: 'UNESCO Biosphere Reserve Core (Albay Biosphere) • Natural Icon',
    image: 'https://images.pexels.com/photos/27505023/pexels-photo-27505023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/27505023/pexels-photo-27505023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang perpektong hugis-kono ng Bulkang Mayon na nakatunghay sa luntiang lupain ng Albay.',
      },
      {
        url: 'https://images.pexels.com/photos/21922429/pexels-photo-21922429.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang makasaysayang kampanaryo ng Cagsawa Ruins kasama ang Bulkang Mayon.',
      },
      {
        url: 'https://images.pexels.com/photos/17054021/pexels-photo-17054021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang pamayanan sa paanan ng Daragang Magayon sa Legazpi, Bicol.',
      },
    ],
    summary:
      'Hango sa alamat ni Daragang Magayon ("Magandang Dalaga"), ang Bulkang Mayon sa Albay ay bantog sa buong daigdig dahil sa halos perpektong 360-degree symmetrical cone nito.',
    fullStory:
      'Sa taas na 2,463 metro, ang Mayon ang pinakamasigla at pinakamarikit na bulkan sa Pilipinas. Sa paanan nito matatagpuan ang Cagsawa Ruins—ang kampanaryo ng simbahang bato noong 1724 na nagsisilbing paalala ng katatagan ng mga Bicolano sa gitna ng pwersa ng kalikasan.',
    globalPride:
      'Kinikilala ng mga heologo at manlalakbay sa buong mundo bilang ang may pinakaperpektong simetriya na stratovolcano sa ibabaw ng Daigdig.',
    keyFacts: [
      { label: 'Taas ng Tuktok', value: '2,463 Metro (8,081 Talampakan)' },
      { label: 'Pinagmulan ng Pangalan', value: 'Magayon (Salitang Bikol: Maganda)' },
      { label: 'UNESCO Recognition', value: 'Albay UNESCO Biosphere Reserve' },
      { label: 'Heolohikal na Katangian', value: 'Perfect Symmetrical Pyroclastic Cone' },
    ],
    accentColor: '#C86D51',
    mapPos: { x: 58, y: 44 },
  },
  {
    id: 'haribon-philippine-eagle',
    catalogNo: 'CAT-PH-010',
    title: 'Haribon: Ang Agila ng Pilipinas',
    subtitle: 'Pithecophaga jefferyi — World’s Largest & Rarest Forest Raptor',
    baybayin: 'ᜑᜇᜒᜊᜓᜈ᜔',
    category: 'kalikasan',
    categoryLabel: 'Paraiso at Kalikasan',
    islandGroup: 'Mindanao',
    location: 'Bundok Apo, Davao at Sierra Madre',
    coordinates: '7.1872° N, 125.4553° E',
    era: 'Endemiko sa Kapuluan ng Pilipinas',
    recognition: 'Pambansang Ibon ng Pilipinas • Hari ng Kagubatan',
    image: MUSEUM_IMAGES.haribonEagle,
    gallery: [
      {
        url: MUSEUM_IMAGES.haribonEagle,
        caption: 'Ang maringal na korona ng balahibo at matalim na titig ng Haribon sa kagubatan ng Bundok Apo.',
      },
    ],
    summary:
      'Matatagpuan lamang sa Pilipinas, ang Haribon ang pinakamahaba at may pinakamalapad na pakpak sa lahat ng agila sa buong mundo.',
    fullStory:
      'Sa haba na umaabot sa higit 3 talampakan at lapad ng pakpak na 7 talampakan, ang Philippine Eagle (Haribon o Banog) ay nangangailangan ng malawak na sinaunang kagubatan upang mabuhay. Ang isang pares ng Haribon ay tapat sa isa’t isa habambuhay at nag-aalaga ng iisang inakay bawat dalawang taon.',
    globalPride:
      'Tinawag ng sikat na aviator na si Charles Lindbergh bilang "The air’s noblest flier"—ang simbolo ng likas na kadakilaan at biodibersidad ng Pilipinas.',
    keyFacts: [
      { label: 'Lapad ng Pakpak', value: 'Hanggang 2.2 Metro (7+ Talampakan)' },
      { label: 'Katayuang Endemiko', value: '100% Sa Pilipinas Lamang Makikita' },
      { label: 'Tirahan', value: 'Mindanao, Samar, Leyte, at Sierra Madre' },
      { label: 'Pambansang Sagisag', value: 'Pambansang Ibon (Proclamation No. 615)' },
    ],
    accentColor: '#E5B85C',
    mapPos: { x: 71, y: 83 },
  },
  {
    id: 'bohol-chocolate-hills-tarsier',
    catalogNo: 'CAT-PH-011',
    title: 'Chocolate Hills at Philippine Tarsier ng Bohol',
    subtitle: '1,776 Conical Karst Mounds & One of Earth’s Smallest Primates',
    baybayin: 'ᜊᜓᜑᜓᜎ᜔ ᜀᜆ᜔ ᜋᜀᜋᜄ᜔',
    category: 'kalikasan',
    categoryLabel: 'Paraiso at Kalikasan',
    islandGroup: 'Visayas',
    location: 'Carmen at Corella, Lalawigan ng Bohol',
    coordinates: '9.8297° N, 124.1397° E',
    era: 'Pliocene–Pleistocene Marine Limestone',
    recognition: 'First UNESCO Global Geopark in the Philippines (Bohol Island)',
    image: 'https://images.pexels.com/photos/36551247/pexels-photo-36551247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/36551247/pexels-photo-36551247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Aerial view ng mahigit 1,776 na burol ng Chocolate Hills sa Bohol.',
      },
      {
        url: 'https://images.pexels.com/photos/36023757/pexels-photo-36023757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang Philippine Tarsier (Carlito syrichta) o "Mago / Maomag" sa kagubatan ng Bohol.',
      },
      {
        url: 'https://images.pexels.com/photos/32156799/pexels-photo-32156799.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Tanawin ng Bohol UNESCO Global Geopark.',
      },
    ],
    summary:
      'Mahigit 1,776 na simetrikal na burol na nagiging kulay-tsokolate tuwing tag-araw, kasama ang Maomag (Philippine Tarsier)—isa sa pinakamaliit at pinakasinaunang primate sa mundo.',
    fullStory:
      'Nabuo mula sa pag-angat ng mga sinaunang bahura ng korales (coral deposits) milyun-milyong taon na ang nakalilipas, ang Chocolate Hills ay isang heolohikal na himala. Sa parehong isla naninirahan ang Tarsier na kasinlaki lamang ng kamao ngunit kayang ipihit ang ulo nang halos 180 degrees.',
    globalPride:
      'Noong 2023, opisyal na idineklara ng UNESCO ang buong isla ng Bohol bilang kauna-unahang UNESCO Global Geopark sa Pilipinas.',
    keyFacts: [
      { label: 'Bilang ng Burol', value: '1,776 Conical Karst Hills' },
      { label: 'Tarsier Species', value: 'Carlito syrichta (45 milyong taong lahi)' },
      { label: 'UNESCO Status', value: 'Bohol Island UNESCO Global Geopark' },
      { label: 'Rehiyon', value: 'Gitnang Kabisayaan (Central Visayas)' },
    ],
    accentColor: '#2A9D8F',
    mapPos: { x: 63, y: 66 },
  },
  {
    id: 'tubbataha-coral-triangle',
    catalogNo: 'CAT-PH-012',
    title: 'Tubbataha Reefs at Sentro ng Coral Triangle',
    subtitle: 'Apex of Global Marine Biodiversity & Whale Shark Sanctuary',
    baybayin: 'ᜆᜓᜊ᜔ᜊᜆᜑ',
    category: 'kalikasan',
    categoryLabel: 'Paraiso at Kalikasan',
    islandGroup: 'Luzon',
    location: 'Gitna ng Dagat Sulu at Donsol, Sorsogon',
    coordinates: '8.8500° N, 119.9333° E',
    era: '97,030-Hectare Marine Sanctuary',
    recognition: 'UNESCO World Heritage Site • Center of the Center of Marine Shorefish Biodiversity',
    image: 'https://images.pexels.com/photos/2314945/pexels-photo-2314945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/2314945/pexels-photo-2314945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Pawikan na lumalangoy sa makulay na bahura ng kapuluan ng Pilipinas.',
      },
      {
        url: 'https://images.pexels.com/photos/1631768/pexels-photo-1631768.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang dambuhalang Butanding (Whale Shark) na malayang naglalakbay sa katubigan ng Pilipinas.',
      },
    ],
    summary:
      'Nasa Pilipinas ang "Center of the Center of Marine Biodiversity" sa buong planeta, kung saan ang Tubbataha Reefs ay tahanan ng 75% ng lahat ng uri ng korales sa mundo.',
    fullStory:
      'Sa gitna ng Dagat Sulu, ang Tubbataha Reefs Natural Park ay naglalaman ng mahigit 600 uri ng isda, 360 uri ng korales (halos kalahati ng lahat ng coral species sa daigdig), 11 uri ng pating, at mga pawikan. Kasabay nito ang Verde Island Passage sa Batangas-Mindoro na kinilala ng mga marine biologist bilang may pinakamataas na konsentrasyon ng buhay-dagat sa buong mundo.',
    globalPride:
      'Kinilala ng Smithsonian Institution at UNESCO bilang "The Amazon of the Ocean" at pandaigdigang duyan ng buhay sa karagatan.',
    keyFacts: [
      { label: 'Uri ng Korales', value: '360+ Species (~50% ng Buong Mundo)' },
      { label: 'Uri ng Isda', value: '600+ Marine Fish Species' },
      { label: 'UNESCO Status', value: '1993 Natural World Heritage Site' },
      { label: 'Siyentipikong Titulo', value: 'Apex of the Global Coral Triangle' },
    ],
    accentColor: '#2A9D8F',
    mapPos: { x: 35, y: 69 },
  },

  // ================= IV. HABI AT SINING (TEXTILES, FINE ARTS & CRAFTS) =================
  {
    id: 'tnalak-dreamweave-inabel',
    catalogNo: 'CAT-PH-013',
    title: 'T’nalak ng T’boli at Inabel ng Ilocos',
    subtitle: 'Sacred Abaca Dreamweaving & Geometric Binakol Loom Craft',
    baybayin: 'ᜑᜊᜒ ᜈᜅ᜔ ᜎᜑᜒ',
    category: 'sining',
    categoryLabel: 'Habi at Sining',
    islandGroup: 'Mindanao',
    location: 'Lake Sebu, South Cotabato at Pinili, Ilocos Norte',
    coordinates: '6.2197° N, 124.7050° E',
    era: 'Sinaunang Tradisyon ng mga GAMABA',
    recognition: 'Gawad sa Manlilikha ng Bayan (Lang Dulay & Magdalena Gamayo)',
    image: 'https://images.pexels.com/photos/40524483/pexels-photo-40524483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/40524483/pexels-photo-40524483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Masinsing paghahabi ng mga pulang hibla sa tradisyunal na habihan.',
      },
      {
        url: 'https://images.pexels.com/photos/36890818/pexels-photo-36890818.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Makukulay na geometriko at etnikong habi ng kapuluan.',
      },
      {
        url: 'https://images.pexels.com/photos/33545531/pexels-photo-33545531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Mga sinulid at habi mula sa Hilagang Luzon.',
      },
    ],
    summary:
      'Ang T’nalak ay hinahabi mula sa hibla ng abaka nang walang kodigo o guhit—tanging mula sa mga panaginip na ipinagkaloob ni Fu Dalu, ang espiritu ng abaka.',
    fullStory:
      'Sa Lake Sebu, ang mga "Dreamweavers" sa pangunguna ni Manlilikha ng Bayan Lang Dulay ay nagtali at nagkulay (ikat) ng abaka gamit ang ugat ng loko at dahon ng knalum upang lumikha ng sagradong telang T’nalak. Sa Hilaga naman, ang Inabel ng Ilocos (sa pangunguna ni Magdalena Gamayo) ay lumilikha ng "Binakol"—mga op-art geometric patterns na sumisimbolo sa umiikot na hangin at alon.',
    globalPride:
      'Ang mga habi ng Pilipinas (T’nalak, Inabel, Yakan Seputangan, at Kalinga) ay itinatanghal sa mga pangunahing textile museums sa London, Washington D.C., at Tokyo.',
    keyFacts: [
      { label: 'Materyal ng T’nalak', value: 'Purong Hibla ng Abaka (Manila Hemp)' },
      { label: 'Pambansang Alagad', value: 'Lang Dulay at Magdalena Gamayo (GAMABA)' },
      { label: 'Proseso ng Kulay', value: 'Three-Tone Sacred Tie-Dye Ikat' },
      { label: 'Kahalagahan', value: 'Buhay na Alaala ng mga Ninuno' },
    ],
    accentColor: '#C86D51',
    mapPos: { x: 68, y: 89 },
  },
  {
    id: 'pina-seda-barong-tagalog',
    catalogNo: 'CAT-PH-014',
    title: 'Piña-Seda ng Aklan at Barong Tagalog',
    subtitle: 'UNESCO-Inscribed Pineapple Leaf Fiber Weaving & Kalado Embroidery',
    baybayin: 'ᜊᜇᜓᜅ᜔ ᜆᜄᜎᜓᜄ᜔',
    category: 'sining',
    categoryLabel: 'Habi at Sining',
    islandGroup: 'Visayas',
    location: 'Kalibo, Aklan at Lumban, Laguna',
    coordinates: '11.7061° N, 122.3647° E',
    era: 'Ika-17 Siglo – Kasalukuyan',
    recognition: 'UNESCO Intangible Cultural Heritage of Humanity (2023)',
    image: MUSEUM_IMAGES.pinaBarong,
    gallery: [
      {
        url: MUSEUM_IMAGES.pinaBarong,
        caption: 'Mala-salamin at pinong hibla ng Piña-Seda na may burdang Kalado sa liwanag ng Capiz.',
      },
    ],
    summary:
      'Kinayod gamit ang basag na porselana at kabibe mula sa dahon ng Red Spanish Pineapple, ang telang Piña ng Aklan ang tinaguriang "Reyna ng mga Telang Pilipino".',
    fullStory:
      'Bawat hibla ng "liniwan" (ang pinakapinong hibla ng pinya) ay mano-manong pinagdurugtong ng mga manghahabi sa Aklan at binuburdahan sa Lumban, Laguna gamit ang teknik na "Kalado" (openwork hand-embroidery). Ang Barong Tagalog at Baro’t Saya na gawa sa Piña-Seda ay sagisag ng marangal na kasuotang Pilipino na pinagsusuot sa mga pinuno ng bansa at pandaigdigang summit.',
    globalPride:
      'Noong Disyembre 2023, opisyal na iniluklok ng UNESCO ang Aklan Piña Handloom Weaving sa Representative List of the Intangible Cultural Heritage of Humanity.',
    keyFacts: [
      { label: 'UNESCO Recognition', value: 'Inscribed 2023 Intangible Heritage' },
      { label: 'Pinagmulan ng Hibla', value: 'Dahon ng Red Spanish Pineapple' },
      { label: 'Sentro ng Pagbuburda', value: 'Lumban, Laguna (Kalado Art)' },
      { label: 'Tawag sa Mundo', value: 'Queen of Philippine Fabrics' },
    ],
    accentColor: '#E5B85C',
    mapPos: { x: 54, y: 55 },
  },
  {
    id: 'spoliarium-juan-luna',
    catalogNo: 'CAT-PH-015',
    title: 'Spoliarium ni Juan Luna (1884)',
    subtitle: 'First Gold Medal Masterpiece at the Exposición Nacional de Bellas Artes Madrid',
    baybayin: 'ᜐᜒᜈᜒᜅ᜔ ᜈᜒ ᜑᜓᜏᜈ᜔ ᜎᜓᜈ',
    category: 'sining',
    categoryLabel: 'Habi at Sining',
    islandGroup: 'Luzon',
    location: 'National Museum of Fine Arts, Maynila',
    coordinates: '14.5869° N, 120.9812° E',
    era: '1884 (Madrid, Espanya)',
    recognition: 'National Cultural Treasure • Primera Medalla de Oro (Madrid 1884)',
    image: MUSEUM_IMAGES.spoliariumArt,
    gallery: [
      {
        url: MUSEUM_IMAGES.spoliariumArt,
        caption: 'Ang dambuhalang obra sa bulwagan ng National Museum of Fine Arts na gumising sa kamalayang Pilipino.',
      },
    ],
    summary:
      'May sukat na 4.22 metro x 7.675 metro, ang Spoliarium ni Juan Luna (kasabay ng tagumpay ni Félix Resurrección Hidalgo) ay nagpatunay sa Europa na ang henyo ay walang kinikilalang lahi.',
    fullStory:
      'Ipininta ni Juan Luna sa Roma sa loob ng walong buwan at ipinanalo ng Unang Gintong Medalya sa Madrid noong 1884, ang Spoliarium ay hindi lamang larawan ng mga nasawing gladiator sa Roma—ito ay naging alegorya ng pagdurusa at paggising ng bansang Pilipinas. Sa piging para kina Luna at Hidalgo binigkas ni Dr. José Rizal ang kanyang makasaysayang brindis: "Ang henyo ay tulad ng liwanag at hangin—pag-aari ng lahat."',
    globalPride:
      'Ang pinakamalaking makasaysayang oil canvas sa Pilipinas at ang unang pagkakataon na tinalo ng mga Asyano ang mga pinakamahuhusay na pintor ng Europa sa sarili nilang akademya sa Madrid.',
    keyFacts: [
      { label: 'Sukat ng Canvas', value: '4.22 m × 7.675 m (Monumental Scale)' },
      { label: 'Gantimpala', value: '1st Gold Medal, Madrid Exposition 1884' },
      { label: 'Kasalukuyang Tahanan', value: 'Hall of Masters, National Museum Manila' },
      { label: 'Kasabay na Nagwagi', value: 'Félix Resurrección Hidalgo (Virgenes Cristianas)' },
    ],
    accentColor: '#C86D51',
    mapPos: { x: 46, y: 37 },
  },

  // ================= V. LUTUING PILIPINO (WORLD-CLASS CULINARY HERITAGE) =================
  {
    id: 'sinigang-adobo-sisig',
    catalogNo: 'CAT-PH-016',
    title: 'Sinigang, Adobo at Sisig: Korona ng Kusinang Pilipino',
    subtitle: 'TasteAtlas World’s #1 Best Vegetable Soup & Global Culinary Icons',
    baybayin: 'ᜎᜓᜆᜓᜁᜅ᜔ ᜉᜒᜎᜒᜉᜒᜈᜓ',
    category: 'lutuin',
    categoryLabel: 'Lutuing Pilipino',
    islandGroup: 'Buong Kapuluan',
    location: 'Pampanga, Katagalugan, Kabisayaan at Mindanao',
    coordinates: '15.0794° N, 120.6200° E',
    era: 'Pre-Kolonyal hanggang Kontemporaryo',
    recognition: 'Sinigang Ranked #1 Soup in the World • NYTimes Greatest Pork Dish (Sisig)',
    image: 'https://images.pexels.com/photos/6896281/pexels-photo-6896281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/6896281/pexels-photo-6896281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Mainit at malutong na Kapampangan Pork Sisig sa sizzling plate.',
      },
      {
        url: 'https://images.pexels.com/photos/7024389/pexels-photo-7024389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang maasim at malinamnam na Sinigang na hinirang bilang #1 Vegetable Soup sa buong mundo.',
      },
      {
        url: 'https://images.pexels.com/photos/37283916/pexels-photo-37283916.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Sari-saring lutuing bahay na nagpapakita ng balanseng lasa ng kusinang Pilipino.',
      },
    ],
    summary:
      'Mula sa natural na asim ng sampalok sa Sinigang, sinaunang sukang-bawang ng Adobo, hanggang sa sizzling Sisig ng Pampanga at Lechon de Cebu.',
    fullStory:
      'Ang lutuing Pilipino ay orihinal na "fusion cuisine" ng mundo—pinagtagpo ang katutubong Austronesian techniques (pagkilaw sa suka at kalamansi, pagluluto sa kawayan at palayok) at impluwensya ng Malay, Tsino, Espanyol, at Mehikano. Ang Sinigang ay gumagamit ng sariwang pampaasim ng bawat rehiyon: sampalok, kamias, bayabas, santol, o batwan sa Visayas.',
    globalPride:
      'Hinirang ng TasteAtlas ang Sinigang bilang #1 Best Soup sa mundo; tinawag naman ni Anthony Bourdain at ng New York Times ang Sisig ng Pampanga at Lechon de Cebu bilang walang-kapantay sa buong daigdig.',
    keyFacts: [
      { label: 'Sinigang Global Rank', value: '#1 Best Vegetable Soup in the World' },
      { label: 'Sisig Capital', value: 'Angeles City, Pampanga (Aling Lucing Legacy)' },
      { label: 'Sinaunang Pinagmulan', value: '3,000-Taong Kinilaw & Vinegar Braising' },
      { label: 'Michelin Star Wave', value: 'Kasama (Chicago) • Archipelago Restaurants Globally' },
    ],
    accentColor: '#E5B85C',
    mapPos: { x: 44, y: 31 },
  },
  {
    id: 'kamayan-boodle-kakanin',
    catalogNo: 'CAT-PH-017',
    title: 'Kamayan sa Dahon ng Saging, Kakanin at Kapeng Barako',
    subtitle: 'Communal Banana-Leaf Feast, Ube Phenomenon & Heritage Liberica Coffee',
    baybayin: 'ᜃᜋᜌᜈ᜔ ᜀᜆ᜔ ᜃᜃᜈᜒᜈ᜔',
    category: 'lutuin',
    categoryLabel: 'Lutuing Pilipino',
    islandGroup: 'Buong Kapuluan',
    location: 'Batangas, Pampanga, Iloilo at Buong Pilipinas',
    coordinates: '13.7565° N, 121.0583° E',
    era: 'Buhay na Tradisyon ng Salu-Salo',
    recognition: 'Global Culinary Movement • Ube Named Flavor of the Decade',
    image: 'https://images.pexels.com/photos/35482852/pexels-photo-35482852.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/35482852/pexels-photo-35482852.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Masaganang Kamayan / Boodle Fight sa ibabaw ng mabangong dahon ng saging.',
      },
      {
        url: 'https://images.pexels.com/photos/20089299/pexels-photo-20089299.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Sariwang yamang-dagat at mga gulay sa hapag-kainang Pilipino.',
      },
      {
        url: 'https://images.pexels.com/photos/38712744/pexels-photo-38712744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang sikat na almusal na Silog (Tapsilog) na paborito ng bawat Pilipino.',
      },
    ],
    summary:
      'Sa hapag ng Kamayan, walang mataas o mababa—lahat ay magkakasalo sa iisang mahabang dahon ng saging, sinabayan ng Bibingka, Halo-Halo, Ube, at Kapeng Barako.',
    fullStory:
      'Ang pagkain nang nakakamay sa ibabaw ng pinausukang dahon ng saging ay pagdiriwang ng pagkakapantay-pantay at pasasalamat sa biyaya ng lupa at dagat. Kasama rito ang ating mayamang tradisyon ng Kakanin (Bibingka, Puto Bumbong, Suman), ang Ube Halaya na ngayo’y sikat sa mga panaderya sa buong mundo, at ang bihirang Coffea liberica (Kapeng Barako ng Batangas at Cavite).',
    globalPride:
      'Ang Filipino Ube (Purple Yam) at Kamayan feasts ay naging pandaigdigang penomenon mula New York at London hanggang Sydney at Tokyo.',
    keyFacts: [
      { label: 'Pilosopiya ng Hapag', value: 'Walang Iwanan: Salu-salo ng Komunidad' },
      { label: 'Pandaigdigang Sangkap', value: 'Ube (Dioscorea alata) & Calamansi' },
      { label: 'Pamana ng Kape', value: 'Kapeng Barako (Rare Coffea Liberica)' },
      { label: 'Simbolo ng Pagbati', value: '"Kain Tayo!" — Puso ng Hospitality' },
    ],
    accentColor: '#F4A261',
    mapPos: { x: 47, y: 40 },
  },

  // ================= VI. KULTURA (FESTIVALS, MARTIAL ARTS & VALUES) =================
  {
    id: 'sinulog-ati-atihan-festivals',
    catalogNo: 'CAT-PH-018',
    title: 'Sinulog, Ati-Atihan, Dinagyang at Pahiyas',
    subtitle: 'Grand Street Pageantry, Indigenous Rhythm & Joyful Resilience',
    baybayin: 'ᜃᜉᜒᜐ᜔ᜆᜑᜈ᜔',
    category: 'kultura',
    categoryLabel: 'Kapistahan at Diwa',
    islandGroup: 'Visayas',
    location: 'Cebu, Kalibo (Aklan), Iloilo, Lucban (Quezon) at Bacolod',
    coordinates: '10.3157° N, 123.8854° E',
    era: 'Sinaunang Pasasalamat – Kasalukuyan',
    recognition: 'Asia’s Grandest Cultural Festivals • UNESCO Creative City (Cebu & Baguio & Iloilo)',
    image: MUSEUM_IMAGES.sinulogFestival,
    gallery: [
      {
        url: MUSEUM_IMAGES.sinulogFestival,
        caption: 'Ang maningning na kasuotan, ginto, at indak ng Sinulog at Pintados sa Kabisayaan.',
      },
      {
        url: 'https://images.pexels.com/photos/33320307/pexels-photo-33320307.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang matamis na ngiti at makulay na tradisyunal na kasuotan ng Pilipina.',
      },
    ],
    summary:
      'Tulad ng agos ng ilog ("Sulog"—dalawang hakbang pasulong, isang hakbang paurong), ang mga kapistahan ng Pilipinas ay pagsabog ng kulay, tambol, at pasasalamat.',
    fullStory:
      'Mula sa Ati-Atihan ng Aklan ("Mother of All Philippine Festivals"), Sinulog ng Cebu, at Dinagyang ng Iloilo, hanggang sa Pahiyas ng Lucban (kung saan ang mga bahay ay pinapalamutian ng makukulay na Kiping mula sa bigas), Panagbenga ng Baguio, Kadayawan ng Davao, at MassKara ng Bacolod ("City of Smiles"), ipinapakita ng Pilipino na sa gitna ng anumang pagsubok, ang bayan ay marunong sumayaw, magpasalamat, at ngumiti.',
    globalPride:
      'Dinadayo ng milyun-milyong bisita mula sa buong mundo at kinilala bilang ilan sa pinakamakulay at pinakamasiglang pagdiriwang ng kultura sa Asya.',
    keyFacts: [
      { label: 'Indak ng Sinulog', value: 'Sulog (Daloy ng Tubig: 2 Pasulong, 1 Paurong)' },
      { label: 'Ina ng Kapistahan', value: 'Ati-Atihan ng Kalibo, Aklan (Ika-13 Siglo)' },
      { label: 'Sining ng Pahiyas', value: 'Edible Rice-Wafer Kiping Chandeliers' },
      { label: 'Diwa ng MassKara', value: 'Ngiti at Pagbangon sa Gitna ng Pagsubok' },
    ],
    accentColor: '#E5B85C',
    mapPos: { x: 60, y: 62 },
  },
  {
    id: 'arnis-kali-eskrima-bayanihan',
    catalogNo: 'CAT-PH-019',
    title: 'Arnis (Kali / Eskrima) at Diwa ng Bayanihan',
    subtitle: 'National Martial Art Taught Worldwide & Philosophy of Kapwa',
    baybayin: 'ᜀᜇ᜔ᜈᜒᜐ᜔ ᜀᜆ᜔ ᜊᜌᜈᜒᜑᜈ᜔',
    category: 'kultura',
    categoryLabel: 'Kapistahan at Diwa',
    islandGroup: 'Buong Kapuluan',
    location: 'Mactan, Cebu at Buong Kapuluan ng Pilipinas',
    coordinates: '10.3111° N, 124.0150° E',
    era: 'Pre-Kolonyal na Sining ng Pakikidigma at Pagkakaisa',
    recognition: 'Pambansang Martial Art at Isport (RA 9850) • UNESCO Hudhud & Darangen',
    image: 'https://images.pexels.com/photos/36890811/pexels-photo-36890811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/36890811/pexels-photo-36890811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang disiplina, bilis ng kamay, at pamana ng lahing Pilipino.',
      },
    ],
    summary:
      'Sa digmaan man sa pamamagitan ng Arnis/Kali o sa pagtutulungan sa pamamagitan ng Bayanihan at Malasakit, ang lakas ng Pilipino ay nagmumula sa pagkilala sa "Kapwa".',
    fullStory:
      'Ang Arnis (kilala rin bilang Kali at Eskrima) ay katutubong sining ng pananggalang gamit ang yantok (rattan sticks), kampilan, at kamay na walang sandata. Kasabay ng pisikal na husay na ito ay ang pilosopiyang Pilipino ng "Kapwa" (ang pagkilala na ang iba ay bahagi ng iyong sarili) at "Bayanihan"—ang sama-samang pagbubuhat ng dambuhalang pasanin nang walang hinihintay na kapalit.',
    globalPride:
      'Ang Filipino Martial Arts (Kali/Eskrima/Arnis) ay itinuturo ngayon sa mga elite military at special forces sa USA, Europa, at Asya, at tampok sa mga pelikulang gaya ng Bourne Identity, John Wick, at Dune.',
    keyFacts: [
      { label: 'Batas Pambansa', value: 'Republic Act No. 9850 (National Martial Art)' },
      { label: 'Pandaigdigang Gamit', value: 'Taught to Global Special Forces & Cinema' },
      { label: 'Pundasyon ng Diwa', value: 'Kapwa • Bayanihan • Malasakit • Utang na Loob' },
      { label: 'UNESCO Oral Epics', value: 'Hudhud ng Ifugao at Darangen ng Maranao' },
    ],
    accentColor: '#C86D51',
    mapPos: { x: 58, y: 60 },
  },

  // ================= VII. DANGAL (HEROES & GLOBAL FILIPINO ICONS) =================
  {
    id: 'rizal-bonifacio-unang-republika',
    catalogNo: 'CAT-PH-020',
    title: 'Dr. José Rizal, Katipunan at ang Unang Republika sa Asya',
    subtitle: '1898 Birth of Constitutional Democracy in Asia & Anti-Colonial Pioneers',
    baybayin: 'ᜊᜌᜈᜒ ᜈᜅ᜔ ᜊᜌᜈ᜔',
    category: 'dangal',
    categoryLabel: 'Bayani at Dangal',
    islandGroup: 'Buong Kapuluan',
    location: 'Calamba, Maynila, Kawit at Barasoain (Malolos, Bulacan)',
    coordinates: '14.8444° N, 120.8112° E',
    era: '1521 (Mactan) • 1896 (Himagsikan) • 1899 (Malolos Republic)',
    recognition: 'Unang Konstitusyonal na Republika sa Buong Kontinente ng Asya',
    image: 'https://images.pexels.com/photos/37821439/pexels-photo-37821439.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/37821439/pexels-photo-37821439.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Monumental na arkitektura sa Maynila na saksi sa pakikibaka para sa kalayaan ng bansa.',
      },
      {
        url: 'https://images.pexels.com/photos/33258524/pexels-photo-33258524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Makasaysayang tore ng orasan na sumasagisag sa pagsilang ng bansa.',
      },
    ],
    summary:
      'Mula kay Lapulapu sa Mactan (1521) hanggang kina Dr. José Rizal, Andres Bonifacio, Gabriela Silang, Apolinario Mabini, at Melchora Aquino—ang Pilipinas ang nagluwal ng unang demokratikong republika sa Asya.',
    fullStory:
      'Sa pamamagitan ng Noli Me Tangere at El Filibusterismo ni Dr. José Rizal (isang doktor, eskultor, siyentipiko, at polyglot na nakapagsasalita ng 22 wika) at ng tapang ng Katipunan nina Andres Bonifacio at Gregoria de Jesus, nakamit ng Pilipinas ang pagtatatag ng Unang Republika sa Simbahan ng Barasoain sa Malolos noong Enero 23, 1899—ang kauna-unahang demokratikong konstitusyon sa buong Asya na naging inspirasyon ng iba pang bansa sa rehiyon.',
    globalPride:
      'Tinawag ni Mahatma Gandhi si Dr. José Rizal bilang tagapanguna at martir ng kalayaan sa Asya; may mga monumento si Rizal sa Madrid, Heidelberg, Tokyo, Chicago, at Sydney.',
    keyFacts: [
      { label: 'Makasaysayang Una', value: '1st Constitutional Republic in Asia (1899)' },
      { label: 'Unang Tagumpay (1521)', value: 'Tagumpay ni Lapulapu sa Labanan sa Mactan' },
      { label: 'Wika ni Rizal', value: '22 Wika (Polymath, Ophthalmologist, Writer)' },
      { label: 'Kababaihang Bayani', value: 'Gabriela Silang • Tandang Sora • Teresa Magbanua' },
    ],
    accentColor: '#FFD97D',
    mapPos: { x: 45, y: 34 },
  },
  {
    id: 'olympic-gold-champions-pacquiao-salonga',
    catalogNo: 'CAT-PH-021',
    title: 'Pandaigdigang Tagumpay: Yulo, Diaz, Pacquiao, Salonga at Agham',
    subtitle: 'Olympic Gold Glory, 8-Division Boxing Legend, Broadway Royalty & Silicon Valley Pioneers',
    baybayin: 'ᜆᜄᜓᜋ᜔ᜉᜌ᜔ ᜈᜅ᜔ ᜉᜒᜎᜒᜉᜒᜈᜓ',
    category: 'dangal',
    categoryLabel: 'Bayani at Dangal',
    islandGroup: 'Buong Kapuluan',
    location: 'Maynila, Zamboanga, General Santos at Buong Daigdig',
    coordinates: '14.5995° N, 120.9842° E',
    era: 'Ika-20 hanggang Ika-21 Siglo',
    recognition: 'Olympic Gold Medalists • Tony & Olivier Awards • World Hall of Fame',
    image: 'https://images.pexels.com/photos/38047173/pexels-photo-38047173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      {
        url: 'https://images.pexels.com/photos/38047173/pexels-photo-38047173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        caption: 'Ang patuloy na pagsulong ng bagong henerasyon ng mga Pilipino na nagdadala ng karangalan sa bansa.',
      },
    ],
    summary:
      'Mula sa unang Olympic Gold ni Hidilyn Diaz at makasaysayang Double Gold ni Carlos Yulo sa Paris 2024, hanggang kay Manny Pacquiao, Lea Salonga, Dr. Fe del Mundo, at Dado Banatao.',
    fullStory:
      'Sa larangan ng palakasan, winakasan ni Hidilyn Diaz (Tokyo 2020) ang 97-taong paghihintay ng Pilipinas para sa unang Olympic Gold, na sinundan ng makapigil-hiningang dalawang gintong medalya ni Carlos Yulo sa Gymnastics sa Paris 2024 Olympics, at nananatiling nag-iisang 8-Division World Boxing Champion sa kasaysayan si Manny Pacquiao. Sa sining, si Lea Salonga ang unang Asyanang nagwagi ng Tony Award at boses ng Disney Princesses. Sa agham, si Dr. Fe del Mundo ay nagbukas ng pinto sa Harvard Medical School at nagtatag ng unang pediatric hospital sa bansa, habang si Dado Banatao (mula sa Cagayan Valley) ay nag-imbento ng unang single-chip 16-bit microprocessor-based calculator at PC graphics accelerator sa Silicon Valley.',
    globalPride:
      'Pinatutunayan ng mga Pilipinong kampeon, artista, inhinyero, nars, at mandaragat sa buong mundo na ang galing at puso ng Pilipino ay pang-world-class sa anumang larangan.',
    keyFacts: [
      { label: 'Olympic Gold Glory', value: 'Hidilyn Diaz (Tokyo) & Carlos Yulo (2x Gold Paris)' },
      { label: 'Rekord sa Boksing', value: 'Manny Pacquiao — Only 8-Division World Champ' },
      { label: 'Tanghalang Pandaigdig', value: 'Lea Salonga — Tony, Olivier & Disney Legend' },
      { label: 'Agham at Teknolohiya', value: 'Dr. Fe del Mundo & Engr. Dado Banatao (Microchips)' },
    ],
    accentColor: '#E5B85C',
    mapPos: { x: 50, y: 48 },
  },
];

export interface TimelineMilestone {
  year: string;
  eraTag: string;
  title: string;
  baybayin: string;
  description: string;
  location: string;
  image: string;
}

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '67,000 BCE',
    eraTag: 'Sinaunang Pinagmulan',
    title: 'Homo luzonensis (Taong Callao) at Taong Tabon',
    baybayin: 'ᜐᜒᜈᜂᜈᜅ᜔ ᜆᜂ',
    description:
      'Natuklasan sa Kuweba ng Callao sa Cagayan ang Homo luzonensis—isang natatanging uri ng sinaunang tao na nagpabago sa pandaigdigang kasaysayan ng ebolusyon at pandaragat.',
    location: 'Peñablanca, Cagayan at Quezon, Palawan',
    image: 'https://images.pexels.com/photos/13256466/pexels-photo-13256466.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    year: '890 BCE',
    eraTag: 'Panahong Neolitiko',
    title: 'Paglikha ng Tapayang Manunggul at Payyo ng Ifugao',
    baybayin: 'ᜋᜈᜓᜅ᜔ᜄᜓᜎ᜔',
    description:
      'Umusbong ang mataas na sining ng paggawa ng seramika sa Palawan at nagsimula ang pag-ukit sa kabundukan ng Cordillera para sa Hagdan-Hagdang Palayan.',
    location: 'Palawan at Kabundukan ng Cordillera',
    image: MUSEUM_IMAGES.manunggulJar,
  },
  {
    year: '320 – 900 CE',
    eraTag: 'Gintong Kalakalan',
    title: 'Balangay ng Butuan at Inskripsiyon sa Binatbat na Tanso ng Laguna',
    baybayin: 'ᜊᜎᜅᜌ᜔ ᜀᜆ᜔ ᜄᜒᜈ᜔ᜆᜓ',
    description:
      'Naglayag ang mga Balangay sa Timog-Silangang Asya; naisulat noong Abril 21, 900 CE ang Laguna Copperplate Inscription na nagpapatunay ng batas, astronomiya, at kalakalan sa Tondo at Butuan.',
    location: 'Butuan, Tondo, at Lawa ng Laguna',
    image: MUSEUM_IMAGES.surigaoGold,
  },
  {
    year: '1521',
    eraTag: 'Katapangan sa Mactan',
    title: 'Tagumpay ni Datu Lapulapu sa Labanan sa Mactan',
    baybayin: 'ᜎᜉᜓᜎᜉᜓ',
    description:
      'Noong Abril 27, 1521, magiting na ipinagtanggol ni Datu Lapulapu at ng mga mandirigma ng Mactan ang kanilang lupain—ang unang matagumpay na paglaban ng mga Asyano sa pananakop ng Europa.',
    location: 'Pulo ng Mactan, Cebu',
    image: MUSEUM_IMAGES.sinulogFestival,
  },
  {
    year: '1884 – 1899',
    eraTag: 'Pagsilang ng Bansa',
    title: 'Spoliarium sa Madrid, Himagsikan ng 1896 at Unang Republika sa Asya',
    baybayin: 'ᜃᜎᜌᜀᜈ᜔',
    description:
      'Mula sa gintong medalya ni Juan Luna at mga aklat ni Rizal hanggang sa pagwawagayway ng Watawat at pagtatatag ng Unang Konstitusyonal na Republika sa Asya sa Malolos noong 1899.',
    location: 'Madrid, Kawit, at Malolos, Bulacan',
    image: MUSEUM_IMAGES.spoliariumArt,
  },
  {
    year: '2020 – 2026',
    eraTag: 'Pandaigdigang Dangal',
    title: 'Gintong Panahon sa Olympics, UNESCO Piña Weaving at Global Pinoy Pride',
    baybayin: 'ᜉᜈ᜔ᜇᜁᜄ᜔ᜇᜒᜄᜈ᜔',
    description:
      'Nakamit ng Pilipinas ang makasaysayang Olympic Golds nina Hidilyn Diaz at Carlos Yulo, ang UNESCO inscription ng Aklan Piña Weaving at Bohol Global Geopark, at pandaigdigang pagkilala sa sining at lutuing Pilipino.',
    location: 'Buong Kapuluan at Pandaigdigang Entablado',
    image: MUSEUM_IMAGES.pinaBarong,
  },
];

export interface BaybayinPreset {
  latin: string;
  baybayin: string;
  meaning: string;
  pronunciation: string;
}

export const BAYBAYIN_PRESETS: BaybayinPreset[] = [
  {
    latin: 'Pamana ng Lahi',
    baybayin: 'ᜉᜋᜈ ᜈᜅ᜔ ᜎᜑᜒ',
    meaning: 'Sacred Heritage of the Filipino People',
    pronunciation: 'Pa-ma-na nang La-hi',
  },
  {
    latin: 'Mabuhay Pilipinas',
    baybayin: 'ᜋᜊᜓᜑᜌ᜔ ᜉᜒᜎᜒᜉᜒᜈᜐ᜔',
    meaning: 'Long Live the Philippines — Celebrate Life',
    pronunciation: 'Ma-bu-hay Pi-li-pi-nas',
  },
  {
    latin: 'Kapwa at Bayanihan',
    baybayin: 'ᜃᜉ᜔ᜏ ᜀᜆ᜔ ᜊᜌᜈᜒᜑᜈ᜔',
    meaning: 'Shared Inner Self & Communal Unity',
    pronunciation: 'Kap-wa at Ba-ya-ni-han',
  },
  {
    latin: 'Lupang Hinirang',
    baybayin: 'ᜎᜓᜉᜅ᜔ ᜑᜒᜈᜒᜇᜅ᜔',
    meaning: 'Chosen Land — Cradle of Noble Heroes',
    pronunciation: 'Lu-pang Hi-ni-rang',
  },
  {
    latin: 'Alab ng Puso',
    baybayin: 'ᜀᜎᜊ᜔ ᜈᜅ᜔ ᜉᜓᜐᜓ',
    meaning: 'Immortal Flame of the Filipino Heart',
    pronunciation: 'A-lab nang Pu-so',
  },
  {
    latin: 'Dangal at Tapang',
    baybayin: 'ᜇᜅᜎ᜔ ᜀᜆ᜔ ᜆᜉᜅ᜔',
    meaning: 'Honor and Unyielding Courage',
    pronunciation: 'Da-ngal at Ta-pang',
  },
];

export const PRIDE_TICKER_ITEMS: string[] = [
  '★ 7,641 PULO NG PARAISO',
  '★ UNANG REPUBLIKA SA ASYA (1899)',
  '★ 6 UNESCO WORLD HERITAGE SITES',
  '★ SENTRO NG GLOBAL CORAL TRIANGLE',
  '★ SINIGANG: #1 SOUP IN THE WORLD',
  '★ AKLAN PIÑA WEAVING: UNESCO HERITAGE',
  '★ BOHOL: UNESCO GLOBAL GEOPARK',
  '★ MANUNGGUL JAR (890 BCE)',
  '★ SURIGAO 24K PRE-COLONIAL ROYAL GOLD',
  '★ OLYMPIC GOLD GLORY: DIAZ & YULO',
  '★ MANNY PACQUIAO: 8-DIVISION WORLD CHAMPION',
  '★ BAYANIHAN, KAPWA AT MALASAKIT',
];
