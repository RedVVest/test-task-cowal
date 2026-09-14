import React, { useLayoutEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootStackScreenProps } from '../navigation/RootNavigator';
import { useOrders } from '../context/OrdersContext';
import DetailRow from '../components/DetailRow';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/date';
import { windowTypeLabel } from '../utils/windowType';
import { colors, radius, spacing } from '../theme';

export default function OrderDetailsScreen({
  route,
  navigation,
}: RootStackScreenProps<'OrderDetails'>) {
  const { orders, cycleStatus } = useOrders();
  const order = orders.find((o) => o.id === route.params.orderId);

  useLayoutEffect(() => {
    if (order) navigation.setOptions({ title: order.number });
  }, [navigation, order]);

  if (!order) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Заказ не найден</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <DetailRow label="Номер заказа" value={order.number} />
        <DetailRow label="Клиент" value={order.customerName} />
        <DetailRow label="Адрес" value={order.address} />
        <DetailRow label="Тип окна" value={windowTypeLabel(order.windowType)} />
        <DetailRow label="Размеры (Ш × В)" value={`${order.width} × ${order.height} мм`} />
        <DetailRow label="Статус" value={<StatusBadge status={order.status} />} />
        <DetailRow label="Дата создания" value={formatDate(order.createdAt)} />
      </View>

      <Pressable
        onPress={() => cycleStatus(order.id)}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Изменить статус</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    fontSize: 16,
    color: colors.muted,
  },
});
