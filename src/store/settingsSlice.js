import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_SETTINGS } from '@/utils/settingsConstants';
import { applySettingsToDocument } from '@/utils/applySettings';
import { loadCachedSettings } from '@/utils/settingsCache';

const cached = loadCachedSettings();
const initialState = cached
  ? { ...cached, isHydrated: true }
  : { ...DEFAULT_SETTINGS, isHydrated: false };

if (cached) {
  applySettingsToDocument(cached);
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setFontPreset: (state, action) => {
      state.fontPreset = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
    },
    updateSettings: (state, action) => {
      Object.assign(state, action.payload);
      state.isHydrated = true;
    },
    resetSettings: () => ({ ...DEFAULT_SETTINGS, isHydrated: true }),
    applySettings: (state) => {
      applySettingsToDocument(state);
    },
  },
});

export const {
  setTheme,
  setFontPreset,
  setFontSize,
  setAccentColor,
  updateSettings,
  resetSettings,
  applySettings,
} = settingsSlice.actions;

export const selectSettings = (state) => state.settings;

export default settingsSlice.reducer;
