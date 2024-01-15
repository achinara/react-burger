import { useEffect, useMemo, useRef, useState, JSX, UIEvent } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../utils/types/ingredients-types';
import { selectIngredientItems } from '../../services/ingredients-slice';
import Ingredient from './ingredient/ingredient';
import Title from './title/title';
import styles from './burger-ingredients.module.css';

const types = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};

type TTabsKeys = keyof typeof types;
const tabs = Object.keys(types);

type TBoundaries = {
  min: number;
  max: number;
};

type TTabPoints = {
  bun: TBoundaries;
  sauce: TBoundaries;
  main: TBoundaries;
};

type THeadsArray = HTMLHeadingElement[];

type TScrollPoints = {
  container: HTMLDivElement;
  headers: THeadsArray;
};

function setScrollPoints({container, headers}: TScrollPoints): TTabPoints {
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
  }, {} as TTabPoints);
}

function BurgerIngredients() {
  const ingredients: TIngredient[] = useSelector(selectIngredientItems)
  const [currentTab, setCurrentTab] = useState<string>(tabs[0]);
  const tabPoints = useRef<TTabPoints | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<THeadsArray>([]);

  const content = useMemo(() => {
    let lastType: null | string = null;
    const rows: JSX.Element[] = [];
    const sortedByType: TIngredient[] = tabs.reduce((l, tab) =>
      [...l, ...ingredients.filter((item) => item.type === tab)],
    [] as TIngredient[]);

    sortedByType.forEach((item) => {
      const { _id, type } = item;
      if (type !== lastType) {
        rows.push(
          <Title
            key={type}
            name={types[type as TTabsKeys]}
            ref={(el) => el && (headingRefs.current as THeadsArray).push(el)}
          />
        );
      }
      rows.push(<Ingredient key={_id} item={item} />);
      lastType = type;
    });

    return rows;
  }, [ingredients]);

  useEffect(() => {
    if (scrollRef.current && headingRefs.current.length) {
      tabPoints.current = setScrollPoints({
        container: scrollRef.current,
        headers: headingRefs.current,
      });
    }
  }, [content]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
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
    </div>
  )
}

export default BurgerIngredients;
