import './editor.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { LEVELS } from '../levels/index.js';
import { getMaterials, brushGeometry, BRUSH_MATERIALS, MATERIAL_LABELS } from '../world/materials.js';
import {
  createCubeMesh,
  createButtonMesh,
  createDoorMesh,
  createExitMesh,
  createHazardMesh,
  createLightFixture,
  createSpawnMarker,
  createPortalMarker,
} from '../world/entityVisuals.js';

const DRAFT_KEY = 'portal-lab.editorDraft';
const CUSTOM_KEY = 'portal-lab.customLevel';
const LABEL = {
  brush: '墙体',
  spawn: '出生点',
  cube: '方块',
  button: '按钮',
  door: '门',
  exit: '出口',
  hazard: '酸液',
  light: '灯',
  portal: '固定传送门',
};
const SIZED = new Set(['brush', 'door', 'exit', 'hazard']);
const FACINGS = {
  '+x': { normal: [1, 0, 0], up: [0, 1, 0], label: '朝 +X' },
  '-x': { normal: [-1, 0, 0], up: [0, 1, 0], label: '朝 -X' },
  '+z': { normal: [0, 0, 1], up: [0, 1, 0], label: '朝 +Z' },
  '-z': { normal: [0, 0, -1], up: [0, 1, 0], label: '朝 -Z' },
  '+y': { normal: [0, 1, 0], up: [0, 0, -1], label: '朝上（地面）' },
  '-y': { normal: [0, -1, 0], up: [0, 0, -1], label: '朝下（天花板）' },
};

const $ = (id) => document.getElementById(id);
const clone = (o) => JSON.parse(JSON.stringify(o));
const round = (v, s = 0.001) => Math.round(v / s) * s;
const fmt = (v) => +(+v).toFixed(3);

// ---------------------------------------------------------------- 渲染器与场景

const viewport = $('viewport');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
viewport.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101418);
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.5;
scene.add(new THREE.HemisphereLight(0xdde6ff, 0x30302c, 1.2));
const sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(10, 20, 8);
scene.add(sun);
const grid = new THREE.GridHelper(80, 80, 0x3a4652, 0x222a31);
grid.position.y = 0.001;
scene.add(grid);
scene.add(new THREE.AxesHelper(1.5));

const camera = new THREE.PerspectiveCamera(60, 1, 0.05, 500);
camera.position.set(16, 16, 20);
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.target.set(0, 1, 0);

const tc = new TransformControls(camera, renderer.domElement);
tc.setTranslationSnap(0.25);
scene.add(tc.getHelper());
tc.addEventListener('dragging-changed', (e) => (orbit.enabled = !e.value));

const root = new THREE.Group();
scene.add(root);
const mats = getMaterials('high', renderer.capabilities.getMaxAnisotropy());

