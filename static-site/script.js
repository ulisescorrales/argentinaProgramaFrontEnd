(() => {
  const control = document.getElementById('theme');
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let saved;
  try { saved = localStorage.getItem('portfolio-theme'); } catch (_) {}
  function apply(dark) {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    control.checked = dark;
  }
  apply(saved ? saved === 'dark' : preference.matches);
  control.addEventListener('change', () => {
    saved = control.checked ? 'dark' : 'light';
    apply(control.checked);
    try { localStorage.setItem('portfolio-theme', saved); } catch (_) {}
  });
  preference.addEventListener('change', event => { if (!saved) apply(event.matches); });
  // A failed remote banner must not leave a broken-image box over the profile.
  const banner = document.querySelector('.banner');
  function hideBrokenBanner() { if (!banner.naturalWidth) banner.hidden = true; }
  banner.addEventListener('error', hideBrokenBanner);
  if (banner.complete) hideBrokenBanner();
})();
