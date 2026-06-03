/**
 * ProfileHeader — cover photo, avatar, name, role badge, and stats.
 */
import { useAuth } from '@/hooks/useAuth';
import { Avatar, Badge } from '@/components/ui';
import styles from './profile.module.css';

const ProfileHeader = () => {
  const { user } = useAuth();

  return (
    <div className={styles.header}>
      <div className={styles.cover} />
      <div className={styles.headerContent}>
        <Avatar src={user?.avatar} name={user?.name} size="xl" />
        <div className={styles.headerInfo}>
          <h2 className={styles.name}>{user?.name || 'AAdmin'}</h2>
          <Badge label={user?.role || 'Admin'} />
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>128</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>45</span>
            <span className={styles.statLabel}>Tasks</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>12</span>
            <span className={styles.statLabel}>Teams</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
