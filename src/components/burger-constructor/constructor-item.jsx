import PropTypes from 'prop-types';
import {  ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css';

function ConstructorItem({text, type, price, image, canDrag}) {
  return (
    <div className={`${styles.item} mb-4`}>
      <div className={`${styles.drag} ${canDrag && styles.visible} mr-2`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        type={type}
        text={text}
        price={price}
        thumbnail={image}
        isLocked={!!canDrag}
      />
    </div>
  )
}

export default ConstructorItem;

ConstructorItem.propTypes = {
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  canDrag: PropTypes.bool,
}
