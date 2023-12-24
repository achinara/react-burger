import { useSelector } from 'react-redux';
import { selectIngredients } from '../../services/ingredients-slice';
import Spinner from '../../components/spinner/spinner';

const WithIngredients = (Component) => {
  function WrappedComponent () {
    const { items: ingredients, loading, failed: error } = useSelector(selectIngredients);
  
    let emptyContent = null;
    if (!ingredients.length) {
      emptyContent = 'Data is not delivered yet';
    }
  
    if (loading) {
      emptyContent = <Spinner size={45}/>;
    }
  
    if (error) {
      emptyContent = 'Something went wrong';
    }
    
    return (
      <Component ingredients={ingredients} emptyContent={emptyContent} />
    )
  }
  
  return WrappedComponent;
}

export default WithIngredients;
