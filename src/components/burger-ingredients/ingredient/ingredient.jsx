import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux';
import { TYPE_BUN } from '../../../utils/constants/consts';
import { setCurrentIngredient } from '../../../services/current-ingredient-slice';
import styles from '../burger-ingredients.module.css';

const dragTypes = ['bun', 'default'];

const Ingredient = ({item}) => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setCurrentIngredient(item));
  
  const [, dragRef] = useDrag({
    type: item.type === TYPE_BUN ? dragTypes[0] : dragTypes[1],
    item,
    collect: (monitor) => {
      return {
        isDrag: monitor.isDragging()
      }
    }
  })

  return (
    <div className={`${styles.ingredient} pl-4 pr-2 mb-8`} onClick={handleClick}>
      <div ref={dragRef}>
        <img src={item.image} className="ml-4 mr-4" alt={item.name} />
        <div className={`${styles.price} mt-1 mb-1`}>
          <span className={`${styles.amount} mr-2`}>{item.price}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={styles.name}>{item.name}</p>
      </div>
      {item.count > 0 && <Counter count={item.count} size="default"/>}
    </div>
  );
};

export default Ingredient;

Ingredient.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
}
