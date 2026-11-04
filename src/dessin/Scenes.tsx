import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { boil, toon, toonText } from "./style";

const O = toon.outline;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Texte dont les lettres arrivent une par une en rebondissant.
const LettresRebond: React.FC<{
  readonly texte: string;
  readonly debut: number;
  readonly taille: number;
  readonly couleurs: string[];
  readonly u: number;
}> = ({ texte, debut, taille, couleurs, u }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", justifyContent: "center", whiteSpace: "pre" }}>
      {texte.split("").map((l, i) => {
        const s = spring({ frame: frame - debut - i * 2, fps, config: { damping: 7, stiffness: 160 } });
        const vague = Math.sin((frame - i * 3) / 5) * 6 * u;
        return (
          <span
            key={i}
            style={{
              ...toonText(u, couleurs[i % couleurs.length], taille),
              display: "inline-block",
              scale: String(s),
              translate: `0px ${interpolate(s, [0, 1], [-120 * u, 0]) + vague}px`,
              rotate: `${interpolate(s, [0, 1], [-30, (i % 2 ? 4 : -4)])}deg`,
            }}
          >
            {l}
          </span>
        );
      })}
    </div>
  );
};

// Scène 1 : une ampoule qui s'allume = « une idée ».
export const SceneIdee: React.FC<{ readonly u: number }> = ({ u }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const allume = spring({ frame: frame - 30, fps, config: { damping: 10 } });
  const b = boil(frame, "ampoule");
  const couleur = frame >= 30 ? toon.yellow : "#E3E8F2";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 * u }}>
      <svg
        viewBox="-150 -150 600 700"
        width={520 * u}
        height={600 * u}
        style={{ overflow: "visible", translate: `${b.x * u}px ${b.y * u}px`, rotate: `${b.r + Math.sin(frame / 6) * 4}deg` }}
      >
        {/* Rayons de lumière */}
        <g style={{ transform: `rotate(${frame * 2}deg) scale(${allume})`, transformOrigin: "150px 150px" }}>
          {new Array(12).fill(0).map((_, i) => (
            <rect key={i} x={140} y={-130} width={20} height={70} rx={10} fill={toon.white} stroke={O} strokeWidth={6}
              style={{ transform: `rotate(${i * 30}deg)`, transformOrigin: "150px 150px" }} />
          ))}
        </g>
        <circle cx={150} cy={150} r={130 * allume} fill="rgba(255,255,255,0.5)" />
        {/* Ampoule */}
        <path d="M150 20 C 60 20 20 90 30 160 C 38 215 90 240 95 290 L 205 290 C 210 240 262 215 270 160 C 280 90 240 20 150 20 Z"
          fill={couleur} stroke={O} strokeWidth={10} strokeLinejoin="round" />
        <path d="M80 110 Q 90 70 130 58" stroke={toon.white} strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.8} />
        {/* Filament */}
        <path d="M120 290 L 120 210 Q 135 180 150 210 Q 165 180 180 210 L 180 290" stroke={O} strokeWidth={6} fill="none" />
        {/* Culot */}
        <rect x={92} y={290} width={116} height={30} rx={8} fill="#B8C2D6" stroke={O} strokeWidth={8} />
        <rect x={98} y={318} width={104} height={28} rx={8} fill="#9AA6BF" stroke={O} strokeWidth={8} />
        <rect x={110} y={344} width={80} height={26} rx={10} fill="#7D8AA6" stroke={O} strokeWidth={8} />
        {/* Visage de l'ampoule (yeux qui s'ouvrent quand elle s'allume) */}
        {frame >= 30 ? (
          <g>
            <circle cx={115} cy={140} r={14} fill={O} />
            <circle cx={185} cy={140} r={14} fill={O} />
            <path d="M110 180 Q 150 215 190 180" stroke={O} strokeWidth={8} fill="none" strokeLinecap="round" />
          </g>
        ) : (
          <g>
            <path d="M100 140 L 130 140 M170 140 L 200 140" stroke={O} strokeWidth={7} strokeLinecap="round" />
            <path d="M130 190 L 170 190" stroke={O} strokeWidth={7} strokeLinecap="round" />
          </g>
        )}
      </svg>
      <LettresRebond texte="UNE IDÉE ?" debut={6} taille={120} couleurs={[toon.white, toon.yellow]} u={u} />
    </div>
  );
};

