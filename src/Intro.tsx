import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill } from "remotion";
import { Background } from "./Background";
import { ShapesScene } from "./scenes/ShapesScene";
import { TaglineScene } from "./scenes/TaglineScene";
import { TitleScene } from "./scenes/TitleScene";

export type IntroProps = {
  readonly title: string;
  readonly tagline: string;
  readonly services: string;
};

// Durée totale : 75 + 90 + 105 - 15 - 15 = 240 images = 8 s à 30 i/s.
export const Intro: React.FC<IntroProps> = ({ title, tagline, services }) => {
  return (
    <AbsoluteFill>
      <Background />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Formes" durationInFrames={75}>
          <ShapesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />
        <TransitionSeries.Sequence name="Titre" durationInFrames={90}>
          <TitleScene title={title} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 15 })}
        />
        <TransitionSeries.Sequence name="Slogan" durationInFrames={105}>
          <TaglineScene tagline={tagline} services={services} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
