// Romantic generative acoustic / music box sound player
let audioCtx: AudioContext | null = null;
let isPlaying = false;
let intervalId: any = null;

const NOTES: Record<string, number> = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  G5: 783.99,
};

const MELODY = [
  'C4', 'E4', 'G4', 'C5',
  'G4', 'E4', 'D4', 'G4',
  'B4', 'D5', 'A4', 'C5',
  'E5', 'D5', 'C5', 'G4'
];

function playNote(freq: number, duration: number = 1.4) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    // Warm chime / kalimba-like tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Graceful ignore
  }
}

export function toggleRomanticAudio(callback?: (playing: boolean) => void): boolean {
  if (isPlaying) {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
    isPlaying = false;
    if (callback) callback(false);
    return false;
  }

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return false;
    
    if (!audioCtx || audioCtx.state === 'suspended') {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlaying = true;
    let step = 0;

    // Play immediate first note
    playNote(NOTES[MELODY[0]], 1.5);

    intervalId = setInterval(() => {
      if (!isPlaying) return;
      step = (step + 1) % MELODY.length;
      const noteName = MELODY[step];
      if (NOTES[noteName]) {
        playNote(NOTES[noteName], 1.6);
      }
    }, 900);

    if (callback) callback(true);
    return true;
  } catch (err) {
    console.error('Audio playback error', err);
    isPlaying = false;
    if (callback) callback(false);
    return false;
  }
}

export function isAudioActive(): boolean {
  return isPlaying;
}
