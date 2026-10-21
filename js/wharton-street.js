(() => {
  const photos = [...document.querySelectorAll('[data-photo]')];
  const dialog = document.querySelector('.wharton-lightbox');
  const image = document.getElementById('wharton-image');
  const caption = document.getElementById('wharton-caption');
  const count = document.getElementById('wharton-count');
  let current = 0;
  let opener;
  function show(index) {
    current = (index + photos.length) % photos.length;
    image.src = photos[current].dataset.photo;
    image.alt = photos[current].querySelector('img').alt;
    caption.textContent = photos[current].dataset.caption;
    count.textContent = `${current + 1} / ${photos.length}`;
  }
  photos.forEach((photo, index) => photo.addEventListener('click', () => {
    opener = photo;
    show(index);
    dialog.showModal();
  }));
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-prev]').addEventListener('click', () => show(current - 1));
  dialog.querySelector('[data-next]').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    opener?.focus();
  });
})();
