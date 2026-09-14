import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { Order } from '../types/order';
import { nextStatus } from '../utils/status';
import { nextOrderNumber } from '../utils/orderNumber';
import initialOrders from '../data/orders.json';

export type NewOrderInput = Pick<
  Order,
  'customerName' | 'address' | 'windowType' | 'width' | 'height'
>;

type Action =
  | { type: 'ADD_ORDER'; input: NewOrderInput }
  | { type: 'CYCLE_STATUS'; id: string };

interface OrdersContextValue {
  orders: Order[];
  addOrder: (input: NewOrderInput) => void;
  cycleStatus: (id: string) => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function ordersReducer(state: Order[], action: Action): Order[] {
  switch (action.type) {
    case 'ADD_ORDER': {
      const order: Order = {
        ...action.input,
        id: generateId(),
        number: nextOrderNumber(state),
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      return [order, ...state];
    }
    case 'CYCLE_STATUS':
      return state.map((order) =>
        order.id === action.id ? { ...order, status: nextStatus(order.status) } : order,
      );
    default:
      return state;
  }
}

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, dispatch] = useReducer(ordersReducer, initialOrders as Order[]);

  const addOrder = useCallback((input: NewOrderInput) => {
    dispatch({ type: 'ADD_ORDER', input });
  }, []);

  const cycleStatus = useCallback((id: string) => {
    dispatch({ type: 'CYCLE_STATUS', id });
  }, []);

  const value = useMemo(
    () => ({ orders, addOrder, cycleStatus }),
    [orders, addOrder, cycleStatus],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}
