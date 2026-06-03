/**
 * PageWrapper — consistent padding and page header for authenticated pages.
 */
import styles from './PageWrapper.module.css';

const PageWrapper = ({ title, breadcrumb, actions, children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          {breadcrumb && <p className={styles.breadcrumb}>{breadcrumb}</p>}
          <h1 className={styles.title}>{title}</h1>
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {children}
    </div>
  );
};

export default PageWrapper;
