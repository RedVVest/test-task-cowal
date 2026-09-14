import { Order } from '../types/order';

const PREFIX = 'ORD-';

export function nextOrderNumber(orders: Order[]): string {
  const max = orders.reduce((acc, order) => {
    const n = Number(order.number.replace(PREFIX, ''));
    return Number.isFinite(n) && n > acc ? n : acc;
  }, 0);
  return `${PREFIX}${String(max + 1).padStart(3, '0')}`;
}
