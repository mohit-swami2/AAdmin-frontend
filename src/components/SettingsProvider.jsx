import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings, applySettings } from '@/store/settingsSlice';
import { getGlobalSettings } from '@/modules/settings/settingsService';
import { DEFAULT_SETTINGS } from '@/utils/settingsConstants';
import { loadCachedSettings } from '@/utils/settingsCache';

const SettingsProvider = ({ children }) => {
  const dispatch = useDispatch();
  const hadCacheOnMount = useSelector((state) => state.settings.isHydrated);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const remote = await getGlobalSettings();
        if (!mounted) return;
        if (remote) {
          dispatch(updateSettings({ ...DEFAULT_SETTINGS, ...remote }));
          dispatch(applySettings());
        } else if (!hadCacheOnMount) {
          const fallback = loadCachedSettings() || DEFAULT_SETTINGS;
          dispatch(updateSettings({ ...fallback, isHydrated: true }));
          dispatch(applySettings());
        }
      } catch {
        if (!mounted || hadCacheOnMount) return;
        const fallback = loadCachedSettings() || DEFAULT_SETTINGS;
        dispatch(updateSettings({ ...fallback, isHydrated: true }));
        dispatch(applySettings());
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch, hadCacheOnMount]);

  return children;
};

export default SettingsProvider;
