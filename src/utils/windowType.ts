import { WindowType, WINDOW_TYPES } from '../types/order';

const LABELS: Record<WindowType, string> = {
  turn: 'Поворотное',
  tilt: 'Откидное',
  tilt_turn: 'Поворотно-откидное',
  sliding: 'Раздвижное',
};

export function windowTypeLabel(type: WindowType): string {
  return LABELS[type];
}

export const WINDOW_TYPE_OPTIONS = WINDOW_TYPES.map((value) => ({
  value,
  label: LABELS[value],
}));
