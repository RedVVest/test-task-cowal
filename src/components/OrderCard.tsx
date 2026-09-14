import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Order } from '../types/order';
import { formatDate } from '../utils/date';
import { statusColor } from '../utils/status';
import StatusBadge from './StatusBadge';
import { colors, spacing, type } from '../theme';

interface Props {
  order: Order;
  onPress: (order: Order) => void;
}

export default function OrderCard({ order, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress(order)}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      <View style={[styles.rail, { backgroundColor: statusColor(order.status) }]} />
      <View style={styles.body}>
        <View style={styles.top}>
          <Text style={[type.bodyStrong, styles.number]}>{order.number}</Text>
          <Text style={[type.caption, styles.date]}>{formatDate(order.createdAt)}</Text>
        </View>
        <Text style={[type.body, styles.customer]} numberOfLines={1}>
          {order.customerName}
        </Text>
        <StatusBadge status={order.status} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
  },
  pressed: {
    backgroundColor: colors.fill,
  },
  rail: {
    width: 4,
  },
  body: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingLeft: spacing.md,
    paddingRight: spacing.lg,
    gap: spacing.xs,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  number: {
    color: colors.text,
  },
  date: {
    color: colors.muted,
  },
  customer: {
    color: colors.text,
  },
});
