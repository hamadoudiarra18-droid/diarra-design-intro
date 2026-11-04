import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, unit } from "../theme";

type Props = {
  readonly title: string;
  readonly tagline: string;
  readonly contact: string;
};

// Appel à l'action final : marque, slogan, bouton « Contactez-nous » et contact.
export const CtaScene: React.FC<Props> = ({ title, tagline, contact }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const u = unit(width, height);
  const isVertical = height > width;
  const a = spring({ frame, fps, config: { damping: 200 } });
  const b = spring({ frame: frame - 12, fps, config: { damping: 200 } });
  const c = spring({ frame: frame - 28, fps, config: { damping: 11 } });
  const d = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  const pulse = 1 + 0.03 * Math.sin(frame / 6);

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
          fontSize: (isVertical ? 120 : 140) * u,
          fontWeight: 900,
          letterSpacing: 6 * u,
          lineHeight: 1.05,
          opacity: a,
          scale: String(interpolate(a, [0, 1], [0.85, 1])),
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 64 * u,
          fontWeight: 700,
          color: theme.gold,
          marginTop: 24 * u,
          opacity: b,
        }}
      >
        {tagline}
      </div>
      <div
        style={{
          marginTop: 70 * u,
          padding: `${28 * u}px ${70 * u}px`,
          borderRadius: 100 * u,
          background: theme.accent,
          fontSize: 54 * u,
          fontWeight: 800,
          boxShadow: `0 0 ${50 * u}px rgba(61,139,255,0.6)`,
          scale: String(c * pulse),
        }}
      >
        Contactez-nous
      </div>
      <div
        style={{
          marginTop: 40 * u,
          fontSize: 48 * u,
          fontWeight: 500,
          color: theme.accentLight,
          opacity: d,
        }}
      >
        {contact}
      </div>
    </AbsoluteFill>
  );
};
