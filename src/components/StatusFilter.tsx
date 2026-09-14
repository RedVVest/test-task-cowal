import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { OrderStatus } from '../types/order';
import { colors, radius, spacing } from '../theme';

export type StatusFilterValue = OrderStatus | 'all';

interface Props {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void;
}

const OPTIONS: { value: StatusFilterValue; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'new', label: 'Новые' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'done', label: 'Завершённые' },
];

export default function StatusFilter({ value, onChange }: Props) {
  return (
    <View style={styles.track}>
      {OPTIONS.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.segment, active && styles.segmentActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.85}
              style={[styles.label, active && styles.labelActive]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.fill,
    borderRadius: radius.md,
    padding: 3,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },
  segment: {
    flex: 1,
    height: 32,
    borderRadius: radius.sm + 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  segmentActive: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  label: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: '500',
  },
  labelActive: {
    color: colors.text,
    fontWeight: '600',
  },
});
