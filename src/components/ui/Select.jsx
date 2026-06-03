/**
 * Select — labeled dropdown with error support.
 */
import styles from './Select.module.css';

const Select = ({ label, error, options = [], placeholder = 'Select...', className = '', ...rest }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={`${styles.select} ${error ? styles.hasError : ''} ${className}`}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Select;
