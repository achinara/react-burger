import { useSelector } from 'react-redux';
import { selectCurrentIngredient } from '../../services/ingredients-slice';
import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
  id?: string;
};

const attrsTitle = {
  calories: 'Калории, калл',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углеоводы, г',
}

const attrs = Object.keys(attrsTitle);

function IngredientDetails({ id }: TIngredientDetailsProps) {
  const ingredient = useSelector((store) => selectCurrentIngredient(store, id));
  if (!ingredient) {
    return (
      <h2 className={styles.title}>There isn't any ingredient yet</h2>
    )
  }

  const { image_large, name, ...rest } = ingredient;
  return (
    <div className={styles.root}>
      <div className={`${styles.img} mt-4 mb-4`}>
        <img src={image_large} alt={name} />
      </div>
      <p className="mb-8">{name}</p>
      <ul className={styles.list}>
        {attrs.map((attr) => {
          const key = attr as keyof typeof attrsTitle;
          return rest[key] && (
            <li className={styles.item} key={attr}>
              <p className="mb-2">{attrsTitle[key]}</p>
              <span className={styles.amount}>{rest[attr]}</span>
            </li>
        )})}
      </ul>
    </div>
  )
}

export default IngredientDetails;
