/**
 * GlobalSettingsPage — theme, typography, and accent color (saved to API).
 */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  RiPaletteLine,
  RiFontSize2,
  RiPaintBrushLine,
  RiRefreshLine,
} from 'react-icons/ri';
import { PageWrapper } from '@/components/layout';
import { Button } from '@/components/ui';
import {
  selectSettings,
  setTheme,
  setFontPreset,
  setFontSize,
  setAccentColor,
  resetSettings,
  updateSettings,
  applySettings,
} from '@/store/settingsSlice';
import { saveGlobalSettings } from './settingsService';
import {
  THEME_OPTIONS,
  FONT_PRESETS,
  FONT_SIZE_OPTIONS,
  ACCENT_COLORS,
  DEFAULT_SETTINGS,
} from '@/utils/settingsConstants';
import styles from './settings.module.css';

const GlobalSettingsPage = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const [saving, setSaving] = useState(false);

  const persist = async (partial) => {
    const next = {
      theme: settings.theme,
      fontPreset: settings.fontPreset,
      fontSize: settings.fontSize,
      accentColor: settings.accentColor,
      ...partial,
    };
    setSaving(true);
    try {
      const saved = await saveGlobalSettings(next);
      dispatch(updateSettings(saved));
      dispatch(applySettings());
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleTheme = (themeId) => {
    dispatch(setTheme(themeId));
    dispatch(applySettings());
    persist({ theme: themeId });
  };

  const handleFontPreset = (presetId) => {
    dispatch(setFontPreset(presetId));
    dispatch(applySettings());
    persist({ fontPreset: presetId });
  };

  const handleFontSize = (sizeId) => {
    dispatch(setFontSize(sizeId));
    dispatch(applySettings());
    persist({ fontSize: sizeId });
  };

  const handleAccent = (colorId) => {
    dispatch(setAccentColor(colorId));
    dispatch(applySettings());
    persist({ accentColor: colorId });
  };

  const handleReset = async () => {
    setSaving(true);
    try {
      const saved = await saveGlobalSettings({ ...DEFAULT_SETTINGS });
      dispatch(resetSettings());
      dispatch(updateSettings(saved));
      dispatch(applySettings());
      toast.success('Settings reset to defaults');
    } catch {
      toast.error('Failed to reset settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageWrapper
      title="Global Settings"
      breadcrumb="Home / Global Settings"
      actions={
        <Button
          variant="ghost"
          icon={<RiRefreshLine />}
          onClick={handleReset}
          loading={saving}
        >
          Reset defaults
        </Button>
      }
    >
      <div className={styles.grid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <RiPaletteLine className={styles.cardIcon} />
            <div>
              <h2 className={styles.cardTitle}>Theme</h2>
              <p className={styles.cardDesc}>Choose the overall color mode for AAdmin</p>
            </div>
          </div>
          <div className={styles.themeOptions}>
            {THEME_OPTIONS.map((theme) => (
              <button
                key={theme.id}
                type="button"
                disabled={saving}
                className={`${styles.themeCard} ${settings.theme === theme.id ? styles.selected : ''}`}
                onClick={() => handleTheme(theme.id)}
              >
                <div className={`${styles.themePreview} ${styles[`preview_${theme.id}`]}`} />
                <span className={styles.optionLabel}>{theme.label}</span>
                <span className={styles.optionDesc}>{theme.description}</span>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <RiFontSize2 className={styles.cardIcon} />
            <div>
              <h2 className={styles.cardTitle}>Font style & size</h2>
              <p className={styles.cardDesc}>Adjust typography across AAdmin</p>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <span className={styles.fieldLabel}>Font family</span>
            <div className={styles.fontGrid}>
              {FONT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  disabled={saving}
                  className={`${styles.fontOption} ${settings.fontPreset === preset.id ? styles.selected : ''}`}
                  style={{ fontFamily: preset.body }}
                  onClick={() => handleFontPreset(preset.id)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <span className={styles.fieldLabel}>Font size</span>
            <div className={styles.sizeRow}>
              {FONT_SIZE_OPTIONS.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  disabled={saving}
                  className={`${styles.sizeOption} ${settings.fontSize === size.id ? styles.selected : ''}`}
                  onClick={() => handleFontSize(size.id)}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <RiPaintBrushLine className={styles.cardIcon} />
            <div>
              <h2 className={styles.cardTitle}>Accent color</h2>
              <p className={styles.cardDesc}>Primary highlight used on buttons, links, and active nav</p>
            </div>
          </div>
          <div className={styles.colorRow}>
            {ACCENT_COLORS.map((color) => (
              <button
                key={color.id}
                type="button"
                disabled={saving}
                className={`${styles.colorSwatch} ${settings.accentColor === color.id ? styles.selected : ''}`}
                style={{ background: color.value }}
                onClick={() => handleAccent(color.id)}
                aria-label={color.label}
                title={color.label}
              />
            ))}
          </div>
        </section>

        <section className={`${styles.card} ${styles.previewCard}`}>
          <h2 className={styles.cardTitle}>Live preview</h2>
          <p className={styles.previewText}>
            This is how body text will appear with your current font and size settings.
          </p>
          <h3 className={styles.previewHeading}>Sample heading</h3>
          <button type="button" className={styles.previewBtn}>
            Accent button
          </button>
        </section>
      </div>
    </PageWrapper>
  );
};

export default GlobalSettingsPage;
