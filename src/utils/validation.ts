import { WindowType } from '../types/order';

export interface OrderFormValues {
  customerName: string;
  address: string;
  windowType: WindowType;
  width: string;
  height: string;
}

export type OrderFormErrors = Partial<Record<keyof OrderFormValues, string>>;

export interface ValidationResult {
  errors: OrderFormErrors;
  parsed?: { width: number; height: number };
}

const REQUIRED = 'Обязательное поле';
const POSITIVE_NUMBER = 'Введите положительное число';

function parsePositive(value: string): number | null {
  const n = Number(value.trim().replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function validateOrderForm(values: OrderFormValues): ValidationResult {
  const errors: OrderFormErrors = {};

  if (!values.customerName.trim()) errors.customerName = REQUIRED;
  if (!values.address.trim()) errors.address = REQUIRED;

  const width = values.width.trim() ? parsePositive(values.width) : null;
  const height = values.height.trim() ? parsePositive(values.height) : null;

  if (!values.width.trim()) errors.width = REQUIRED;
  else if (width === null) errors.width = POSITIVE_NUMBER;

  if (!values.height.trim()) errors.height = REQUIRED;
  else if (height === null) errors.height = POSITIVE_NUMBER;

  if (Object.keys(errors).length > 0 || width === null || height === null) {
    return { errors };
  }
  return { errors, parsed: { width, height } };
}
