import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrdersItem } from '../../utils/types/orders-types';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatNumber } from '../../utils/helpers/helpers';
import { selectIngredientItemByIds } from '../../services/slices/ingredients-slice';
import OrderRoundImage from '../order-round-image/order-round-image';
import OrderStatus from '../order-status/order-status';
import styles from './order-card.module.css';

type TOrderCardProps = {
  item: TOrdersItem;
  isVisibleOrderStatus?: boolean;
};

const MAX = 6;

function OrderCard({item, isVisibleOrderStatus = false}: TOrderCardProps) {
  const { number, name, status, createdAt, ingredients: items } = item;
  const ingredientsByIds = useSelector(selectIngredientItemByIds);
  const location = useLocation();

  const { price, images } = useMemo(() =>
    items.reduce<{price: number, images: string[]}>((acc, item) => {
      const ingredient = ingredientsByIds[item];
      if (!ingredient) return acc;
      acc.price = acc.price + ingredient.price;
      acc.images.push(ingredient.image_mobile);
      return acc;
    }, { price: 0, images: [] }),
  [items, ingredientsByIds]);

  return (
    <Link
      className={styles.root}
      to={`${number}`}
      state={{
        backgroundLocation: location
      }}>
      <div className={`${styles.wrapper} p-6 mb-6`}>
        <div className={`${styles.header} mb-6`}>
          <div className={styles.orderNumber}>#0{number}</div>
          <FormattedDate date={new Date(createdAt)} className={styles.date}/>
        </div>
        <h5 className={`${styles.title} mb-2`}>{name}</h5>
        {isVisibleOrderStatus && <OrderStatus status={status} />}
        <div className={`${styles.footer} mt-6`}>
          <div className={styles.images}>
            {items.slice(0, MAX).map((item, index, array) =>(
              <div key={index} className={styles.image} style={{zIndex: MAX - index}}>
                <OrderRoundImage
                  image={images[index]}
                  text={
                    (items.length > MAX) && (array.length - 1 === index)
                    ? `+${items.length - MAX}`
                    : undefined
                  }/>
              </div>
            ))}
          </div>
          <div className={styles.price}>
            {formatNumber(price)} <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