// Scène 2 : une affiche qui se dessine puis se colorie.
export const SceneAffiche: React.FC<{ readonly u: number }> = ({ u }) => {
  const frame = useCurrentFrame();
  const trait = interpolate(frame, [4, 34], [1, 0], clamp);
  const couleur = interpolate(frame, [30, 44], [0, 1], clamp);
  const promo = spring({ frame: frame - 40, fps: 30, config: { damping: 7 } });
  const b = boil(frame, "affiche");
  const ligne = { pathLength: 1, strokeDasharray: 1, strokeDashoffset: trait, stroke: O, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 * u }}>
      <div style={{ rotate: `${-4 + b.r}deg`, translate: `${b.x * u}px ${b.y * u}px` }}>
        <svg viewBox="-20 -30 440 580" width={440 * u} height={580 * u} style={{ overflow: "visible" }}>
          {/* Feuille + ombre */}
          <rect x={14} y={14} width={400} height={520} fill={O} />
          <rect x={0} y={0} width={400} height={520} fill={toon.cream} stroke={O} strokeWidth={8} />
          {/* Ciel, soleil, montagnes : tracés au crayon puis coloriés */}
          <rect x={30} y={30} width={340} height={300} fill={toon.sky} opacity={couleur} />
          <circle cx={290} cy={110} r={45} fill={toon.yellow} fillOpacity={couleur} {...ligne} />
          <path d="M30 330 L 140 170 L 220 270 L 280 200 L 370 330 Z" fill={toon.mint} fillOpacity={couleur} {...ligne} />
          <path d="M115 206 L 140 170 L 165 206 Q 140 196 115 206 Z" fill={toon.white} fillOpacity={couleur} {...ligne} />
          <rect x={30} y={30} width={340} height={300} fill="none" {...ligne} />
          {/* Lignes de texte */}
          <rect x={60} y={370} width={280} height={36} rx={18} fill={toon.red} fillOpacity={couleur} {...ligne} />
          <rect x={100} y={430} width={200} height={22} rx={11} fill={toon.outline} fillOpacity={couleur * 0.5} {...ligne} />
          <rect x={130} y={470} width={140} height={22} rx={11} fill={toon.outline} fillOpacity={couleur * 0.5} {...ligne} />
          {/* Rubans adhésifs */}
          <rect x={-10} y={-18} width={110} height={36} fill="rgba(255,201,77,0.8)" style={{ transform: "rotate(-20deg)", transformOrigin: "45px 0px" }} />
          <rect x={310} y={-18} width={110} height={36} fill="rgba(255,201,77,0.8)" style={{ transform: "rotate(18deg)", transformOrigin: "365px 0px" }} />
          {/* Étoile « PROMO » */}
          <g style={{ transform: `translate(360px, 380px) scale(${promo}) rotate(${12 + Math.sin(frame / 4) * 6}deg)` }}>
            <path d={etoile(0, 0, 90, 60, 12)} fill={toon.red} stroke={O} strokeWidth={8} strokeLinejoin="round" />
            <text x={0} y={12} textAnchor="middle" fontFamily={toon.font} fontWeight={900} fontSize={34} fill={toon.white}>PROMO</text>
          </g>
        </svg>
      </div>
      <LettresRebond texte="AFFICHES" debut={10} taille={110} couleurs={[toon.white, toon.sky]} u={u} />
    </div>
  );
};

// Scène 3 : une télé rigolote qui joue une vidéo.
export const SceneVideo: React.FC<{ readonly u: number }> = ({ u }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const play = spring({ frame: frame - 8, fps, config: { damping: 8 } });
  const balle = interpolate(frame, [20, 70], [0, 1], clamp);
  const bx = -110 + balle * 220;
  const by = -Math.abs(Math.sin(balle * Math.PI * 3)) * 80 + 40;
  const b = boil(frame, "tele");
  const rec = Math.floor(frame / 8) % 2 === 0;
  const antenne = Math.sin(frame / 3) * 10;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 * u }}>
      <svg viewBox="-40 -150 600 560" width={600 * u} height={560 * u}
        style={{ overflow: "visible", translate: `${b.x * u}px ${b.y * u}px`, rotate: `${b.r}deg`, scale: `${1 + Math.sin(frame / 3) * 0.015} ${1 - Math.sin(frame / 3) * 0.015}` }}>
        {/* Antennes */}
        <g style={{ transform: `rotate(${antenne}deg)`, transformOrigin: "260px 0px" }}>
          <line x1={260} y1={0} x2={170} y2={-120} stroke={O} strokeWidth={8} strokeLinecap="round" />
          <line x1={260} y1={0} x2={350} y2={-120} stroke={O} strokeWidth={8} strokeLinecap="round" />
          <circle cx={170} cy={-120} r={14} fill={toon.red} stroke={O} strokeWidth={6} />
          <circle cx={350} cy={-120} r={14} fill={toon.red} stroke={O} strokeWidth={6} />
        </g>
        {/* Pieds */}
        <rect x={90} y={340} width={30} height={50} rx={8} fill={O} />
        <rect x={400} y={340} width={30} height={50} rx={8} fill={O} />
        {/* Boîtier */}
        <rect x={14} y={14} width={520} height={340} rx={40} fill={O} />
        <rect x={0} y={0} width={520} height={340} rx={40} fill={toon.pink} stroke={O} strokeWidth={8} />
        {/* Écran */}
        <rect x={30} y={30} width={360} height={280} rx={30} fill="#16213E" stroke={O} strokeWidth={8} />
        <g style={{ transform: "translate(210px, 170px)" }}>
          {/* Balle qui rebondit */}
          <circle cx={bx} cy={by} r={28 * (balle > 0 ? 1 : 0)} fill={toon.yellow} stroke={O} strokeWidth={5} />
          {/* Bouton lecture */}
          <g style={{ transform: `scale(${play * (1 - balle * 0.6)})`, opacity: 1 - balle * 0.5 }}>
            <circle r={70} fill={toon.white} stroke={O} strokeWidth={8} />
            <path d="M-20 -35 L 40 0 L -20 35 Z" fill={toon.red} stroke={O} strokeWidth={6} strokeLinejoin="round" />
          </g>
        </g>
        {/* REC */}
        <circle cx={70} cy={66} r={12} fill={rec ? toon.red : "#5A2030"} />
        <text x={92} y={76} fontFamily={toon.font} fontWeight={900} fontSize={28} fill={toon.white}>REC</text>
        {/* Boutons */}
        <circle cx={455} cy={90} r={32} fill={toon.yellow} stroke={O} strokeWidth={7} />
        <line x1={455} y1={90} x2={455 + 20 * Math.cos(frame / 5)} y2={90 + 20 * Math.sin(frame / 5)} stroke={O} strokeWidth={6} strokeLinecap="round" />
        <circle cx={455} cy={180} r={26} fill={toon.mint} stroke={O} strokeWidth={7} />
        {[240, 262, 284].map((y) => (
          <line key={y} x1={425} y1={y} x2={485} y2={y} stroke={O} strokeWidth={6} strokeLinecap="round" />
        ))}
      </svg>
      <LettresRebond texte="VIDÉOS PUB" debut={10} taille={110} couleurs={[toon.white, toon.pink]} u={u} />
    </div>
  );
};

