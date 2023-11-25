import { useMemo, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import Ingredient from './ingredient/ingredient';
import Title from './title/title';
import { ingredientsPropTypes } from '../../utils/prop-types/prop-types';
import styles from './burger-ingredients.module.css';

const types = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};

const tabs = Object.keys(types);

function BurgerIngredients({ ingredients }) {
  const [currentTab, setCurrentTab] = useState(tabs[0])
  const [currentIngredient, setCurrentIngredient] = useState(null)

  const content = useMemo(() => {
    let lastType = null;
    const rows = [];
    const sortedByType = tabs.reduce((l, tab) =>
      [...l, ...ingredients.filter((item) => item.type === tab)],
    []);

    sortedByType.forEach((item) => {
      const { _id, type } = item;
      if (type !== lastType) {
        rows.push(<Title key={type} name={types[type]} />);
      }
      rows.push(<Ingredient key={_id} item={item} onClick={() => setCurrentIngredient(item)} />);
      lastType = type;
    });

    return rows;
  }, [ingredients]);

  return (
    <div className={`${styles.root} mr-5`}>
      <div className={`${styles.tabs} mb-8`}>
        <Tab value={tabs[0]} active={currentTab === tabs[0]} onClick={setCurrentTab}>
          {types.bun}
        </Tab>
        <Tab value={tabs[1]} active={currentTab === tabs[1]} onClick={setCurrentTab}>
          {types.sauce}
        </Tab>
        <Tab value={tabs[2]} active={currentTab === tabs[2]} onClick={setCurrentTab}>
          {types.main}
        </Tab>
      </div>
      <div className={styles.content}>
        <div className={`${styles.inner} custom-scroll`}>
          {content}
        </div>
      </div>
      {currentIngredient && (
        <Modal title="Детали ингредиента" onClose={() => setCurrentIngredient(null)}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </div>
  )
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  ingredients: ingredientsPropTypes,
}
