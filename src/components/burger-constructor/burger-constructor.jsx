import { useState } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ConstructorItem from './constructor-item/constructor-item';
import { ingredientsPropTypes } from '../../utils/prop-types/prop-types';
import styles from './burger-constructor.module.css';

function BurgerConstructor({ list: data }) {
  const [visibleOrderDetails, toggleOrderDetails] = useState(false);
  const handleVisibleDetails = () => toggleOrderDetails(!visibleOrderDetails);

  const firstItem = data[0];
  const list = data.slice(1);

  return (
    <div className={`${styles.root} ml-5`}>
      <div className={styles.top}>
        <div className={styles.list}>
          <ConstructorItem
            type="top"
            price={firstItem.price}
            image={firstItem.image}
            text={`${firstItem.name} (верх)`}
          />
          <div className={`${styles.scroll} custom-scroll`}>
            {list.map((item) => (
              <ConstructorItem
                key={item._id}
                text={item.name}
                price={item.price}
                image={item.image}
                canDrag
              />)
            )}
          </div>
          <ConstructorItem
            type="bottom"
            price={firstItem.price}
            image={firstItem.image}
            text={`${firstItem.name} (низ)`}
          />
        </div>
      </div>
      <div className={`${styles.bottom} mt-10 pl-4 pr-4`}>
        <div className={`${styles.total} mr-10`}>
          <span className={`${styles.amount} mr-2`}>630</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="submit" type="primary" size="large" onClick={handleVisibleDetails}>
          Оформить заказ
        </Button>
      </div>
      {visibleOrderDetails && (
        <Modal onClose={handleVisibleDetails}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  list: ingredientsPropTypes,
}
