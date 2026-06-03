/**
 * Pagination — page navigation controls.
 */
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import styles from './Pagination.module.css';

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.btn}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <RiArrowLeftSLine />
        Prev
      </button>
      <span className={styles.info}>
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        className={styles.btn}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
        <RiArrowRightSLine />
      </button>
    </div>
  );
};

export default Pagination;
