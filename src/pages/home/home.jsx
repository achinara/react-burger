import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ingredientsPropTypes } from '../../utils/prop-types/prop-types';
import PageTitle from '../../components/page-title/page-title';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import WithIngredients from '../../utils/hocs/WithIngredients';
import styles from './home.module.css';

function Home({ emptyContent, ingredients }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <PageTitle>
        {emptyContent || 'Соберите бургер'}
      </PageTitle>
      {!emptyContent && (
        <section className={styles.builder}>
          {ingredients.length > 0 && (
            <BurgerIngredients ingredients={ingredients}/>
          )}
          <BurgerConstructor/>
        </section>
      )}
      <Outlet />
    </DndProvider>
  );
}

Home.propTypes = {
  emptyContent: PropTypes.node,
  ingredients: ingredientsPropTypes,
}

export default WithIngredients(Home);
