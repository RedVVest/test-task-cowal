export const colors = {
  ink: '#14181F',
  text: '#14181F',
  muted: '#667085',
  border: '#E4E7EC',
  bg: '#F2F4F7',
  surface: '#FFFFFF',
  fill: '#EAECF0',
  white: '#FFFFFF',
  danger: '#D92D20',
  statusNew: '#2563EB',
  statusInProgress: '#F59E0B',
  statusDone: '#16A34A',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
} as const;

export const type = {
  caption: { fontSize: 13, lineHeight: 18 },
  body: { fontSize: 15, lineHeight: 20 },
  bodyStrong: { fontSize: 17, lineHeight: 22, fontWeight: '600' as const },
  title: { fontSize: 22, lineHeight: 28, fontWeight: '700' as const },
  display: { fontSize: 34, lineHeight: 40, fontWeight: '700' as const, letterSpacing: -0.5 },
} as const;
