#!/usr/bin/env python3
"""把 ambientCG（CC0）的 PBR 照片材质加工成游戏用的贴图，输出到 public/tex/。

用法：python3 tools/bake_textures.py <下载好的 zip 解压目录>
解压目录里每个材质一个文件夹，例如 Plastic011/Plastic011_1K-JPG_Color.jpg。
用到的材质：Plastic010、Plastic011、Plastic006、Terrazzo004、Tiles052、Concrete016、MetalPlates015A。
墙板的缝、倒角、螺丝是这里叠上去的；底材质感来自照片。每套输出三张图：
  <名>_c.webp 颜色（sRGB）  <名>_n.webp 法线（OpenGL）  <名>_o.webp  R=AO G=粗糙度 B=金属度
"""
import sys, os
import numpy as np
from PIL import Image

SRC = sys.argv[1]
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'tex')
os.makedirs(OUT, exist_ok=True)
N = 1024


def load(mat, kind, size=N):
    p = os.path.join(SRC, mat, f'{mat}_1K-JPG_{kind}.jpg')
    im = Image.open(p)
    if im.mode != 'RGB' and kind in ('Color', 'NormalGL'):
        im = im.convert('RGB')
    if im.size != (size, size):
        im = im.resize((size, size), Image.LANCZOS)
    return np.asarray(im).astype(np.float32) / 255.0


def smooth(x):
    x = np.clip(x, 0, 1)
    return x * x * (3 - 2 * x)


def save(name, color, normal, orm, q=(82, 90, 85)):
    def w(arr, suffix, quality):
        im = Image.fromarray((np.clip(arr, 0, 1) * 255 + 0.5).astype(np.uint8))
        path = os.path.join(OUT, f'{name}_{suffix}.webp')
        im.save(path, 'WEBP', quality=quality, method=6)
        print(f'  {os.path.basename(path)} {os.path.getsize(path) // 1024} KB')
    w(color, 'c', q[0])
    w(normal, 'n', q[1])
    w(orm, 'o', q[2])


def normal_from_height(h, strength):
    dx = (np.roll(h, -1, 1) - np.roll(h, 1, 1)) * 0.5
    dy = (np.roll(h, -1, 0) - np.roll(h, 1, 0)) * 0.5
    nx = -dx * strength
    ny = dy * strength
    return nx, ny


def pack_normal(nx, ny):
    nz = np.ones_like(nx)
    l = np.sqrt(nx * nx + ny * ny + nz * nz)
    return np.stack([nx / l * 0.5 + 0.5, ny / l * 0.5 + 0.5, nz / l * 0.5 + 0.5], -1)


def photo_xy(mat):
    n = load(mat, 'NormalGL') * 2 - 1
    return n[..., 0], n[..., 1]


def panel_height(inset=True, bolts=True, size=N, panels=2):
    """size 像素 = 2 米，panels×panels 块，缝宽约 1 厘米。返回高度图 h(0 缝底 → 1 板面)、边距 e、螺丝遮罩。"""
    cell = size // panels
    ys, xs = np.mgrid[0:size, 0:size].astype(np.float32)
    lx = (xs + 0.5) % cell
    ly = (ys + 0.5) % cell
    e = np.minimum(np.minimum(lx, cell - lx), np.minimum(ly, cell - ly))
    gap = 3.0
    bevel = 9.0
    h = smooth((e - gap) / bevel)
    if inset:
        d = np.abs(e - 46.0)
        h -= 0.22 * (1 - smooth(d / 2.5)) * (e > 20)
    bolt = np.zeros_like(h)
    if bolts:
        for cx, cy in [(26, 26), (cell - 26, 26), (26, cell - 26), (cell - 26, cell - 26)]:
            r = np.hypot(lx - cx, ly - cy)
            bolt = np.maximum(bolt, 1 - smooth((r - 5.0) / 3.0))
        h += 0.45 * bolt
    return h, e, bolt


