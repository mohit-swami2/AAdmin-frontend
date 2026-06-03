/**
 * FilterBar — horizontal filter controls wrapper.
 */
import styles from './FilterBar.module.css';

const FilterBar = ({ children }) => {
  return <div className={styles.filterBar}>{children}</div>;
};

export default FilterBar;
