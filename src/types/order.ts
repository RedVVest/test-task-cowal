export type OrderStatus = 'new' | 'in_progress' | 'done';

export type WindowType = 'turn' | 'tilt' | 'tilt_turn' | 'sliding';

export interface Order {
  id: string;
  number: string;
  customerName: string;
  address: string;
  windowType: WindowType;
  width: number;
  height: number;
  status: OrderStatus;
  createdAt: string;
}

export const ORDER_STATUSES: OrderStatus[] = ['new', 'in_progress', 'done'];

export const WINDOW_TYPES: WindowType[] = ['turn', 'tilt', 'tilt_turn', 'sliding'];
