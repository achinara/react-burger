import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../hooks';
import { WS_API_ORDER_LIST } from '../../../utils/constants/api';
import { ACCESS_TOKEN } from '../../../utils/constants/consts';
import {
  selectUserOrders,
  wsUserOrdersSocketDisconnect,
  wsUserOrdersSocketConnect
} from '../../../services/slices/user-orders-slice';
import OrderList from '../../../components/order-list/order-list';

function UserOrders() {
  const dispatch =  useDispatch();
  const orders = useSelector(selectUserOrders);

  useEffect(()=> {
    const wsUrl = new URL(WS_API_ORDER_LIST);
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
      wsUrl.searchParams.set(
        'token',
        accessToken.replace('Bearer ', '')
      );
    }
    dispatch(wsUserOrdersSocketConnect(wsUrl.toString()))

    return () => {
      dispatch(wsUserOrdersSocketDisconnect());
    }
  }, [dispatch]);

  return (
    <OrderList list={orders} isVisibleOrderStatus />
  );
}

export default UserOrders;
