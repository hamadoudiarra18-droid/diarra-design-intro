import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { boil, toon } from "./style";

const O = toon.outline;

// Moments où la mascotte parle (la bouche s'ouvre et se ferme).
const PAROLE: [number, number][] = [
  [12, 60],
  [85, 135],
  [160, 210],
  [235, 285],
];
// Petits sauts au début de chaque scène.
const SAUTS = [75, 150, 225];
// Clignements des yeux.
const CLIGNEMENTS = [48, 128, 196];

// « Crayonnou » : un crayon jaune avec des yeux, des bras et un grand sourire.
export const Mascotte: React.FC<{ readonly height: number; readonly regard: { x: number; y: number } }> = ({
  height,
  regard,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = height / 440;

  // Entrée en sautillant depuis la gauche.
  const entree = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });
  const entreeX = interpolate(entree, [0, 1], [-1100, 0]);
  const entreeY = -Math.abs(Math.sin(frame / 3.2)) * 120 * Math.max(0, 1 - entree * 1.3);

  // Sauts : montée/descente rapide puis écrasement à l'atterrissage.
  let sautY = 0;
  let ecrase = 0;
  for (const s of SAUTS) {
    const p = (frame - s) / 14;
    if (p >= 0 && p <= 1) sautY = -Math.sin(Math.PI * p) * 140;
    const q = (frame - s - 14) / 8;
    if (q >= 0 && q <= 1) ecrase = Math.sin(Math.PI * q) * 0.12;
  }
  // Rebond d'atterrissage de l'entrée.
  const atterr = (frame - 14) / 8;
  if (atterr >= 0 && atterr <= 1) ecrase = Math.max(ecrase, Math.sin(Math.PI * atterr) * 0.14);

  const respire = Math.sin(frame / 5) * 0.025;
  const scaleY = 1 - ecrase + respire;
  const scaleX = 1 + ecrase * 0.8 - respire * 0.6;

  const parle = PAROLE.some(([a, b]) => frame >= a && frame <= b) && Math.floor(frame / 4) % 2 === 0;
  const cligne = CLIGNEMENTS.some((c) => frame >= c && frame < c + 4);
  const clin = frame >= 262 && frame < 278; // clin d'œil final

  // Bras droit : salue au début, montre le contenu ensuite, applaudit à la fin.
  const salut = frame < 70 ? Math.sin(frame / 2.5) * 28 - 30 : 0;
  const brasDroit =
    frame < 70
      ? salut
      : interpolate(frame, [70, 80, 225, 235], [-30, -70, -70, -120], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }) + Math.sin(frame / 6) * 6;
  const brasGauche = frame >= 235 ? Math.sin(frame / 2.2) * 20 + 40 : 10 + Math.sin(frame / 7) * 6;

  const b = boil(frame, "mascotte", 0.6);
  const px = regard.x * 7;
  const py = regard.y * 7;

  return (
    <div
      style={{
        width: 240 * k,
        height: 440 * k,
        translate: `${entreeX * k + b.x * k}px ${(entreeY + sautY) * k + b.y * k}px`,
        rotate: `${b.r + Math.sin(frame / 9) * 2}deg`,
        scale: `${scaleX} ${scaleY}`,
        transformOrigin: "50% 100%",
      }}
    >
      <svg viewBox="-40 -20 320 470" width={320 * k} height={470 * k} style={{ marginLeft: -40 * k, marginTop: -20 * k, overflow: "visible" }}>
        {/* Ombre au sol */}
        <ellipse cx={120} cy={432} rx={70 + sautY * 0.2} ry={10} fill="rgba(0,0,0,0.25)" />
        {/* Bras gauche */}
        <g style={{ transform: `rotate(${brasGauche}deg)`, transformOrigin: "62px 235px" }}>
          <path d="M62 235 Q 20 255 14 300" stroke={O} strokeWidth={9} fill="none" strokeLinecap="round" />
          <circle cx={14} cy={304} r={16} fill={toon.white} stroke={O} strokeWidth={6} />
        </g>
        {/* Bras droit */}
        <g style={{ transform: `rotate(${brasDroit}deg)`, transformOrigin: "178px 235px" }}>
          <path d="M178 235 Q 220 255 226 300" stroke={O} strokeWidth={9} fill="none" strokeLinecap="round" />
          <circle cx={226} cy={304} r={16} fill={toon.white} stroke={O} strokeWidth={6} />
        </g>
        {/* Pointe en bois + mine */}
        <path d="M62 330 L178 330 L120 425 Z" fill="#F4D3A1" stroke={O} strokeWidth={7} strokeLinejoin="round" />
        <path d="M102 395 L138 395 L120 425 Z" fill={O} />
        {/* Corps */}
        <rect x={62} y={96} width={116} height={236} fill={toon.yellow} stroke={O} strokeWidth={7} />
        <rect x={140} y={100} width={34} height={228} fill={toon.orange} opacity={0.55} />
        {/* Gomme + bague */}
        <rect x={62} y={22} width={116} height={56} rx={24} fill={toon.pink} stroke={O} strokeWidth={7} />
        <rect x={56} y={70} width={128} height={32} rx={6} fill="#C9D3E6" stroke={O} strokeWidth={7} />
        <line x1={70} y1={86} x2={170} y2={86} stroke={O} strokeWidth={4} />
        {/* Joues */}
        <circle cx={80} cy={222} r={13} fill={toon.pink} opacity={0.6} />
        <circle cx={162} cy={222} r={13} fill={toon.pink} opacity={0.6} />
        {/* Yeux */}
        {[
          { cx: 98, ferme: cligne || clin },
          { cx: 145, ferme: cligne },
        ].map((o) =>
          o.ferme ? (
            <path key={o.cx} d={`M${o.cx - 18} 172 Q ${o.cx} 186 ${o.cx + 18} 172`} stroke={O} strokeWidth={6} fill="none" strokeLinecap="round" />
          ) : (
            <g key={o.cx}>
              <ellipse cx={o.cx} cy={170} rx={20} ry={25} fill={toon.white} stroke={O} strokeWidth={6} />
              <circle cx={o.cx + px} cy={172 + py} r={9} fill={O} />
              <circle cx={o.cx + px + 3} cy={168 + py} r={3} fill={toon.white} />
            </g>
          ),
        )}
        {/* Sourcils */}
        <path d="M80 136 Q 98 128 114 136" stroke={O} strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M128 136 Q 145 128 162 136" stroke={O} strokeWidth={6} fill="none" strokeLinecap="round" />
        {/* Bouche */}
        {parle ? (
          <g>
            <path d="M94 210 Q 120 262 148 210 Z" fill="#8B1E3F" stroke={O} strokeWidth={6} strokeLinejoin="round" />
            <ellipse cx={121} cy={238} rx={12} ry={7} fill={toon.pink} />
          </g>
        ) : (
          <path d="M94 212 Q 120 240 148 212" stroke={O} strokeWidth={7} fill="none" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
};
