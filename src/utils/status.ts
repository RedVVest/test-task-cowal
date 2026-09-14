import { ORDER_STATUSES, OrderStatus } from '../types/order';
import { colors } from '../theme';

const LABELS: Record<OrderStatus, string> = {
  new: 'Новый',
  in_progress: 'В работе',
  done: 'Завершён',
};

const COLORS: Record<OrderStatus, string> = {
  new: colors.statusNew,
  in_progress: colors.statusInProgress,
  done: colors.statusDone,
};

export function statusLabel(status: OrderStatus): string {
  return LABELS[status];
}

export function statusColor(status: OrderStatus): string {
  return COLORS[status];
}

export function nextStatus(status: OrderStatus): OrderStatus {
  const index = ORDER_STATUSES.indexOf(status);
  return ORDER_STATUSES[(index + 1) % ORDER_STATUSES.length];
}
