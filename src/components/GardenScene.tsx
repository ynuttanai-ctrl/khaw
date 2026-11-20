import type { TimeOfDay } from '../types';

interface GardenSceneProps {
  timeOfDay: TimeOfDay;
}

const PALETTES: Record<
  TimeOfDay,
  {
    skyTop: string;
    skyMid: string;
    skyBot: string;
    orbColor: string;
    orbHalo: string;
    cloudFill: string;
    cloudOpacity: number;
    hillFar: string;
    hillMid: string;
    salaFill: string;
    bushBack: string;
    bushFront: string;
    trunk: string;
    pathTop: string;
    pathBot: string;
    stoneFill: string;
    stoneStroke: string;
    lanternGlow: number;
    starOpacity: number;
    fireflyOpacity: number;
    foreGrass: string;
  }
> = {
  morning: {
    skyTop: '#7CC2F4',
    skyMid: '#C7E7FA',
    skyBot: '#FFF3DF',
    orbColor: '#FFFBEB',
    orbHalo: '#FDE68A',
    cloudFill: '#FFFFFF',
    cloudOpacity: 0.78,
    hillFar: '#9BC4D4',
    hillMid: '#79AEAB',
    salaFill: '#568582',
    bushBack: '#4F8F76',
    bushFront: '#38765F',
    trunk: '#5E4B3C',
    pathTop: '#E7DCCB',
    pathBot: '#CBBCA6',
    stoneFill: '#F4EDE1',
    stoneStroke: '#D5C7B2',
    lanternGlow: 0.12,
    starOpacity: 0,
    fireflyOpacity: 0,
    foreGrass: '#285947',
  },
  sunset: {
    skyTop: '#2E1F47',
    skyMid: '#C85A6B',
    skyBot: '#FBCB86',
    orbColor: '#FFF5D6',
    orbHalo: '#FB923C',
    cloudFill: '#FFD5B5',
    cloudOpacity: 0.56,
    hillFar: '#6C3D5D',
    hillMid: '#4E2C47',
    salaFill: '#351D33',
    bushBack: '#2F3D3C',
    bushFront: '#1F2F2E',
    trunk: '#2D1E22',
    pathTop: '#B2846E',
    pathBot: '#7F594C',
    stoneFill: '#CCA28B',
    stoneStroke: '#8F6755',
    lanternGlow: 0.85,
    starOpacity: 0.35,
    fireflyOpacity: 0.55,
    foreGrass: '#172222',
  },
  moonlight: {
    skyTop: '#060D21',
    skyMid: '#122548',
    skyBot: '#24456E',
    orbColor: '#F8FAFC',
    orbHalo: '#93C5FD',
    cloudFill: '#6482AD',
    cloudOpacity: 0.28,
    hillFar: '#162C4E',
    hillMid: '#10223E',
    salaFill: '#0A162B',
    bushBack: '#12313B',
    bushFront: '#0C232C',
    trunk: '#101B26',
    pathTop: '#324861',
    pathBot: '#1F3044',
    stoneFill: '#455E7A',
    stoneStroke: '#293D54',
    lanternGlow: 1,
    starOpacity: 0.95,
    fireflyOpacity: 1,
    foreGrass: '#08171F',
  },
};

const STARS = [
  { cx: 120, cy: 76, r: 1.8 },
  { cx: 245, cy: 132, r: 1.2 },
  { cx: 380, cy: 62, r: 2.1 },
  { cx: 510, cy: 112, r: 1.4 },
  { cx: 640, cy: 52, r: 1.6 },
  { cx: 790, cy: 126, r: 1.3 },
  { cx: 925, cy: 74, r: 2.0 },
  { cx: 1060, cy: 144, r: 1.5 },
  { cx: 1190, cy: 58, r: 1.8 },
  { cx: 1330, cy: 102, r: 1.4 },
  { cx: 170, cy: 185, r: 1.1 },
  { cx: 455, cy: 174, r: 1.3 },
  { cx: 860, cy: 180, r: 1.2 },
  { cx: 1280, cy: 172, r: 1.5 },
];

