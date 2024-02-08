import { ReactNode, ReactPortal, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

type TModalProps = {
  title?: string;
  onClose?: () => void;
  children: ReactNode;
};

const domNode = document.getElementById('modal') || document.body;

function Modal({ title, onClose, children }: TModalProps): ReactPortal {
  useEffect(() => {
    if (!onClose) return;
    const handleClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleClose);
    return () => document.removeEventListener('keydown', handleClose);
  }, [onClose])

  return createPortal(
    <div className={styles.root} data-test="modal" >
      <div className={styles.inner}>
        {title && <h2 className={`${styles.title} mb-4`}>{title}</h2>}
        {onClose && (
          <Button data-test="close" htmlType="button" type="secondary" extraClass={styles.close} onClick={onClose}>
            <CloseIcon type="primary" />
          </Button>
        )}
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </div>,
    domNode,
    'modal'
  )
}

export default Modal;
