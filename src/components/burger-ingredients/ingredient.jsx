import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';

const Ingredient = ({item, onClick}) => (
  <div className={`${styles.ingredient} pl-4 pr-2 mb-8`} onClick={onClick}>
    <Counter count={1} size="default" />
    <img src={item.image} className="ml-4 mr-4" alt={item.name} />
    <div className={`${styles.price} mt-1 mb-1`}>
      <span className={`${styles.amount} mr-2`}>{item.price}</span>
      <CurrencyIcon type="primary" />
    </div>
    <p className={styles.name}>{item.name}</p>
  </div>
);

export default Ingredient;

Ingredient.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}
