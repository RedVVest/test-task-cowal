import React, { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootStackScreenProps } from '../navigation/RootNavigator';
import { useOrders } from '../context/OrdersContext';
import DetailRow from '../components/DetailRow';
import StatusBadge from '../components/StatusBadge';
import PrimaryButton from '../components/PrimaryButton';
import { formatDate } from '../utils/date';
import { windowTypeLabel } from '../utils/windowType';
import { colors, radius, spacing, type } from '../theme';

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
        <Text style={[type.bodyStrong, styles.notFound]}>Заказ не найден</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={[type.display, styles.number]}>{order.number}</Text>
        <Text style={[type.body, styles.customer]}>{order.customerName}</Text>
        <StatusBadge status={order.status} size="md" />
      </View>

      <View style={styles.sheet}>
        <DetailRow label="Адрес" value={order.address} />
        <DetailRow label="Тип окна" value={windowTypeLabel(order.windowType)} />
        <DetailRow label="Размеры (ширина × высота)" value={`${order.width} × ${order.height} мм`} />
        <DetailRow label="Дата создания" value={formatDate(order.createdAt)} last />
      </View>

      <PrimaryButton title="Изменить статус" onPress={() => cycleStatus(order.id)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.bg,
  },
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  hero: {
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
  number: {
    color: colors.text,
  },
  customer: {
    color: colors.muted,
    marginBottom: spacing.xs,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
  },
  notFound: {
    color: colors.muted,
  },
});
