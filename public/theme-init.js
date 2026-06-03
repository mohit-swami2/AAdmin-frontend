/**
 * Runs before the app bundle so theme/fonts match the last saved settings (no flash).
 */
(function () {
  var KEY = 'aadmin_settings';
  var defaults = {
    theme: 'dark',
    fontPreset: 'inter',
    fontSize: 'medium',
    accentColor: 'portal',
  };
  var fonts = {
    inter: ["'Inter', sans-serif", "'Inter', sans-serif"],
    default: ["'Montserrat', sans-serif", "'Source Sans 3', 'Source Sans Pro', sans-serif"],
    poppins: ["'Poppins', sans-serif", "'Open Sans', sans-serif"],
    roboto: ["'Roboto', sans-serif", "'Roboto', sans-serif"],
  };
  var sizes = { small: '13px', medium: '14px', large: '16px' };
  var accents = {
    portal: ['#3498db', '#5dade2'],
    slate: ['#2c3e50', '#34495e'],
    blue: ['#00cfe8', '#5ce1f5'],
    green: ['#2ecc71', '#58d68d'],
    orange: ['#f39c12', '#f5b041'],
    red: ['#e74c3c', '#ec7063'],
  };

  try {
    var stored = localStorage.getItem(KEY);
    var s = stored ? Object.assign({}, defaults, JSON.parse(stored)) : null;
    if (!s) return;

    var root = document.documentElement;
    root.setAttribute('data-theme', s.theme);

    var font = fonts[s.fontPreset] || fonts.inter;
    root.style.setProperty('--font-heading', font[0]);
    root.style.setProperty('--font-body', font[1]);
    root.style.setProperty('--font-size-base', sizes[s.fontSize] || sizes.medium);

    var accent = accents[s.accentColor] || accents.portal;
    root.style.setProperty('--accent-purple', accent[0]);
    root.style.setProperty('--accent-gradient-end', accent[1]);
  } catch (e) {
    /* ignore */
  }
})();
