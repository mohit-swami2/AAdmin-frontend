/**
 * Topbar — global search, notifications, and user menu.
 */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiNotification3Line, RiLogoutBoxRLine, RiUserLine } from 'react-icons/ri';
import { useAuth } from '@/hooks/useAuth';
import { Avatar } from '@/components/ui';
import { GlobalSearch } from '@/components/search';
import { ROUTES } from '@/utils/constants';
import styles from './Topbar.module.css';

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const goToProfile = () => {
    setMenuOpen(false);
    navigate(ROUTES.PROFILE);
  };

  return (
    <header className={styles.topbar}>
      <GlobalSearch />
      <div className={styles.actions}>
        <button type="button" className={styles.iconBtn} aria-label="Notifications">
          <RiNotification3Line />
          <span className={styles.badge}>3</span>
        </button>
        <div className={styles.userMenu} ref={menuRef}>
          <button
            type="button"
            className={styles.userBtn}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Avatar src={user?.avatar} name={user?.name} size="sm" />
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name || 'AAdmin'}</span>
              <span className={styles.userRole}>{user?.role || 'Admin'}</span>
            </div>
          </button>
          {menuOpen && (
            <div className={styles.dropdown}>
              <button type="button" className={styles.dropdownItem} onClick={goToProfile}>
                <RiUserLine />
                Profile
              </button>
              <button
                type="button"
                className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                onClick={logout}
              >
                <RiLogoutBoxRLine />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
