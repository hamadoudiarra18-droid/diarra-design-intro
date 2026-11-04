import type { CSSProperties, ReactNode } from "react";
import { getInfo } from "@remotion/google-fonts/Montserrat";
import { loadFontFromInfo } from "@remotion/google-fonts/from-info";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import {
  AbsoluteFill,
  Freeze,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "./Background";
import { Intro } from "./Intro";
import { theme, unit } from "./theme";

export type PubProps = { readonly whatsapp: string };

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Repères de la prise originale, à vitesse naturelle (détails dans public/audio/pub-voix-off.json).
const voiceoverCues = [
  { name: "Signature", from: 0.8, start: 0.18, end: 1.5 },
  { name: "Accroche", from: 3.4, start: 1.5, end: 3.17 },
  { name: "Affiches", from: 7.45, start: 3.17, end: 4.75 },
  { name: "Vidéos", from: 11.45, start: 4.75, end: 6.25 },
  { name: "Contact", from: 15.4, start: 6.25, end: 9.299591836734693 },
] as const;

const IntroForPub = () => {
  const frame = useCurrentFrame();

  return (
    // Les images suivent la séquence accélérée. Freeze coupe uniquement l’audio
    // de cette instance ; le mixage Pub fournit musique, effets et voix off.
    <Freeze frame={frame}>
      <Intro
        title="DIARRA DESIGN"
        tagline="Donnez vie à vos idées"
        services="Affiches & vidéos publicitaires"
      />
    </Freeze>
  );
};

const Reveal = ({
  children,
  delay = 0,
  style,
}: {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const enter = spring({
    frame: frame - delay * fps,
    fps,
    config: { damping: 18, stiffness: 130 },
  });

  return (
    <div
      style={{
        ...style,
        opacity: Math.min(1, enter),
        translate: `0 ${(1 - enter) * 48 * unit(width, height)}px`,
      }}
    >
      {children}
    </div>
  );
};

const HookScene = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const u = unit(width, height);
  const vertical = height > width;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 100 * u,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 760 * u,
          height: 760 * u,
          border: `${2 * u}px solid ${theme.accent}`,
          borderRadius: "50%",
          opacity: 0.3,
          scale: String(1 + Math.sin((frame / fps) * 1.8) * 0.04),
        }}
      />
      <Reveal style={{ textAlign: "center", position: "relative" }}>
        <div
          style={{
            color: theme.accentLight,
            fontSize: 44 * u,
            fontWeight: 700,
            letterSpacing: 8 * u,
            marginBottom: 48 * u,
          }}
        >
          DIARRA DESIGN
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: (vertical ? 112 : 144) * u,
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: -4 * u,
          }}
        >
          Votre marque
          <br />
          mérite d&apos;être
          <br />
          <span style={{ color: theme.gold }}>vue.</span>
        </h1>
      </Reveal>
      <Reveal
        delay={0.5}
        style={{
          width: 140 * u,
          height: 8 * u,
          background: theme.gold,
          marginTop: 48 * u,
        }}
      >
        {null}
      </Reveal>
    </AbsoluteFill>
  );
};

const Poster = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const u = unit(width, height);
  const posterWidth = (height > width ? 480 : 340) * u;
  const build = (delay: number) =>
    spring({ frame: frame - delay * fps, fps, config: { damping: 16 } });

  return (
    <div
      style={{
        width: posterWidth,
        height: posterWidth * 1.38,
        position: "relative",
        overflow: "hidden",
        background: theme.bgBlue,
        border: `${3 * u}px solid ${theme.accentLight}`,
        boxShadow: `0 ${28 * u}px ${80 * u}px ${theme.bgDark}`,
        scale: String(build(0.2)),
        rotate: `${-4 + build(0.2) * 4}deg`,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "88%",
          height: "64%",
          right: "-25%",
          top: "-12%",
          borderRadius: "50%",
          background: theme.accent,
          scale: String(build(0.45)),
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "52%",
          height: "38%",
          left: "10%",
          top: "18%",
          background: theme.gold,
          clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
          scale: String(build(0.7)),
          rotate: `${(1 - build(0.7)) * -40}deg`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "48%",
          height: "35%",
          right: "-12%",
          top: "32%",
          border: `${3 * u}px solid ${theme.accentLight}`,
          rotate: "45deg",
          scale: String(build(0.95)),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "10%",
          right: "10%",
          bottom: "9%",
        }}
      >
        <Reveal delay={1.1}>
          <div
            style={{
              fontSize: posterWidth * 0.15,
              lineHeight: 1,
              fontWeight: 900,
            }}
          >
            OSEZ
            <br />
            BRILLER.
          </div>
          <div
            style={{
              height: 5 * u,
              width: "35%",
              marginTop: 20 * u,
              background: theme.gold,
            }}
          />
        </Reveal>
      </div>
    </div>
  );
};

