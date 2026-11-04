import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Background } from "./Background";
import { CtaScene } from "./pub/CtaScene";
import { HookScene } from "./pub/HookScene";
import { PosterScene } from "./pub/PosterScene";
import { VideoScene } from "./pub/VideoScene";
import { ShapesScene } from "./scenes/ShapesScene";
import { TitleScene } from "./scenes/TitleScene";

export type PubProps = {
  readonly title: string;
  readonly tagline: string;
  readonly contact: string;
};

// Pub de 20 s = 600 images à 30 i/s.
// Scènes : 60 + 90 + 120 + 135 + 135 + 135 = 675, moins 5 transitions de 15 = 600.
export const Pub: React.FC<PubProps> = ({ title, tagline, contact }) => {
  const t = linearTiming({ durationInFrames: 15 });

  return (
    <AbsoluteFill>
      <Background />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Formes" durationInFrames={60}>
          <ShapesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence name="Titre" durationInFrames={90}>
          <TitleScene title={title} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={t} />
        <TransitionSeries.Sequence name="Accroche" durationInFrames={120}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={t} />
        <TransitionSeries.Sequence name="Affiches" durationInFrames={135}>
          <PosterScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t} />
        <TransitionSeries.Sequence name="Vidéos" durationInFrames={135}>
          <VideoScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence name="Contact" durationInFrames={135}>
          <CtaScene title={title} tagline={tagline} contact={contact} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Bande-son : musique de 20 s + effets calés sur les transitions */}
      <Audio name="Musique" src={staticFile("audio/musique-pub.wav")} volume={0.6} />
      <Sequence name="Whoosh 1" from={38} layout="none">
        <Audio src={staticFile("audio/whoosh.wav")} volume={0.6} />
      </Sequence>
      <Sequence name="Impact titre" from={50} layout="none">
        <Audio src={staticFile("audio/impact.wav")} volume={0.8} />
      </Sequence>
      <Sequence name="Whoosh 2" from={113} layout="none">
        <Audio src={staticFile("audio/whoosh.wav")} volume={0.6} />
      </Sequence>
      <Sequence name="Whoosh 3" from={218} layout="none">
        <Audio src={staticFile("audio/whoosh.wav")} volume={0.6} />
      </Sequence>
      <Sequence name="Whoosh 4" from={338} layout="none">
        <Audio src={staticFile("audio/whoosh.wav")} volume={0.6} />
      </Sequence>
      <Sequence name="Whoosh 5" from={458} layout="none">
        <Audio src={staticFile("audio/whoosh.wav")} volume={0.6} />
      </Sequence>
      <Sequence name="Scintillement contact" from={495} layout="none">
        <Audio src={staticFile("audio/scintillement.wav")} volume={0.5} />
      </Sequence>
    </AbsoluteFill>
  );
};
