type Sound = 'jump' | 'double' | 'pickup' | 'over';
type Voice = { oscillator: OscillatorNode; envelope: GainNode };

/** Original, softly synthesized music. Created only by the click that opens Otto. */
export class RunnerAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private voices = new Set<Voice>();
  private timer: number | null = null;
  private playing = false;
  private disposed = false;
  private nextNote = 0;
  private step = 0;
  volume = 25;
  muted = false;
  failed = false;

  // This must be called directly from a user gesture to also work on iOS.
  unlock() {
    if (this.disposed) return;
    try {
      const AudioClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioClass) { this.failed = true; return; }
      if (!this.context) {
        this.context = new AudioClass();
        this.master = this.context.createGain();
        this.master.gain.value = this.level();
        this.master.connect(this.context.destination);
      }
      const context = this.context;
      void context.resume().then(() => {
        if (this.disposed) return;
        this.failed = false;
        if (this.playing) this.startScheduler();
      }).catch(() => { if (!this.disposed) this.failed = true; });
    } catch { this.failed = true; }
  }

  private level() { return this.muted ? 0 : Math.pow(this.volume / 100, 1.4) * .7; }
  setVolume(value: number) {
    this.volume = Math.max(0, Math.min(100, value));
    if (this.context && this.master) this.master.gain.setTargetAtTime(this.level(), this.context.currentTime, .025);
  }
  setMuted(value: boolean) { this.muted = value; this.setVolume(this.volume); }

  setPlaying(value: boolean) {
    if (this.disposed || this.playing === value) return;
    this.playing = value;
    if (value) this.startScheduler();
    else { this.stopScheduler(); this.stopVoices(); }
  }

  private startScheduler() {
    if (this.disposed || !this.playing || this.timer !== null || this.context?.state !== 'running') return;
    this.nextNote = this.context.currentTime + .06;
    this.schedule();
    this.timer = window.setInterval(() => this.schedule(), 80);
  }
  private stopScheduler() {
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
  }
  private schedule() {
    const ctx = this.context;
    if (!ctx || this.disposed || !this.playing || ctx.state !== 'running') return;
    // 92 BPM, sparse pentatonic phrases, mellow bass, no drums or harsh waveforms.
    const chords = [[50, 57, 60, 64], [46, 53, 57, 60], [53, 60, 64, 67], [48, 55, 60, 62]];
    const melody = [74, 0, 77, 0, 76, 0, 72, 0, 69, 0, 72, 74, 0, 0, 72, 0,
      77, 0, 79, 0, 76, 0, 74, 0, 72, 0, 69, 0, 67, 0, 0, 0];
    // Never catch up with a burst after the system has suspended the audio clock.
    if (this.nextNote < ctx.currentTime) this.nextNote = ctx.currentTime + .03;
    while (this.nextNote < ctx.currentTime + .18) {
      const chord = chords[Math.floor(this.step / 8) % chords.length];
      if (!this.muted && this.volume > 0) {
        if (this.step % 4 === 0) this.note(chord[0] - 12, this.nextNote, .6, .11);
        if (this.step % 2 === 0) this.note(chord[1 + (this.step / 2) % 3], this.nextNote, .38, .055, 'triangle');
        const pitch = melody[this.step % melody.length];
        if (pitch) this.note(pitch, this.nextNote, .28, .09);
      }
      this.nextNote += 60 / 92 / 2;
      this.step++;
    }
  }
  private note(midi: number, at: number, duration: number, amplitude: number, type: OscillatorType = 'sine', endMidi?: number) {
    const ctx = this.context, master = this.master;
    if (!ctx || !master || this.disposed || ctx.state !== 'running') return;
    const oscillator = ctx.createOscillator(), envelope = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(440 * 2 ** ((midi - 69) / 12), at);
    if (endMidi !== undefined) oscillator.frequency.exponentialRampToValueAtTime(440 * 2 ** ((endMidi - 69) / 12), at + duration);
    envelope.gain.setValueAtTime(0, at);
    envelope.gain.linearRampToValueAtTime(amplitude, at + .012);
    envelope.gain.exponentialRampToValueAtTime(.0001, at + duration);
    oscillator.connect(envelope); envelope.connect(master);
    const voice = { oscillator, envelope }; this.voices.add(voice);
    oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); this.voices.delete(voice); };
    oscillator.start(at); oscillator.stop(at + duration + .04);
  }
  effect(sound: Sound) {
    const ctx = this.context;
    if (!ctx || ctx.state !== 'running' || this.disposed || this.muted || !this.volume || (!this.playing && sound !== 'over')) return;
    const at = ctx.currentTime + .005;
    if (sound === 'jump') this.note(59, at, .11, .2, 'sine', 71);
    else if (sound === 'double') { this.note(71, at, .15, .18, 'sine', 83); this.note(78, at + .045, .13, .08); }
    else if (sound === 'pickup') [72, 76, 79, 84].forEach((pitch, i) => this.note(pitch, at + i * .08, .24, .15));
    else this.note(59, at, .28, .15, 'sine', 43);
  }
  private stopVoices() {
    const ctx = this.context;
    if (!ctx) return;
    for (const voice of this.voices) {
      voice.envelope.gain.cancelScheduledValues(ctx.currentTime);
      voice.envelope.gain.setTargetAtTime(0, ctx.currentTime, .008);
      voice.oscillator.stop(ctx.currentTime + .04);
    }
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true; this.playing = false;
    this.stopScheduler(); this.stopVoices();
    if (this.context && this.context.state !== 'closed') void this.context.close().catch(() => {});
    this.context = null; this.master = null;
  }
}
