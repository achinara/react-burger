import styles from './empty-item.module.css';

const texts = ['Выберите булку!', 'Выберите начинки и соусы!'];

type TEmptyItemProps = {
  type?: string;
};

function EmptyItem({ type }: TEmptyItemProps) {
  return (
    <div className={styles.root}>
      {!type ? texts[1] : texts[0] }
    </div>
  )
}

export default EmptyItem;
