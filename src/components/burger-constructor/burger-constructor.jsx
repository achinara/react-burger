import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ConstructorItem from './constructor-item/constructor-item';
import { createOrder, removeOrder, selectOrder } from '../../services/order-slice';
import { clearBurger, selectBurgerConstructor } from '../../services/constructor-items-slice';
import { clearIngredientsCount, selectIngredientItems } from '../../services/ingredients-slice';
import { TYPE_BUN } from '../../utils/constants/consts';
import Spinner from '../spinner/spinner';
import ConstructorGroup from './constructor-group/constructor-group';
import FullItem from './full-item/full-item';
import EmptyItem from './empty-item/empty-item';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { loading, order } = useSelector(selectOrder);
  const ingredients = useSelector(selectIngredientItems);
  const { bun, ingredients: list } = useSelector(selectBurgerConstructor);

  const totalPrice = useMemo(() => {
    const picked = [...list, bun];
    return ingredients
      .filter(({_id}) => picked.find(item => item?._id === _id))
      .reduce((acc, item) => acc + item.price * (item.count || 1) , 0);
  }, [ingredients, bun, list]);
  
  const handleCloseOrder = () => {
    dispatch(removeOrder());
    dispatch(clearBurger());
    dispatch(clearIngredientsCount());
  }
  
  const handleCreateOrder = () => {
    const requiredBun = bun ?? ingredients.find(i => i.type === TYPE_BUN);
    const picked = [requiredBun, ...list, requiredBun].filter(_ =>_);
    const ids = picked.map((item) => item._id);
    dispatch(createOrder({
      ingredients: ids,
    }));
  }

  return (
    <div className={`${styles.root} ml-5`}>
      <div className={styles.content}>
        <div className={styles.list}>
          <ConstructorGroup dragType="bun">
            {bun?.dragId
              ? <FullItem dragId={bun.dragId} type="top"  />
              : <EmptyItem type="top" />
            }
          </ConstructorGroup>
          <ConstructorGroup className={`${styles.scroll} custom-scroll`} dragType="default">
            {list.length
              ? list.map((item, index) => (
                  <ConstructorItem key={item.dragId} dragId={item.dragId} index={index} />
                ))
              : <EmptyItem />}
          </ConstructorGroup>
          <ConstructorGroup dragType="bun">
            {bun?.dragId
              ? <FullItem dragId={bun.dragId} type="bottom"  />
              : <EmptyItem type="bottom" />
            }
          </ConstructorGroup>
        </div>
      </div>
      {totalPrice > 0 && (
        <div className={`${styles.footer} mt-10 pl-4 pr-4`}>
          <div className={`${styles.total} mr-10`}>
            <span className={`${styles.amount} mr-2`}>{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button disabled={loading} htmlType="submit" type="primary" size="large" onClick={handleCreateOrder}>
            {loading ? <Spinner /> : 'Оформить заказ'}
          </Button>
        </div>
      )}
      {order?.number && (
        <Modal onClose={handleCloseOrder}>
          <OrderDetails orderNumber={order?.number} />
        </Modal>
      )}
    </div>
  )
}

export default BurgerConstructor;
