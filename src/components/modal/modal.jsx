import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const domNode = document.getElementById('modal') || document.body;

function Modal({ title, onClose, children }) {
  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [onClose])

  return createPortal(
    <div className={styles.root}>
      <div className={styles.inner}>
        {title && <h2 className={`${styles.title} mb-4`}>{title}</h2>}
        <Button htmlType="button" type="secondary" extraClass={styles.close} onClick={onClose}>
          <CloseIcon type="primary" />
        </Button>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </div>,
    domNode,
    'modal'
  )
}

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
