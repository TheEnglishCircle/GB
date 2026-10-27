(() => {
  'use strict';
  const frame = document.getElementById('lesson-video');
  const local = document.getElementById('video-local');
  if (!frame || !local) return;
  // Local file previews have no HTTP page origin for YouTube to identify.
  // Keep the direct watch link available there; embed on HTTP(S) only.
  if (location.protocol === 'https:' || location.protocol === 'http:') {
    frame.src = frame.dataset.src;
    frame.hidden = false;
    local.hidden = true;
  }
})();
