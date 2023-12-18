import PropTypes from 'prop-types';
import styles from './page-title.module.css';

function PageTitle({children}) {
  return (
    <h1 className={`${styles.root} mt-10 mb-5`}>
      {children}
    </h1>
  )
}

PageTitle.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageTitle;
