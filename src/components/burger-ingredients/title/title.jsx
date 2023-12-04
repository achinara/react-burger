import PropTypes from 'prop-types';
import styles from '../burger-ingredients.module.css';


const Title = ({ name, type }) => (
  <h2 className={`${styles.title} pt-2 pb-6`} data-type={type}>{name}</h2>
);

export default Title;

Title.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}