const VideoPlayer = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const u = unit(width, height);
  const time = frame / fps;

  return (
    <Reveal delay={0.25}>
      <div
        style={{
          width: (height > width ? 800 : 850) * u,
          aspectRatio: "16 / 9",
          position: "relative",
          overflow: "hidden",
          border: `${3 * u}px solid ${theme.accentLight}`,
          borderRadius: 24 * u,
          background: theme.bgDark,
          boxShadow: `0 ${28 * u}px ${80 * u}px ${theme.bgDark}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 300 * u,
            height: 300 * u,
            borderRadius: "50%",
            background: theme.accent,
            left: "8%",
            top: "-15%",
            translate: `${Math.sin(time * 2) * 45 * u}px ${Math.cos(time * 2) * 25 * u}px`,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 210 * u,
            height: 210 * u,
            background: theme.gold,
            right: "10%",
            top: "20%",
            rotate: `${45 + time * 35}deg`,
          }}
        />
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              width: 120 * u,
              height: 120 * u,
              borderRadius: "50%",
              background: theme.text,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              scale: String(1 + Math.sin(time * 3) * 0.05),
            }}
          >
            <svg width={48 * u} height={48 * u} viewBox="0 0 48 48">
              <path d="M15 7 L42 24 L15 41 Z" fill={theme.bgBlue} />
            </svg>
          </div>
        </AbsoluteFill>
        <div
          style={{
            position: "absolute",
            left: 30 * u,
            right: 30 * u,
            bottom: 30 * u,
            height: 8 * u,
            borderRadius: 4 * u,
            background: theme.bgBlue,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: theme.gold,
              width: `${interpolate(frame, [0.3 * fps, 3.9 * fps], [0, 100], clamp)}%`,
            }}
          />
        </div>
      </div>
    </Reveal>
  );
};

const ServiceScene = ({ kind }: { readonly kind: "poster" | "video" }) => {
  const { width, height } = useVideoConfig();
  const u = unit(width, height);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 100 * u,
        gap: 48 * u,
        textAlign: "center",
      }}
    >
      <Reveal>
        <div
          style={{
            color: theme.gold,
            fontSize: 44 * u,
            fontWeight: 700,
            marginBottom: 24 * u,
          }}
        >
          {kind === "poster"
            ? "01 / CRÉER L’IMPACT"
            : "02 / CAPTER L’ATTENTION"}
        </div>
        <h2
          style={{
            fontSize: 104 * u,
            lineHeight: 1.06,
            fontWeight: 900,
            margin: 0,
            maxWidth: (height > width ? 880 : 1600) * u,
          }}
        >
          {kind === "poster"
            ? "Affiches publicitaires"
            : "Vidéos publicitaires"}
        </h2>
      </Reveal>
      {kind === "poster" ? <Poster /> : <VideoPlayer />}
    </AbsoluteFill>
  );
};

const ContactScene = ({ whatsapp }: PubProps) => {
  const { width, height } = useVideoConfig();
  const u = unit(width, height);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 100 * u,
      }}
    >
      <Reveal>
        <div
          style={{
            width: 60 * u,
            height: 60 * u,
            background: theme.gold,
            rotate: "45deg",
            margin: `0 auto ${56 * u}px`,
          }}
        />
        <h2
          style={{
            margin: 0,
            fontSize: (height > width ? 96 : 132) * u,
            lineHeight: 1.05,
            fontWeight: 900,
          }}
        >
          DIARRA DESIGN
        </h2>
        <div
          style={{
            marginTop: 32 * u,
            maxWidth: 1400 * u,
            fontSize: 84 * u,
            lineHeight: 1.15,
            fontWeight: 800,
            color: theme.gold,
          }}
        >
          Donnez vie à vos idées
        </div>
      </Reveal>
      <Reveal delay={0.9} style={{ marginTop: 72 * u }}>
        <div
          style={{
            fontSize: 56 * u,
            fontWeight: 800,
            marginBottom: 28 * u,
          }}
        >
          Contactez-nous
        </div>
        <div
          style={{
            border: `${2 * u}px solid ${theme.accent}`,
            borderRadius: 20 * u,
            background: theme.bgBlue,
            padding: `${24 * u}px ${40 * u}px`,
          }}
        >
          <div
            style={{
              color: theme.accentLight,
              fontSize: 44 * u,
              fontWeight: 700,
            }}
          >
            WhatsApp
          </div>
          <div style={{ fontSize: 60 * u, fontWeight: 800, marginTop: 12 * u }}>
            {whatsapp}
          </div>
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};

const PubSoundtrack = () => {
  const { fps } = useVideoConfig();

  return (
    <>
      {/* Mixage indépendant : les compositions Intro originales restent inchangées. */}
      <Audio
        name="Musique publicité"
        src={staticFile("audio/musique.wav")}
        loop
        loopVolumeCurveBehavior="extend"
        volume={(frame) =>
          interpolate(
            frame,
            [0, 0.5 * fps, 18.8 * fps, 20 * fps],
            [0, 0.22, 0.22, 0],
            clamp,
          ) *
          Math.min(
            1,
            ...voiceoverCues.map((cue) =>
              interpolate(
                frame / fps,
                [
                  cue.from - 0.15,
                  cue.from,
                  cue.from + cue.end - cue.start,
                  cue.from + cue.end - cue.start + 0.2,
                ],
                [1, 0.4, 0.4, 1],
                clamp,
              ),
            ),
          )
        }
      />
      {voiceoverCues.map((cue) => (
        <Audio
          key={cue.name}
          name={`Voix off · ${cue.name}`}
          src={staticFile("audio/pub-voix-off.wav")}
          from={Math.round(cue.from * fps)}
          trimBefore={Math.round(cue.start * fps)}
          durationInFrames={Math.round((cue.end - cue.start) * fps)}
          volume={0.85}
        />
      ))}
      <Audio
        name="Intro whoosh"
        src={staticFile("audio/whoosh.wav")}
        from={Math.round((50 / 30 / (8 / 3.5)) * fps)}
        volume={0.2}
      />
      <Audio
        name="Intro impact"
        src={staticFile("audio/impact.wav")}
        from={Math.round((66 / 30 / (8 / 3.5)) * fps)}
        volume={0.15}
      />
      <Audio
        name="Intro whoosh slogan"
        src={staticFile("audio/whoosh.wav")}
        from={Math.round((125 / 30 / (8 / 3.5)) * fps)}
        volume={0.2}
      />
      <Audio
        name="Intro scintillement"
        src={staticFile("audio/scintillement.wav")}
        from={Math.round((140 / 30 / (8 / 3.5)) * fps)}
        volume={0.15}
      />
      <Audio
        name="Transition accroche"
        src={staticFile("audio/whoosh.wav")}
        from={2.9 * fps}
        volume={0.2}
      />
      <Audio
        name="Transition affiches"
        src={staticFile("audio/whoosh.wav")}
        from={6.9 * fps}
        volume={0.2}
      />
      <Audio
        name="Construction affiche"
        src={staticFile("audio/impact.wav")}
        from={7.7 * fps}
        volume={0.15}
      />
      <Audio
        name="Transition vidéos"
        src={staticFile("audio/whoosh.wav")}
        from={10.9 * fps}
        volume={0.2}
      />
      <Audio
        name="Transition contact"
        src={staticFile("audio/whoosh.wav")}
        from={14.9 * fps}
        volume={0.2}
      />
      <Audio
        name="Contact WhatsApp"
        src={staticFile("audio/scintillement.wav")}
        from={15.9 * fps}
        volume={0.15}
      />
    </>
  );
};

export const Pub: React.FC<PubProps> = ({ whatsapp }) => {
  const { fps } = useVideoConfig();
  // Montserrat embarquée (Fontsource 5.3.0, licence OFL dans public/fonts).
  // L’API Google Fonts conserve l’attente du chargement avant tout rendu.
  const { fontFamily } = loadFontFromInfo(
    {
      ...getInfo(),
      fonts: {
        normal: {
          "700": {
            latin: staticFile("fonts/montserrat-latin-700-normal.woff2"),
          },
          "800": {
            latin: staticFile("fonts/montserrat-latin-800-normal.woff2"),
          },
          "900": {
            latin: staticFile("fonts/montserrat-latin-900-normal.woff2"),
          },
        },
      },
    },
    "normal",
    { weights: ["700", "800", "900"], subsets: ["latin"] },
  );

  return (
    <AbsoluteFill
      style={{
        fontFamily: `${fontFamily}, ${theme.font}`,
        color: theme.text,
        background: theme.bgDark,
      }}
    >
      <Background />
      {/* 3,5 + 4,5 + 4,5 + 4,5 + 5 − 4 × 0,5 = 20 secondes.
          Les scènes entrent à 0, 3, 7, 11 et 15 s, fondus compris. */}
      <TransitionSeries>
        <TransitionSeries.Sequence
          name="Intro existante"
          durationInFrames={3.5 * fps}
        >
          {/* Les 8 secondes de l’intro sont réutilisées en accéléré, sans la modifier. */}
          <Sequence durationInFrames={8 * fps} playbackRate={8 / 3.5}>
            <IntroForPub />
          </Sequence>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 0.5 * fps })}
        />
        <TransitionSeries.Sequence name="Accroche" durationInFrames={4.5 * fps}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 0.5 * fps })}
        />
        <TransitionSeries.Sequence
          name="Affiches publicitaires"
          durationInFrames={4.5 * fps}
        >
          <ServiceScene kind="poster" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 0.5 * fps })}
        />
        <TransitionSeries.Sequence
          name="Vidéos publicitaires"
          durationInFrames={4.5 * fps}
        >
          <ServiceScene kind="video" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 0.5 * fps })}
        />
        <TransitionSeries.Sequence name="Contact" durationInFrames={5 * fps}>
          <ContactScene whatsapp={whatsapp} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <PubSoundtrack />
    </AbsoluteFill>
  );
};
