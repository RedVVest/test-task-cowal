import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import CreateOrderScreen from '../screens/CreateOrderScreen';
import { colors } from '../theme';

export type RootStackParamList = {
  Home: undefined;
  OrderDetails: { orderId: string };
  CreateOrder: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text },
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Заказы' }} />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{ title: 'Детали заказа' }}
      />
      <Stack.Screen
        name="CreateOrder"
        component={CreateOrderScreen}
        options={{ title: 'Новый заказ' }}
      />
    </Stack.Navigator>
  );
}
