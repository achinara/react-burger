import { useMemo } from 'react';
import { TOrdersItem } from '../../../utils/types/orders-types';
import { formatNumber } from '../../../utils/helpers/helpers';
import styles from './feed-details.module.css';

const MAX = 10;

type TFeedDetailsProps = {
  list: TOrdersItem[];
  total: number;
  totalToday: number;
};

function FeedDetails({ list, total, totalToday }: TFeedDetailsProps) {
  const { done: ordersDone, inProgress: ordersInProgress } = useMemo(() =>
    list.reduce<{done: number[]; inProgress: number[]}>((acc, item) => {
      if (item.status === 'done') acc.done.push(item.number);
      if (item.status === 'created') acc.inProgress.push(item.number);
      return acc;
    }, { done: [], inProgress: [] }),
    [list]);

  if (!list.length) {
    return null;
  }

  return(
    <div>
      <div className={`${styles.column} mb-15`}>
        {ordersDone.length > 0 && (
          <div>
            <h4 className={`${styles.title} mb-6`}>Готовы:</h4>
            <div className={styles.column}>
              {ordersDone.slice(0, MAX).map((item) => (
                <span key={item} className={`${styles.num} ${styles.statusDone} mb-2`}>0{item}</span>
              ))}
            </div>
          </div>
        )}
        {ordersInProgress.length > 0 && (
          <div>
            <h4 className={`${styles.title} mb-6`}>В работе:</h4>
            <div className={styles.column}>
              {ordersInProgress.slice(0, MAX).map((item) => (
                <span key={item} className={`${styles.num} mb-2`}>0{item}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mb-15">
        <h3 className={styles.title}>Выполнено за все время:</h3>
        <h3 className={styles.totalNum}>{formatNumber(total)}</h3>
      </div>
      <h3 className={styles.title}>Выполнено за сегодня:</h3>
      <h3 className={styles.totalNum}>{formatNumber(totalToday)}</h3>
    </div>
  )
}

export default FeedDetails;
