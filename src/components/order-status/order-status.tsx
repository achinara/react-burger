import { TStatus } from '../../utils/types/orders-types';
import { ORDER_STATUS } from '../../utils/constants/order-status';
import styles from './order-status.module.css';

type TOrderStatusProps = {
  status: TStatus;
};

function OrderStatus({ status }: TOrderStatusProps) {
  return (
    <div
      className={styles.status}
      style={{
        color: ORDER_STATUS[status].color
      }}
    >
      {ORDER_STATUS[status].text}
    </div>
  )
}

export default OrderStatus;
