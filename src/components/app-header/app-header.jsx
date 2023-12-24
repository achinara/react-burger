import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../services/user-slice';
import styles from './app-header.module.css';

function AppHeader() {
  const user = useSelector(selectUser);
  
  return (
    <header>
      <div className={styles.content}>
        <nav>
          <ul className={`${styles.menu} mt-4 mb-4`}>
            <li>
              <NavLink
                to="/"
                className={
                  ({ isActive }) => `${isActive ? styles.active : styles.link} pl-5 pr-5`
                }
              >
                <BurgerIcon type="secondary"/>
                <span className="ml-2">Конструктор</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={
                  ({ isActive }) => `${isActive ? styles.active : styles.link} pl-5 pr-5 ml-2`
                }
              >
                <ListIcon type="secondary"/>
                <span className="ml-2">Лента заказов</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link to='/'>
          <Logo/>
        </Link>
        <NavLink
          to="/profile"
          className={({ isActive }) => `${isActive ? styles.active : styles.link} pl-5 pr-5`}
        >
          <ProfileIcon type="secondary"/>
          <span className="ml-2">{user?.name ? user.name : 'Личный кабинет'}</span>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
