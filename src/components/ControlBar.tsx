import type { Direction, EyeVariant, GaitMode, TimeOfDay } from '../types';

interface ControlBarProps {
  gait: GaitMode;
  onGaitChange: (gait: GaitMode) => void;
  timeOfDay: TimeOfDay;
  onTimeOfDayChange: (time: TimeOfDay) => void;
  eyeVariant: EyeVariant;
  onEyeVariantChange: (variant: EyeVariant) => void;
  direction: Direction;
  onToggleDirection: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
  onPlayfulJump: () => void;
}

export function ControlBar({
  gait,
  onGaitChange,
  timeOfDay,
  onTimeOfDayChange,
  eyeVariant,
  onEyeVariantChange,
  direction,
  onToggleDirection,
  isPaused,
  onTogglePause,
  onPlayfulJump,
}: ControlBarProps) {
  return (
    <div className="control-dock-wrap" onClick={(e) => e.stopPropagation()}>
      <nav className="control-dock" aria-label="ตัวควบคุมแอนิเมชันแมวขาวมณี">
        {/* Gait Speed Controls */}
        <div className="control-group" role="group" aria-label="จังหวะการเดิน">
          <button
            type="button"
            className={`ctrl-btn ${gait === 'rest' ? 'active' : ''}`}
            onClick={() => onGaitChange('rest')}
          >
            พักชมสวน
          </button>
          <button
            type="button"
            className={`ctrl-btn ${gait === 'stroll' ? 'active' : ''}`}
            onClick={() => onGaitChange('stroll')}
          >
            เดินชิล
          </button>
          <button
            type="button"
            className={`ctrl-btn ${gait === 'trot' ? 'active' : ''}`}
            onClick={() => onGaitChange('trot')}
          >
            เดินคล่อง
          </button>
        </div>

        <span className="control-divider" aria-hidden="true" />

        {/* Time of Day */}
        <div className="control-group" role="group" aria-label="ช่วงเวลา">
          <button
            type="button"
            className={`ctrl-btn ${timeOfDay === 'morning' ? 'active' : ''}`}
            onClick={() => onTimeOfDayChange('morning')}
          >
            เช้าสดใส
          </button>
          <button
            type="button"
            className={`ctrl-btn ${timeOfDay === 'sunset' ? 'active' : ''}`}
            onClick={() => onTimeOfDayChange('sunset')}
          >
            ยามเย็น
          </button>
          <button
            type="button"
            className={`ctrl-btn ${timeOfDay === 'moonlight' ? 'active' : ''}`}
            onClick={() => onTimeOfDayChange('moonlight')}
          >
            จันทร์เพ็ญ
          </button>
        </div>

        <span className="control-divider" aria-hidden="true" />

        {/* Iconic Khao Manee Eye Variant */}
        <div className="control-group" role="group" aria-label="สีตาแมวขาวมณี">
          <button
            type="button"
            className={`ctrl-btn ${eyeVariant === 'odd' ? 'active' : ''}`}
            onClick={() => onEyeVariantChange('odd')}
            title="ตาสองสี (Odd-Eyed)"
          >
            <span className="eye-swatch" aria-hidden="true">
              <span className="eye-dot amber" />
              <span className="eye-dot blue" />
            </span>
            ตาสองสี
          </button>
          <button
            type="button"
            className={`ctrl-btn ${eyeVariant === 'sapphire' ? 'active' : ''}`}
            onClick={() => onEyeVariantChange('sapphire')}
            title="ตาฟ้าเพชร"
          >
            <span className="eye-swatch" aria-hidden="true">
              <span className="eye-dot blue" />
              <span className="eye-dot blue" />
            </span>
            ฟ้าเพชร
          </button>
          <button
            type="button"
            className={`ctrl-btn ${eyeVariant === 'amber' ? 'active' : ''}`}
            onClick={() => onEyeVariantChange('amber')}
            title="ตาเหลืองอำพัน"
          >
            <span className="eye-swatch" aria-hidden="true">
              <span className="eye-dot amber" />
              <span className="eye-dot amber" />
            </span>
            อำพัน
          </button>
        </div>

        <span className="control-divider" aria-hidden="true" />

        {/* Direction, Pause & Playful Jump */}
        <div className="control-group">
          <button
            type="button"
            className="ctrl-btn"
            onClick={onToggleDirection}
            title="สลับทิศทางการเดิน"
          >
            {direction === 'right' ? '→ ขวา' : '← ซ้าย'}
          </button>
          <button
            type="button"
            className="ctrl-btn"
            onClick={onTogglePause}
            title={isPaused ? 'เล่นต่อ' : 'หยุดชั่วคราว'}
          >
            {isPaused ? '▶ เล่นต่อ' : '⏸ พัก'}
          </button>
          <button
            type="button"
            className="ctrl-btn action-btn"
            onClick={onPlayfulJump}
            title="เรียกเหมียวกระโดด"
          >
            ✨ เมี้ยว~
          </button>
        </div>
      </nav>
    </div>
  );
}
