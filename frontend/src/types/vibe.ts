// Vibe types

export type VibeType = 'FOOD' | 'DRINKS' | 'TRAVEL' | 'SHOPPING' | 'PARTY' | 'CAFE' | 'SPORTS' | 'OTHER';

export interface VibeConfig {
  label: string;
  emoji: string;
  gradient: string;
  accent: string;
}

export const VIBE_CONFIG: Record<VibeType, VibeConfig> = {
  FOOD: {
    label: 'Ăn uống',
    emoji: '🍽️',
    gradient: 'from-orange-400 to-rose-400',
    accent: '#F97316',
  },
  DRINKS: {
    label: 'Nhậu',
    emoji: '🍺',
    gradient: 'from-amber-400 to-yellow-300',
    accent: '#F59E0B',
  },
  TRAVEL: {
    label: 'Du lịch',
    emoji: '✈️',
    gradient: 'from-sky-400 to-blue-500',
    accent: '#3B82F6',
  },
  SHOPPING: {
    label: 'Mua sắm',
    emoji: '🛍️',
    gradient: 'from-pink-400 to-purple-500',
    accent: '#A855F7',
  },
  PARTY: {
    label: 'Tiệc',
    emoji: '🎉',
    gradient: 'from-violet-500 to-pink-500',
    accent: '#8B5CF6',
  },
  CAFE: {
    label: 'Cafe',
    emoji: '☕',
    gradient: 'from-stone-400 to-amber-600',
    accent: '#A16207',
  },
  SPORTS: {
    label: 'Thể thao',
    emoji: '⚽',
    gradient: 'from-green-400 to-emerald-500',
    accent: '#22C55E',
  },
  OTHER: {
    label: 'Khác',
    emoji: '🎯',
    gradient: 'from-slate-400 to-gray-500',
    accent: '#64748B',
  },
};

export const VIBE_OPTIONS: VibeType[] = [
  'FOOD',
  'DRINKS',
  'TRAVEL',
  'SHOPPING',
  'PARTY',
  'CAFE',
  'SPORTS',
  'OTHER',
];
