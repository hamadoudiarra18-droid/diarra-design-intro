import { random } from "remotion";
import { theme } from "../theme";

// Palette « dessin animé » : couleurs vives et contour noir épais.
export const toon = {
  outline: "#1B1B2F",
  yellow: "#FFC94D",
  orange: "#FF9F1C",
  pink: "#FF7BA9",
  red: "#FF4D4D",
  sky: "#4CC9F0",
  blue: "#3D8BFF",
  mint: "#3DDC97",
  purple: "#9B5DE5",
  cream: "#FFF8E7",
  white: "#FFFFFF",
  font: theme.font,
};

// Effet « trait qui tremble » des dessins animés : petit décalage aléatoire
// qui change toutes les 4 images.
export const boil = (frame: number, seed: string, amount = 1) => {
  const step = Math.floor(frame / 4);
  return {
    x: (random(`${seed}-x-${step}`) - 0.5) * 4 * amount,
    y: (random(`${seed}-y-${step}`) - 0.5) * 4 * amount,
    r: (random(`${seed}-r-${step}`) - 0.5) * 1.6 * amount,
  };
};

// Style de texte « bande dessinée » : contour + ombre décalée.
export const toonText = (u: number, color: string, size: number) => ({
  fontFamily: toon.font,
  fontWeight: 900,
  fontSize: size * u,
  color,
  WebkitTextStroke: `${size * 0.09 * u}px ${toon.outline}`,
  paintOrder: "stroke fill" as const,
  textShadow: `${size * 0.07 * u}px ${size * 0.07 * u}px 0 ${toon.outline}`,
  letterSpacing: size * 0.02 * u,
  lineHeight: 1,
});

// Moments clés du dessin animé (en images, 30 images = 1 s).
export const SCENES = {
  idee: { from: 0, dur: 75 },
  affiche: { from: 75, dur: 75 },
  video: { from: 150, dur: 75 },
  logo: { from: 225, dur: 75 },
};
export const DUREE = 300;
