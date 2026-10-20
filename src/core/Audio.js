/**
 * 所有音效都用 Web Audio 实时合成，不需要音频文件。
 */
export class AudioManager {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.volume = 0.7;
    this.noiseBuf = null;
    this.ambient = null;
    this.holdHum = null;
  }

  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.volume;
      const comp = this.ctx.createDynamicsCompressor();
      this.master.connect(comp).connect(this.ctx.destination);
      const len = this.ctx.sampleRate * 2;
      this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this._startAmbient();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  setVolume(v) {
    this.volume = v;
    if (this.master) this.master.gain.value = v;
  }

  _env(node, t, a, peak, d) {
    node.gain.setValueAtTime(0.0001, t);
    node.gain.exponentialRampToValueAtTime(peak, t + a);
    node.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }

  _osc(type, f0, f1, dur, peak, t = this.ctx.currentTime, attack = 0.005) {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    this._env(g, t, attack, peak, dur);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + attack + dur + 0.05);
    return o;
  }

  _noise(filterType, f0, f1, q, dur, peak, t = this.ctx.currentTime, attack = 0.005) {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noiseBuf;
    const f = this.ctx.createBiquadFilter();
    f.type = filterType;
    f.Q.value = q;
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = this.ctx.createGain();
    this._env(g, t, attack, peak, dur);
    s.connect(f).connect(g).connect(this.master);
    s.start(t, Math.random());
    s.stop(t + attack + dur + 0.05);
  }

  _startAmbient() {
    // 实验室低频嗡鸣
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.gain.value = 0.035;
    for (const f of [55, 110.5, 165]) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      const og = ctx.createGain();
      og.gain.value = f === 55 ? 1 : 0.3;
      o.connect(og).connect(g);
      o.start();
    }
    const s = ctx.createBufferSource();
    s.buffer = this.noiseBuf;
    s.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 300;
    const ng = ctx.createGain();
    ng.gain.value = 0.25;
    s.connect(lp).connect(ng).connect(g);
    s.start();
    g.connect(this.master);
    this.ambient = g;
  }

  setHolding(on) {
    if (!this.ctx) return;
    if (on && !this.holdHum) {
      const o = this.ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = 92;
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 5;
      const lg = this.ctx.createGain();
      lg.gain.value = 6;
      lfo.connect(lg).connect(o.frequency);
      const f = this.ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = 400;
      const g = this.ctx.createGain();
      g.gain.value = 0;
      g.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.15);
      o.connect(f).connect(g).connect(this.master);
      o.start();
      lfo.start();
      this.holdHum = { o, lfo, g };
    } else if (!on && this.holdHum) {
      const { o, lfo, g } = this.holdHum;
      const t = this.ctx.currentTime;
      g.gain.cancelScheduledValues(t);
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(0, t + 0.15);
      o.stop(t + 0.2);
      lfo.stop(t + 0.2);
      this.holdHum = null;
    }
  }

  play(name, arg) {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const t = this.ctx.currentTime;
    switch (name) {
      case 'shoot': {
        const hi = arg === 'blue';
        this._osc('sawtooth', hi ? 1400 : 900, hi ? 300 : 180, 0.18, 0.12);
        this._noise('bandpass', hi ? 5000 : 3000, 600, 2, 0.15, 0.18);
        break;
      }
      case 'portalOpen': {
        const base = arg === 'blue' ? 220 : 165;
        this._osc('sine', base, base * 2, 0.35, 0.18, t, 0.04);
        this._osc('triangle', base * 1.5, base * 3, 0.3, 0.06, t + 0.02, 0.03);
        this._noise('bandpass', 400, 3000, 4, 0.35, 0.12, t, 0.05);
        break;
      }
      case 'fail':
        this._osc('square', 180, 70, 0.25, 0.08);
        this._noise('highpass', 2000, 800, 1, 0.12, 0.1);
        break;
      case 'teleport':
        this._noise('bandpass', 300, 2500, 3, 0.25, 0.22, t, 0.02);
        this._osc('sine', 300, 600, 0.2, 0.06);
        break;
      case 'pickup':
        this._osc('sine', 240, 480, 0.12, 0.12);
        break;
      case 'drop':
        this._osc('sine', 400, 180, 0.12, 0.1);
        break;
      case 'deny':
        this._osc('square', 140, 140, 0.12, 0.06);
        break;
      case 'buttonDown':
        this._noise('lowpass', 1200, 200, 1, 0.08, 0.3);
        this._osc('sine', 520, 520, 0.18, 0.1, t + 0.04);
        this._osc('sine', 780, 780, 0.25, 0.08, t + 0.12);
        break;
      case 'buttonUp':
        this._noise('lowpass', 900, 200, 1, 0.08, 0.2);
        this._osc('sine', 600, 300, 0.2, 0.08, t + 0.03);
        break;
      case 'doorOpen':
      case 'doorClose':
        this._noise('lowpass', name === 'doorOpen' ? 200 : 600, name === 'doorOpen' ? 800 : 150, 2, 0.7, 0.18, t, 0.08);
        this._osc('sawtooth', 60, name === 'doorOpen' ? 90 : 45, 0.7, 0.05, t, 0.08);
        break;
      case 'step':
        this._noise('bandpass', 1800 + Math.random() * 600, 600, 1.5, 0.05, 0.06);
        break;
      case 'jump':
        this._noise('bandpass', 900, 400, 1, 0.08, 0.05);
        break;
      case 'land': {
        const k = Math.min(1, (arg ?? 4) / 15);
        this._noise('lowpass', 900, 120, 1, 0.12 + k * 0.2, 0.15 + k * 0.4);
        this._osc('sine', 120, 50, 0.15 + k * 0.15, 0.1 + k * 0.25);
        break;
      }
      case 'death':
        this._noise('bandpass', 3000, 200, 2, 0.8, 0.3, t, 0.01);
        this._osc('sawtooth', 300, 40, 0.8, 0.12);
        break;
      case 'fizzle':
        this._noise('highpass', 6000, 1500, 1, 0.4, 0.15);
        break;
      case 'complete':
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this._osc('triangle', f, f, 0.5, 0.12, t + i * 0.11, 0.01));
        break;
      default:
        break;
    }
  }
}
