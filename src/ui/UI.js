import { LEVELS, CHAPTERS } from '../levels/index.js';

const SETTINGS_KEY = 'portal-lab.settings';
const PROGRESS_KEY = 'portal-lab.progress';

function load(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* 隐私模式下可能写不进去，忽略 */
  }
}

export function loadSettings(touch) {
  return {
    sensitivity: 1,
    volume: 0.7,
    quality: touch ? 'low' : 'high',
    fov: 75,
    ...load(SETTINGS_KEY, {}),
  };
}

const h = (html) => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};

export class UI {
  constructor(root, game, { touch, touchControls, custom }) {
    this.root = root;
    this.game = game;
    this.touch = touch;
    this.touchControls = touchControls;
    this.custom = custom;
    this.settings = loadSettings(touch);
    this.progress = load(PROGRESS_KEY, { unlocked: 0, done: [] });
    this.settingsBack = 'menu';
    if (touch) document.body.classList.add('touch');
    this.build();
    this.applySettings();
    this.bind();
  }

  build() {
    const r = this.root;
    this.hud = h(`
      <div id="hud">
        <div class="crosshair"><div class="half l"></div><div class="half r"></div><div class="dot"></div></div>
        <div class="banner"><div class="lv"></div><div class="nm"></div></div>
        <div class="hint"></div>
        <div class="toast"></div>
        <div class="flash">重新开始…</div>
      </div>`);
    r.appendChild(this.hud);

    const keyHelp = this.touch
      ? `<div class="keys">
          <b>左下摇杆</b><span>移动</span>
          <b>右侧拖动</b><span>转动视角</span>
          <b>蓝门 / 橙门</b><span>发射对应颜色的传送门</span>
          <b>跳</b><span>跳跃</span>
          <b>拿</b><span>拿起 / 放下方块</span>
        </div>`
      : `<div class="keys">
          <b>W A S D</b><span>移动</span>
          <b>鼠标</b><span>转动视角</span>
          <b>左键 / 右键</b><span>发射蓝色 / 橙色传送门</span>
          <b>空格</b><span>跳跃</span>
          <b>E</b><span>拿起 / 放下方块</span>
          <b>R</b><span>重新开始本关</span>
          <b>H</b><span>显示 / 隐藏提示</span>
          <b>Esc</b><span>暂停</span>
        </div>`;

    this.screens = {
      menu: h(`
        <div class="screen" id="menu"><div class="card">
          <h1 class="title"><span class="b">传送</span><span class="o">门</span>实验室</h1>
          <p class="subtitle">第一人称物理解谜 · 用两扇门穿越一切</p>
          <button class="btn primary" data-act="continue">开始游戏 <small></small></button>
          <button class="btn" data-act="levels">选择关卡</button>
          <button class="btn" data-act="settings">设置</button>
          <button class="btn" data-act="help">操作说明</button>
          <a class="btn" href="./editor.html">关卡编辑器</a>
        </div></div>`),
      levels: h(`
        <div class="screen" id="levels"><div class="card wide">
          <h2>选择关卡</h2>
          <div class="levels"></div>
          <button class="btn" data-act="back">返回</button>
        </div></div>`),
      pause: h(`
        <div class="screen" id="pause"><div class="card">
          <h2>已暂停</h2>
          <button class="btn primary" data-act="resume">继续游戏</button>
          <button class="btn" data-act="restart">重新开始本关</button>
          <button class="btn" data-act="levels">选择关卡</button>
          <button class="btn" data-act="settings">设置</button>
          <button class="btn" data-act="help">操作说明</button>
          <button class="btn" data-act="menu">返回主菜单</button>
        </div></div>`),
      complete: h(`
        <div class="screen" id="complete"><div class="card">
          <h2 class="ctitle">关卡完成</h2>
          <p class="subtitle ctext"></p>
          <button class="btn primary" data-act="next">下一关</button>
          <button class="btn" data-act="restart">再玩一次</button>
          <button class="btn" data-act="menu">返回主菜单</button>
        </div></div>`),
      settings: h(`
        <div class="screen" id="settings"><div class="card">
          <h2>设置</h2>
          <div class="row"><label>视角灵敏度</label><input type="range" min="0.2" max="3" step="0.05" data-set="sensitivity" /></div>
          <div class="row"><label>音量</label><input type="range" min="0" max="1" step="0.05" data-set="volume" /></div>
          <div class="row"><label>视野 (FOV)</label><input type="range" min="60" max="100" step="1" data-set="fov" /></div>
          <div class="row"><label>画质</label>
            <select data-set="quality">
              <option value="low">低（门中门 1 层，无阴影）</option>
              <option value="medium">中（门中门 2 层）</option>
              <option value="high">高（门中门 3 层，高清）</option>
            </select>
          </div>
          <button class="btn" data-act="back">返回</button>
        </div></div>`),
      help: h(`
        <div class="screen" id="help"><div class="card">
          <h2>操作说明</h2>
          ${keyHelp}
          <p class="subtitle" style="margin-top:16px">传送门只能开在<b style="color:#fff">白色面板</b>上。两扇门都开好之后，人、方块、甚至速度都能穿过去。</p>
          <button class="btn" data-act="back">返回</button>
        </div></div>`),
    };
    for (const s of Object.values(this.screens)) r.appendChild(s);
    if (this.touchControls) this.touchControls.show(false);
    this.$ = (sel) => this.hud.querySelector(sel);
  }