function resize() {
  const w = viewport.clientWidth;
  const h = viewport.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(viewport);

// ---------------------------------------------------------------- 关卡数据

let level = null;
let items = [];
let selected = null;
let history = [];
let future = [];

function blankLevel() {
  const T = 0.5;
  return {
    version: 1,
    name: '我的关卡',
    hint: '',
    gun: 'both',
    spawn: { pos: [0, 0, 4], yaw: 0 },
    brushes: [
      { pos: [0, -0.25, 0], size: [13, 0.5, 13], mat: 'concrete' },
      { pos: [0, 5.25, 0], size: [13, 0.5, 13], mat: 'metal' },
      { pos: [-6.25, 2.5, 0], size: [T, 5, 12], mat: 'white' },
      { pos: [6.25, 2.5, 0], size: [T, 5, 12], mat: 'metal' },
      { pos: [0, 2.5, -6.25], size: [13, 5, T], mat: 'metal' },
      { pos: [0, 2.5, 6.25], size: [13, 5, T], mat: 'white' },
    ],
    entities: [
      { type: 'exit', pos: [0, 1.25, -4.5], size: [2.2, 2.5, 2.2] },
      { type: 'light', pos: [0, 4.85, 0], intensity: 35, shadow: true },
    ],
  };
}

function itemsFromLevel() {
  const out = [{ kind: 'spawn', data: level.spawn }];
  for (const b of level.brushes) out.push({ kind: 'brush', data: b });
  for (const e of level.entities) out.push({ kind: e.type, data: e });
  return out;
}

function buildObject(item) {
  const d = item.data;
  let obj;
  switch (item.kind) {
    case 'brush': {
      obj = new THREE.Mesh(brushGeometry(d.size, d.pos), mats[d.mat] ?? mats.metal);
      break;
    }
    case 'spawn':
      obj = createSpawnMarker();
      obj.rotation.y = THREE.MathUtils.degToRad(d.yaw ?? 0);
      break;
    case 'cube':
      obj = createCubeMesh();
      break;
    case 'button':
      obj = createButtonMesh().group;
      break;
    case 'door':
      obj = createDoorMesh(d.size ?? [0.3, 3, 3]).group;
      break;
    case 'exit':
      obj = createExitMesh(d.size ?? [2.2, 2.5, 2.2]);
      break;
    case 'hazard': {
      obj = createHazardMesh(d.size ?? [4, 1.6, 4]);
      const s = d.size ?? [4, 1.6, 4];
      obj.add(new THREE.Mesh(new THREE.BoxGeometry(...s), new THREE.MeshBasicMaterial({ color: 0x40ff40, wireframe: true })));
      break;
    }
    case 'light': {
      obj = new THREE.Group();
      const fixture = createLightFixture(d);
      fixture.position.y = 0.12;
      obj.add(fixture);
      obj.add(new THREE.PointLight(new THREE.Color(d.color ?? 0xfff1dc), (d.intensity ?? 30) * 0.6, d.distance ?? 22, 2));
      obj.add(new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffe9a8 })));
      break;
    }
    case 'portal': {
      obj = new THREE.Group();
      const m = createPortalMarker(d.color ?? 'orange');
      const n = new THREE.Vector3(...(d.normal ?? [0, 0, 1]));
      const up = new THREE.Vector3(...(d.up ?? [0, 1, 0]));
      const right = new THREE.Vector3().crossVectors(up, n);
      m.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(right, up, n));
      m.position.copy(n).multiplyScalar(0.02);
      obj.add(m);
      break;
    }
    default:
      obj = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({ color: 0xff00ff }));
  }
  obj.position.set(...d.pos);
  obj.userData.item = item;
  item.obj = obj;
  return obj;
}

function rebuildAll() {
  tc.detach();
  root.clear();
  items = itemsFromLevel();
  for (const it of items) root.add(buildObject(it));
  if (selected) {
    const again = items.find((i) => i.data === selected.data);
    selected = again ?? null;
  }
  select(selected);
  refreshMeta();
  refreshList();
  applyCut();
  validate();
}

function rebuild(item) {
  const attached = tc.object === item.obj;
  root.remove(item.obj);
  root.add(buildObject(item));
  if (attached) tc.attach(item.obj);
  applyCut();
}

// ---------------------------------------------------------------- 历史记录与保存

function snapshot() {
  return JSON.stringify(level);
}

function commit() {
  const s = snapshot();
  if (history[history.length - 1] === s) return;
  history.push(s);
  if (history.length > 120) history.shift();
  future = [];
  try {
    localStorage.setItem(DRAFT_KEY, s);
  } catch {
    /* 忽略 */
  }
  validate();
  refreshList();
}

function restore(s) {
  const selIndex = selected ? items.indexOf(selected) : -1;
  level = JSON.parse(s);
  selected = null;
  rebuildAll();
  if (selIndex >= 0 && items[selIndex]) select(items[selIndex]);
  try {
    localStorage.setItem(DRAFT_KEY, s);
  } catch {
    /* 忽略 */
  }
}

