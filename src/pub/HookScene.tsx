import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, unit } from "../theme";

// Accroche : « Votre marque mérite d'être vue. »
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const u = unit(width, height);
  const line1 = spring({ frame, fps, config: { damping: 200 } });
  const line2 = spring({ frame: frame - 12, fps, config: { damping: 12 } });
  const underline = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 100 * u,
        fontFamily: theme.font,
        textAlign: "center",
        color: theme.text,
      }}
    >
      <div
        style={{
          fontSize: 84 * u,
          fontWeight: 700,
          opacity: line1,
          translate: `0 ${interpolate(line1, [0, 1], [40 * u, 0])}px`,
        }}
      >
        Votre marque mérite
      </div>
      <div
        style={{
          position: "relative",
          fontSize: 140 * u,
          fontWeight: 900,
          color: theme.gold,
          scale: String(line2),
          marginTop: 10 * u,
        }}
      >
        d'être vue.
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: -6 * u,
            height: 12 * u,
            width: `${underline * 100}%`,
            background: theme.accent,
            borderRadius: 6 * u,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
