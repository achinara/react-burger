import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

function AppHeader() {
  return(
    <header>
      <div className={styles.content}>
        <nav>
          <ul className={`${styles.menu} mt-4 mb-4`}>
            <li>
              <a className={`${styles.active} pl-5 pr-5`} href="/">
                <BurgerIcon type="secondary" />
                <span className="ml-2">Конструктор</span>
              </a>
            </li>
            <li>
              <a className={`${styles.link} pl-5 pr-5 ml-2`} href="/">
                <ListIcon type="secondary" />
                <span className="ml-2">Лента заказов</span>
              </a>
            </li>
          </ul>
        </nav>
        <Logo />
        <a className={`${styles.link} pl-5 pr-5`} href="/">
          <ProfileIcon type="secondary" />
          <span className="ml-2">Личный кабинет</span>
        </a>
      </div>
    </header>
  )
}

export default AppHeader;
