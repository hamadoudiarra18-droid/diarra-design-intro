# Génère la bande-son de l'intro : musique (8 s), whoosh, impact, scintillement.
import numpy as np, wave, sys
SR = 44100
out = sys.argv[1]
rng = np.random.default_rng(7)

def save(name, x):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.9
    st = np.stack([x, x], 1)
    with wave.open(f"{out}/{name}", "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())

def t(d): return np.arange(int(SR * d)) / SR
def env(n, a, r):
    e = np.ones(n); a = int(a*SR); r = int(r*SR)
    e[:a] = np.linspace(0, 1, a); e[-r:] = np.linspace(1, 0, r); return e
def lowpass(x, k):  # moyenne glissante simple
    return np.convolve(x, np.ones(k)/k, mode="same")
def note(f): return 440 * 2 ** ((f - 69) / 12)

# --- Musique : 120 bpm, accords Am - F - C - G, basse, kick, hi-hat ---
D = 8.0; n = int(SR*D); music = np.zeros(n); beat = 0.5
chords = [[57,60,64],[53,57,60],[48,52,55],[55,59,62]]
for i in range(4):
    start = int(i*2*SR); tt = t(2.0); seg = np.zeros(len(tt))
    for m in chords[i]:
        f = note(m)
        seg += np.sin(2*np.pi*f*tt) + 0.5*np.sin(2*np.pi*f*1.003*tt) + 0.3*np.sin(2*np.pi*2*f*tt)
    seg *= env(len(tt), 0.3, 0.4) * 0.12
    bass = np.sign(np.sin(2*np.pi*note(chords[i][0]-12)*tt)) * 0.08
    bass = lowpass(bass, 40) * env(len(tt), 0.02, 0.2)
    music[start:start+len(tt)] += seg + bass
for b in range(int(D/beat)):
    s = int(b*beat*SR)
    if b >= 2:  # kick à partir de la 2e mesure
        kt = t(0.25); kick = np.sin(2*np.pi*(50+90*np.exp(-kt*30))*kt) * np.exp(-kt*12) * 0.5
        music[s:s+len(kt)] += kick[:n-s]
    hs = s + int(beat/2*SR); ht = t(0.05)
    if hs + len(ht) < n:
        music[hs:hs+len(ht)] += rng.normal(0,1,len(ht)) * np.exp(-ht*80) * 0.05
music *= env(n, 0.5, 1.2)
save("musique.wav", music)

# --- Whoosh : bruit filtré qui monte puis descend ---
tt = t(0.6); noise = rng.normal(0,1,len(tt))
w = noise - lowpass(noise, 6)  # garde les aigus
w = lowpass(w, 3) * np.sin(np.pi*tt/0.6)**2
save("whoosh.wav", w)

# --- Impact : grave court + claquement ---
tt = t(1.2)
imp = np.sin(2*np.pi*(40+80*np.exp(-tt*20))*tt) * np.exp(-tt*4)
imp += rng.normal(0,1,len(tt)) * np.exp(-tt*40) * 0.4
save("impact.wav", imp)

# --- Scintillement : arpège aigu ---
tt = t(1.5); sh = np.zeros(len(tt))
for k, m in enumerate([81, 84, 88, 93]):
    s = int(k*0.08*SR); d = tt[:len(tt)-s]
    sh[s:] += np.sin(2*np.pi*note(m)*d) * np.exp(-d*4)
save("scintillement.wav", sh)
