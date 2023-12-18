import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectCurrentIngredient } from '../../services/ingredients-slice';
import styles from './ingredient-details.module.css';

const attrsTitle = {
  calories: 'Калории, калл',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углеоводы, г',
}

const attrs = Object.keys(attrsTitle);

function IngredientDetails({ id }) {
  const ingredient = useSelector((store) => selectCurrentIngredient(store, id));
  if (!ingredient) {
    return (
      <h2 style={{ textAlign: 'center' }}>There isn't any ingredient yet</h2>
    )
  }

  const { image, name, ...rest } = ingredient;
  return (
    <div className={styles.root}>
      <div className={`${styles.img} mt-4 mb-4`}>
        <img src={image} alt={name} />
      </div>
      <p className="mb-8">{name}</p>
      <ul className={styles.list}>
        {attrs.map((attr) =>
          rest[attr] && (
            <li className={styles.item} key={attr}>
              <p className="mb-2">{attrsTitle[attr]}</p>
              <span className={styles.amount}>{rest[attr]}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  id: PropTypes.string.isRequired,
}

export default IngredientDetails;
