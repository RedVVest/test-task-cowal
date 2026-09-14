import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Order } from '../types/order';
import { formatDate } from '../utils/date';
import StatusBadge from './StatusBadge';
import { colors, radius, spacing } from '../theme';

interface Props {
  order: Order;
  onPress: (order: Order) => void;
}

export default function OrderCard({ order, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress(order)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.row}>
        <Text style={styles.number}>{order.number}</Text>
        <StatusBadge status={order.status} />
      </View>
      <Text style={styles.customer}>{order.customerName}</Text>
      <Text style={styles.date}>{formatDate(order.createdAt)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  pressed: {
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  number: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  customer: {
    fontSize: 15,
    color: colors.text,
  },
  date: {
    fontSize: 13,
    color: colors.muted,
  },
});
