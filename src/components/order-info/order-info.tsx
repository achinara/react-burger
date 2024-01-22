import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrder, useSelector } from '../../hooks';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectIngredientItemByIds } from '../../services/slices/ingredients-slice';
import { TIngredient } from '../../utils/types/ingredients-types';
import { formatNumber } from '../../utils/helpers/helpers';
import OrderStatus from '../order-status/order-status';
import OrderIngredient from './order-ingredient/order-ingredient';
import Spinner from '../spinner/spinner';
import styles from './order-info.module.css';

type TOrderInfoProps = {
  isNumberCentered?: boolean;
};

function OrderInfo({ isNumberCentered: alignCenter }: TOrderInfoProps) {
  const { orderNumber = '' } = useParams();
  const order = useGetOrder(orderNumber);
  const ingredientsById = useSelector(selectIngredientItemByIds);
  const { items, total }: {items: TIngredient[], total: number} = useMemo(() => {
    let total = 0;
    const uniques = Array.from(new Set(order?.ingredients));
    const items = uniques.reduce<TIngredient[]>((acc, uItem) => {
      const count = order?.ingredients.filter(item => item === uItem).length || 0;
      const next = { ...ingredientsById[uItem], count };
      total += count * next.price;
      acc.push(next);
      return acc;
    }, [])

    return {items, total };
  }, [ingredientsById, order?.ingredients]);

  if (!order) {
    return <Spinner size={60} />;
  }

  return(
    <div className={`${styles.root} mt-3`}>
      <p className={`${styles.number} ${alignCenter ? styles.center : ''} mb-10`}>
        #0{order.number}
      </p>
      <h2 className={`${styles.title} mb-3`}>{order.name}</h2>
      <OrderStatus status={order.status} />
      <h3 className={`${styles.heading} mt-15 mb-6`}>Состав:</h3>
      <div className={`${styles.set} mb-10`}>
        {items.map((item) => (
          <OrderIngredient key={item._id} {...item} />
        ))}
      </div>
      <div className={styles.footer}>
        <FormattedDate className={styles.date} date={new Date(order.createdAt)} />
        <span className={`${styles.count} mr-2`}>{formatNumber(total)}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}

export default OrderInfo;
