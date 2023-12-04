import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {  ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './full-item.module.css';

const texts = {
  top: ' (верх)',
  bottom: ' (низ)'
};

function FullItem({dragId, type, onRemove}) {
  const bun = useSelector((store) => store.constructorItems.bun);
  const items = useSelector((store) => store.constructorItems.ingredients);

  const item = useMemo(() => {
    const current = [...items, (bun || {})].filter((i) => i.dragId === dragId);
    return current[0];
  }, [bun, items, dragId]);
  
  if (!item) return null;

  return (
    <div className={`${styles.root} mb-4`}>
      <div className={`${styles.drag} ${!type && styles.visible} mr-2`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        type={type}
        text={`${item.name}${texts[type] || ''}`}
        price={item.price}
        thumbnail={item.image}
        handleClose={onRemove}
        isLocked={type}
      />
    </div>
  )
}

export default FullItem;

FullItem.propTypes = {
  dragId: PropTypes.string.isRequired,
  type: PropTypes.string,
  onRemove: PropTypes.func,
}
