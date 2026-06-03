export const APP_BRAND = {
  name: 'AAdmin',
  logoLetter: 'A',
};

export const DEFAULT_SETTINGS = {
  theme: 'dark',
  fontPreset: 'inter',
  fontSize: 'medium',
  accentColor: 'portal',
};

export const THEME_OPTIONS = [
  { id: 'dark', label: 'Portal Dark', description: 'Slate blue AAdmin theme' },
  { id: 'light', label: 'Light', description: 'Bright, clean interface' },
];

export const FONT_SIZE_OPTIONS = [
  { id: 'small', label: 'Small', value: '13px' },
  { id: 'medium', label: 'Medium', value: '14px' },
  { id: 'large', label: 'Large', value: '16px' },
];

export const FONT_PRESETS = [
  {
    id: 'inter',
    label: 'Inter',
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  {
    id: 'default',
    label: 'Montserrat & Source Sans',
    heading: "'Montserrat', sans-serif",
    body: "'Source Sans 3', 'Source Sans Pro', sans-serif",
  },
  {
    id: 'poppins',
    label: 'Poppins & Open Sans',
    heading: "'Poppins', sans-serif",
    body: "'Open Sans', sans-serif",
  },
  {
    id: 'roboto',
    label: 'Roboto',
    heading: "'Roboto', sans-serif",
    body: "'Roboto', sans-serif",
  },
];

export const ACCENT_COLORS = [
  { id: 'portal', label: 'Portal Slate', value: '#3498db', gradientEnd: '#5dade2' },
  { id: 'slate', label: 'Deep Slate', value: '#2c3e50', gradientEnd: '#34495e' },
  { id: 'blue', label: 'Sky Blue', value: '#00cfe8', gradientEnd: '#5ce1f5' },
  { id: 'green', label: 'Green', value: '#2ecc71', gradientEnd: '#58d68d' },
  { id: 'orange', label: 'Orange', value: '#f39c12', gradientEnd: '#f5b041' },
  { id: 'red', label: 'Red', value: '#e74c3c', gradientEnd: '#ec7063' },
];
