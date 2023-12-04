import React from 'react';
import PropTypes from 'prop-types';
import styles from './spinner.module.css';

const Spinner = ({ size = 16 }) => {
  return (
    <svg
      className={styles.root}
      viewBox="0 0 100 100"
      width={size}
      height={size}
    >
      <circle className={styles.circle} cx="50%" cy="50%" r="45" />
    </svg>
  );
}

Spinner.propTypes = {
  size: PropTypes.number,
};

export default Spinner;
