import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClose?: () => void;
};

function ModalOverlay({ onClose }: TModalOverlayProps) {
  return (
    <div className={styles.root} onClick={onClose} />
  )
}

export default ModalOverlay;
