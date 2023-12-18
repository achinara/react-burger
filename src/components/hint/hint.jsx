import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './hint.module.css';

function Hint({text, link, to}) {
  return  (
    <p className={`${styles.root} mt-0 mb-4`}>
      {text} {link && to && <Link to={to} className={styles.link}>{link}</Link>}
    </p>
  )
}

Hint.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  to: PropTypes.string,
}

export default Hint;
