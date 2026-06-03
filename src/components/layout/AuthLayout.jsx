/**
 * AuthLayout — full-width login background with form on the white panel (right).
 */
import { Link } from 'react-router-dom';
import styles from './AuthLayout.module.css';

const AuthLayout = ({ children, footerText, footerLink, footerLinkText }) => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.formPanel}>
        <div className={styles.formInner}>
          {children}
          {footerText && (
            <p className={styles.footer}>
              {footerText}{' '}
              {footerLink && (
                <Link to={footerLink} className={styles.footerLink}>
                  {footerLinkText}
                </Link>
              )}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
