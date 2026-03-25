'use client';

import { VibeType } from '@/types/session';
import { VIBE_OPTIONS, getVibeConfig } from '@/lib/vibe-config';
import { cn } from '@/lib/utils';

interface VibePickerProps {
  value: VibeType;
  onChange: (vibe: VibeType) => void;
}

export function VibePicker({ value, onChange }: VibePickerProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {VIBE_OPTIONS.map((vibe) => {
        const config = getVibeConfig(vibe);
        const isSelected = value === vibe;

        return (
          <button
            key={vibe}
            type="button"
            onClick={() => onChange(vibe)}
            className={cn(
              'flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all',
              isSelected
                ? `border-transparent bg-gradient-to-r ${config.gradient} text-white`
                : 'border-muted hover:border-primary/50'
            )}
          >
            <span className="text-2xl">{config.emoji}</span>
            <span className="text-xs mt-1 font-medium">{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}
