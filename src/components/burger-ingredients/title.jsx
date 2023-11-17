import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';


const Title = ({ name }) => (
  <h2 className={`${styles.title} mt-2 mb-6`}>{name}</h2>
);

export default Title;

Title.propTypes = {
  name: PropTypes.string.isRequired,
}
