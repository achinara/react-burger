import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './alert.module.css';

type TAlertProps = {
  error?: string | null;
  onClose: () => void;
};

function Alert({ error, onClose }: TAlertProps) {
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

export default Alert;