const PETALS = [
  { id: 0, startX: 160, startY: 160, scale: 0.9 },
  { id: 1, startX: 410, startY: 110, scale: 0.72 },
  { id: 2, startX: 690, startY: 190, scale: 1.0 },
  { id: 3, startX: 930, startY: 130, scale: 0.8 },
  { id: 4, startX: 1180, startY: 175, scale: 0.68 },
  { id: 5, startX: 1370, startY: 120, scale: 0.88 },
];

const FIREFLIES = [
  { id: 0, x: 180, y: 490 },
  { id: 1, x: 340, y: 540 },
  { id: 2, x: 520, y: 465 },
  { id: 3, x: 670, y: 530 },
  { id: 4, x: 840, y: 485 },
  { id: 5, x: 1020, y: 550 },
  { id: 6, x: 1180, y: 475 },
  { id: 7, x: 1320, y: 535 },
];

function CloudTile({ offsetX, fill, opacity }: { offsetX: number; fill: string; opacity: number }) {
  return (
    <g transform={`translate(${offsetX}, 0)`} fill={fill} opacity={opacity}>
      <path d="M 110 155 Q 130 124 166 132 Q 186 105 224 118 Q 254 114 268 136 Q 290 140 286 156 Z" />
      <path d="M 520 112 Q 548 80 590 92 Q 618 68 656 85 Q 690 82 706 104 Q 726 109 722 122 L 516 122 Z" />
      <path d="M 960 170 Q 984 142 1018 148 Q 1044 124 1084 138 Q 1114 134 1128 156 Q 1144 160 1140 172 Z" />
      <path d="M 1260 118 Q 1280 96 1308 102 Q 1328 84 1358 96 Q 1384 96 1392 118 Z" />
    </g>
  );
}

function FarLandscapeTile({
  offsetX,
  hillFar,
  hillMid,
  salaFill,
}: {
  offsetX: number;
  hillFar: string;
  hillMid: string;
  salaFill: string;
}) {
  return (
    <g transform={`translate(${offsetX}, 0)`}>
      {/* Soft misty distant hills */}
      <path
        d="M 0 540 Q 180 430 390 480 Q 610 530 820 445 Q 1060 390 1260 470 Q 1360 505 1440 490 L 1440 660 L 0 660 Z"
        fill={hillFar}
        opacity="0.72"
      />
      <path
        d="M 0 560 Q 210 495 450 535 Q 720 570 980 495 Q 1210 465 1440 535 L 1440 660 L 0 660 Z"
        fill={hillMid}
        opacity="0.86"
      />

      {/* Iconic Thai Garden Sala (ศาลาไทย) silhouette */}
      <g transform="translate(260, 446)" fill={salaFill}>
        {/* Tiered Thai roof with graceful Chofa finial */}
        <path d="M 90 -16 C 92 -26, 95 -28, 97 -16 L 138 22 C 154 32, 168 35, 180 34 C 166 42, 148 44, 134 40 L 160 60 C 176 68, 190 70, 200 68 C 186 76, 168 78, 152 75 L 36 75 C 20 78, 2 76, -12 68 C -2 70, 12 68, 28 60 L 54 40 C 40 44, 22 42, 8 34 C 20 35, 34 32, 50 22 Z" />
        {/* Sala pillars & deck */}
        <rect x="34" y="75" width="7" height="58" />
        <rect x="147" y="75" width="7" height="58" />
        <rect x="68" y="75" width="5" height="58" opacity="0.65" />
        <rect x="115" y="75" width="5" height="58" opacity="0.65" />
        <rect x="20" y="128" width="148" height="10" rx="2" />
      </g>

      {/* Second distant pagoda / tropical trees silhouette */}
      <g transform="translate(1060, 456)" fill={salaFill} opacity="0.82">
        <path d="M 48 -8 L 54 22 L 62 34 L 70 58 L 26 58 L 34 34 L 42 22 Z" />
        <rect x="20" y="58" width="56" height="44" />
      </g>
    </g>
  );
}

