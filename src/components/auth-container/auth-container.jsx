import PropTypes from 'prop-types';
import styles from './auth-container.module.css';

function AuthContainer({ title, children }) {
  return  (
    <div className={`${styles.root} mt-0 mb-4`}>
      {title && <h2 className={`${styles.title} mb-6`}>{title}</h2>}
      {children}
    </div>
  )
}

AuthContainer.propTypes = {
  title: PropTypes.string.isRequired,
}

export default AuthContainer;
