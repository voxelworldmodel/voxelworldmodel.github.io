// Sticky glossy header: appears when the page header scrolls out of view.
(function () {
  var header = document.querySelector('header');
  if (!header) return;
  var h1 = header.querySelector('h1');
  var nav = header.querySelector('nav');

  var bar = document.createElement('div');
  bar.className = 'sticky-bar';
  var inner = document.createElement('div');
  inner.className = 'sticky-bar-inner';

  var title = document.createElement('a');
  title.className = 'sticky-title';
  var isHome = /(^|\/)(index\.html)?$/.test(location.pathname);
  title.href = isHome ? '#' : 'index.html';
  title.textContent = (h1 && (h1.getAttribute('aria-label') || h1.textContent.trim())) || 'Voxel World Model';
  if (isHome) {
    title.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  inner.appendChild(title);

  if (nav) inner.appendChild(nav.cloneNode(true));
  bar.appendChild(inner);
  document.body.appendChild(bar);

  var visible = false;
  function onScroll() {
    var show = header.getBoundingClientRect().bottom <= 0;
    if (show !== visible) {
      visible = show;
      bar.classList.toggle('visible', show);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