function MidGardenTile({
  offsetX,
  bushBack,
  bushFront,
  trunk,
  lanternGlow,
}: {
  offsetX: number;
  bushBack: string;
  bushFront: string;
  trunk: string;
  lanternGlow: number;
}) {
  return (
    <g transform={`translate(${offsetX}, 0)`}>
      {/* Lush tropical garden hedgerow */}
      <path
        d="M 0 620
           Q 70 545 160 572
           Q 240 525 340 562
           Q 435 518 540 565
           Q 640 530 740 572
           Q 845 520 960 566
           Q 1070 524 1180 568
           Q 1310 532 1440 575
           L 1440 670 L 0 670 Z"
        fill={bushBack}
      />

      {/* Frangipani / Plumeria Tree 1 (ต้นลีลาวดี) */}
      <g transform="translate(175, 420)">
        <path
          d="M 28 210 C 32 150, 26 110, 12 72 M 26 135 C 44 102, 62 82, 82 62 M 22 108 C 2 88, -16 74, -36 62"
          stroke={trunk}
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="-24" cy="52" rx="56" ry="30" fill={bushFront} />
        <ellipse cx="22" cy="36" rx="68" ry="36" fill={bushBack} />
        <ellipse cx="78" cy="54" rx="58" ry="30" fill={bushFront} />
        {/* Delicate white & gold Frangipani blossoms */}
        {[
          [-42, 46],
          [-6, 30],
          [32, 22],
          [66, 44],
          [98, 52],
          [14, 52],
        ].map(([bx, by], idx) => (
          <g key={idx} transform={`translate(${bx}, ${by})`}>
            <circle cx="0" cy="-4" r="3.4" fill="#FFFDF7" />
            <circle cx="3.8" cy="-1.2" r="3.4" fill="#FFFDF7" />
            <circle cx="2.3" cy="3.2" r="3.4" fill="#FFFDF7" />
            <circle cx="-2.3" cy="3.2" r="3.4" fill="#FFFDF7" />
            <circle cx="-3.8" cy="-1.2" r="3.4" fill="#FFFDF7" />
            <circle cx="0" cy="0" r="2.2" fill="#FACC15" />
          </g>
        ))}
      </g>

      {/* Frangipani Tree 2 */}
      <g transform="translate(910, 435)">
        <path
          d="M 20 198 C 18 145, 24 104, 40 68 M 22 128 C 4 98, -18 80, -40 62"
          stroke={trunk}
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="-32" cy="54" rx="54" ry="28" fill={bushFront} />
        <ellipse cx="26" cy="40" rx="66" ry="34" fill={bushBack} />
        <ellipse cx="74" cy="58" rx="48" ry="26" fill={bushFront} />
        {[
          [-48, 48],
          [-10, 38],
          [30, 26],
          [64, 48],
          [18, 56],
        ].map(([bx, by], idx) => (
          <g key={idx} transform={`translate(${bx}, ${by})`}>
            <circle cx="0" cy="-3.6" r="3.1" fill="#FFFDF7" />
            <circle cx="3.4" cy="-1.1" r="3.1" fill="#FFFDF7" />
            <circle cx="2.1" cy="2.9" r="3.1" fill="#FFFDF7" />
            <circle cx="-2.1" cy="2.9" r="3.1" fill="#FFFDF7" />
            <circle cx="-3.4" cy="-1.1" r="3.1" fill="#FFFDF7" />
            <circle cx="0" cy="0" r="2" fill="#FACC15" />
          </g>
        ))}
      </g>

      {/* Thai Garden Stone Lanterns (โคมไฟสวน) */}
      {[530, 1270].map((lx) => (
        <g key={lx} transform={`translate(${lx}, 548)`}>
          {lanternGlow > 0.05 && (
            <circle
              cx="0"
              cy="12"
              r="54"
              fill="url(#lanternHaloGrad)"
              opacity={lanternGlow}
            />
          )}
          <rect x="-5" y="28" width="10" height="58" rx="2" fill="#475569" />
          <rect x="-13" y="82" width="26" height="7" rx="2" fill="#334155" />
          {/* Warm glowing lantern chamber */}
          <rect
            x="-10"
            y="4"
            width="20"
            height="24"
            rx="3"
            fill={lanternGlow > 0.4 ? '#FDE68A' : '#CBD5E1'}
            stroke="#334155"
            strokeWidth="1.6"
          />
          {/* Curved Thai lantern cap */}
          <path d="M -18 5 Q 0 -10 18 5 Z" fill="#334155" />
          <circle cx="0" cy="-4" r="3" fill="#334155" />
        </g>
      ))}

      {/* Foreground low garden shrubs */}
      <path
        d="M 0 645
           Q 85 592 175 622
           Q 280 584 395 625
           Q 520 595 640 628
           Q 765 588 890 624
           Q 1015 592 1140 626
           Q 1290 588 1440 622
           L 1440 668 L 0 668 Z"
        fill={bushFront}
      />
    </g>
  );
}

