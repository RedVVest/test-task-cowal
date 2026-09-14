import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OrderStatus } from '../types/order';
import { statusColor, statusLabel } from '../utils/status';
import { colors, spacing } from '../theme';

interface Props {
  status: OrderStatus;
}

export default function StatusBadge({ status }: Props) {
  return (
    <View style={[styles.badge, { backgroundColor: statusColor(status) }]}>
      <Text style={styles.text}>{statusLabel(status)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
