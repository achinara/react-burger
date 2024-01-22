import styles from './order-round-image.module.css';

type TRoundImageProps = {
  image: string;
  text?: string;
};

function OrderRoundImage({ image, text } : TRoundImageProps) {
  return (
    <div className={styles.root}>
      <img className={styles.image} src={image} alt="" />
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
}

export default OrderRoundImage;
