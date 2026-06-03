/**
 * ProfileAboutTab — read-only profile information display.
 */
import { useAuth } from '@/hooks/useAuth';
import styles from './profile.module.css';

const ProfileAboutTab = () => {
  const { user } = useAuth();

  const fields = [
    { label: 'First Name', value: user?.firstName || user?.name || 'AAdmin' },
    { label: 'Last Name', value: user?.lastName || '' },
    { label: 'Email', value: user?.email },
    { label: 'Phone', value: user?.phone || '—' },
    { label: 'Location', value: user?.location || '—' },
    { label: 'Website', value: user?.website || '—' },
    { label: 'Bio', value: user?.bio || '—' },
  ];

  return (
    <div className={styles.aboutGrid}>
      {fields.map(({ label, value }) => (
        <div key={label} className={styles.aboutItem}>
          <span className={styles.aboutLabel}>{label}</span>
          <span className={styles.aboutValue}>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default ProfileAboutTab;
