import {
  ACCENT_COLORS,
  FONT_PRESETS,
  FONT_SIZE_OPTIONS,
} from '@/utils/settingsConstants';
import { persistSettingsCache } from '@/utils/settingsCache';

export const applySettingsToDocument = (settings) => {
  const root = document.documentElement;

  root.setAttribute('data-theme', settings.theme);

  const fontPreset = FONT_PRESETS.find((f) => f.id === settings.fontPreset) || FONT_PRESETS[0];
  root.style.setProperty('--font-heading', fontPreset.heading);
  root.style.setProperty('--font-body', fontPreset.body);

  const fontSize =
    FONT_SIZE_OPTIONS.find((f) => f.id === settings.fontSize) || FONT_SIZE_OPTIONS[1];
  root.style.setProperty('--font-size-base', fontSize.value);

  const accent =
    ACCENT_COLORS.find((c) => c.id === settings.accentColor) || ACCENT_COLORS[0];
  root.style.setProperty('--accent-purple', accent.value);
  root.style.setProperty('--accent-gradient-end', accent.gradientEnd);

  persistSettingsCache(settings);
};
