import { TOrder } from './order-types';
export type TStatus = 'done' | 'created' | 'pending';

export type TOrdersItem = TOrder;

export type TOrders = {
  total: number;
  totalToday: number;
  orders: TOrdersItem[];
};

export type TFetchOrder = Omit<TOrders, 'total' | 'totalToday'> & {
  success: boolean;
};
