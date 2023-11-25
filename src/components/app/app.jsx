import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let emptyContent = null;

  useEffect(() => {
    setLoading(true);
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Response was not "ok"');
        }
        return res.json();
      })
      .then(({ data }) => setIngredients(data))
      .catch((err) => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => setLoading(false))
  }, []);
  
  if (!ingredients.length) {
    emptyContent = 'Data is not delivered yet';
  }
  
  if (loading) {
    emptyContent = 'Loading...';
  }

  if (error) {
    emptyContent = 'Something went wrong';
  }

  return (
    <main className={styles.main}>
      <AppHeader />
      <div className={`${styles.content} pb-10`}>
        <h1 className={`${styles.title} mt-10 mb-5`}>
          {emptyContent || 'Соберите бургер'}
        </h1>
        {!emptyContent && ingredients.length > 0 && (
          <section className={styles.builder}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor list={ingredients} />
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
