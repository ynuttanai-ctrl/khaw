import type { EyeVariant } from '../types';

interface KhaoManeeCatProps {
  eyeVariant: EyeVariant;
}

export function KhaoManeeCat({ eyeVariant }: KhaoManeeCatProps) {
  const rightEyeGrad =
    eyeVariant === 'sapphire' ? 'url(#sapphireEye)' : 'url(#amberEye)';
  const leftEyeGrad =
    eyeVariant === 'amber' ? 'url(#amberEye)' : 'url(#sapphireEye)';

  const rightEyeGlow =
    eyeVariant === 'sapphire' ? 'rgba(56, 189, 248, 0.45)' : 'rgba(245, 158, 11, 0.45)';
  const leftEyeGlow =
    eyeVariant === 'amber' ? 'rgba(245, 158, 11, 0.45)' : 'rgba(56, 189, 248, 0.45)';

  return (
    <svg
      className="cat-svg"
      viewBox="0 0 360 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="แมวขาวมณีกำลังเดินเล่น"
      role="img"
    >
      <defs>
        {/* Pure snowy Khao Manee coat with soft pearl dimensionality */}
        <linearGradient id="bodyFurGrad" x1="160" y1="98" x2="180" y2="164" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="68%" stopColor="#FAF8F5" />
          <stop offset="100%" stopColor="#EAE6DF" />
        </linearGradient>

        <linearGradient id="nearFurGrad" x1="0" y1="0" x2="14" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#F8F7F4" />
          <stop offset="100%" stopColor="#E9E6E0" />
        </linearGradient>

        <linearGradient id="farFurGrad" x1="0" y1="0" x2="12" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E5E8F0" />
          <stop offset="70%" stopColor="#D7DCE8" />
          <stop offset="100%" stopColor="#C8CFDF" />
        </linearGradient>

        <linearGradient id="tailFurGrad" x1="0" y1="0" x2="-34" y2="-32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F9F8F6" />
          <stop offset="60%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1EFEA" />
        </linearGradient>

        <linearGradient id="headFurGrad" x1="0" y1="-26" x2="6" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="74%" stopColor="#FCFBF9" />
          <stop offset="100%" stopColor="#EDEAE3" />
        </linearGradient>

        <linearGradient id="earPinkGrad" x1="0" y1="-16" x2="0" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAD2DA" />
          <stop offset="100%" stopColor="#F3A9B8" />
        </linearGradient>

        {/* Iconic Khao Manee Jewel Eyes */}
        <radialGradient id="sapphireEye" cx="42%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="38%" stopColor="#38BDF8" />
          <stop offset="75%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>

        <radialGradient id="amberEye" cx="42%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#FBBF24" />
          <stop offset="78%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </radialGradient>

        {/* Thai silk collar & gold bell */}
        <linearGradient id="collarSilk" x1="-14" y1="-14" x2="20" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#991B1B" />
          <stop offset="45%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>

        <radialGradient id="goldBell" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FEF9C3" />
          <stop offset="45%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>

        <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0F172A" stopOpacity="0.34" />
          <stop offset="65%" stopColor="#0F172A" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft ground shadow synced to stride & jump height */}
      <g transform="translate(174, 219)">
        <ellipse className="cat-shadow" cx="0" cy="0" rx="76" ry="11" fill="url(#shadowGrad)" />
      </g>

      {/* Root group for jumps, landing squash, and posture transitions */}
      <g className="cat-root">
        {/* Main body bobbing & gentle pitch */}
        <g className="cat-body">
          {/* 1. GRACEFUL MULTI-SEGMENT TAIL (travelling S-wave) */}
          <g transform="translate(106, 124)">
            <g className="tail-base">
              <circle cx="0" cy="0" r="8.5" fill="url(#tailFurGrad)" />
              <path
                d="M -2 -7.5 C -14 -12, -26 -16, -34 -26 C -37 -29, -32 -34, -27 -30 C -19 -22, -9 -17, 2 -8 Z"
                fill="url(#tailFurGrad)"
                stroke="#E5E2DC"
                strokeWidth="0.9"
              />
              {/* Tail mid segment */}
              <g transform="translate(-31, -27)">
                <g className="tail-mid">
                  <circle cx="0" cy="0" r="6.8" fill="#FFFFFF" />
                  <path
                    d="M -5 -2 C -12 -12, -16 -24, -18 -35 C -19 -39, -12 -40, -10 -35 C -7 -24, -4 -14, 4 -4 Z"
                    fill="url(#tailFurGrad)"
                    stroke="#E5E2DC"
                    strokeWidth="0.8"
                  />
                  {/* Tail tip segment */}
                  <g transform="translate(-14, -35)">
                    <g className="tail-tip">
                      <circle cx="0" cy="0" r="5.3" fill="#FFFFFF" />
                      <path
                        d="M -4.2 -1 C -5 -13, 0 -24, 9 -29 C 13 -31, 16 -25, 12 -21 C 6 -16, 4 -9, 4.2 0 Z"
                        fill="#FFFFFF"
                        stroke="#E5E2DC"
                        strokeWidth="0.75"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>

          {/* 2. FAR HIND LEG (shaded pearl for depth) */}
          <g transform="translate(126, 139)">
            <g className="leg-hb-far-upper">
              {/* Muscular feline thigh */}
              <path
                d="M -11 -4 C -15 8, -17 22, -14 35 C -13 39, -6 39, -4 34 C 2 22, 10 10, 11 -3 Z"
                fill="url(#farFurGrad)"
                stroke="#C5CCDB"
                strokeWidth="0.9"
              />
              <g transform="translate(-10, 34)">
                <g className="leg-hb-far-lower">
                  <circle cx="0" cy="0" r="5.8" fill="url(#farFurGrad)" />
                  <path
                    d="M -5 0 C -3 13, 1 26, 3 38 C 3.5 41, 13 42, 16 39 C 18 37, 15 33, 11 33 C 9 22, 7 10, 5 0 Z"
                    fill="url(#farFurGrad)"
                    stroke="#C5CCDB"
                    strokeWidth="0.85"
                  />
                </g>
              </g>
            </g>
          </g>

          {/* 3. FAR FRONT LEG (shaded pearl for depth) */}
          <g transform="translate(230, 138)">
            <g className="leg-fr-far-upper">
              <path
                d="M -9 -4 C -10 10, -9 24, -7 36 C -6 40, 2 40, 3 36 C 5 24, 8 10, 9 -4 Z"
                fill="url(#farFurGrad)"
                stroke="#C5CCDB"
                strokeWidth="0.9"
              />
              <g transform="translate(-2, 36)">
                <g className="leg-fr-far-lower">
                  <circle cx="0" cy="0" r="5.3" fill="url(#farFurGrad)" />
                  <path
                    d="M -4.8 0 C -4 14, -2 27, 0 38 C 0.5 41.5, 11 42, 14 39 C 16 37, 13 33, 8.5 33 C 7 22, 6 11, 5 0 Z"
                    fill="url(#farFurGrad)"
                    stroke="#C5CCDB"
                    strokeWidth="0.85"
                  />
                </g>
              </g>
            </g>
          </g>

          {/* 4. SLEEK KHAO MANEE TORSO */}
          <g className="cat-torso">
            <path
              d="M 103 128
                 C 104 111, 124 106, 148 108
                 C 172 110, 198 109, 224 106
                 C 242 104, 250 116, 246 135
                 C 243 151, 229 158, 211 157
                 C 186 155, 158 158, 134 156
                 C 113 154, 101 144, 103 128 Z"
              fill="url(#bodyFurGrad)"
              stroke="#E6E2DB"
              strokeWidth="1.1"
            />
            {/* Soft dorsal highlight for silky white sheen */}
            <path
              d="M 122 114 C 154 112, 194 112, 228 111"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Delicate chest fluff */}
            <path
              d="M 244 128 C 250 134, 249 144, 241 150"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>

          {/* 5. NEAR HIND LEG (bright snowy white) */}
          <g transform="translate(113, 140)">
            <g className="leg-hb-near-upper">
              <path
                d="M -13 -6 C -18 9, -18 24, -14 36 C -13 40, -5 40, -3 35 C 4 23, 12 12, 13 -4 Z"
                fill="url(#nearFurGrad)"
                stroke="#E4E0D8"
                strokeWidth="1"
              />
              {/* Subtle muscular thigh contour */}
              <path
                d="M -10 2 C -12 13, -11 22, -9 30"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              <g transform="translate(-10, 35)">
                <g className="leg-hb-near-lower">
                  <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
                  <path
                    d="M -5.2 0 C -3 13, 1 26, 3 38 C 3.8 41.5, 14 42, 17 39 C 19 36.8, 15.5 32.8, 11 33 C 9 22, 7.5 11, 5.2 0 Z"
                    fill="url(#nearFurGrad)"
                    stroke="#E4E0D8"
                    strokeWidth="0.95"
                  />
                  {/* Dainty paw toes */}
                  <path d="M 11 39.5 L 11.5 36.5 M 14 39.2 L 14.3 36.8" stroke="#DDD8CE" strokeWidth="0.9" strokeLinecap="round" />
                </g>
              </g>
            </g>
          </g>

          {/* 6. NEAR FRONT LEG (bright snowy white) */}
          <g transform="translate(216, 139)">
            <g className="leg-fr-near-upper">
              <path
                d="M -10 -5 C -11 10, -10 24, -7.5 36 C -6.5 40, 2.5 40, 3.5 36 C 6 24, 9 10, 10 -4 Z"
                fill="url(#nearFurGrad)"
                stroke="#E4E0D8"
                strokeWidth="1"
              />
              <path
                d="M -5 2 C -5.5 13, -5 23, -3.5 31"
                stroke="#FFFFFF"
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.9"
              />
              <g transform="translate(-2, 36)">
                <g className="leg-fr-near-lower">
                  <circle cx="0" cy="0" r="5.5" fill="#FFFFFF" />
                  <path
                    d="M -5 0 C -4 14, -2 27, 0 38 C 0.8 41.8, 11.8 42.2, 15 39 C 16.8 37, 13.5 33, 9 33 C 7.2 22, 6.2 11, 5.2 0 Z"
                    fill="url(#nearFurGrad)"
                    stroke="#E4E0D8"
                    strokeWidth="0.95"
                  />
                  {/* Dainty paw toes */}
                  <path d="M 9 39.6 L 9.5 36.6 M 12 39.4 L 12.4 37" stroke="#DDD8CE" strokeWidth="0.9" strokeLinecap="round" />
                </g>
              </g>
            </g>
          </g>

          {/* 7. NECK, THAI SILK COLLAR, GOLDEN BELL & 3/4 HEAD */}
          <g transform="translate(234, 118)">
            <g className="cat-neck">
              {/* Graceful upright feline neck */}
              <path
                d="M -14 14 C -10 -4, -3 -20, 6 -32 L 26 -24 C 24 -8, 20 8, 13 20 C 4 24, -8 22, -14 14 Z"
                fill="url(#bodyFurGrad)"
                stroke="#E6E2DB"
                strokeWidth="0.9"
              />

              {/* Traditional Thai Crimson-Gold Silk Collar */}
              <path
                d="M -8 -2 C 1 7, 15 8, 22 -1 C 23 3, 22 7, 20 9 C 12 15, -1 14, -10 5 C -11 2, -10 -1, -8 -2 Z"
                fill="url(#collarSilk)"
                stroke="#F59E0B"
                strokeWidth="1.2"
              />
              {/* Tiny gold embroidered trim dots */}
              <circle cx="-2" cy="5.5" r="1.1" fill="#FDE047" />
              <circle cx="5" cy="8" r="1.1" fill="#FDE047" />
              <circle cx="12" cy="8.2" r="1.1" fill="#FDE047" />
              <circle cx="18" cy="5.8" r="1.1" fill="#FDE047" />

              {/* Swinging Golden Bell (กระพรวนทอง) */}
              <g transform="translate(15, 9)">
                <g className="cat-bell">
                  <line x1="0" y1="0" x2="0" y2="3" stroke="#D97706" strokeWidth="1.5" />
                  <circle cx="0" cy="7.5" r="5.2" fill="url(#goldBell)" stroke="#B45309" strokeWidth="0.9" />
                  <path d="M -3.6 8.5 Q 0 10.5 3.6 8.5" stroke="#78350F" strokeWidth="1.1" fill="none" />
                  <circle cx="0" cy="9.5" r="1" fill="#78350F" />
                  <circle cx="-1.6" cy="5.8" r="1.3" fill="#FFFFFF" opacity="0.8" />
                </g>
              </g>

              {/* HEAD GROUP (3/4 view showing BOTH iconic odd eyes!) */}
              <g transform="translate(19, -32)">
                <g className="cat-head">
                  {/* Far Ear (viewer's right) */}
                  <g transform="translate(13, -15)">
                    <g className="ear-far">
                      <path
                        d="M -7 4 C -5 -10, 1 -24, 9 -28 C 14 -24, 15 -9, 10 8 Z"
                        fill="#F4F2ED"
                        stroke="#E2DED6"
                        strokeWidth="1"
                      />
                      <path
                        d="M -2 2 C 0 -8, 4 -18, 8.5 -21 C 11 -17, 11 -7, 7 5 Z"
                        fill="url(#earPinkGrad)"
                        opacity="0.88"
                      />
                    </g>
                  </g>

                  {/* Main Khao Manee heart-shaped head */}
                  <path
                    d="M -22 -4
                       C -23 -19, -11 -26, 4 -25
                       C 19 -24, 27 -13, 27 0
                       C 27 11, 21 19, 12 22
                       C 4 24, -6 23, -14 17
                       C -20 12, -22 4, -22 -4 Z"
                    fill="url(#headFurGrad)"
                    stroke="#E4E0D8"
                    strokeWidth="1.05"
                  />

                  {/* Soft cheek fur wisps */}
                  <path
                    d="M -20 6 L -25 9 L -19 12 M 25 5 L 29 8 L 24 11"
                    fill="#FFFFFF"
                    stroke="#E6E2DB"
                    strokeWidth="0.9"
                    strokeLinejoin="round"
                  />

                  {/* Near Ear (viewer's left) */}
                  <g transform="translate(-11, -17)">
                    <g className="ear-near">
                      <path
                        d="M -9 7 C -13 -8, -11 -25, -4 -30 C 4 -24, 9 -10, 9 5 Z"
                        fill="#FFFFFF"
                        stroke="#E2DED6"
                        strokeWidth="1.05"
                      />
                      <path
                        d="M -5 4 C -8 -7, -7 -19, -3 -23 C 2 -18, 5 -8, 5 3 Z"
                        fill="url(#earPinkGrad)"
                      />
                      {/* Delicate white inner ear tuft */}
                      <path d="M -5 1 C -2 -2, 0 -1, 2 1" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
                    </g>
                  </g>

                  {/* Soft rosy cheek blush */}
                  <ellipse cx="-8" cy="9" rx="4.5" ry="2.2" fill="#FDA4AF" opacity="0.22" />
                  <ellipse cx="22" cy="8.5" rx="3.8" ry="2" fill="#FDA4AF" opacity="0.22" />

                  {/* RIGHT EYE (viewer's left — Golden Amber by default) */}
                  <g transform="translate(-2, -1)">
                    <ellipse cx="0" cy="0" rx="7.6" ry="6.2" fill={rightEyeGlow} opacity="0.35" />
                    <path
                      d="M -7 0.5 C -5 -5.5, 4 -5.8, 7 0 C 4.5 5.6, -4.5 5.4, -7 0.5 Z"
                      fill={rightEyeGrad}
                      stroke="#334155"
                      strokeWidth="1.15"
                    />
                    {/* Feline vertical pupil */}
                    <ellipse cx="0.6" cy="0" rx="1.9" ry="4.1" fill="#0F172A" />
                    {/* Twin diamond catchlights */}
                    <circle cx="-2.1" cy="-2" r="1.7" fill="#FFFFFF" />
                    <circle cx="2.5" cy="1.8" r="0.85" fill="#FFFFFF" opacity="0.88" />
                    {/* Blinking eyelid */}
                    <g transform="translate(0, -6.5)">
                      <g className="eyelid-right" style={{ transform: 'scaleY(0)' }}>
                        <path
                          d="M -8 0 L 8 0 L 8 7.5 C 4 12.3, -4 12.3, -8 7.5 Z"
                          fill="#FCFBF9"
                        />
                        <path d="M -7 7 Q 0 11.9 7 6.5" stroke="#475569" strokeWidth="1.2" fill="none" />
                      </g>
                    </g>
                  </g>

                  {/* LEFT EYE (viewer's right, slightly foreshortened — Sapphire Blue by default) */}
                  <g transform="translate(17.5, -1.5)">
                    <ellipse cx="0" cy="0" rx="6.6" ry="5.9" fill={leftEyeGlow} opacity="0.35" />
                    <path
                      d="M -5.8 0 C -3.8 -5.4, 3.6 -5.4, 5.8 0.4 C 3.8 5.4, -3.6 5.4, -5.8 0 Z"
                      fill={leftEyeGrad}
                      stroke="#334155"
                      strokeWidth="1.1"
                    />
                    {/* Feline vertical pupil */}
                    <ellipse cx="0.5" cy="0" rx="1.65" ry="3.9" fill="#0F172A" />
                    {/* Twin diamond catchlights */}
                    <circle cx="-1.6" cy="-1.9" r="1.5" fill="#FFFFFF" />
                    <circle cx="2.1" cy="1.6" r="0.8" fill="#FFFFFF" opacity="0.88" />
                    {/* Blinking eyelid */}
                    <g transform="translate(0, -6.2)">
                      <g className="eyelid-left" style={{ transform: 'scaleY(0)' }}>
                        <path
                          d="M -6.8 0 L 6.8 0 L 6.8 7.2 C 3 11.7, -3 11.7, -6.8 7.2 Z"
                          fill="#FCFBF9"
                        />
                        <path d="M -5.8 6.2 Q 0 11.4 5.8 6.6" stroke="#475569" strokeWidth="1.2" fill="none" />
                      </g>
                    </g>
                  </g>

                  {/* Dainty Pink Nose */}
                  <path
                    d="M 8 6.5 C 10.5 6.2, 13.5 6.2, 14.5 7.2 C 15.2 8, 12.6 10.4, 11.2 10.4 C 9.8 10.4, 7.2 8.2, 8 6.5 Z"
                    fill="#F497A9"
                    stroke="#E1798D"
                    strokeWidth="0.6"
                  />
                  {/* Serene smile */}
                  <path
                    d="M 11.2 10.4 L 11.2 12.2 M 6.6 12.2 C 8.4 14.3, 10.4 13.8, 11.2 12.2 C 12 13.8, 14 14.2, 15.6 12"
                    stroke="#64748B"
                    strokeWidth="1.15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Delicate Whiskers */}
                  <g transform="translate(-4, 9)">
                    <g className="whiskers-left">
                      <path d="M 0 0 Q -12 -2 -23 -4" stroke="#CBD5E1" strokeWidth="0.95" strokeLinecap="round" />
                      <path d="M 0 2.2 Q -13 2 -25 2.6" stroke="#CBD5E1" strokeWidth="0.95" strokeLinecap="round" />
                      <path d="M 1 4.4 Q -11 6 -21 8.5" stroke="#CBD5E1" strokeWidth="0.9" strokeLinecap="round" />
                    </g>
                  </g>
                  <g transform="translate(22, 8.5)">
                    <g className="whiskers-right">
                      <path d="M 0 0 Q 10 -2 19 -3.5" stroke="#CBD5E1" strokeWidth="0.95" strokeLinecap="round" />
                      <path d="M 0 2 Q 11 2 20 2.8" stroke="#CBD5E1" strokeWidth="0.95" strokeLinecap="round" />
                      <path d="M -1 4 Q 9 5.5 17 8" stroke="#CBD5E1" strokeWidth="0.9" strokeLinecap="round" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
