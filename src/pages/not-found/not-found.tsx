import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

function NotFound() {
  return (
    <div className={`${styles.root} pt-20`}>
      Упссс..такой страницы нет 🫣
      <p>
        перейти на <Link to={'/'} className={styles.link} replace>главную страницу</Link>
      </p>
      <span>[Ошибка 404]</span>
    </div>
  );
}

export default NotFound;