function undo() {
  if (history.length < 2) return;
  future.push(history.pop());
  restore(history[history.length - 1]);
}

function redo() {
  if (!future.length) return;
  const s = future.pop();
  history.push(s);
  restore(s);
}

function loadLevel(def) {
  level = clone(def);
  level.entities ??= [];
  level.brushes ??= [];
  level.spawn ??= { pos: [0, 0, 0], yaw: 0 };
  selected = null;
  history = [];
  future = [];
  rebuildAll();
  commit();
  frameAll();
}

// ---------------------------------------------------------------- 选择与变换

function select(item) {
  selected = item;
  if (item && item.obj) {
    tc.attach(item.obj);
    if (tc.mode === 'scale' && !SIZED.has(item.kind)) setMode('translate');
  } else tc.detach();
  refreshProps();
  for (const li of $('list').children) li.classList.toggle('sel', li._item === item);
}

function setMode(mode) {
  if (mode === 'scale' && selected && !SIZED.has(selected.kind)) return;
  tc.setMode(mode);
  for (const b of document.querySelectorAll('[data-mode]')) b.classList.toggle('on', b.dataset.mode === mode);
}

let scaleStart = null;
tc.addEventListener('mouseDown', () => {
  if (selected && tc.mode === 'scale') scaleStart = [...selected.data.size];
});
tc.addEventListener('objectChange', () => {
  if (!selected) return;
  const o = selected.obj;
  const d = selected.data;
  const snap = $('snap').checked ? 0.25 : 0.001;
  if (tc.mode === 'translate') {
    d.pos = [o.position.x, o.position.y, o.position.z].map((v) => fmt(round(v, snap)));
    o.position.set(...d.pos);
  } else if (tc.mode === 'scale' && scaleStart) {
    d.size = scaleStart.map((s, i) => fmt(Math.max(0.05, round(s * Math.abs(o.scale.getComponent(i)), snap))));
  }
  refreshProps(true);
});
tc.addEventListener('mouseUp', () => {
  if (!selected) return;
  if (tc.mode === 'scale') {
    selected.obj.scale.set(1, 1, 1);
    rebuild(selected);
    scaleStart = null;
  } else if (selected.kind === 'brush') rebuild(selected); // 重新计算世界坐标贴图
  commit();
});

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let downAt = null;
renderer.domElement.addEventListener('pointerdown', (e) => {
  downAt = [e.clientX, e.clientY];
});
renderer.domElement.addEventListener('pointerup', (e) => {
  if (!downAt || e.button !== 0) return;
  const moved = Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]);
  downAt = null;
  if (moved > 4 || tc.dragging || tc.axis) return;
  const r = renderer.domElement.getBoundingClientRect();
  pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(root.children.filter((o) => o.visible), true);
  for (const h of hits) {
    let o = h.object;
    while (o && !o.userData.item) o = o.parent;
    if (o && o.visible) {
      // 优先选中小物体：同一条射线上，墙体排在实体后面
      const ent = hits.find((x) => {
        let p = x.object;
        while (p && !p.userData.item) p = p.parent;
        return p && p.userData.item.kind !== 'brush' && x.distance < h.distance + 1.5;
      });
      if (ent) {
        let p = ent.object;
        while (!p.userData.item) p = p.parent;
        return select(p.userData.item);
      }
      return select(o.userData.item);
    }
  }
  select(null);
});

function frameAll() {
  const box = new THREE.Box3().setFromObject(root);
  if (box.isEmpty()) return;
  const c = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3()).length();
  orbit.target.copy(c);
  camera.position.copy(c).add(new THREE.Vector3(0.6, 0.7, 0.9).normalize().multiplyScalar(size * 0.8));
}

function focusSelected() {
  if (!selected) return frameAll();
  const box = new THREE.Box3().setFromObject(selected.obj);
  const c = box.getCenter(new THREE.Vector3());
  const size = Math.max(3, box.getSize(new THREE.Vector3()).length());
  const dir = camera.position.clone().sub(orbit.target).normalize();
  orbit.target.copy(c);
  camera.position.copy(c).addScaledVector(dir, size * 1.6);
}

