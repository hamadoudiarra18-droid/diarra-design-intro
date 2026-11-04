import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, unit } from "../theme";

type Props = { readonly tagline: string; readonly services: string };

// Scène 3 : slogan et services, puis fin.
export const TaglineScene: React.FC<Props> = ({ tagline, services }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const u = unit(width, height);
  const t1 = spring({ frame, fps, config: { damping: 200 } });
  const t2 = spring({ frame: frame - 15, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 40 * u,
        padding: 100 * u,
        fontFamily: theme.font,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 96 * u,
          fontWeight: 800,
          color: theme.text,
          opacity: t1,
          scale: String(interpolate(t1, [0, 1], [0.9, 1])),
        }}
      >
        {tagline}
      </div>
      <div
        style={{
          fontSize: 48 * u,
          fontWeight: 500,
          color: theme.accentLight,
          opacity: t2,
        }}
      >
        {services}
      </div>
    </AbsoluteFill>
  );
};
