import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, interpolate, staticFile, useVideoConfig } from "remotion";
import { unit } from "./theme";
import { Bulle } from "./dessin/Bulle";
import { Fond } from "./dessin/Fond";
import { Mascotte } from "./dessin/Mascotte";
import { Pop } from "./dessin/Pop";
import { SceneAffiche, SceneIdee, SceneLogo, SceneVideo } from "./dessin/Scenes";
import { SCENES } from "./dessin/style";

export type DessinAnimeProps = {
  readonly title: string;
  readonly tagline: string;
  readonly contact: string;
};

// Bulles de la mascotte : [début, durée, texte].
const BULLES: [number, number, string][] = [
  [10, 58, "Salut ! Tu as une idée ?"],
  [82, 60, "Je la dessine..."],
  [157, 60, "...et je l'anime !"],
  [232, 62, "Appelle-nous !"],
];

// Dessin animé promo de 10 s (300 images à 30 i/s) avec la mascotte « Crayonnou ».
export const DessinAnime: React.FC<DessinAnimeProps> = ({ title, tagline, contact }) => {
  const { width, height } = useVideoConfig();
  const u = unit(width, height);
  const vertical = height > width;

  // Zones : en paysage, mascotte à gauche et contenu à droite ;
  // en vertical, contenu en haut et mascotte en bas.
  const zoneContenu: React.CSSProperties = vertical
    ? { left: 0, top: 40 * u, width, height: 1180 * u }
    : { left: 620 * u, top: 0, width: width - 620 * u, height };
  const zoneMascotte: React.CSSProperties = vertical
    ? { left: 110 * u, bottom: 90 * u }
    : { left: 170 * u, bottom: 50 * u };
  const zoneBulle: React.CSSProperties = vertical
    ? { left: 480 * u, top: 1330 * u, width: 540 * u }
    : { left: 40 * u, top: 50 * u, width: 600 * u };
  const echelle = vertical ? 0.85 : 0.95;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Fond centre={vertical ? "50% 32%" : "64% 48%"} />

      <AbsoluteFill style={{ ...zoneContenu, position: "absolute", scale: String(echelle) }}>
        <Sequence name="Idée" from={SCENES.idee.from} durationInFrames={SCENES.idee.dur}>
          <Pop duree={SCENES.idee.dur}>
            <SceneIdee u={u} />
          </Pop>
        </Sequence>
        <Sequence name="Affiche" from={SCENES.affiche.from} durationInFrames={SCENES.affiche.dur}>
          <Pop duree={SCENES.affiche.dur}>
            <SceneAffiche u={u} />
          </Pop>
        </Sequence>
        <Sequence name="Vidéo" from={SCENES.video.from} durationInFrames={SCENES.video.dur}>
          <Pop duree={SCENES.video.dur}>
            <SceneVideo u={u} />
          </Pop>
        </Sequence>
        <Sequence name="Logo" from={SCENES.logo.from} durationInFrames={SCENES.logo.dur + 10}>
          <Pop duree={SCENES.logo.dur + 10}>
            <SceneLogo u={u} title={title} tagline={tagline} contact={contact} />
          </Pop>
        </Sequence>
      </AbsoluteFill>

      <div style={{ position: "absolute", ...zoneMascotte }}>
        <Mascotte height={(vertical ? 560 : 640) * u} regard={vertical ? { x: 0.4, y: -0.8 } : { x: 1, y: -0.2 }} />
      </div>

      {BULLES.map(([debut, duree, texte]) => (
        <Sequence key={texte} name={`Bulle « ${texte} »`} from={debut} durationInFrames={duree} layout="none">
          <div style={{ position: "absolute", ...zoneBulle }}>
            <Bulle texte={texte} duree={duree} queue={vertical ? "gauche" : "bas"} u={u} />
          </div>
        </Sequence>
      ))}

      {/* Bande-son : musique joyeuse + bruitages */}
      <Audio
        name="Musique"
        src={staticFile("audio/musique-dessin.wav")}
        volume={(f) => interpolate(f, [0, 10], [0.4, 0.7], { extrapolateRight: "clamp" })}
      />
      <Sequence name="Whoosh entrée" from={0} layout="none">
        <Audio src={staticFile("audio/whoosh.wav")} volume={0.4} />
      </Sequence>
      <Sequence name="Boing atterrissage" from={14} layout="none">
        <Audio src={staticFile("audio/boing.wav")} volume={0.45} />
      </Sequence>
      <Sequence name="Ding ampoule" from={30} layout="none">
        <Audio src={staticFile("audio/scintillement.wav")} volume={0.4} />
      </Sequence>
      {[SCENES.affiche.from, SCENES.video.from, SCENES.logo.from].map((f) => (
        <Sequence key={f} name={`Boing ${f}`} from={f} layout="none">
          <Audio src={staticFile("audio/boing.wav")} volume={0.35} />
        </Sequence>
      ))}
      {BULLES.map(([debut]) => (
        <Sequence key={`pop-${debut}`} name={`Pop bulle ${debut}`} from={debut} layout="none">
          <Audio src={staticFile("audio/pop.wav")} volume={0.5} />
        </Sequence>
      ))}
      <Sequence name="Pop PROMO" from={SCENES.affiche.from + 40} layout="none">
        <Audio src={staticFile("audio/pop.wav")} volume={0.45} />
      </Sequence>
      <Sequence name="Scintillement logo" from={SCENES.logo.from + 20} layout="none">
        <Audio src={staticFile("audio/scintillement.wav")} volume={0.35} />
      </Sequence>
    </AbsoluteFill>
  );
};
