import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, unit } from "../theme";
import { ServiceLayout } from "./ServiceLayout";

// Service 1 : une affiche qui se construit morceau par morceau.
export const PosterScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  // En vertical, le visuel est agrandi pour remplir l'écran.
  const u = unit(width, height) * (height > width ? 1.4 : 1);
  const pop = (delay: number) => spring({ frame: frame - delay, fps, config: { damping: 13 } });

  const W = 420 * u;
  const H = 580 * u;
  const card = pop(0);

  return (
    <ServiceLayout number="01" title="Affiches publicitaires" subtitle="Des visuels qui attirent l'œil.">
      <div
        style={{
          position: "relative",
          width: W,
          height: H,
          flexShrink: 0,
          background: "#F4F6FB",
          borderRadius: 18 * u,
          overflow: "hidden",
          boxShadow: `0 ${30 * u}px ${80 * u}px rgba(0,0,0,0.5)`,
          scale: String(card),
          rotate: `${interpolate(card, [0, 1], [-12, -3])}deg`,
        }}
      >
        {/* Bandeau du haut */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            height: H * 0.45,
            background: `linear-gradient(135deg, ${theme.bgBlue}, ${theme.accent})`,
            translate: `0 ${interpolate(pop(8), [0, 1], [-H * 0.45, 0])}px`,
          }}
        />
        {/* Cercle doré */}
        <div
          style={{
            position: "absolute",
            left: W * 0.5 - 85 * u,
            top: H * 0.45 - 85 * u,
            width: 170 * u,
            height: 170 * u,
            borderRadius: "50%",
            background: theme.gold,
            border: `${10 * u}px solid #F4F6FB`,
            scale: String(pop(16)),
          }}
        />
        {/* Lignes de texte */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: W * 0.14,
              top: H * (0.68 + i * 0.08),
              height: (i === 0 ? 26 : 16) * u,
              width: W * (i === 0 ? 0.72 : 0.55 - i * 0.08) * pop(22 + i * 5),
              background: i === 0 ? theme.bgDark : "#AAB4C8",
              borderRadius: 8 * u,
            }}
          />
        ))}
      </div>
    </ServiceLayout>
  );
};