function applyCut() {
  const cut = parseFloat($('cut').value);
  for (const it of items) {
    const d = it.data;
    const minY = it.kind === 'brush' ? d.pos[1] - d.size[1] / 2 : d.pos[1] - 0.01;
    it.obj.visible = minY < cut;
  }
}

// ---------------------------------------------------------------- 添加 / 删除 / 复制

function dropPoint() {
  const t = orbit.target;
  return [round(t.x, 0.25), Math.max(0, round(t.y, 0.25)), round(t.z, 0.25)].map(fmt);
}

function add(kind) {
  const p = dropPoint();
  const [x, y, z] = p;
  let created = [];
  if (kind.startsWith('brush:')) {
    const mat = kind.split(':')[1];
    created.push({ list: 'brushes', data: { pos: [x, y + 1.5, z], size: mat === 'glass' || mat === 'grate' ? [4, 3, 0.2] : [4, 3, 0.5], mat } });
  } else if (kind === 'room') {
    const w = 10;
    const h = 5;
    const t = 0.5;
    const b = (pos, size, mat) => created.push({ list: 'brushes', data: { pos, size, mat } });
    b([x, y - t / 2, z], [w + 2 * t, t, w + 2 * t], 'concrete');
    b([x, y + h + t / 2, z], [w + 2 * t, t, w + 2 * t], 'metal');
    b([x - w / 2 - t / 2, y + h / 2, z], [t, h, w], 'white');
    b([x + w / 2 + t / 2, y + h / 2, z], [t, h, w], 'white');
    b([x, y + h / 2, z - w / 2 - t / 2], [w + 2 * t, h, t], 'metal');
    b([x, y + h / 2, z + w / 2 + t / 2], [w + 2 * t, h, t], 'metal');
    created.push({ list: 'entities', data: { type: 'light', pos: [x, y + h - 0.15, z], intensity: 35, shadow: true } });
  } else {
    const defs = {
      cube: { type: 'cube', pos: [x, y + 0.35, z] },
      button: { type: 'button', id: nextButtonId(), pos: [x, y, z] },
      door: { type: 'door', pos: [x, y + 1.5, z], size: [0.3, 3, 3], requires: [lastButtonId()] },
      exit: { type: 'exit', pos: [x, y + 1.25, z], size: [2.2, 2.5, 2.2] },
      hazard: { type: 'hazard', pos: [x, y - 1.2, z], size: [4, 1.6, 4] },
      light: { type: 'light', pos: [x, y + 4, z], intensity: 30 },
      portal: { type: 'portal', color: 'orange', pos: [x, y + 1.13, z], normal: [0, 0, 1], up: [0, 1, 0] },
    };
    created.push({ list: 'entities', data: defs[kind] });
  }
  for (const c of created) level[c.list].push(c.data);
  rebuildAll();
  select(items.find((i) => i.data === created[created.length - 1].data));
  commit();
}

function nextButtonId() {
  const ids = new Set(level.entities.filter((e) => e.type === 'button').map((e) => e.id));
  let i = 1;
  while (ids.has('b' + i)) i++;
  return 'b' + i;
}

function lastButtonId() {
  const b = level.entities.filter((e) => e.type === 'button');
  return b.length ? b[b.length - 1].id : 'b1';
}

function removeSelected() {
  if (!selected || selected.kind === 'spawn') return;
  const list = selected.kind === 'brush' ? level.brushes : level.entities;
  const i = list.indexOf(selected.data);
  if (i >= 0) list.splice(i, 1);
  selected = null;
  rebuildAll();
  commit();
}

function duplicateSelected() {
  if (!selected || selected.kind === 'spawn') return;
  const copy = clone(selected.data);
  copy.pos[0] = fmt(copy.pos[0] + 1);
  if (copy.type === 'button') copy.id = nextButtonId();
  (selected.kind === 'brush' ? level.brushes : level.entities).push(copy);
  rebuildAll();
  select(items.find((i) => i.data === copy));
  commit();
}

