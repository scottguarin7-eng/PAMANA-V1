// Real-time Latin-to-Baybayin (Tagalog Script Unicode U+1700..U+171F) Transliterator

const VOWELS: Record<string, string> = {
  a: 'ᜀ',
  e: 'ᜁ',
  i: 'ᜁ',
  o: 'ᜂ',
  u: 'ᜂ',
};

const CONSONANTS: Record<string, string> = {
  b: 'ᜊ',
  k: 'ᜃ',
  c: 'ᜃ',
  d: 'ᜇ',
  r: 'ᜇ',
  g: 'ᜄ',
  h: 'ᜑ',
  l: 'ᜎ',
  m: 'ᜋ',
  n: 'ᜈ',
  ng: 'ᜅ',
  p: 'ᜉ',
  f: 'ᜉ',
  s: 'ᜐ',
  z: 'ᜐ',
  t: 'ᜆ',
  w: 'ᜏ',
  y: 'ᜌ',
  j: 'ᜇ᜔ᜌ',
  v: 'ᜊ',
};

const KUDLIT_EI = '\u1712'; // ᜒ
const KUDLIT_OU = '\u1713'; // ᜓ
const PAMUDPOD = '\u1714'; // ᜔ (virama / vowel killer)

export function transliterateToBaybayin(input: string): string {
  if (!input.trim()) return 'ᜉᜋᜈ';

  const words = input
    .toLowerCase()
    .replace(/[^a-zñ\s-]/g, '')
    .replace(/ñ/g, 'ny')
    .split(/\s+/);

  const convertedWords = words.map((word) => {
    let out = '';
    let i = 0;

    while (i < word.length) {
      const ch = word[i];
      if (ch === '-') {
        out += ' ';
        i++;
        continue;
      }

      // Check standalone vowel
      if (VOWELS[ch]) {
        out += VOWELS[ch];
        i++;
        continue;
      }

      // Check 'ng' digraph
      let cons = '';
      let step = 1;
      if (ch === 'n' && word[i + 1] === 'g') {
        cons = CONSONANTS['ng'];
        step = 2;
      } else if (CONSONANTS[ch]) {
        cons = CONSONANTS[ch];
        step = 1;
      } else {
        i++;
        continue;
      }

      const nextVowel = word[i + step];
      if (nextVowel && VOWELS[nextVowel]) {
        if (nextVowel === 'a') {
          out += cons;
        } else if (nextVowel === 'e' || nextVowel === 'i') {
          out += cons + KUDLIT_EI;
        } else if (nextVowel === 'o' || nextVowel === 'u') {
          out += cons + KUDLIT_OU;
        }
        i += step + 1;
      } else {
        // Standalone consonant gets pamudpod/krus-kudlit
        out += cons + PAMUDPOD;
        i += step;
      }
    }

    return out;
  });

  return convertedWords.join(' ');
}

// Web Audio API Kulintang Pentatonic Bronze Gong Chime Synthesizer
class KulintangAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Traditional Kulintang Pentatonic Frequencies (Hz)
  private scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

  public playGongNote(index?: number) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const freq =
        index !== undefined
          ? this.scale[index % this.scale.length]
          : this.scale[Math.floor(Math.random() * this.scale.length)];

      // Fundamental bronze resonance
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // Metallic harmonic overtone
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 1.498, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.075, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.85);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.9);
      osc2.stop(now + 1.9);
    } catch {
      // Ignore audio errors if blocked by browser policy
    }
  }

  public playChordFlourish() {
    if (!this.enabled) return;
    [0, 2, 4, 5].forEach((noteIdx, i) => {
      setTimeout(() => this.playGongNote(noteIdx), i * 110);
    });
  }
}

export const kulintangAudio = new KulintangAudioEngine();
