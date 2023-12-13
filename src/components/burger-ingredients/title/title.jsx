import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../burger-ingredients.module.css';


const Title = forwardRef(function Title({name}, ref) {
  return <h2 className={`${styles.title} pt-2 pb-6`} ref={ref}>{name}</h2>
});

export default Title;

Title.propTypes = {
  name: PropTypes.string.isRequired
}
