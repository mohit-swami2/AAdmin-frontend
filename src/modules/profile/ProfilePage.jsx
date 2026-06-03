/**
 * ProfilePage — admin profile with About and Edit tabs.
 */
import { useState } from 'react';
import { PageWrapper } from '@/components/layout';
import ProfileHeader from './ProfileHeader';
import ProfileAboutTab from './ProfileAboutTab';
import ProfileEditTab from './ProfileEditTab';
import styles from './profile.module.css';

const TABS = ['About', 'Edit Profile'];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('About');

  return (
    <PageWrapper title="My Profile" breadcrumb="Home / Profile">
      <ProfileHeader />
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {activeTab === 'About' && <ProfileAboutTab />}
        {activeTab === 'Edit Profile' && <ProfileEditTab />}
      </div>
    </PageWrapper>
  );
};

export default ProfilePage;
