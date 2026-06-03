import { APP_BRAND } from '@/utils/settingsConstants';
import styles from './BrandLogo.module.css';

const BrandLogo = ({ centered = false, compact = false }) => {
  return (
    <div
      className={`${styles.brand} ${centered ? styles.centered : ''} ${compact ? styles.compact : ''}`}
    >
      <div className={styles.logoCircle}>{APP_BRAND.logoLetter}</div>
      {!compact && <span className={styles.brandName}>{APP_BRAND.name}</span>}
    </div>
  );
};

export default BrandLogo;
