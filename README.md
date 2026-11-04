# DIARRA DESIGN — Intro vidéo

Intro animée de 8 secondes pour DIARRA DESIGN (« Donnez vie à vos idées »), faite avec [Remotion](https://www.remotion.dev).

## Compositions
- `Pub-16x9` / `Pub-9x16` : publicité de 20 s (intro, accroche, affiches, vidéos, contact)
- `Intro-16x9` : 1920×1080 (YouTube, site web)
- `Intro-9x16` : 1080×1920 (Shorts, Reels, TikTok)

## Commandes
```bash
npm i                                     # installer
npm run dev                               # ouvrir Remotion Studio (aperçu)
npx remotion render Intro-16x9 out/intro-16x9.mp4
npx remotion render Intro-9x16 out/intro-9x16.mp4
npx remotion render Pub-16x9 out/pub-16x9.mp4
npx remotion render Pub-9x16 out/pub-9x16.mp4
```

## Structure
- `src/Root.tsx` : déclaration des deux formats
- `src/Intro.tsx` : enchaînement des scènes et bande-son
- `src/scenes/` : Formes, Titre, Slogan
- `src/Pub.tsx` et `src/pub/` : la publicité de 20 s (le contact se change dans `src/Root.tsx`)
- `src/theme.ts` : couleurs et police Montserrat (fichiers dans `public/fonts`)
- `public/audio/` : sons (générés par `scripts/generer-sons.py`, à remplacer par une vraie musique / voix ElevenLabs)
- `.agents/skills/` et `.claude/skills/` : compétences Remotion pour Codex et Claude
