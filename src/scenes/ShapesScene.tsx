import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, unit } from "../theme";

// Scène 1 : formes géométriques qui apparaissent (à enrichir à l'étape 2).
export const ShapesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const u = unit(width, height);
  const grow = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: 320 * u,
          height: 320 * u,
          border: `${10 * u}px solid ${theme.accent}`,
          borderRadius: "50%",
          scale: String(grow),
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 180 * u,
          height: 180 * u,
          background: theme.gold,
          rotate: `${45 + grow * 90}deg`,
          scale: String(grow),
        }}
      />
    </AbsoluteFill>
  );
};
