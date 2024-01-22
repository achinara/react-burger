import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PageTitle from '../../components/page-title/page-title';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import WithIngredients from '../../utils/hocs/WithIngredients';
import styles from './home.module.css';

type THomeProps = {
  emptyContent?: ReactNode;
};

function Home({ emptyContent }: THomeProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <PageTitle>
        {emptyContent || 'Соберите бургер'}
      </PageTitle>
      {!emptyContent && (
        <section className={`${styles.builder} pb-10`}>
          <BurgerIngredients />
          <BurgerConstructor/>
        </section>
      )}
      <Outlet />
    </DndProvider>
  );
}

export default WithIngredients(Home);
