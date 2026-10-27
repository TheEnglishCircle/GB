(() => {
  'use strict';
  const course = document.getElementById('foundations-course');
  if (!course) return;
  function openFromLink() {
    if (location.hash === '#foundations-course') course.open = true;
  }
  window.addEventListener('hashchange', openFromLink);
  openFromLink();
})();
