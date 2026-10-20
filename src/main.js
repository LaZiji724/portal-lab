import './style.css';
import { initPhysics } from './core/physics.js';
import { Game } from './Game.js';
import { UI, loadSettings } from './ui/UI.js';
import { TouchControls } from './core/TouchControls.js';
import { LEVELS } from './levels/index.js';

const ui = document.getElementById('ui');
const loading = document.createElement('div');
loading.id = 'loading';
loading.innerHTML = '<div class="spinner"></div><div>正在启动实验室…</div>';
document.body.appendChild(loading);

function readCustomLevel() {
  const params = new URLSearchParams(location.search);
  if (!params.has('custom')) return null;
  try {
    return JSON.parse(localStorage.getItem('portal-lab.customLevel'));
  } catch {
    return null;
  }
}

async function boot() {
  await initPhysics();
  const touch = TouchControls.isTouchDevice() && !matchMedia('(pointer: fine)').matches;
  const settings = loadSettings(touch);
  const game = new Game(document.getElementById('game'), { quality: settings.quality, touch });
  window.__game = game; // 方便调试和自动化测试
  window.__levels = LEVELS;

  let touchControls = null;
  if (touch) {
    touchControls = new TouchControls(ui, game.input, (act) => {
      if (act === 'blue' || act === 'orange') game.fire(act);
      else if (act === 'use') game.use();
      else if (act === 'pause') ui.dispatchEvent(new Event('touchpause'));
    });
  }
  const custom = readCustomLevel();
  const view = new UI(ui, game, { touch, touchControls, custom });
  ui.addEventListener('touchpause', () => view.pause());

  if (custom) {
    game.loadLevel(custom, -1);
    game.state = 'menu';
    view.show('menu');
    const tag = document.createElement('a');
    tag.className = 'custom-tag';
    tag.href = './editor.html';
    tag.textContent = '正在试玩自定义关卡 · 返回编辑器';
    ui.appendChild(tag);
    const btn = view.screens.menu.querySelector('[data-act="continue"]');
    btn.firstChild.textContent = '开始试玩 ';
    btn.querySelector('small').textContent = custom.name ?? '';
    btn.dataset.act = 'custom';
    view.screens.menu.addEventListener('click', (e) => {
      if (e.target.closest('[data-act="custom"]')) view.play(-1);
    });
  } else {
    game.loadLevel(LEVELS[0], 0);
    game.state = 'menu';
    view.show('menu');
  }
  game.start();
  loading.remove();
}

boot().catch((err) => {
  console.error(err);
  loading.innerHTML = `<div>启动失败：${err.message}</div><div style="font-size:13px">请使用支持 WebGL2 的新版浏览器（Chrome / Edge / Safari / Firefox）。</div>`;
});
