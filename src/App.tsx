import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, createScope, createTimeline, createTimer, stagger } from 'animejs';
import type { Scope, Timer } from 'animejs';
import { KhaoManeeCat } from './components/KhaoManeeCat';
import { GardenScene } from './components/GardenScene';
import { ControlBar } from './components/ControlBar';
import type { Direction, EyeVariant, GaitMode, SceneClickBurst, TimeOfDay } from './types';

const GAIT_PRESETS: Record<
  GaitMode,
  { strideAmp: number; gaitFreq: number; worldVel: number; restDrop: number }
> = {
  rest: { strideAmp: 0, gaitFreq: 0, worldVel: 0, restDrop: 1 },
  stroll: { strideAmp: 1.0, gaitFreq: 4.2, worldVel: 145, restDrop: 0 },
  trot: { strideAmp: 1.28, gaitFreq: 6.9, worldVel: 275, restDrop: 0 },
};

const MEOW_PHRASES = ['เมี้ยว~ ✨', 'ง้าวว~', 'เพอร์~ 🤍', 'เมี้ยวว~ ✿'];

const wrapTile = (val: number) => -(((val % 1440) + 1440) % 1440);

export default function App() {
  const [gait, setGait] = useState<GaitMode>('stroll');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('sunset');
  const [eyeVariant, setEyeVariant] = useState<EyeVariant>('odd');
  const [direction, setDirection] = useState<Direction>('right');
  const [isPaused, setIsPaused] = useState(false);
  const [meowText, setMeowText] = useState(MEOW_PHRASES[0]);
  const [bursts, setBursts] = useState<SceneClickBurst[]>([]);

  const rootRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<Scope | null>(null);
  const mainTimerRef = useRef<Timer | null>(null);
  const isJumpingRef = useRef(false);
  const burstIdRef = useRef(1);

  // Smoothly animated kinematic state controlled by animejs
  const motionRef = useRef({
    strideAmp: GAIT_PRESETS.stroll.strideAmp,
    gaitFreq: GAIT_PRESETS.stroll.gaitFreq,
    worldVel: GAIT_PRESETS.stroll.worldVel,
    restDrop: GAIT_PRESETS.stroll.restDrop,
    dirSign: 1,
    headLookTilt: 0,
    phase: 0,
    breathTime: 0,
    worldScroll: 0,
    cloudDrift: 0,
    lastTimestamp: 0,
  });

  // Main Anime.js v4 animation scope (safe under React 19 StrictMode)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const scope = createScope({ root }).add(() => {
      // Cache SVG elements for 60-120fps transform updates
      const elBody = root.querySelector<SVGGElement>('.cat-body');
      const elShadow = root.querySelector<SVGEllipseElement>('.cat-shadow');
      const elTailBase = root.querySelector<SVGGElement>('.tail-base');
      const elTailMid = root.querySelector<SVGGElement>('.tail-mid');
      const elTailTip = root.querySelector<SVGGElement>('.tail-tip');
      const elNeck = root.querySelector<SVGGElement>('.cat-neck');
      const elHead = root.querySelector<SVGGElement>('.cat-head');
      const elBell = root.querySelector<SVGGElement>('.cat-bell');

      const elFrNearU = root.querySelector<SVGGElement>('.leg-fr-near-upper');
      const elFrNearL = root.querySelector<SVGGElement>('.leg-fr-near-lower');
      const elFrFarU = root.querySelector<SVGGElement>('.leg-fr-far-upper');
      const elFrFarL = root.querySelector<SVGGElement>('.leg-fr-far-lower');
      const elHbNearU = root.querySelector<SVGGElement>('.leg-hb-near-upper');
      const elHbNearL = root.querySelector<SVGGElement>('.leg-hb-near-lower');
      const elHbFarU = root.querySelector<SVGGElement>('.leg-hb-far-upper');
      const elHbFarL = root.querySelector<SVGGElement>('.leg-hb-far-lower');

      const elClouds = root.querySelector<SVGGElement>('.parallax-clouds');
      const elFar = root.querySelector<SVGGElement>('.parallax-far');
      const elMid = root.querySelector<SVGGElement>('.parallax-mid');
      const elGround = root.querySelector<SVGGElement>('.parallax-ground');
      const elFore = root.querySelector<SVGGElement>('.parallax-fore');

      // 1. Master Anime.js timer for silky feline kinematics & synced ground parallax
      const timer = createTimer({
        loop: true,
        onUpdate: (self) => {
          const m = motionRef.current;
          const dt = Math.min((self.deltaTime || 16.67) / 1000, 0.05);

          m.phase += dt * m.gaitFreq;
          m.breathTime += dt;
          m.worldScroll += dt * m.worldVel * m.dirSign;
          m.cloudDrift += dt * 14;

          const amp = m.strideAmp;
          const rest = m.restDrop;
          const p = m.phase;

          // Subtle feline spine bob + pitch + gentle breathing
          const bodyBob =
            -Math.abs(Math.sin(p)) * 3.6 * amp +
            rest * 6.5 +
            Math.sin(m.breathTime * 2.2) * (0.9 + rest * 0.7);
          const bodyPitch = Math.sin(p * 2) * 1.45 * amp;

          if (elBody) {
            elBody.setAttribute(
              'transform',
              `translate(0, ${bodyBob.toFixed(2)}) rotate(${bodyPitch.toFixed(2)}, 174, 134)`
            );
          }

          if (elShadow && !isJumpingRef.current) {
            const shadowScale = 1 - Math.abs(Math.sin(p)) * 0.045 * amp + rest * 0.04;
            elShadow.setAttribute(
              'transform',
              `scale(${shadowScale.toFixed(3)}, ${(0.96 + rest * 0.08).toFixed(3)})`
            );
          }

          // 4-Beat Feline Lateral Sequence Gait:
          // Back-Far (0) -> Front-Far (0.25) -> Back-Near (0.5) -> Front-Near (0.75)
          const calcFrontLeg = (phaseOffset: number) => {
            const phi = p + phaseOffset * Math.PI * 2;
            const swing = Math.max(0, -Math.cos(phi)); // airborne forward swing
            const upper = (-2 + Math.sin(phi) * 22) * amp + rest * 5;
            const lower = (3 + swing * 30 - Math.max(0, -Math.sin(phi)) * 5) * amp - rest * 7;
            return { upper, lower };
          };

          const calcHindLeg = (phaseOffset: number) => {
            const phi = p + phaseOffset * Math.PI * 2;
            const swing = Math.max(0, -Math.cos(phi)); // airborne forward lift
            const push = Math.max(0, Math.cos(phi)); // stance push-off
            const upper = (3 + Math.sin(phi) * 23) * amp - rest * 8;
            const lower = (-3 - swing * 22 + push * 11) * amp + rest * 12;
            return { upper, lower };
          };

          const hbFar = calcHindLeg(0.0);
          const frFar = calcFrontLeg(0.25);
          const hbNear = calcHindLeg(0.5);
          const frNear = calcFrontLeg(0.75);

          elHbFarU?.setAttribute('transform', `rotate(${hbFar.upper.toFixed(2)})`);
          elHbFarL?.setAttribute('transform', `rotate(${hbFar.lower.toFixed(2)})`);
          elFrFarU?.setAttribute('transform', `rotate(${frFar.upper.toFixed(2)})`);
          elFrFarL?.setAttribute('transform', `rotate(${frFar.lower.toFixed(2)})`);
          elHbNearU?.setAttribute('transform', `rotate(${hbNear.upper.toFixed(2)})`);
          elHbNearL?.setAttribute('transform', `rotate(${hbNear.lower.toFixed(2)})`);
          elFrNearU?.setAttribute('transform', `rotate(${frNear.upper.toFixed(2)})`);
          elFrNearL?.setAttribute('transform', `rotate(${frNear.lower.toFixed(2)})`);

          // Travelling sine wave along the 3-segment Khao Manee tail
          const tailPhase = p * 0.52 + m.breathTime * 1.45;
          const tailBaseDeg = -4 + Math.sin(tailPhase) * (8 + 4.5 * amp);
          const tailMidDeg = Math.sin(tailPhase - 0.95) * (12 + 5 * amp);
          const tailTipDeg = Math.sin(tailPhase - 1.9) * (16 + 6 * amp);

          elTailBase?.setAttribute('transform', `rotate(${tailBaseDeg.toFixed(2)})`);
          elTailMid?.setAttribute('transform', `rotate(${tailMidDeg.toFixed(2)})`);
          elTailTip?.setAttribute('transform', `rotate(${tailTipDeg.toFixed(2)})`);

          // Poised head counter-stabilization & swinging golden collar bell
          const neckDeg = -Math.sin(p * 2) * 0.95 * amp + Math.sin(m.breathTime * 1.3) * 1.3;
          const headDeg = Math.sin(p * 2) * 0.65 * amp + m.headLookTilt;
          const bellDeg = Math.sin(p * 2 - 0.55) * (13 * amp + 2.5);

          elNeck?.setAttribute('transform', `rotate(${neckDeg.toFixed(2)})`);
          elHead?.setAttribute('transform', `rotate(${headDeg.toFixed(2)})`);
          elBell?.setAttribute('transform', `rotate(${bellDeg.toFixed(2)})`);

          // Synchronized 5-layer seamless Thai garden parallax
          elClouds?.setAttribute(
            'transform',
            `translate(${wrapTile(m.worldScroll * 0.06 + m.cloudDrift).toFixed(2)}, 0)`
          );
          elFar?.setAttribute('transform', `translate(${wrapTile(m.worldScroll * 0.16).toFixed(2)}, 0)`);
          elMid?.setAttribute('transform', `translate(${wrapTile(m.worldScroll * 0.45).toFixed(2)}, 0)`);
          elGround?.setAttribute('transform', `translate(${wrapTile(m.worldScroll).toFixed(2)}, 0)`);
          elFore?.setAttribute('transform', `translate(${wrapTile(m.worldScroll * 1.38).toFixed(2)}, 0)`);
        },
      });
      mainTimerRef.current = timer;

      // 2. Organic periodic Khao Manee eye blinks via Anime.js timeline
      createTimeline({
        loop: true,
        loopDelay: 3200,
      })
        .add('.eyelid-left, .eyelid-right', {
          scaleY: [0, 1],
          duration: 115,
          ease: 'inQuad',
        })
        .add('.eyelid-left, .eyelid-right', {
          scaleY: [1, 0],
          duration: 145,
          ease: 'outQuad',
        });

      // 3. Subtle independent ear twitches via Anime.js
      createTimeline({
        loop: true,
        loopDelay: 4600,
      })
        .add('.ear-near', {
          rotate: [0, -11, 3, -5, 0],
          duration: 460,
          ease: 'inOutSine',
        })
        .add(
          '.ear-far',
          {
            rotate: [0, 9, -2, 0],
            duration: 380,
            ease: 'inOutSine',
          },
          '+=2100'
        );

      // 4. Delicate whisker micro-quiver
      animate('.whiskers-left', {
        rotate: [-1.5, 2, -1.5],
        duration: 2800,
        ease: 'inOutSine',
        loop: true,
      });
      animate('.whiskers-right', {
        rotate: [1.5, -2, 1.5],
        duration: 2800,
        ease: 'inOutSine',
        loop: true,
      });

      // 5. Fluttering sapphire-gold butterfly companion (relative to 960, 445)
      animate('.garden-butterfly', {
        translateX: [
          { to: 65, duration: 2400, ease: 'inOutSine' },
          { to: -55, duration: 2600, ease: 'inOutSine' },
          { to: 28, duration: 2200, ease: 'inOutSine' },
          { to: 0, duration: 2000, ease: 'inOutSine' },
        ],
        translateY: [
          { to: -48, duration: 1800, ease: 'inOutSine' },
          { to: 26, duration: 2300, ease: 'inOutSine' },
          { to: -32, duration: 2500, ease: 'inOutSine' },
          { to: 0, duration: 2600, ease: 'inOutSine' },
        ],
        rotate: [
          { to: -10, duration: 2200, ease: 'inOutSine' },
          { to: 12, duration: 2400, ease: 'inOutSine' },
          { to: -6, duration: 2600, ease: 'inOutSine' },
          { to: 0, duration: 2000, ease: 'inOutSine' },
        ],
        loop: true,
      });

      animate('.butterfly-wing-left', {
        scaleX: [1, 0.22, 1],
        duration: 220,
        ease: 'inOutSine',
        loop: true,
      });
      animate('.butterfly-wing-right', {
        scaleX: [1, 0.22, 1],
        duration: 220,
        ease: 'inOutSine',
        loop: true,
      });

      // 6. Floating Frangipani (ดอกลีลาวดี) petals drifting on the breeze
      animate('.floating-petal', {
        translateX: [0, -240],
        translateY: [0, 560],
        rotate: (_el: unknown, i = 0) => [i * 35, i * 35 + 320],
        opacity: [
          { to: 0.9, duration: 1200 },
          { to: 0.85, duration: 5400 },
          { to: 0, duration: 1400 },
        ],
        duration: 8000,
        delay: stagger(1300),
        ease: 'linear',
        loop: true,
      });

      // 7. Twinkling night stars & drifting golden fireflies
      animate('.sky-star', {
        opacity: [0.25, 1, 0.25],
        scale: [0.85, 1.25, 0.85],
        duration: 2600,
        delay: stagger(210),
        ease: 'inOutSine',
        loop: true,
      });

      animate('.garden-firefly', {
        translateY: [0, -34, 0],
        translateX: [0, 14, -10, 0],
        opacity: [0.2, 0.95, 0.2],
        duration: 3600,
        delay: stagger(380),
        ease: 'inOutSine',
        loop: true,
      });

      // 8. Gentle sun/moon halo pulse
      animate('.celestial-orb', {
        scale: [0.985, 1.025, 0.985],
        duration: 5200,
        ease: 'inOutSine',
        loop: true,
      });
    });

    scopeRef.current = scope;

    return () => {
      mainTimerRef.current = null;
      scope.revert();
      scopeRef.current = null;
    };
  }, []);

  // Smoothly blend gait kinematics with animejs whenever gait mode changes
  useEffect(() => {
    const preset = GAIT_PRESETS[gait];
    animate(motionRef.current, {
      strideAmp: preset.strideAmp,
      gaitFreq: preset.gaitFreq,
      worldVel: preset.worldVel,
      restDrop: preset.restDrop,
      duration: 820,
      ease: 'inOutCubic',
    });
  }, [gait]);

  // Smoothly flip cat & reverse parallax flow when changing direction
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const flipEl = root.querySelector('.cat-flip-wrapper');
    if (flipEl) {
      animate(flipEl, {
        scaleX: direction === 'right' ? 1 : -1,
        duration: 520,
        ease: 'inOutBack',
      });
    }

    animate(motionRef.current, {
      dirSign: direction === 'right' ? 1 : -1,
      duration: 560,
      ease: 'inOutCubic',
    });
  }, [direction]);

  // Pause / resume main walk timer smoothly
  useEffect(() => {
    const timer = mainTimerRef.current;
    if (!timer) return;
    if (isPaused) {
      timer.pause();
    } else {
      timer.resume();
    }
  }, [isPaused]);

  // Subtle curious head tilt tracking pointer height
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2; // -1..1
    const targetTilt = Math.max(-9, Math.min(7, normalizedY * 7));
    animate(motionRef.current, {
      headLookTilt: targetTilt,
      duration: 420,
      ease: 'outQuad',
    });
  }, []);

  // Playful spring jump + meow speech bubble via Anime.js timeline
  const triggerPlayfulJump = useCallback(() => {
    const root = rootRef.current;
    if (!root || isJumpingRef.current) return;
    isJumpingRef.current = true;

    const nextPhrase = MEOW_PHRASES[Math.floor(Math.random() * MEOW_PHRASES.length)];
    setMeowText(nextPhrase);

    const catRoot = root.querySelector('.cat-root');
    const catShadow = root.querySelector('.cat-shadow');
    const meowBubble = root.querySelector('.meow-bubble');

    if (catRoot) {
      createTimeline({
        onComplete: () => {
          isJumpingRef.current = false;
        },
      })
        .add(catRoot, {
          translateY: 6,
          scaleY: 0.93,
          scaleX: 1.05,
          duration: 115,
          ease: 'inQuad',
        })
        .add(catRoot, {
          translateY: -44,
          scaleY: 1.06,
          scaleX: 0.96,
          duration: 270,
          ease: 'outQuad',
        })
        .add(catRoot, {
          translateY: 4,
          scaleY: 0.94,
          scaleX: 1.04,
          duration: 245,
          ease: 'inQuad',
        })
        .add(catRoot, {
          translateY: 0,
          scaleY: 1,
          scaleX: 1,
          duration: 320,
          ease: 'outElastic(1, 0.58)',
        });
    } else {
      isJumpingRef.current = false;
    }

    if (catShadow) {
      createTimeline()
        .add(catShadow, { scaleX: 1.05, opacity: 0.95, duration: 115, ease: 'inQuad' })
        .add(catShadow, { scaleX: 0.62, opacity: 0.35, duration: 270, ease: 'outQuad' })
        .add(catShadow, { scaleX: 1.06, opacity: 0.95, duration: 245, ease: 'inQuad' })
        .add(catShadow, { scaleX: 1, opacity: 1, duration: 280, ease: 'outQuad' });
    }

    if (meowBubble) {
      createTimeline()
        .add(meowBubble, {
          opacity: [0, 1],
          scale: [0.55, 1.06, 1],
          translateY: [10, -6],
          duration: 340,
          ease: 'outBack',
        })
        .add(meowBubble, {
          opacity: [1, 0],
          translateY: [-6, -22],
          duration: 420,
          delay: 950,
          ease: 'inQuad',
        });
    }
  }, []);

  // Click anywhere in the garden to release floating blossom sparkles animated by animejs
  const handleStageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX;
    const y = e.clientY;
    const batchId = burstIdRef.current++;
    const kinds: SceneClickBurst['kind'][] = ['petal', 'sparkle', 'heart', 'petal', 'sparkle', 'petal'];

    const newItems: SceneClickBurst[] = kinds.map((kind, i) => ({
      id: batchId * 10 + i,
      x,
      y,
      kind,
    }));

    setBursts((prev) => [...prev.slice(-18), ...newItems]);

    requestAnimationFrame(() => {
      const root = rootRef.current;
      if (!root) return;
      const targets = newItems
        .map((item) => root.querySelector(`[data-burst-id="${item.id}"]`))
        .filter((node): node is Element => Boolean(node));

      if (targets.length === 0) return;

      animate(targets, {
        translateX: (_el: unknown, i = 0) =>
          Math.cos((i / targets.length) * Math.PI * 2) * (42 + (i % 3) * 18),
        translateY: (_el: unknown, i = 0) =>
          Math.sin((i / targets.length) * Math.PI * 2) * (36 + (i % 2) * 18) - 28,
        scale: [0.3, 1.15, 0.2],
        rotate: (_el: unknown, i = 0) => (i % 2 === 0 ? 160 : -160),
        opacity: [0, 1, 0],
        duration: 920,
        ease: 'outCubic',
        onComplete: () => {
          const ids = new Set(newItems.map((n) => n.id));
          setBursts((prev) => prev.filter((item) => !ids.has(item.id)));
        },
      });
    });
  }, []);

  return (
    <main
      ref={rootRef}
      className={`app-shell theme-${timeOfDay}`}
      onPointerMove={handlePointerMove}
      onClick={handleStageClick}
    >
      {/* Multi-layer Parallax Thai Garden Scene */}
      <div className="stage-layer">
        <GardenScene timeOfDay={timeOfDay} />
      </div>

      {/* Top Glass Header */}
      <header className="top-header">
        <div className="brand-card" onClick={(e) => e.stopPropagation()}>
          <div className="brand-title-row">
            <h1 className="brand-title">ขาวมณีเดินเล่น</h1>
            <span className="brand-subtitle-en">Khao Manee Stroll</span>
          </div>
          <p className="brand-caption">
            แมวไทยโบราณขนขาวบริสุทธิ์ ตาเพชรสองสี — Smooth Animation powered by Anime.js
          </p>
        </div>

        <div className="hint-pill" onClick={(e) => e.stopPropagation()}>
          <span className="hint-dot" aria-hidden="true" />
          <span>คลิกที่น้องแมวเพื่อกระโดด หรือคลิกในสวนเพื่อโปรยดอกลีลาวดี</span>
        </div>
      </header>

      {/* Center Stage: Articulated Khao Manee Cat */}
      <section
        className={`cat-stage-anchor ${direction === 'left' ? 'cat-facing-left' : ''}`}
        aria-label="เวทีแอนิเมชันแมวขาวมณี"
      >
        <div className="meow-bubble" aria-live="polite">
          {meowText}
        </div>
        <div className="cat-flip-wrapper">
          <KhaoManeeCat eyeVariant={eyeVariant} />
        </div>
        <div
          className="cat-interactive-hitbox"
          role="button"
          tabIndex={0}
          aria-label="แตะน้องแมวขาวมณีเพื่อให้กระโดดเล่น"
          onClick={(e) => {
            e.stopPropagation();
            triggerPlayfulJump();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              triggerPlayfulJump();
            }
          }}
        />
      </section>

      {/* Interactive Click Burst Particles */}
      <div className="burst-layer" aria-hidden="true">
        {bursts.map((item) => (
          <div
            key={item.id}
            data-burst-id={item.id}
            className="burst-particle"
            style={{ left: item.x, top: item.y, opacity: 0 }}
          >
            {item.kind === 'petal' && (
              <svg viewBox="0 0 20 20" width="18" height="18">
                <circle cx="10" cy="5" r="3.6" fill="#FFFDF7" />
                <circle cx="14.5" cy="8.5" r="3.6" fill="#FFFDF7" />
                <circle cx="12.8" cy="13.8" r="3.6" fill="#FFFDF7" />
                <circle cx="7.2" cy="13.8" r="3.6" fill="#FFFDF7" />
                <circle cx="5.5" cy="8.5" r="3.6" fill="#FFFDF7" />
                <circle cx="10" cy="10" r="2.4" fill="#FACC15" />
              </svg>
            )}
            {item.kind === 'sparkle' && (
              <svg viewBox="0 0 20 20" width="16" height="16">
                <path
                  d="M10 1 L12 8 L19 10 L12 12 L10 19 L8 12 L1 10 L8 8 Z"
                  fill="#7DD3FC"
                />
              </svg>
            )}
            {item.kind === 'heart' && (
              <svg viewBox="0 0 20 20" width="16" height="16">
                <path
                  d="M10 17 C10 17 3 12.2 3 7.4 C3 4.8 5 3 7.3 3 C8.7 3 9.6 3.8 10 4.8 C10.4 3.8 11.3 3 12.7 3 C15 3 17 4.8 17 7.4 C17 12.2 10 17 10 17 Z"
                  fill="#FDA4AF"
                />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Interactive Glass Control Bar */}
      <ControlBar
        gait={gait}
        onGaitChange={setGait}
        timeOfDay={timeOfDay}
        onTimeOfDayChange={setTimeOfDay}
        eyeVariant={eyeVariant}
        onEyeVariantChange={setEyeVariant}
        direction={direction}
        onToggleDirection={() => setDirection((d) => (d === 'right' ? 'left' : 'right'))}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused((p) => !p)}
        onPlayfulJump={triggerPlayfulJump}
      />
    </main>
  );
}
