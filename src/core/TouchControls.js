/**
 * 手机触屏操作：左下虚拟摇杆移动，右半屏拖动转视角，右下角是操作按键。
 */
export class TouchControls {
  constructor(root, input, actions) {
    this.input = input;
    this.actions = actions;
    this.root = root;
    this.lookTouch = null;
    this.stickTouch = null;
    this.stickCenter = { x: 0, y: 0 };
    this.lookSensitivity = 2.4; // 相对鼠标的倍数
    this._build();
  }

  static isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  _build() {
    const el = document.createElement('div');
    el.className = 'touch-ui';
    el.innerHTML = `
      <div class="touch-look"></div>
      <div class="touch-stick"><div class="touch-knob"></div></div>
      <div class="touch-buttons">
        <button class="tb tb-blue" data-act="blue">蓝门</button>
        <button class="tb tb-orange" data-act="orange">橙门</button>
        <button class="tb tb-jump" data-act="jump">跳</button>
        <button class="tb tb-use" data-act="use">拿</button>
      </div>
      <button class="tb tb-pause" data-act="pause">❚❚</button>
    `;
    this.root.appendChild(el);
    this.el = el;
    this.stick = el.querySelector('.touch-stick');
    this.knob = el.querySelector('.touch-knob');
    const look = el.querySelector('.touch-look');

    const opt = { passive: false };
    this.stick.addEventListener('touchstart', (e) => this._stickStart(e), opt);
    look.addEventListener('touchstart', (e) => this._lookStart(e), opt);
    window.addEventListener('touchmove', (e) => this._move(e), opt);
    window.addEventListener('touchend', (e) => this._end(e), opt);
    window.addEventListener('touchcancel', (e) => this._end(e), opt);

    for (const b of el.querySelectorAll('.tb')) {
      const act = b.dataset.act;
      b.addEventListener(
        'touchstart',
        (e) => {
          e.preventDefault();
          b.classList.add('down');
          if (act === 'jump') this.input.touchJump = true;
          else this.actions(act);
          // 按键也可以当作转视角的起点：按住按钮滑动同样能转头
          if (act !== 'pause' && !this.lookTouch) {
            const t = e.changedTouches[0];
            this.lookTouch = { id: t.identifier, x: t.clientX, y: t.clientY };
          }
        },
        opt
      );
      b.addEventListener('touchend', (e) => {
        e.preventDefault();
        b.classList.remove('down');
        if (act === 'jump') this.input.touchJump = false;
      });
    }
  }

  show(v) {
    this.el.style.display = v ? 'block' : 'none';
  }

  _stickStart(e) {
    e.preventDefault();
    const t = e.changedTouches[0];
    const r = this.stick.getBoundingClientRect();
    this.stickCenter = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    this.stickTouch = t.identifier;
    this._updateStick(t);
  }

  _lookStart(e) {
    e.preventDefault();
    const t = e.changedTouches[0];
    this.lookTouch = { id: t.identifier, x: t.clientX, y: t.clientY };
  }

  _updateStick(t) {
    const max = 55;
    let dx = t.clientX - this.stickCenter.x;
    let dy = t.clientY - this.stickCenter.y;
    const len = Math.hypot(dx, dy);
    if (len > max) {
      dx = (dx / len) * max;
      dy = (dy / len) * max;
    }
    this.knob.style.transform = `translate(${dx}px, ${dy}px)`;
    this.input.touchMove.x = dx / max;
    this.input.touchMove.y = -dy / max;
  }

  _move(e) {
    for (const t of e.changedTouches) {
      if (t.identifier === this.stickTouch) {
        e.preventDefault();
        this._updateStick(t);
      } else if (this.lookTouch && t.identifier === this.lookTouch.id) {
        e.preventDefault();
        const dx = t.clientX - this.lookTouch.x;
        const dy = t.clientY - this.lookTouch.y;
        this.lookTouch.x = t.clientX;
        this.lookTouch.y = t.clientY;
        this.input.addLook(dx * this.lookSensitivity, dy * this.lookSensitivity);
      }
    }
  }

  _end(e) {
    for (const t of e.changedTouches) {
      if (t.identifier === this.stickTouch) {
        this.stickTouch = null;
        this.input.touchMove.x = 0;
        this.input.touchMove.y = 0;
        this.knob.style.transform = '';
      }
      if (this.lookTouch && t.identifier === this.lookTouch.id) this.lookTouch = null;
    }
  }
}
