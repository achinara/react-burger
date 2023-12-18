import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import WithIngredients from '../../../utils/hocs/WithIngredients';
import IngredientDetails from '../../../components/ingredient-details/ingredient-details';
import styles from './ingredient-view.module.css';

function IngredientView({ emptyContent }) {
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

IngredientView.propTypes = {
  emptyContent: PropTypes.node,
}

export default WithIngredients(IngredientView);
