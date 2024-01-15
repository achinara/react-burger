import { ReactNode } from 'react';
import styles from './page-title.module.css';

type TPageTitleProps = {
  children: ReactNode;
};

function PageTitle({ children }: TPageTitleProps) {
  return (
    <h1 className={`${styles.root} mt-10 mb-5`}>
      {children}
    </h1>
  )
}

export default PageTitle;
