/**
 * Textarea — labeled multi-line input with error support.
 */
import styles from './Textarea.module.css';

const Textarea = ({ label, error, rows = 3, className = '', ...rest }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        rows={rows}
        className={`${styles.textarea} ${error ? styles.hasError : ''} ${className}`}
        {...rest}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Textarea;
