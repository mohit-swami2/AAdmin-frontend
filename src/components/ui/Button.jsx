/**
 * Button — primary action control with variant, size, loading, and icon support.
 */
import Spinner from './Spinner';
import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  type = 'button',
  className = '',
  onClick,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? <Spinner size="sm" /> : icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
