import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../../utils/types/ingredients-types';
import { formatNumber } from '../../../utils/helpers/helpers';
import OrderRoundImage from '../../order-round-image/order-round-image';
import styles from '../order-info.module.css';

function OrderIngredient({ image_mobile, name, price, count }: TIngredient) {
  return (
    <div className={`${styles.row} mr-6 mb-4`}>
      <OrderRoundImage image={image_mobile} />
      <p className={`${styles.name} ml-4`}>{name}</p>
      <div className={`${styles.count} ml-4 mr-2`}>
        {count} x {formatNumber(price)}
      </div>
      <CurrencyIcon type="primary" />
    </div>
  )
}

export default OrderIngredient;
