import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, unit } from "../theme";
import { ServiceLayout } from "./ServiceLayout";

// Service 2 : un lecteur vidéo animé (bouton lecture + barre de progression).
export const VideoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  // En vertical, le visuel est agrandi pour remplir l'écran.
  const u = unit(width, height) * (height > width ? 1.4 : 1);
  const enter = spring({ frame, fps, config: { damping: 14 } });
  const play = spring({ frame: frame - 15, fps, config: { damping: 10 } });
  const pulse = 1 + 0.06 * Math.sin(frame / 5);
  const progress = interpolate(frame, [25, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const W = 620 * u;
  const H = 380 * u;

  return (
    <ServiceLayout number="02" title="Vidéos publicitaires" subtitle="Des pubs qui captivent.">
      <div
        style={{
          position: "relative",
          width: W,
          height: H,
          flexShrink: 0,
          borderRadius: 24 * u,
          overflow: "hidden",
          background: `linear-gradient(160deg, #13245A, ${theme.bgDark})`,
          border: `${4 * u}px solid ${theme.accent}`,
          boxShadow: `0 0 ${60 * u}px rgba(61,139,255,0.45)`,
          scale: String(enter),
        }}
      >
        {/* Formes qui défilent dans l'écran */}
        <div
          style={{
            position: "absolute",
            top: H * 0.2,
            left: interpolate(frame, [0, 135], [-0.2 * W, 0.9 * W]),
            width: 90 * u,
            height: 90 * u,
            background: theme.gold,
            rotate: `${frame * 3}deg`,
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: H * 0.55,
            right: interpolate(frame, [0, 135], [-0.1 * W, 0.8 * W]),
            width: 70 * u,
            height: 70 * u,
            borderRadius: "50%",
            border: `${8 * u}px solid ${theme.accentLight}`,
            opacity: 0.35,
          }}
        />
        {/* Bouton lecture */}
        <div
          style={{
            position: "absolute",
            left: W / 2 - 60 * u,
            top: H / 2 - 75 * u,
            width: 120 * u,
            height: 120 * u,
            borderRadius: "50%",
            background: theme.text,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            scale: String(play * pulse),
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              marginLeft: 10 * u,
              borderTop: `${26 * u}px solid transparent`,
              borderBottom: `${26 * u}px solid transparent`,
              borderLeft: `${42 * u}px solid ${theme.bgBlue}`,
            }}
          />
        </div>
        {/* Barre de progression */}
        <div
          style={{
            position: "absolute",
            left: W * 0.08,
            right: W * 0.08,
            bottom: 34 * u,
            height: 10 * u,
            borderRadius: 5 * u,
            background: "rgba(255,255,255,0.2)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              borderRadius: 5 * u,
              background: theme.gold,
            }}
          />
        </div>
      </div>
    </ServiceLayout>
  );
};
