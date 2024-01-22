import WithModal from '../../utils/hocs/with-modal';
import OrderInfo from '../order-info/order-info';

function OrderModal() {
  return (
    <OrderInfo />
  );
}

export default WithModal(OrderModal);
