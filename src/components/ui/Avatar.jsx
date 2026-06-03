/**
 * Avatar — circular image with initials fallback.
 */
import styles from './Avatar.module.css';

const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const Avatar = ({ src, name = '', size = 'md' }) => {
  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      {src ? (
        <img src={src} alt={name} className={styles.image} />
      ) : (
        <span className={styles.initials}>{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;
