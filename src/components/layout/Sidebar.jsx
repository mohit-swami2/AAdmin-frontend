/**
 * Sidebar — main navigation with collapse toggle.
 */
import { NavLink } from 'react-router-dom';
import {
  RiDashboardLine,
  RiUserLine,
  RiShoppingBag3Line,
  RiSettings3Line,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from 'react-icons/ri';
import { ROUTES } from '@/utils/constants';
import BrandLogo from './BrandLogo';
import { useSidebar } from './SidebarContext';
import styles from './Sidebar.module.css';

const MAIN_NAV = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: RiDashboardLine },
  { to: ROUTES.USERS, label: 'Users', icon: RiUserLine },
  { to: ROUTES.PRODUCTS, label: 'Products', icon: RiShoppingBag3Line },
];

const SETTINGS_NAV = [
  { to: ROUTES.SETTINGS, label: 'Global Settings', icon: RiSettings3Line },
];

const Sidebar = () => {
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={`${styles.brandRow} ${collapsed ? styles.brandRowCollapsed : ''}`}>
        {!collapsed && (
          <div className={styles.brand}>
            <BrandLogo />
          </div>
        )}
        <button
          type="button"
          className={styles.collapseBtn}
          onClick={toggleCollapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
        </button>
      </div>
      <nav className={styles.nav}>
        {MAIN_NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === ROUTES.DASHBOARD}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon className={styles.navIcon} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}

        {!collapsed && <p className={styles.sectionLabel}>Global Settings</p>}
        {SETTINGS_NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon className={styles.navIcon} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
