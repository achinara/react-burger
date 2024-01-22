import OrderInfo from '../order-info/order-info';
import styles from './order-view.module.css';

function OrderView() {
  return (
    <div className={styles.root}>
      <OrderInfo isNumberCentered={true} />
    </div>
  );
}

export default OrderView;
