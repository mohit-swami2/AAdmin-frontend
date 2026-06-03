import { createContext, useContext, useCallback, useState, useEffect } from 'react';

const STORAGE_KEY = 'aadmin_sidebar_collapsed';

const SidebarContext = createContext(null);

export const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(collapsed));
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return ctx;
};
