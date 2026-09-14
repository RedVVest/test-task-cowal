import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OrderStatus } from '../types/order';
import { statusColor, statusLabel } from '../utils/status';
import { colors, spacing, type } from '../theme';

interface Props {
  status: OrderStatus;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'sm' }: Props) {
  const color = statusColor(status);
  return (
    <View style={styles.row}>
      <View style={[styles.dot, size === 'md' && styles.dotMd, { backgroundColor: color }]} />
      <Text style={[size === 'md' ? type.body : type.caption, styles.label, { color }]}>
        {statusLabel(status)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm - 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotMd: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontWeight: '600',
    color: colors.text,
  },
});
