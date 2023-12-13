import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { fetchIngredients, selectIngredients } from '../../services/ingredients-slice';
import Spinner from '../spinner/spinner';
import styles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const { items: ingredients, loading, failed: error } = useSelector(selectIngredients);

  let emptyContent = null;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  
  if (!ingredients.length) {
    emptyContent = 'Data is not delivered yet';
  }
  
  if (loading) {
    emptyContent = <Spinner size={45} />;
  }

  if (error) {
    emptyContent = 'Something went wrong';
  }

  return (
    <main className={styles.main}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <div className={`${styles.content} pb-10`}>
          <h1 className={`${styles.title} mt-10 mb-5`}>
            {emptyContent || 'Соберите бургер'}
          </h1>
          {!emptyContent && (
            <section className={styles.builder}>
              {ingredients.length > 0 && (
                <BurgerIngredients ingredients={ingredients} />
              )}
              <BurgerConstructor />
            </section>
          )}
        </div>
      </DndProvider>
    </main>
  );
}

export default App;
