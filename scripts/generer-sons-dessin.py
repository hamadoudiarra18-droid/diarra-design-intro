# Sons du dessin animé : musique joyeuse (10 s), « pop » et « boing ».
# Utilisation : python3 scripts/generer-sons-dessin.py public/audio
import numpy as np, wave, sys
SR = 44100
out = sys.argv[1]
rng = np.random.default_rng(11)

def save(name, x):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.9
    st = np.stack([x, x], 1)
    with wave.open(f"{out}/{name}", "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())

def t(d): return np.arange(int(SR * d)) / SR
def note(m): return 440 * 2 ** ((m - 69) / 12)

# --- Musique sautillante : 150 bpm, do majeur, basse « oom-pah » + mélodie xylophone ---
D = 10.0; n = int(SR * D); music = np.zeros(n); beat = 60 / 150
def add(start, x):
    s = int(start * SR)
    if s >= n: return
    music[s:s + len(x)] += x[: n - s]
def pluck(m, d, vol):
    tt = t(d); f = note(m)
    return (np.sin(2*np.pi*f*tt) + 0.4*np.sin(2*np.pi*3*f*tt)*np.exp(-tt*20)) * np.exp(-tt*9) * vol
def xylo(m, vol):
    tt = t(0.35); f = note(m)
    return (np.sin(2*np.pi*f*tt) + 0.25*np.sin(2*np.pi*4*f*tt)) * np.exp(-tt*14) * vol
chords = [(48, [64, 67, 72]), (53, [65, 69, 72]), (55, [67, 71, 74]), (48, [64, 67, 72])]
melody = [72, 74, 76, 79, 76, 74, 72, None, 77, 76, 74, 72, 74, 76, 79, None,
          79, 81, 79, 76, 74, 76, 74, 71, 72, 76, 79, 84, None, 84, 79, None]
nbeats = int(D / beat)
for b in range(nbeats):
    root, ch = chords[(b // 4) % 4]
    st = b * beat
    if b % 2 == 0:
        add(st, pluck(root - 12 + (7 if b % 4 == 2 else 0), 0.3, 0.35))
    else:
        for m in ch: add(st, pluck(m - 12, 0.18, 0.08))
    for half in (0, 1):
        m = melody[(b * 2 + half) % len(melody)]
        if m is not None and b >= 2: add(st + half * beat / 2, xylo(m, 0.16))
    ht = t(0.04); add(st + beat / 2, rng.normal(0, 1, len(ht)) * np.exp(-ht*90) * 0.04)
fade = np.ones(n); r = int(0.8 * SR); fade[-r:] = np.linspace(1, 0, r)
save("musique-dessin.wav", music * fade)

# --- Pop : petite bulle qui éclate ---
tt = t(0.18)
pop = np.sin(2*np.pi*(300 + 900*np.exp(-tt*40))*tt) * np.exp(-tt*30)
save("pop.wav", pop)

# --- Boing : ressort qui vibre ---
tt = t(0.7)
freq = 180 + 120*np.sin(2*np.pi*9*tt)*np.exp(-tt*3) + 200*np.exp(-tt*6)
boing = np.sin(2*np.pi*np.cumsum(freq)/SR) * np.exp(-tt*4)
save("boing.wav", boing)
