# DIARRA DESIGN — Intro vidéo

Intro animée de 8 secondes pour DIARRA DESIGN (« Donnez vie à vos idées »), faite avec [Remotion](https://www.remotion.dev).

## Compositions
- `Intro-16x9` : 1920×1080 (YouTube, site web)
- `Intro-9x16` : 1080×1920 (Shorts, Reels, TikTok)

## Commandes
```bash
npm i                                     # installer
npm run dev                               # ouvrir Remotion Studio (aperçu)
npx remotion render Intro-16x9 out/intro-16x9.mp4
npx remotion render Intro-9x16 out/intro-9x16.mp4
```

## Structure
- `src/Root.tsx` : déclaration des deux formats
- `src/Intro.tsx` : enchaînement des scènes et bande-son
- `src/scenes/` : Formes, Titre, Slogan
- `src/theme.ts` : couleurs et police
- `public/audio/` : sons (générés par `scripts/generer-sons.py`, à remplacer par une vraie musique / voix ElevenLabs)
- `.agents/skills/` et `.claude/skills/` : compétences Remotion pour Codex et Claude
