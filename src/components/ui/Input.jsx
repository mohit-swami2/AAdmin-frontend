/**
 * Input — labeled text input with optional icon prefix and error message.
 */
import styles from './Input.module.css';

const Input = ({
  label,
  icon,
  error,
  type = 'text',
  className = '',
  wrapperClassName = '',
  ...rest
}) => {
  return (
    <div className={`${styles.wrapper} ${wrapperClassName}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.inputGroup} ${error ? styles.hasError : ''}`}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input type={type} className={`${styles.input} ${className}`} {...rest} />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Input;
