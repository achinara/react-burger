import {
  selectFeeds,
  wsFeedsSocketConnect as socketConnect,
  wsFeedsSocketDisconnect as socketDisconnect,
} from '../../../services/slices/feeds-slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../hooks';
import { WS_API_ORDER_LIST } from '../../../utils/constants/api';
import PageTitle from '../../../components/page-title/page-title';
import OrderList from '../../../components/order-list/order-list';
import FeedDetails from '../feed-details/feed-details';
import styles from './feed-list.module.css';

function FeedList() {
  const dispatch = useDispatch();
  const { feeds, totalToday, total } = useSelector(selectFeeds);

  useEffect(()=> {
    dispatch(socketConnect(WS_API_ORDER_LIST))

    return () => {
      dispatch(socketDisconnect());
    }
  }, [dispatch]);

  return (
    <>
      <PageTitle>Лента заказов</PageTitle>
      <div className={styles.content}>
        <OrderList list={feeds} />
        <FeedDetails list={feeds} total={total} totalToday={totalToday} />
      </div>
    </>
  );
}

export default FeedList;
