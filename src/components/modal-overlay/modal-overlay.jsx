import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({ onClose }) {
  return (
    <div className={styles.root} onClick={onClose} />
  )
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
}
