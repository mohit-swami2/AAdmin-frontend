/**
 * GlobalSearch — search users, products, and pages from the topbar.
 */
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiSearchLine,
  RiUserLine,
  RiShoppingBag3Line,
  RiDashboardLine,
  RiArrowRightSLine,
} from 'react-icons/ri';
import { useDebounce } from '@/hooks/useDebounce';
import { globalSearch } from '@/services/globalSearchService';
import { filterPages } from '@/utils/globalSearchPages';
import { ROUTES } from '@/utils/constants';
import styles from './GlobalSearch.module.css';

const MIN_CHARS = 2;

const getShortcutLabel = () => {
  if (typeof navigator === 'undefined') return 'Ctrl+K';
  const ua = navigator.userAgent;
  if (/Mac/i.test(navigator.platform) || /Macintosh/i.test(ua)) return '⌘K';
  if (/Win/i.test(ua)) return 'Win+K';
  return 'Ctrl+K';
};

const isSearchShortcut = (e) => {
  const isK = e.code === 'KeyK' || e.key?.toLowerCase() === 'k';
  if (!isK || e.altKey || e.shiftKey) return false;
  return e.metaKey || e.ctrlKey;
};

const GlobalSearch = () => {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiResults, setApiResults] = useState({ users: [], products: [] });
  const debouncedQuery = useDebounce(query, 350);
  const shortcutLabel = useMemo(() => getShortcutLabel(), []);

  const pages = useMemo(
    () => (debouncedQuery.length >= MIN_CHARS ? filterPages(debouncedQuery) : []),
    [debouncedQuery]
  );

  const closeSearch = useCallback(() => {
    setOpen(false);
    inputRef.current?.blur();
  }, []);

  const openSearch = useCallback(() => {
    setOpen(true);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }, []);

  const fetchResults = useCallback(async (q) => {
    setLoading(true);
    try {
      const data = await globalSearch(q, 5);
      setApiResults({ users: data.users ?? [], products: data.products ?? [] });
    } catch {
      setApiResults({ users: [], products: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open || debouncedQuery.length < MIN_CHARS) {
      setApiResults({ users: [], products: [] });
      setLoading(false);
      return;
    }
    fetchResults(debouncedQuery);
  }, [debouncedQuery, open, fetchResults]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (isSearchShortcut(e)) {
        e.preventDefault();
        e.stopPropagation();
        if (open) {
          closeSearch();
        } else {
          openSearch();
        }
        return;
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        closeSearch();
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [open, openSearch, closeSearch]);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (e) => {
      if (rootRef.current?.contains(e.target)) return;
      closeSearch();
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open, closeSearch]);

  const closeAndNavigate = (path, searchParam) => {
    closeSearch();
    setQuery('');
    const url = searchParam ? `${path}?search=${encodeURIComponent(searchParam)}` : path;
    navigate(url);
  };

  const hasResults =
    pages.length > 0 || apiResults.users.length > 0 || apiResults.products.length > 0;

  return (
    <div className={`${styles.root} ${open ? styles.rootOpen : ''}`} ref={rootRef}>
        <div className={`${styles.trigger} ${open ? styles.triggerFocused : ''}`}>
          <RiSearchLine className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.preventDefault();
                closeSearch();
              }
            }}
            placeholder="Search users, products, pages…"
            className={styles.searchInput}
            aria-label="Global search"
            aria-expanded={open}
            aria-autocomplete="list"
            autoComplete="off"
          />
          <span className={styles.kbd}>{shortcutLabel}</span>
        </div>

        {open && (
          <div className={styles.panel} role="listbox">
            {query.length < MIN_CHARS && (
              <p className={styles.hint}>Type at least {MIN_CHARS} characters to search</p>
            )}

            {query.length >= MIN_CHARS && loading && (
              <p className={styles.loading}>Searching…</p>
            )}

            {query.length >= MIN_CHARS && !loading && !hasResults && (
              <p className={styles.empty}>No results for &quot;{debouncedQuery}&quot;</p>
            )}

            {!loading && pages.length > 0 && (
              <section className={styles.section}>
                <p className={styles.sectionTitle}>Pages</p>
                {pages.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    className={styles.resultItem}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => closeAndNavigate(page.path)}
                  >
                    <RiDashboardLine className={styles.resultIcon} />
                    <span className={styles.resultBody}>
                      <span className={styles.resultTitle}>{page.label}</span>
                      <span className={styles.resultMeta}>Go to page</span>
                    </span>
                    <RiArrowRightSLine className={styles.resultIcon} />
                  </button>
                ))}
              </section>
            )}

            {!loading && apiResults.users.length > 0 && (
              <section className={styles.section}>
                <p className={styles.sectionTitle}>Users</p>
                {apiResults.users.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    className={styles.resultItem}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => closeAndNavigate(ROUTES.USERS, user.email || user.name)}
                  >
                    <RiUserLine className={styles.resultIcon} />
                    <span className={styles.resultBody}>
                      <span className={styles.resultTitle}>{user.name}</span>
                      <span className={styles.resultMeta}>
                        {user.email} · {user.role} · {user.status}
                      </span>
                    </span>
                  </button>
                ))}
              </section>
            )}

            {!loading && apiResults.products.length > 0 && (
              <section className={styles.section}>
                <p className={styles.sectionTitle}>Products</p>
                {apiResults.products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    className={styles.resultItem}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      closeAndNavigate(ROUTES.PRODUCTS, product.sku || product.name)
                    }
                  >
                    <RiShoppingBag3Line className={styles.resultIcon} />
                    <span className={styles.resultBody}>
                      <span className={styles.resultTitle}>{product.name}</span>
                      <span className={styles.resultMeta}>
                        {product.sku} · {product.category} · ${product.price}
                      </span>
                    </span>
                  </button>
                ))}
              </section>
            )}

            {query.length >= MIN_CHARS && !loading && hasResults && (
              <p className={styles.footer}>Esc to close · {shortcutLabel} to toggle</p>
            )}
          </div>
        )}
    </div>
  );
};

export default GlobalSearch;
