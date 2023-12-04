import PropTypes from 'prop-types';
import styles from './empty-item.module.css';

const texts = ['Выберите булку!', 'Выберите начинки и соусы!'];

function EmptyItem({ type }) {
  return (
    <div className={styles.root}>
      {!type ? texts[1] : texts[0] }
    </div>
  )
}

export default EmptyItem;

EmptyItem.propTypes = {
  type: PropTypes.string,
}
