import { Composition } from "remotion";
import { Intro } from "./Intro";
import { Pub } from "./Pub";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Format paysage 16:9 (YouTube, site web) */}
      <Composition
        id="Intro-16x9"
        component={Intro}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "DIARRA DESIGN",
          tagline: "Donnez vie à vos idées",
          services: "Affiches & vidéos publicitaires",
        }}
      />
      {/* Format vertical 9:16 (Shorts, Reels, TikTok) */}
      <Composition
        id="Intro-9x16"
        component={Intro}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "DIARRA DESIGN",
          tagline: "Donnez vie à vos idées",
          services: "Affiches & vidéos publicitaires",
        }}
      />
      <Composition
        id="Pub-16x9"
        component={Pub}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ whatsapp: "+223 00 00 00 00" }}
      />
      <Composition
        id="Pub-9x16"
        component={Pub}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ whatsapp: "+223 00 00 00 00" }}
      />
    </>
  );
};
