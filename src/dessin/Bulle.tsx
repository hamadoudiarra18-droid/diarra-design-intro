import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { boil, toon } from "./style";

// Bulle de dialogue qui apparaît avec un « pop » et disparaît à la fin.
export const Bulle: React.FC<{
  readonly texte: string;
  readonly duree: number;
  readonly queue: "bas" | "gauche";
  readonly u: number;
}> = ({ texte, duree, queue, u }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entree = spring({ frame, fps, config: { damping: 9, stiffness: 180 } });
  const sortie = interpolate(frame, [duree - 7, duree], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const b = boil(frame, texte, 0.7);

  return (
    <div
      style={{
        position: "relative",
        background: toon.white,
        border: `${7 * u}px solid ${toon.outline}`,
        borderRadius: 50 * u,
        padding: `${26 * u}px ${36 * u}px`,
        boxShadow: `${10 * u}px ${10 * u}px 0 ${toon.outline}`,
        fontFamily: toon.font,
        fontWeight: 900,
        fontSize: 54 * u,
        lineHeight: 1.1,
        color: toon.outline,
        textAlign: "center",
        scale: String(entree * sortie),
        rotate: `${b.r * 1.5}deg`,
        transformOrigin: queue === "bas" ? "50% 120%" : "-10% 50%",
      }}
    >
      {texte}
      {/* Queue de la bulle */}
      <svg
        width={70 * u}
        height={70 * u}
        viewBox="0 0 70 70"
        style={{
          position: "absolute",
          ...(queue === "bas"
            ? { left: "42%", bottom: -60 * u }
            : { left: -60 * u, top: "38%", rotate: "90deg" }),
        }}
      >
        <path d="M5 0 L 60 0 L 20 62 Z" fill={toon.white} stroke={toon.outline} strokeWidth={7} strokeLinejoin="round" />
        <rect x={0} y={-8} width={70} height={10} fill={toon.white} />
      </svg>
    </div>
  );
};
