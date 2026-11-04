import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, unit } from "../theme";

type Props = {
  readonly number: string;
  readonly title: string;
  readonly subtitle: string;
  readonly children: React.ReactNode;
};

// Mise en page commune aux scènes de services : visuel + texte.
// Côte à côte en 16:9, l'un au-dessus de l'autre en 9:16.
export const ServiceLayout: React.FC<Props> = ({ number, title, subtitle, children }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const u = unit(width, height);
  const isVertical = height > width;
  const text = spring({ frame: frame - 10, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        flexDirection: isVertical ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
        gap: (isVertical ? 90 : 140) * u,
        padding: 100 * u,
        fontFamily: theme.font,
        color: theme.text,
      }}
    >
      {children}
      <div
        style={{
          textAlign: isVertical ? "center" : "left",
          opacity: text,
          translate: `${isVertical ? 0 : interpolate(text, [0, 1], [60 * u, 0])}px ${isVertical ? interpolate(text, [0, 1], [40 * u, 0]) : 0}px`,
          maxWidth: (isVertical ? 900 : 760) * u,
        }}
      >
        <div style={{ fontSize: 44 * u, fontWeight: 800, color: theme.accent, letterSpacing: 4 * u }}>
          {number}
        </div>
        <div style={{ fontSize: 96 * u, fontWeight: 900, lineHeight: 1.05, marginTop: 10 * u }}>{title}</div>
        <div style={{ fontSize: 48 * u, fontWeight: 500, color: theme.accentLight, marginTop: 24 * u }}>
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