// Scène 4 : le logo, le slogan et le contact, avec des confettis.
export const SceneLogo: React.FC<{
  readonly u: number;
  readonly title: string;
  readonly tagline: string;
  readonly contact: string;
}> = ({ u, title, tagline, contact }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ruban = spring({ frame: frame - 22, fps, config: { damping: 9 } });
  const tel = spring({ frame: frame - 34, fps, config: { damping: 8 } });
  const [l1, ...rest] = title.split(" ");
  const l2 = rest.join(" ");
  const b = boil(frame, "logo");
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 * u }}>
      <Confettis u={u} />
      <div style={{ translate: `${b.x * u}px ${b.y * u}px`, rotate: `${-3 + b.r}deg`, display: "flex", flexDirection: "column", gap: 10 * u }}>
        <LettresRebond texte={l1} debut={0} taille={170} couleurs={[toon.yellow, toon.white]} u={u} />
        {l2 ? <LettresRebond texte={l2} debut={8} taille={130} couleurs={[toon.white, toon.sky]} u={u} /> : null}
      </div>
      {/* Ruban avec le slogan */}
      <div
        style={{
          marginTop: 30 * u,
          background: toon.red,
          border: `${7 * u}px solid ${O}`,
          boxShadow: `${9 * u}px ${9 * u}px 0 ${O}`,
          borderRadius: 16 * u,
          padding: `${18 * u}px ${40 * u}px`,
          ...toonText(u, toon.white, 56),
          textShadow: "none",
          WebkitTextStroke: `${3 * u}px ${O}`,
          scale: `${ruban} ${ruban}`,
          rotate: `${2 + Math.sin(frame / 7) * 1.5}deg`,
          whiteSpace: "nowrap",
        }}
      >
        {tagline}
      </div>
      {/* Contact */}
      <div
        style={{
          marginTop: 26 * u,
          background: toon.white,
          border: `${7 * u}px solid ${O}`,
          boxShadow: `${8 * u}px ${8 * u}px 0 ${O}`,
          borderRadius: 100 * u,
          padding: `${16 * u}px ${36 * u}px`,
          fontFamily: toon.font,
          fontWeight: 800,
          fontSize: 44 * u,
          color: O,
          whiteSpace: "nowrap",
          scale: String(tel * (1 + Math.sin(frame / 4) * 0.03)),
        }}
      >
        {contact}
      </div>
    </div>
  );
};

const Confettis: React.FC<{ readonly u: number }> = ({ u }) => {
  const frame = useCurrentFrame();
  const couleurs = [toon.yellow, toon.pink, toon.sky, toon.mint, toon.red, toon.white];
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {new Array(36).fill(0).map((_, i) => {
        const x = (random(`cx${i}`) - 0.5) * 1300;
        const v = 6 + random(`cv${i}`) * 8;
        const y = -700 + (frame - random(`cd${i}`) * 20) * v * 2.2;
        const r = frame * (4 + random(`cr${i}`) * 10);
        const w = 18 + random(`cw${i}`) * 16;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: w * u,
              height: w * 0.55 * u,
              background: couleurs[i % couleurs.length],
              border: `${3 * u}px solid ${toon.outline}`,
              borderRadius: 4 * u,
              translate: `${(x + Math.sin(frame / 6 + i) * 30) * u}px ${y * u}px`,
              rotate: `${r}deg`,
            }}
          />
        );
      })}
    </div>
  );
};

function etoile(cx: number, cy: number, R: number, r: number, n: number) {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * i) / n - Math.PI / 2;
    const rad = i % 2 === 0 ? R : r;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
}
