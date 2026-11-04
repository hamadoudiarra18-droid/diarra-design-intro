# DIARRA DESIGN — Intro vidéo

Intro animée de 8 secondes pour DIARRA DESIGN (« Donnez vie à vos idées »), faite avec [Remotion](https://www.remotion.dev).

## Compositions
- `Intro-16x9` : 1920×1080 (YouTube, site web)
- `Intro-9x16` : 1080×1920 (Shorts, Reels, TikTok)
- `Pub-16x9` : publicité de 20 secondes, 1920×1080 à 30 i/s
- `Pub-9x16` : publicité de 20 secondes, 1080×1920 à 30 i/s

La publicité réutilise l’intro de 8 secondes en accéléré dans son ouverture,
sans modifier les compositions `Intro`. Les scènes suivantes commencent à
3, 7, 11 et 15 secondes, avec des transitions de 0,5 seconde.
Dans Remotion Studio, remplacez la propriété `whatsapp` de la composition Pub
pour changer le numéro factice `+223 00 00 00 00`.
Montserrat est embarquée dans `public/fonts/` (licence OFL incluse) et chargée
via `@remotion/google-fonts`, sans téléchargement pendant le rendu.

## Commandes
```bash
npm i                                     # installer
npm run dev                               # ouvrir Remotion Studio (aperçu)
npx remotion render Intro-16x9 out/intro-16x9.mp4
npx remotion render Intro-9x16 out/intro-9x16.mp4
```

## Structure
- `src/Root.tsx` : déclaration des formats Intro et Pub
- `src/Intro.tsx` : enchaînement des scènes et bande-son
- `src/Pub.tsx` : publicité, affiche et lecteur animés, contact WhatsApp
- `src/scenes/` : Formes, Titre, Slogan
- `src/theme.ts` : couleurs et police
- `public/audio/` : sons (générés par `scripts/generer-sons.py`, à remplacer par une vraie musique / voix ElevenLabs)
- `.agents/skills/` et `.claude/skills/` : compétences Remotion pour Codex et Claude
