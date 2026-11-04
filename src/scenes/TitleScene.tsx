import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, unit } from "../theme";

type Props = { readonly title: string };

// Scène 2 : le nom de la marque au centre.
export const TitleScene: React.FC<Props> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const u = unit(width, height);
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const isVertical = height > width;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 100 * u }}>
      <h1
        style={{
          margin: 0,
          fontFamily: theme.font,
          fontWeight: 900,
          fontSize: (isVertical ? 130 : 150) * u,
          letterSpacing: 8 * u,
          color: theme.text,
          textAlign: "center",
          opacity: enter,
          translate: `0 ${interpolate(enter, [0, 1], [60 * u, 0])}px`,
        }}
      >
        {title}
      </h1>
    </AbsoluteFill>
  );
};