// ---------------------------------------------------------------- 面板

function refreshMeta() {
  $('lv-name').value = level.name ?? '';
  $('lv-hint').value = level.hint ?? '';
  $('lv-gun').value = level.gun ?? 'both';
}

function itemName(it) {
  const d = it.data;
  if (it.kind === 'brush') return `${MATERIAL_LABELS[d.mat]?.split('（')[0] ?? d.mat}`;
  if (it.kind === 'button') return `按钮 ${d.id ?? ''}`;
  if (it.kind === 'door') return `门 ← ${(d.requires ?? []).join(',')}`;
  if (it.kind === 'portal') return `固定传送门（${d.color === 'blue' ? '蓝' : '橙'}）`;
  return LABEL[it.kind] ?? it.kind;
}

function refreshList() {
  const ul = $('list');
  ul.innerHTML = '';
  for (const it of items) {
    const li = document.createElement('li');
    li._item = it;
    li.className = it === selected ? 'sel' : '';
    li.innerHTML = `<span>${itemName(it)}</span><span class="t">${it.data.pos.map((v) => (+v).toFixed(1)).join(', ')}</span>`;
    li.addEventListener('click', () => {
      select(it);
      focusSelected();
    });
    ul.appendChild(li);
  }
}

function vecInput(label, key, d, step = 0.25) {
  const v = d[key] ?? [0, 0, 0];
  return `<label>${label}<div class="vec" data-vec="${key}">${v
    .map((x, i) => `<input type="number" step="${step}" data-i="${i}" value="${fmt(x)}" />`)
    .join('')}</div></label>`;
}

