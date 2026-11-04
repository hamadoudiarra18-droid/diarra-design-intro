import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "./theme";

// Fond stylisé : dégradé sombre vers bleu, avec un halo qui se déplace lentement.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const x = interpolate(frame, [0, durationInFrames], [30, 70]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${x}% 40%, ${theme.bgBlue} 0%, ${theme.bgDark} 65%)`,
      }}
    />
  );
};
