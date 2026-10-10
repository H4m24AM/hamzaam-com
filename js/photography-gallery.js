// Native dialog provides keyboard focus containment and Escape-to-close.
(function () {
  const dialog = document.getElementById('photoLightbox');
  const image = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');
  let opener;
  document.querySelectorAll('[data-photo]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      image.src = button.dataset.photo;
      image.alt = button.dataset.caption;
      caption.textContent = button.dataset.caption;
      dialog.showModal();
      document.body.classList.add('ph-lightbox-open');
    });
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('ph-lightbox-open');
    image.removeAttribute('src');
    if (opener) opener.focus();
  });
})();
