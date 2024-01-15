import { ReactNode } from 'react';
import styles from './auth-container.module.css';

type TAuthContainerProps = {
  title?: string;
  children: ReactNode;
};

function AuthContainer({ title, children }: TAuthContainerProps) {
  return  (
    <div className={`${styles.root} mt-0 mb-4`}>
      {title && <h2 className={`${styles.title} mb-6`}>{title}</h2>}
      {children}
    </div>
  )
}

export default AuthContainer;
