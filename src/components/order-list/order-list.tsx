import { TOrdersItem } from '../../utils/types/orders-types';
import OrderCard from '../order-card/order-card';
import Spinner from '../spinner/spinner';
import styles from './order-list.module.css';

type TOrderListProps = {
  list: TOrdersItem[];
  isVisibleOrderStatus?: boolean;
};

function OrderList({ isVisibleOrderStatus, list }: TOrderListProps) {
  if (!list.length) {
    return <Spinner size={45}/>;
  }
  return (
    <div className={styles.root}>
      <div className={`${styles.content} pr-2 custom-scroll`}>
        {list.map((item) => (
          <OrderCard key={item._id} item={item} isVisibleOrderStatus={isVisibleOrderStatus} />
        ))}
      </div>
    </div>
  )
}

export default OrderList;
