/**
 * AdminLayout — composes Sidebar, Topbar, and routed page content.
 */
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { SidebarProvider, useSidebar } from './SidebarContext';
import styles from './AdminLayout.module.css';

const LayoutInner = () => {
  const { collapsed } = useSidebar();

  return (
    <div className={`${styles.layout} ${collapsed ? styles.collapsed : ''}`}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AdminLayout = () => (
  <SidebarProvider>
    <LayoutInner />
  </SidebarProvider>
);

export default AdminLayout;
