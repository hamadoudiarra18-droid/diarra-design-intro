import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Fait apparaître une scène avec un rebond élastique et la fait disparaître en rétrécissant.
export const Pop: React.FC<{ readonly duree: number; readonly children: React.ReactNode }> = ({ duree, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entree = spring({ frame, fps, config: { damping: 8, stiffness: 140 } });
  const sortie = interpolate(frame, [duree - 8, duree], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        scale: String(entree * sortie),
        rotate: `${interpolate(entree, [0, 1], [-12, 0]) + interpolate(sortie, [0, 1], [15, 0])}deg`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
