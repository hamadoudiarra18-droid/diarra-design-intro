// Couleurs et polices partagées par toutes les scènes.
export const theme = {
  bgDark: "#060B1F",
  bgBlue: "#0B2A6F",
  accent: "#3D8BFF",
  accentLight: "#8FC2FF",
  gold: "#FFC94D",
  text: "#FFFFFF",
  font: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
};

// Taille de référence : la plus petite dimension de la vidéo.
// Permet d'utiliser le même code en 16:9 et en 9:16.
export const unit = (width: number, height: number) => Math.min(width, height) / 1080;
