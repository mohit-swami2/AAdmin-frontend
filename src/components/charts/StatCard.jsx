/**
 * StatCard — dashboard statistics card with icon and trend.
 */
import styles from './StatCard.module.css';

const StatCard = ({ title, value, icon: Icon, color = 'purple', trend }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{value}</p>
        {trend && <p className={styles.trend}>{trend}</p>}
      </div>
      <div className={`${styles.iconWrap} ${styles[color]}`}>
        <Icon />
      </div>
    </div>
  );
};

export default StatCard;
