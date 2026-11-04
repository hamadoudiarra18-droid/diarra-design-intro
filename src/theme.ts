import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Police Montserrat stockée dans public/fonts (fonctionne sans Internet).
const fontFamily = "Montserrat";
for (const weight of ["500", "700", "800", "900"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/montserrat-latin-${weight}-normal.woff2`),
    weight,
  });
}

// Couleurs et polices partagées par toutes les scènes.
export const theme = {
  bgDark: "#060B1F",
  bgBlue: "#0B2A6F",
  accent: "#3D8BFF",
  accentLight: "#8FC2FF",
  gold: "#FFC94D",
  text: "#FFFFFF",
  font: fontFamily,
};

// Taille de référence : la plus petite dimension de la vidéo.
// Permet d'utiliser le même code en 16:9 et en 9:16.
export const unit = (width: number, height: number) => Math.min(width, height) / 1080;
