/**
 * Badge — pill-shaped label for roles, statuses, and categories.
 */
import styles from './Badge.module.css';

const VARIANT_MAP = {
  Admin: 'purple',
  Editor: 'blue',
  User: 'orange',
  Active: 'green',
  Inactive: 'gray',
  Pending: 'orange',
  Draft: 'gray',
  'Out of Stock': 'red',
  Electronics: 'blue',
  Clothing: 'purple',
  Food: 'orange',
  Books: 'green',
  Sports: 'orange',
  Other: 'gray',
};

const Badge = ({ label, variant }) => {
  const resolvedVariant = variant || VARIANT_MAP[label] || 'gray';
  return (
    <span className={`${styles.badge} ${styles[resolvedVariant]}`}>{label}</span>
  );
};

export default Badge;
