import React, { useLayoutEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { RootStackScreenProps } from '../navigation/RootNavigator';
import { useOrders } from '../context/OrdersContext';
import OrderCard from '../components/OrderCard';
import StatusFilter, { StatusFilterValue } from '../components/StatusFilter';
import { colors, spacing } from '../theme';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const { orders } = useOrders();
  const [filter, setFilter] = useState<StatusFilterValue>('all');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('CreateOrder')}
          hitSlop={12}
          accessibilityLabel="Создать заказ"
        >
          <Text style={styles.addButton}>+</Text>
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
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text style={styles.empty}>Нет заказов</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    fontSize: 28,
    lineHeight: 32,
    color: colors.primary,
    fontWeight: '500',
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    flexGrow: 1,
  },
  separator: {
    height: spacing.md,
  },
  empty: {
    textAlign: 'center',
    color: colors.muted,
    marginTop: spacing.xl * 2,
    fontSize: 16,
  },
});
