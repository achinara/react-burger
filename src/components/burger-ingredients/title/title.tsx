import { forwardRef } from 'react';
import styles from '../burger-ingredients.module.css';

type TitleProps = {
  name: string;
};

const Title = forwardRef<HTMLHeadingElement, TitleProps>(function Title({name}, ref) {
  return <h2 className={`${styles.title} pt-2 pb-6`} ref={ref}>{name}</h2>
});

export default Title;
