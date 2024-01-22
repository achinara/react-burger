import { NavLink, Outlet, useLocation, Location, useParams } from 'react-router-dom';
import { useDispatch } from '../../hooks';
import { logout as userLogout } from '../../services/slices/user-slice';
import styles from './profile.module.css';

const PATH_PROFILE = '/profile';
const PATH_ORDER = '/profile/orders';

const getItemClassName = (location: Location, path: string): string => {
  return `${location.pathname === path ? styles.active : ''} ${styles.link}`
}

function Profile() {
  const location: Location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  if (params?.orderId) {
    return <Outlet />;
  }

  return (
    <div className={styles.root}>
      <div className={`${styles.left} mr-5`}>
        <ul className={styles.menu}>
          <li>
            <NavLink
              to={PATH_PROFILE}
              className={getItemClassName(location, PATH_PROFILE)}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to={PATH_ORDER}
              className={getItemClassName(location, PATH_ORDER)}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <button className={styles.link} onClick={handleLogout} type="button">
              Выход
            </button>
          </li>
        </ul>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
