import React, { useLayoutEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { RootStackScreenProps } from '../navigation/RootNavigator';
import { useOrders } from '../context/OrdersContext';
import OrderCard from '../components/OrderCard';
import StatusFilter, { StatusFilterValue } from '../components/StatusFilter';
import { colors, radius, spacing, type } from '../theme';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const { orders } = useOrders();
  const [filter, setFilter] = useState<StatusFilterValue>('all');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('CreateOrder')}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Создать заказ"
          style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const visibleOrders = useMemo(() => {
    const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);
    return [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [orders, filter]);

  return (
    <View style={styles.container}>
      <StatusFilter value={filter} onChange={setFilter} />
      <FlatList
        data={visibleOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={(order) => navigation.navigate('OrderDetails', { orderId: order.id })}
          />
        )}
        contentContainerStyle={[styles.list, visibleOrders.length > 0 && styles.sheet]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[type.bodyStrong, styles.emptyTitle]}>Нет заказов</Text>
            <Text style={[type.body, styles.emptyText]}>
              Нажмите «+», чтобы добавить первый заказ
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonPressed: {
    opacity: 0.8,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '500',
    marginTop: -1,
  },
  list: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    flexGrow: 1,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    flexGrow: 0,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: spacing.lg,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    color: colors.text,
  },
  emptyText: {
    color: colors.muted,
    textAlign: 'center',
  },
});
