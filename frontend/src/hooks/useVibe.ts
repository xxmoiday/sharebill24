// Vibe theme management hook

import { useCallback } from 'react';
import { VibeType } from '@/types/session';
import { getVibeConfig, getVibeGradient, VIBE_OPTIONS } from '@/lib/vibe-config';

export function useVibe(vibe?: VibeType) {
  const getConfig = useCallback((v: VibeType) => getVibeConfig(v), []);
  const getGradient = useCallback((v: VibeType) => getVibeGradient(v), []);

  const config = vibe ? getConfig(vibe) : null;
  const gradient = vibe ? getGradient(vibe) : '';

  return {
    config,
    gradient,
    getConfig,
    getGradient,
    options: VIBE_OPTIONS,
  };
}
