import { useParams } from 'react-router-dom';
import WithModal from '../../../utils/hocs/with-modal';
import IngredientDetails from '../../../components/ingredient-details/ingredient-details';

function IngredientModal() {
  const { ingredientId } = useParams()
  return (
    <IngredientDetails id={ingredientId} />
  );
}

export default WithModal(IngredientModal);
