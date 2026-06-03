/**
 * Spinner — loading indicator used inside buttons and tables.
 */
import styles from './Spinner.module.css';

const Spinner = ({ size = 'md' }) => {
  return <span className={`${styles.spinner} ${styles[size]}`} />;
};

export default Spinner;