  bind() {
    const g = this.game;
    for (const [name, el] of Object.entries(this.screens)) {
      el.addEventListener('click', (e) => {
        const b = e.target.closest('[data-act]');
        if (!b) return;
        g.audio.unlock();
        this.action(b.dataset.act, name);
      });
    }
    for (const input of this.screens.settings.querySelectorAll('[data-set]')) {
      input.addEventListener('input', () => {
        const k = input.dataset.set;
        this.settings[k] = k === 'quality' ? input.value : parseFloat(input.value);
        this.applySettings();
        save(SETTINGS_KEY, this.settings);
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyH' && g.state === 'playing') this.toggleHint();
    });

    g.on('pause', () => this.pause());
    g.on('level', (def, index) => this.onLevel(def, index));
    g.on('portals', () => this.updateCrosshair());
    g.on('toast', (t) => this.toast(t));
    g.on('death', () => this.$('.flash').classList.add('show'));
    g.on('respawn', () => {
      this.$('.flash').classList.remove('show');
      this.updateCrosshair();
    });
    g.on('complete', (i) => this.onComplete(i));
  }

  applySettings() {
    const s = this.settings;
    const g = this.game;
    g.input.sensitivity = 0.0022 * s.sensitivity;
    g.audio.setVolume(s.volume);
    if (g.quality !== s.quality) g.setQuality(s.quality);
    g.setFov(s.fov);
    for (const input of this.screens.settings.querySelectorAll('[data-set]')) input.value = s[input.dataset.set];
  }

  show(name) {
    this.current = name;
    for (const [n, el] of Object.entries(this.screens)) el.classList.toggle('show', n === name);
    const playing = name === null;
    this.hud.classList.toggle('show', playing || this.game.state === 'paused');
    this.touchControls?.show(playing);
    if (name === 'menu') this.refreshMenu();
    if (name === 'levels') this.refreshLevels();
  }

  refreshMenu() {
    const btn = this.screens.menu.querySelector('[data-act="continue"]');
    const next = Math.min(this.progress.unlocked, LEVELS.length - 1);
    btn.firstChild.textContent = this.progress.unlocked > 0 ? '继续游戏 ' : '开始游戏 ';
    btn.querySelector('small').textContent = `第 ${next + 1} 关 · ${LEVELS[next].name}`;
  }

  refreshLevels() {
    const box = this.screens.levels.querySelector('.levels');
    box.innerHTML = '';
    let chapter = -1;
    LEVELS.forEach((lv, i) => {
      if ((lv.chapter ?? 0) !== chapter) {
        chapter = lv.chapter ?? 0;
        const head = document.createElement('h3');
        head.className = 'chapter';
        head.textContent = CHAPTERS?.[chapter] ?? `第 ${chapter + 1} 章`;
        box.appendChild(head);
      }
      const t = document.createElement('button');
      t.className = 'level-tile';
      t.disabled = i > this.progress.unlocked;
      t.innerHTML = `<span class="num">第 ${i + 1} 关</span><span class="name">${lv.name}</span>${
        this.progress.done.includes(i) ? '<span class="done">✓ 已通过</span>' : t.disabled ? '<span class="num">🔒 未解锁</span>' : ''
      }`;
      t.addEventListener('click', () => {
        this.game.audio.unlock();
        this.play(i);
      });
      box.appendChild(t);
    });
  }

  action(act, from) {
    switch (act) {
      case 'continue':
        this.play(Math.min(this.progress.unlocked, LEVELS.length - 1));
        break;
      case 'levels':
        this.back = from;
        this.show('levels');
        break;
      case 'settings':
        this.back = from;
        this.show('settings');
        break;
      case 'help':
        this.back = from;
        this.show('help');
        break;
      case 'back':
        this.show(this.back ?? 'menu');
        break;
      case 'resume':
        this.resume();
        break;
      case 'restart':
        this.game.restart();
        this.resume();
        break;
      case 'next':
        if (this.custom) location.href = './editor.html';
        else if (this.game.levelIndex + 1 < LEVELS.length) this.play(this.game.levelIndex + 1);
        else this.toMenu();
        break;
      case 'menu':
        this.toMenu();
        break;
      default:
        break;
    }
  }

  play(index) {
    const def = this.custom && index === -1 ? this.custom : LEVELS[index];
    this.game.loadLevel(def, index);
    this.resume();
  }

  resume() {
    this.game.state = 'playing';
    this.show(null);
    if (!this.touch) this.game.input.requestLock();
    this.game.input.enabled = true;
  }

  pause() {
    if (this.game.state !== 'playing') return;
    this.game.state = 'paused';
    this.game.input.enabled = false;
    this.show('pause');
  }

  toMenu() {
    this.game.state = 'menu';
    this.game.input.enabled = false;
    if (document.pointerLockElement) document.exitPointerLock();
    this.game.loadLevel(LEVELS[0], 0);
    this.game.state = 'menu';
    this.show('menu');
  }

  onLevel(def, index) {
    this.$('.banner .lv').textContent = index >= 0 ? `第 ${index + 1} 关 / 共 ${LEVELS.length} 关` : '自定义关卡';
    this.$('.banner .nm').textContent = def.name ?? '未命名关卡';
    const banner = this.$('.banner');
    banner.style.opacity = 1;
    clearTimeout(this.bannerTimer);
    this.bannerTimer = setTimeout(() => (banner.style.opacity = 0), 3500);
    const hint = this.$('.hint');
    let text = def.hint ?? '';
    if (this.touch) {
      text = text
        .replace(/点击画面锁定鼠标。/g, '')
        .replace(/左键/g, '「蓝门」键')
        .replace(/右键/g, '「橙门」键')
        .replace(/按 E /g, '按「拿」键');
    }
    hint.innerHTML = `${text}<div class="k">${this.touch ? '' : '按 H 隐藏提示'}</div>`;
    hint.style.opacity = def.hint ? 1 : 0;
    this.hintVisible = !!def.hint;
    this.updateCrosshair();
  }

  toggleHint() {
    this.hintVisible = !this.hintVisible;
    this.$('.hint').style.opacity = this.hintVisible ? 1 : 0;
  }

  updateCrosshair() {
    const g = this.game;
    const l = this.$('.crosshair .l');
    const r = this.$('.crosshair .r');
    l.classList.toggle('on', g.portals.blue.placed);
    r.classList.toggle('on', g.portals.orange.placed);
    l.classList.toggle('off', !g.allowColor('blue'));
    r.classList.toggle('off', !g.allowColor('orange'));
  }

  toast(text) {
    const t = this.$('.toast');
    t.textContent = text;
    t.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => t.classList.remove('show'), 1600);
  }

  onComplete(index) {
    this.game.input.enabled = false;
    if (document.pointerLockElement) document.exitPointerLock();
    const el = this.screens.complete;
    const last = index === LEVELS.length - 1;
    if (index >= 0) {
      if (!this.progress.done.includes(index)) this.progress.done.push(index);
      this.progress.unlocked = Math.max(this.progress.unlocked, Math.min(index + 1, LEVELS.length - 1));
      save(PROGRESS_KEY, this.progress);
    }
    const t = this.game.time;
    el.querySelector('.ctitle').textContent = last ? '全部通关！' : '关卡完成';
    el.querySelector('.ctext').textContent = this.custom || !LEVELS[index]
      ? `自定义关卡完成，用时 ${t.toFixed(1)} 秒。`
      : `「${LEVELS[index].name}」用时 ${t.toFixed(1)} 秒。${last ? '你已经掌握了传送门的全部诀窍。' : ''}`;
    el.querySelector('[data-act="next"]').textContent = this.custom ? '回到编辑器' : last ? '返回主菜单' : '下一关';
    setTimeout(() => this.show('complete'), 400);
  }
}
