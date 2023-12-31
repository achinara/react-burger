import PropTypes from 'prop-types';
import styles from './order-details.module.css';

function OrderDetails({ orderNumber }) {
  return (
    <div className={styles.root}>
      <div className="p-20">
        <h3 className={`${styles.amount} mb-8`}>{orderNumber}</h3>
        <p className={styles.desc}>идентификатор заказа</p>
        <div className={`${styles.img} mt-15 mb-15`} />
        <p className="mb-2">Ваш заказ начали готовить</p>
        <p className={styles.note}>Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  )
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};

export default OrderDetails;