function GroundPathTile({
  offsetX,
  stoneFill,
  stoneStroke,
}: {
  offsetX: number;
  stoneFill: string;
  stoneStroke: string;
}) {
  const stones = [
    { x: 40, y: 672, w: 122, h: 30 },
    { x: 205, y: 676, w: 146, h: 32 },
    { x: 392, y: 670, w: 132, h: 30 },
    { x: 564, y: 676, w: 152, h: 32 },
    { x: 758, y: 672, w: 128, h: 30 },
    { x: 930, y: 677, w: 148, h: 31 },
    { x: 1122, y: 671, w: 134, h: 30 },
    { x: 1294, y: 675, w: 118, h: 31 },
  ];

  const fallenBlossoms = [130, 355, 620, 885, 1145, 1380];

  return (
    <g transform={`translate(${offsetX}, 0)`}>
      {/* Stepping stones along the garden path */}
      {stones.map((s, idx) => (
        <rect
          key={idx}
          x={s.x}
          y={s.y}
          width={s.w}
          height={s.h}
          rx="14"
          fill={stoneFill}
          stroke={stoneStroke}
          strokeWidth="1.8"
          opacity="0.72"
        />
      ))}

      {/* Subtle wooden border trim along top of walkway */}
      <line x1="0" y1="654" x2="1440" y2="654" stroke={stoneStroke} strokeWidth="3" opacity="0.65" />

      {/* Fallen Frangipani petals resting on the path */}
      {fallenBlossoms.map((bx, i) => (
        <g key={i} transform={`translate(${bx}, ${i % 2 === 0 ? 662 : 716}) scale(0.85)`}>
          <circle cx="0" cy="-3" r="2.6" fill="#FFFDF7" opacity="0.9" />
          <circle cx="3" cy="0" r="2.6" fill="#FFFDF7" opacity="0.9" />
          <circle cx="0" cy="3" r="2.6" fill="#FFFDF7" opacity="0.9" />
          <circle cx="-3" cy="0" r="2.6" fill="#FFFDF7" opacity="0.9" />
          <circle cx="0" cy="0" r="1.5" fill="#FACC15" />
        </g>
      ))}
    </g>
  );
}

