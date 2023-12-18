import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../../components/modal/modal';
import IngredientDetails from '../../../components/ingredient-details/ingredient-details';

function IngredientModal() {
  const navigate = useNavigate();
  const { ingredientId } = useParams()
  const resetCurrentIngredient = () => {
    navigate(-1);
  };
  return (
    <Modal title="Детали ингредиента" onClose={resetCurrentIngredient}>
      <IngredientDetails id={ingredientId} />
    </Modal>
  );
}

export default IngredientModal;
