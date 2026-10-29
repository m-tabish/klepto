import type { InspectorMode } from '../../shared/types';

interface ModeToggleProps {
  mode: InspectorMode;
  onChange: (mode: InspectorMode) => void;
  disabled: boolean;
}

export function ModeToggle({ mode, onChange, disabled }: ModeToggleProps) {
  return (
    <div className="flex rounded-md border border-Klepto-border bg-Klepto-surface p-0.5">
      <button
        className={`flex-1 rounded px-3 py-1.5 text-xs font-medium transition-all duration-150 ${mode === 'component'
          ? 'bg-Klepto-elevated text-Klepto-primary shadow-glow-primary'
          : 'text-Klepto-muted hover:text-Klepto-text-secondary'
          } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
        onClick={() => onChange('component')}
        disabled={disabled}
      >
        component
      </button>
      <button
        className={`flex-1 rounded px-3 py-1.5 text-xs font-medium transition-all duration-150 ${mode === 'page'
          ? 'bg-Klepto-elevated text-Klepto-primary shadow-glow-primary'
          : 'text-Klepto-muted hover:text-Klepto-text-secondary'
          } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
        onClick={() => onChange('page')}
        disabled={disabled}
      >
        page
      </button>
    </div>
  );
}