function ForeGrassTile({ offsetX, fill }: { offsetX: number; fill: string }) {
  return (
    <g transform={`translate(${offsetX}, 0)`} fill={fill} opacity="0.78">
      {[80, 290, 540, 790, 1060, 1320].map((gx, i) => (
        <g key={i} transform={`translate(${gx}, 800)`}>
          <path d="M -22 0 Q -26 -38 -42 -58 Q -18 -34 -10 0 Z" />
          <path d="M -6 0 Q -2 -48 12 -74 Q 4 -36 8 0 Z" />
          <path d="M 10 0 Q 24 -36 42 -52 Q 20 -26 20 0 Z" />
        </g>
      ))}
    </g>
  );
}

export function GardenScene({ timeOfDay }: GardenSceneProps) {
  const p = PALETTES[timeOfDay];

  return (
    <svg
      className="scene-svg"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.skyTop} style={{ transition: 'stop-color 0.9s ease' }} />
          <stop offset="56%" stopColor={p.skyMid} style={{ transition: 'stop-color 0.9s ease' }} />
          <stop offset="100%" stopColor={p.skyBot} style={{ transition: 'stop-color 0.9s ease' }} />
        </linearGradient>

        <radialGradient id="orbHaloGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.orbHalo} stopOpacity="0.65" />
          <stop offset="55%" stopColor={p.orbHalo} stopOpacity="0.18" />
          <stop offset="100%" stopColor={p.orbHalo} stopOpacity="0" />
        </radialGradient>

        <radialGradient id="lanternHaloGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE047" stopOpacity="0.68" />
          <stop offset="50%" stopColor="#FB923C" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="pathGradient" x1="0" y1="650" x2="0" y2="800" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={p.pathTop} />
          <stop offset="100%" stopColor={p.pathBot} />
        </linearGradient>
      </defs>

      {/* SKY BACKDROP */}
      <rect x="0" y="0" width="1440" height="800" fill="url(#skyGradient)" />

      {/* TWINKLING STARS */}
      <g opacity={p.starOpacity} style={{ transition: 'opacity 1s ease' }}>
        {STARS.map((star, idx) => (
          <circle
            key={idx}
            className="sky-star"
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill="#F8FAFC"
          />
        ))}
      </g>

      {/* CELESTIAL SUN / MOON */}
      <g transform="translate(1140, 178)">
        <g className="celestial-orb">
          <circle cx="0" cy="0" r="145" fill="url(#orbHaloGrad)" />
          <circle cx="0" cy="0" r="46" fill={p.orbColor} />
          {timeOfDay === 'moonlight' && (
            <g opacity="0.12" fill="#94A3B8">
              <circle cx="-12" cy="-8" r="10" />
              <circle cx="15" cy="11" r="7" />
              <circle cx="8" cy="-16" r="5" />
            </g>
          )}
        </g>
      </g>

      {/* PARALLAX 1: SOFT DRIFTING CLOUDS (3-tile wrap for bidirectional smoothness) */}
      <g className="parallax-clouds">
        <CloudTile offsetX={-1440} fill={p.cloudFill} opacity={p.cloudOpacity} />
        <CloudTile offsetX={0} fill={p.cloudFill} opacity={p.cloudOpacity} />
        <CloudTile offsetX={1440} fill={p.cloudFill} opacity={p.cloudOpacity} />
      </g>

      {/* PARALLAX 2: DISTANT HILLS & THAI SALA */}
      <g className="parallax-far">
        <FarLandscapeTile offsetX={-1440} hillFar={p.hillFar} hillMid={p.hillMid} salaFill={p.salaFill} />
        <FarLandscapeTile offsetX={0} hillFar={p.hillFar} hillMid={p.hillMid} salaFill={p.salaFill} />
        <FarLandscapeTile offsetX={1440} hillFar={p.hillFar} hillMid={p.hillMid} salaFill={p.salaFill} />
      </g>

      {/* PARALLAX 3: MID-GROUND FRANGIPANI TREES & LANTERNS */}
      <g className="parallax-mid">
        <MidGardenTile
          offsetX={-1440}
          bushBack={p.bushBack}
          bushFront={p.bushFront}
          trunk={p.trunk}
          lanternGlow={p.lanternGlow}
        />
        <MidGardenTile
          offsetX={0}
          bushBack={p.bushBack}
          bushFront={p.bushFront}
          trunk={p.trunk}
          lanternGlow={p.lanternGlow}
        />
        <MidGardenTile
          offsetX={1440}
          bushBack={p.bushBack}
          bushFront={p.bushFront}
          trunk={p.trunk}
          lanternGlow={p.lanternGlow}
        />
      </g>

      {/* GARDEN WALKWAY BASE */}
      <rect x="0" y="652" width="1440" height="148" fill="url(#pathGradient)" />

      {/* PARALLAX 4: STEPPING STONES SYNCED TO CAT PAWS */}
      <g className="parallax-ground">
        <GroundPathTile offsetX={-1440} stoneFill={p.stoneFill} stoneStroke={p.stoneStroke} />
        <GroundPathTile offsetX={0} stoneFill={p.stoneFill} stoneStroke={p.stoneStroke} />
        <GroundPathTile offsetX={1440} stoneFill={p.stoneFill} stoneStroke={p.stoneStroke} />
      </g>

      {/* PLAYFUL SAPPHIRE-GOLD BUTTERFLY */}
      <g transform="translate(960, 445)">
        <g className="garden-butterfly">
          <g className="butterfly-wings">
            {/* Left wing */}
            <g className="butterfly-wing-left">
              <path
                d="M 0 0 C -14 -16, -24 -6, -12 4 C -20 10, -10 18, 0 5 Z"
                fill="#38BDF8"
                stroke="#E0F2FE"
                strokeWidth="0.8"
                opacity="0.92"
              />
              <circle cx="-11" cy="-3" r="2.2" fill="#FEF08A" />
            </g>
            {/* Right wing */}
            <g className="butterfly-wing-right">
              <path
                d="M 0 0 C 14 -16, 24 -6, 12 4 C 20 10, 10 18, 0 5 Z"
                fill="#FBBF24"
                stroke="#FEF3C7"
                strokeWidth="0.8"
                opacity="0.92"
              />
              <circle cx="11" cy="-3" r="2.2" fill="#E0F2FE" />
            </g>
            <ellipse cx="0" cy="2" rx="1.5" ry="6.5" fill="#1E293B" />
          </g>
        </g>
      </g>

      {/* DRIFTING FRANGIPANI PETALS */}
      <g className="petals-layer">
        {PETALS.map((pt) => (
          <g key={pt.id} transform={`translate(${pt.startX}, ${pt.startY}) scale(${pt.scale})`}>
            <g className="floating-petal">
              <path
                d="M 0 -7 C 4 -7, 6 -2, 0 3 C -6 -2, -4 -7, 0 -7 Z"
                fill="#FFFDF7"
                opacity="0.88"
              />
              <circle cx="0" cy="1" r="1.8" fill="#FDE047" opacity="0.9" />
            </g>
          </g>
        ))}
      </g>

      {/* GLOWING FIREFLIES (Sunset & Moonlight) */}
      <g opacity={p.fireflyOpacity} style={{ transition: 'opacity 1s ease' }}>
        {FIREFLIES.map((ff) => (
          <g key={ff.id} transform={`translate(${ff.x}, ${ff.y})`}>
            <g className="garden-firefly">
              <circle cx="0" cy="0" r="9" fill="#FDE047" opacity="0.22" />
              <circle cx="0" cy="0" r="2.6" fill="#FEF9C3" />
            </g>
          </g>
        ))}
      </g>

      {/* PARALLAX 5: SOFT FOREGROUND SILHOUETTE GRASS */}
      <g className="parallax-fore">
        <ForeGrassTile offsetX={-1440} fill={p.foreGrass} />
        <ForeGrassTile offsetX={0} fill={p.foreGrass} />
        <ForeGrassTile offsetX={1440} fill={p.foreGrass} />
      </g>
    </svg>
  );
}
