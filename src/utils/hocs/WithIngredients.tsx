import { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { selectIngredients } from '../../services/ingredients-slice';
import Spinner from '../../components/spinner/spinner';

type TEmptyProps = {
  emptyContent?: string;
};

const WithIngredients = <T extends TEmptyProps>(Component: ComponentType<T>) => {
  function WrappedComponent (props: T) {
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
      <Component {...props} emptyContent={emptyContent} />
    )
  }
  
  return WrappedComponent;
}

export default WithIngredients;
