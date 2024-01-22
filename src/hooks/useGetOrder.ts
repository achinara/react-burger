import { useDispatch, useSelector } from './hooks';
import { selectFeedByNumber } from '../services/slices/feeds-slice';
import { useEffect } from 'react';
import { fetchOrder, selectOrderByNumber } from '../services/slices/order-slice';
import { TOrdersItem } from '../utils/types/orders-types';
import { selectUserOrdersByNumber } from '../services/slices/user-orders-slice';

export function useGetOrder(number: string): TOrdersItem | null {
  const dispatch = useDispatch();
  let order: null | TOrdersItem = null;

  order = useSelector((store) => {
    let item = selectFeedByNumber(store, number);
    if (item) return item;

    item = selectUserOrdersByNumber(store, number);
    if (item) return item;

    item = selectOrderByNumber(store, number);
    if (item) return item;
    return null;
  });


  useEffect(() => {
    if (!order) {
      dispatch(fetchOrder(number));
    }
  }, [order, number, dispatch])

  return order;
}