def bake_panel(name, color_mat, rough_mat, normal_mat, base_level, white, seed):
    rng = np.random.default_rng(seed)
    col = load(color_mat, 'Color')
    lum = col.mean(-1, keepdims=True)
    if white:
        # 压到偏亮的暖白，保留照片里的轻微起伏
        col = 0.90 + (lum - lum.mean()) * 0.8
        col = np.repeat(col, 3, -1) * np.array([1.0, 1.0, 0.985], np.float32)
    else:
        col = np.repeat(base_level + (lum - lum.mean()) * 1.6, 3, -1)
    rough = load(rough_mat, 'Roughness')
    if rough.ndim == 3:
        rough = rough[..., 0]
    h, e, bolt = panel_height(inset=not white, bolts=not white)
    # 每块板略有明暗差
    cell = N // 2
    tint = 0.94 + rng.random((2, 2), dtype=np.float32) * 0.08
    tile = np.kron(tint, np.ones((cell, cell), np.float32))
    col = col * tile[..., None]
    groove = 1 - smooth((e - 1.5) / 7.0)  # 缝与倒角处变暗
    col = col * (1 - 0.62 * groove[..., None])
    col = col + bolt[..., None] * (0.10 if not white else 0.0)
    if not white:
        # 倒角边缘微微发亮，像金属受光
        edge = smooth((e - 4) / 3.0) * (1 - smooth((e - 9) / 4.0))
        col = col + edge[..., None] * 0.045
    ao = 1 - 0.55 * groove
    ao *= 1 - 0.0 * bolt
    r = rough * (0.9 if white else 0.8) + 0.12 * groove
    if white:
        r = 0.30 + r * 0.55
    else:
        r = 0.28 + r * 0.55
    metal = np.full_like(r, 0.0 if white else 0.55)
    metal = metal * (1 - 0.7 * groove)
    gx, gy = normal_from_height(h, 5.0 if white else 6.0)
    px, py = photo_xy(normal_mat)
    nx, ny = gx + px * 0.8, gy + py * 0.8
    save(name, np.clip(col, 0, 1), pack_normal(nx, ny), np.stack([ao, np.clip(r, 0, 1), metal], -1))


def bake_photo(name, mat, color_gain=1.0, rough_gain=1.0, metal=0.0, normal_gain=1.0):
    col = np.clip(load(mat, 'Color') * color_gain, 0, 1)
    n = load(mat, 'NormalGL') * 2 - 1
    nx, ny = n[..., 0] * normal_gain, n[..., 1] * normal_gain
    ao = load(mat, 'AmbientOcclusion') if os.path.exists(os.path.join(SRC, mat, f'{mat}_1K-JPG_AmbientOcclusion.jpg')) else np.ones((N, N), np.float32)
    if ao.ndim == 3:
        ao = ao[..., 0]
    r = load(mat, 'Roughness')
    r = r[..., 0] if r.ndim == 3 else r
    m = np.full_like(r, metal)
    mp = os.path.join(SRC, mat, f'{mat}_1K-JPG_Metalness.jpg')
    if os.path.exists(mp):
        m = load(mat, 'Metalness')
        m = m[..., 0] if m.ndim == 3 else m
    save(name, col, pack_normal(nx / 1.0, ny / 1.0), np.stack([ao, np.clip(r * rough_gain, 0, 1), m], -1))


print('white'); bake_panel('white', 'Plastic010', 'Plastic010', 'Plastic010', 0.9, True, 3)
print('dark'); bake_panel('dark', 'Plastic011', 'Plastic006', 'Plastic011', 0.36, False, 7)
print('floor_light'); bake_photo('floor_light', 'Terrazzo004', 0.95, 0.8)
print('floor_dark'); bake_photo('floor_dark', 'Tiles052', 1.5, 0.75)
print('floor_cool'); bake_photo('floor_cool', 'Concrete016', 0.9, 0.8)
print('plate'); bake_photo('plate', 'MetalPlates015A', 1.0, 1.0, 0.7)
