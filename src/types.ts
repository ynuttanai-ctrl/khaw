export type GaitMode = 'rest' | 'stroll' | 'trot';

export type TimeOfDay = 'morning' | 'sunset' | 'moonlight';

export type EyeVariant = 'odd' | 'sapphire' | 'amber';

export type Direction = 'right' | 'left';

export interface SceneClickBurst {
  id: number;
  x: number;
  y: number;
  kind: 'petal' | 'heart' | 'sparkle';
}