function refreshProps(valuesOnly = false) {
  const box = $('props');
  if (!selected) {
    box.innerHTML = '<p class="muted">选中一个物体后可以在这里精确修改。左键点击场景或列表即可选中。</p>';
    return;
  }
  const d = selected.data;
  if (valuesOnly) {
    for (const el of box.querySelectorAll('[data-vec]')) {
      const v = d[el.dataset.vec];
      if (!v) continue;
      el.querySelectorAll('input').forEach((inp, i) => {
        if (document.activeElement !== inp) inp.value = fmt(v[i]);
      });
    }
    return;
  }
  let html = `<p><b>${LABEL[selected.kind]}</b></p>`;
  html += vecInput(selected.kind === 'brush' ? '中心位置 (x, y, z)' : '位置 (x, y, z)', 'pos', d);
  if (SIZED.has(selected.kind)) html += vecInput('尺寸 (宽, 高, 深)', 'size', d);
  if (selected.kind === 'brush') {
    html += `<label>材质<select data-k="mat">${BRUSH_MATERIALS.map((m) => `<option value="${m}" ${d.mat === m ? 'selected' : ''}>${MATERIAL_LABELS[m]}</option>`).join('')}</select></label>`;
  }
  if (selected.kind === 'spawn') html += `<label>朝向（度，0 = 朝 -Z）<input type="number" step="15" data-k="yaw" value="${d.yaw ?? 0}" /></label>`;
  if (selected.kind === 'button') html += `<label>按钮编号<input data-k="id" value="${d.id ?? ''}" /></label>`;
  if (selected.kind === 'door') html += `<label>需要按下的按钮（逗号分隔）<input data-k="requires" value="${(d.requires ?? []).join(',')}" /></label>`;
  if (selected.kind === 'light') {
    html += `<label>亮度<input type="number" step="5" data-k="intensity" value="${d.intensity ?? 30}" /></label>`;
    html += `<label>范围（米）<input type="number" step="1" data-k="distance" value="${d.distance ?? 22}" /></label>`;
    html += `<label>颜色<input type="color" data-k="color" value="#${new THREE.Color(d.color ?? 0xfff1dc).getHexString()}" /></label>`;
    html += `<label><input type="checkbox" data-k="shadow" ${d.shadow ? 'checked' : ''} /> 投射阴影（每关最多 2 盏）</label>`;
  }
  if (selected.kind === 'portal') {
    html += `<label>颜色<select data-k="color"><option value="blue" ${d.color === 'blue' ? 'selected' : ''}>蓝色</option><option value="orange" ${d.color !== 'blue' ? 'selected' : ''}>橙色</option></select></label>`;
    const cur = Object.entries(FACINGS).find(([, f]) => f.normal.join() === (d.normal ?? [0, 0, 1]).join())?.[0] ?? '+z';
    html += `<label>朝向<select data-k="facing">${Object.entries(FACINGS)
      .map(([k, f]) => `<option value="${k}" ${k === cur ? 'selected' : ''}>${f.label}</option>`)
      .join('')}</select></label>`;
    html += '<p class="muted">固定传送门要紧贴墙面放置，门中心离地 1.13 米时刚好落地。</p>';
  }
  if (selected.kind !== 'spawn') {
    html += `<div class="prop-actions"><button data-act="dup">复制 (Ctrl+D)</button><button data-act="del" class="danger">删除 (Del)</button></div>`;
  }
  box.innerHTML = html;

  for (const el of box.querySelectorAll('[data-vec]')) {
    el.addEventListener('change', () => {
      d[el.dataset.vec] = [...el.querySelectorAll('input')].map((i) => fmt(parseFloat(i.value) || 0));
      if (el.dataset.vec === 'size') d.size = d.size.map((v) => Math.max(0.05, v));
      rebuild(selected);
      commit();
    });
  }
  for (const el of box.querySelectorAll('[data-k]')) {
    el.addEventListener('change', () => {
      const k = el.dataset.k;
      if (k === 'requires') d.requires = el.value.split(/[,，\s]+/).filter(Boolean);
      else if (k === 'facing') Object.assign(d, { normal: [...FACINGS[el.value].normal], up: [...FACINGS[el.value].up] });
      else if (k === 'shadow') d.shadow = el.checked;
      else if (k === 'color' && selected.kind === 'light') d.color = parseInt(el.value.slice(1), 16);
      else if (el.type === 'number') d[k] = parseFloat(el.value) || 0;
      else d[k] = el.value;
      rebuild(selected);
      commit();
    });
  }
  box.querySelector('[data-act="dup"]')?.addEventListener('click', duplicateSelected);
  box.querySelector('[data-act="del"]')?.addEventListener('click', removeSelected);
}

function validate() {
  const issues = [];
  const ents = level.entities;
  if (!ents.some((e) => e.type === 'exit')) issues.push('还没有出口，玩家无法通关。');
  const ids = new Set(ents.filter((e) => e.type === 'button').map((e) => e.id));
  for (const d of ents.filter((e) => e.type === 'door')) {
    for (const r of d.requires ?? []) if (!ids.has(r)) issues.push(`门需要的按钮「${r}」不存在。`);
    if (!(d.requires ?? []).length) issues.push('有一扇门没有关联任何按钮，它永远打不开。');
  }
  const fixed = ents.filter((e) => e.type === 'portal');
  if (fixed.length > 2) issues.push('固定传送门最多两扇（一蓝一橙）。');
  if (new Set(fixed.map((f) => f.color)).size < fixed.length) issues.push('两扇固定传送门颜色相同。');
  const gun = level.gun ?? 'both';
  for (const f of fixed) if (gun === f.color || gun === 'both') issues.push(`传送门枪能发射${f.color === 'blue' ? '蓝' : '橙'}色，但这个颜色已有固定门（玩家将无法发射这种颜色）。`);
  if (gun !== 'none' && !level.brushes.some((b) => b.mat === 'white')) issues.push('关卡里没有白色面板，玩家开不了传送门。');
  if (ents.filter((e) => e.type === 'light' && e.shadow).length > 2) issues.push('超过 2 盏灯开了阴影，多出的不会生效。');
  $('issues').innerHTML = issues.length
    ? `<h3>检查</h3>${issues.map((t) => `<div class="warn">${t}</div>`).join('')}`
    : '<h3>检查</h3><div class="ok">✓ 关卡看起来可以玩了</div>';
  return issues;
}

