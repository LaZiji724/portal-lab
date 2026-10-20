/**
 * 统一的输入：键盘鼠标和触屏都写进同一份状态，游戏逻辑不用关心来源。
 */
export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = new Set();
    this.move = { x: 0, y: 0 };
    this.lookDX = 0;
    this.lookDY = 0;
    this.jump = false;
    this.touchMove = { x: 0, y: 0 };
    this.touchJump = false;
    this.sensitivity = 0.0022;
    this.locked = false;
    this.enabled = false;
    this.handlers = {};
    this.scripted = null; // 自动化测试用：{ move:{x,y}, jump }

    window.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      this.keys.add(e.code);
      if (!this.enabled) return;
      if (e.code === 'KeyE' || e.code === 'KeyF') this._emit('use');
      if (e.code === 'KeyR') this._emit('restart');
      if (e.code === 'KeyQ') this._emit('fire', 'blue');
      if (e.code === 'Space') e.preventDefault();
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => this.keys.clear());

    canvas.addEventListener('mousedown', (e) => {
      if (!this.enabled) return;
      if (!this.locked && !this.touchMode) {
        this.requestLock();
        return;
      }
      if (e.button === 0) this._emit('fire', 'blue');
      else if (e.button === 2) this._emit('fire', 'orange');
    });
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('pointerlockchange', () => {
      const was = this.locked;
      this.locked = document.pointerLockElement === canvas;
      if (was && !this.locked) this._emit('unlock');
    });
    document.addEventListener('mousemove', (e) => {
      if (!this.locked) return;
      // 过滤偶发的超大跳变（部分浏览器在锁定瞬间会给出异常值）
      if (Math.abs(e.movementX) > 400 || Math.abs(e.movementY) > 400) return;
      this.lookDX += e.movementX;
      this.lookDY += e.movementY;
    });
  }

  requestLock() {
    try {
      const p = this.canvas.requestPointerLock({ unadjustedMovement: true });
      if (p && p.catch) p.catch(() => this.canvas.requestPointerLock());
    } catch {
      this.canvas.requestPointerLock();
    }
  }

  on(name, fn) {
    this.handlers[name] = fn;
  }

  _emit(name, arg) {
    this.handlers[name]?.(arg);
  }

  addLook(dx, dy) {
    this.lookDX += dx;
    this.lookDY += dy;
  }

  /** 每帧调用一次，汇总移动方向 */
  poll() {
    if (this.scripted) {
      this.move.x = this.scripted.move?.x ?? 0;
      this.move.y = this.scripted.move?.y ?? 0;
      this.jump = !!this.scripted.jump;
      return;
    }
    const k = this.keys;
    let x = 0;
    let y = 0;
    if (k.has('KeyW') || k.has('ArrowUp')) y += 1;
    if (k.has('KeyS') || k.has('ArrowDown')) y -= 1;
    if (k.has('KeyD') || k.has('ArrowRight')) x += 1;
    if (k.has('KeyA') || k.has('ArrowLeft')) x -= 1;
    x += this.touchMove.x;
    y += this.touchMove.y;
    const len = Math.hypot(x, y);
    if (len > 1) {
      x /= len;
      y /= len;
    }
    this.move.x = this.enabled ? x : 0;
    this.move.y = this.enabled ? y : 0;
    this.jump = this.enabled && (k.has('Space') || this.touchJump);
  }

  consumeLook() {
    const dx = this.lookDX * this.sensitivity;
    const dy = this.lookDY * this.sensitivity;
    this.lookDX = 0;
    this.lookDY = 0;
    return [dx, dy];
  }
}
