import { useMemo } from 'react';
import { useSelector } from '../../../hooks';
import {  ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectBurgerConstructor } from '../../../services/slices/constructor-items-slice';
import styles from './full-item.module.css';

const texts = {
  top: ' (верх)',
  bottom: ' (низ)',
};

type TFullItemProps = {
  dragId: string;
  type?: keyof typeof texts;
  onRemove?: () => void;
};

function FullItem({ dragId, type, onRemove }: TFullItemProps) {
  const { bun, ingredients: items } = useSelector(selectBurgerConstructor);
  const text = type ? texts[type] : '';

  const item = useMemo(() => {
    const current = [...items, bun].filter((i) => i?.dragId === dragId);
    return current[0];
  }, [bun, items, dragId]);
  
  if (!item) return null;

  return (
    <div className={styles.root}>
      <div className={`${styles.drag} ${!type && styles.visible} mr-2`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        type={type}
        text={`${item.name}${text}`}
        price={item.price}
        thumbnail={item.image}
        handleClose={onRemove}
        isLocked={!!type}
      />
    </div>
  )
}

export default FullItem;