// ---------------------------------------------------------------- 顶栏与快捷键

const builtin = $('builtin');
builtin.innerHTML = `<option value="">打开内置关卡…</option>${LEVELS.map((l, i) => `<option value="${i}">${i + 1}. ${l.name}</option>`).join('')}`;
builtin.addEventListener('change', () => {
  if (builtin.value !== '') loadLevel(LEVELS[+builtin.value]);
  builtin.value = '';
});
$('btn-new').addEventListener('click', () => confirm('新建一个空白关卡？未导出的修改可以用“撤销”找回。') && loadLevel(blankLevel()));
$('btn-import').addEventListener('click', () => $('file').click());
$('file').addEventListener('change', async () => {
  const f = $('file').files[0];
  if (!f) return;
  try {
    const def = JSON.parse(await f.text());
    if (!Array.isArray(def.brushes)) throw new Error('缺少 brushes 字段');
    loadLevel(def);
  } catch (e) {
    alert('导入失败：' + e.message);
  }
  $('file').value = '';
});
$('btn-export').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(level, null, 1)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${(level.name || 'level').replace(/[\\/:*?"<>|]/g, '_')}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});
$('btn-undo').addEventListener('click', undo);
$('btn-redo').addEventListener('click', redo);
$('btn-play').addEventListener('click', () => {
  const issues = validate();
  if (issues.length && !confirm(`还有 ${issues.length} 个问题：\n\n${issues.join('\n')}\n\n仍然试玩？`)) return;
  try {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(level));
  } catch {
    alert('浏览器不允许保存数据，无法试玩。');
    return;
  }
  location.href = './index.html?custom=1';
});
for (const b of document.querySelectorAll('[data-add]')) b.addEventListener('click', () => add(b.dataset.add));
for (const b of document.querySelectorAll('[data-mode]')) b.addEventListener('click', () => setMode(b.dataset.mode));
$('cut').addEventListener('input', applyCut);
$('snap').addEventListener('change', () => tc.setTranslationSnap($('snap').checked ? 0.25 : null));
$('lv-name').addEventListener('change', (e) => {
  level.name = e.target.value;
  commit();
});
$('lv-hint').addEventListener('change', (e) => {
  level.hint = e.target.value;
  commit();
});
$('lv-gun').addEventListener('change', (e) => {
  level.gun = e.target.value;
  commit();
});

window.addEventListener('keydown', (e) => {
  const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
  if (typing) return;
  const mod = e.ctrlKey || e.metaKey;
  if (mod && e.code === 'KeyZ' && !e.shiftKey) {
    e.preventDefault();
    undo();
  } else if (mod && (e.code === 'KeyY' || (e.code === 'KeyZ' && e.shiftKey))) {
    e.preventDefault();
    redo();
  } else if (mod && e.code === 'KeyD') {
    e.preventDefault();
    duplicateSelected();
  } else if (e.code === 'Delete' || e.code === 'Backspace') removeSelected();
  else if (e.code === 'KeyW') setMode('translate');
  else if (e.code === 'KeyE') setMode('scale');
  else if (e.code === 'KeyF') focusSelected();
  else if (e.code === 'Escape') select(null);
});

// ---------------------------------------------------------------- 启动

let draft = null;
try {
  draft = JSON.parse(localStorage.getItem(DRAFT_KEY));
} catch {
  draft = null;
}
loadLevel(draft && Array.isArray(draft.brushes) ? draft : LEVELS[0]);
resize();

renderer.setAnimationLoop(() => {
  orbit.update();
  renderer.render(scene, camera);
});
window.__editor = { get level() { return level; }, add, select, items: () => items };
