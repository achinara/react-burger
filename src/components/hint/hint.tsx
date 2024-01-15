import { Link } from 'react-router-dom';
import styles from './hint.module.css';

type THintProps = {
  text: string;
  link?: string;
  to?: string;
};

function Hint({ text, link, to }: THintProps) {
  return  (
    <p className={`${styles.root} mt-0 mb-4`}>
      {text} {link && to && <Link to={to} className={styles.link}>{link}</Link>}
    </p>
  )
}

export default Hint;
