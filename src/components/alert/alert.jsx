import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './alert.module.css';

function Alert({ error, onClose }) {
  if (!error) return null;
  return  (
    <p className={`${styles.root} mt-1 mb-6`}>
      {error} {''}
      <button type="button" className={`${styles.close} ml-6`} onClick={onClose}>
        <CloseIcon type="secondary" />
      </button>
    </p>
  )
}

Alert.propTypes = {
  error: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}

export default Alert;
