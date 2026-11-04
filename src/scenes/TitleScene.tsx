import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, unit } from "../theme";

type Props = { readonly title: string };

// Scène 2 : le nom de la marque au centre.
export const TitleScene: React.FC<Props> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const u = unit(width, height);
  const isVertical = height > width;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 100 * u }}>
      <h1
        aria-label={title}
        style={{
          margin: 0,
          fontFamily: theme.font,
          fontWeight: 900,
          fontSize: (isVertical ? 130 : 150) * u,
          letterSpacing: 8 * u,
          color: theme.text,
          textAlign: "center",
        }}
      >
        {title.split(/(\s+)/).map((word, wordIndex, words) => {
          if (/^\s+$/.test(word)) return word;

          const startIndex = words.slice(0, wordIndex).join("").length;

          return (
            <span key={wordIndex} aria-hidden="true" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {Array.from(word).map((letter, letterIndex) => {
                const enter = spring({
                  frame,
                  fps,
                  delay: Math.round((startIndex + letterIndex) * 0.07 * fps),
                  config: { damping: 14, stiffness: 180, mass: 0.8 },
                });

                return (
                  <span
                    key={letterIndex}
                    style={{
                      display: "inline-block",
                      opacity: interpolate(enter, [0, 1], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                      translate: `0 ${interpolate(enter, [0, 1], [36 * u, 0])}px`,
                    }}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          );
        })}
      </h1>
    </AbsoluteFill>
  );
};
