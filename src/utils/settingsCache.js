import { DEFAULT_SETTINGS } from '@/utils/settingsConstants';

export const SETTINGS_STORAGE_KEY = 'aadmin_settings';

export const loadCachedSettings = () => {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return null;
  }
};

export const persistSettingsCache = (settings) => {
  try {
    const payload = {
      theme: settings.theme,
      fontPreset: settings.fontPreset,
      fontSize: settings.fontSize,
      accentColor: settings.accentColor,
    };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota / private mode */
  }
};
