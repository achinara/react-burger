import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import Ingredient from './ingredient/ingredient';
import Title from './title/title';
import { ingredientsPropTypes } from '../../utils/prop-types/prop-types';
import { removeCurrentIngredient, selectCurrentIngredient } from '../../services/current-ingredient-slice';
import styles from './burger-ingredients.module.css';

const types = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};

const tabs = Object.keys(types);

function setScrollPoints({container, headers}) {
  if (!(container && headers.length)) return null;
  const containerRect = container.getBoundingClientRect();
  const containerScrollBottom = containerRect.top + container.scrollHeight;
  
  return tabs.reduce((acc, attr, index) => {
    const current = headers[index];
    const next = headers[index + 1];
    const headerRect = current.getBoundingClientRect();
    const bottomLimit = next?.getBoundingClientRect().top || containerScrollBottom;
    const min = headerRect.top - containerRect.top;
    const max = bottomLimit - containerRect.top;
    return {...acc, [attr]: {min, max}};
  }, {});
}

function BurgerIngredients({ ingredients }) {
  const dispatch = useDispatch();
  const currentIngredient = useSelector(selectCurrentIngredient);
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const tabPoints = useRef(null);
  const scrollRef = useRef(null);
  const headingRefs = useRef([]);
  
  useEffect(() => {
    tabPoints.current = setScrollPoints({
      container: scrollRef.current,
      headers: headingRefs.current,
    });
  }, []);

  const content = useMemo(() => {
    let lastType = null;
    const rows = [];
    const sortedByType = tabs.reduce((l, tab) =>
      [...l, ...ingredients.filter((item) => item.type === tab)],
    []);

    sortedByType.forEach((item) => {
      const { _id, type } = item;
      if (type !== lastType) {
        rows.push(<Title key={type} name={types[type]} ref={(el) => headingRefs.current.push(el)} />);
      }
      rows.push(<Ingredient key={_id} item={item} />);
      lastType = type;
    });

    return rows;
  }, [ingredients]);
  
  const resetCurrentIngredient = () => dispatch(removeCurrentIngredient());

  const handleScroll = (e) => {
    if (!tabPoints.current) return;
    const scrollTop = e.currentTarget.scrollTop;
    const { bun, sauce, main } = tabPoints.current;

    if (scrollTop >= bun.min && scrollTop <= bun.max) {
      setCurrentTab(tabs[0]);
    }
    if (scrollTop >= sauce.min && scrollTop <= sauce.max) {
      setCurrentTab(tabs[1]);
    }
    if (scrollTop >= main.min && scrollTop <= main.max) {
      setCurrentTab(tabs[2]);
    }
  };

  return (
    <div className={`${styles.root} mr-5`}>
      <div className={`${styles.tabs} pb-8`}>
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
        <div ref={scrollRef} className={`${styles.inner} custom-scroll`} onScroll={handleScroll}>
          {content}
        </div>
      </div>
      {currentIngredient && (
        <Modal title="Детали ингредиента" onClose={resetCurrentIngredient}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  )
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  ingredients: ingredientsPropTypes,
}
