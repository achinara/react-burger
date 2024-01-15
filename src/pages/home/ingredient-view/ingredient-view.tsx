import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import WithIngredients from '../../../utils/hocs/WithIngredients';
import IngredientDetails from '../../../components/ingredient-details/ingredient-details';
import styles from './ingredient-view.module.css';

type TIngredientViewProps = {
  emptyContent?: ReactNode;
};

function IngredientView({ emptyContent }: TIngredientViewProps) {
  const { ingredientId } = useParams();

  return (
    <div className={styles.root}>
      {emptyContent || (
        <>
          <h2 className={styles.title}>Детали ингредиента</h2>
          <IngredientDetails id={ingredientId} />
        </>
      )}
    </div>
  )
}

export default WithIngredients(IngredientView);
