import React from 'react';
import styles from './spinner.module.css';

type TSpinnerProps = {
  size: number;
};

const Spinner = ({ size = 16 }: TSpinnerProps) => {
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

export default Spinner;
