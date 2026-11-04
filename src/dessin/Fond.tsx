import { AbsoluteFill, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { SCENES } from "./style";

// Fond « rayons de soleil » qui tournent, avec une couleur différente par scène.
const T = [0, SCENES.affiche.from - 6, SCENES.affiche.from, SCENES.video.from - 6, SCENES.video.from, SCENES.logo.from - 6, SCENES.logo.from];
const C1 = ["#FFD166", "#FFD166", "#7FDBFF", "#7FDBFF", "#FF9AC1", "#FF9AC1", "#9B5DE5"];
const C2 = ["#FFB703", "#FFB703", "#4CC9F0", "#4CC9F0", "#FF6FA5", "#FF6FA5", "#7B3FD0"];

export const Fond: React.FC<{ readonly centre: string }> = ({ centre }) => {
  const frame = useCurrentFrame();
  const c1 = interpolateColors(frame, T, C1);
  const c2 = interpolateColors(frame, T, C2);
  const rot = interpolate(frame, [0, 300], [0, 60]);

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `repeating-conic-gradient(from ${rot}deg at ${centre}, ${c1} 0deg 12deg, ${c2} 12deg 24deg)`,
        }}
      />
      {/* Assombrit doucement les bords */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${centre}, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 35%, rgba(0,0,0,0.28) 100%)`,
        }}
      />
      {/* Trame de points façon bande dessinée */}
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.10) 22%, transparent 24%)",
          backgroundSize: "26px 26px",
        }}
      />
    </AbsoluteFill>
  );
};
