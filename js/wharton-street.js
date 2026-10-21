(() => {
  const photos = [...document.querySelectorAll('[data-photo]')];
  const dialog = document.querySelector('.wharton-lightbox');
  const image = document.getElementById('wharton-image');
  const caption = document.getElementById('wharton-caption');
  const count = document.getElementById('wharton-count');
  let current = 0;
  let activePhotos = photos;
  let activeRoom = '';
  let opener;
  function show(index) {
    current = (index + activePhotos.length) % activePhotos.length;
    image.src = activePhotos[current].dataset.photo;
    image.alt = activePhotos[current].querySelector('img').alt;
    caption.textContent = activePhotos[current].dataset.caption;
    count.textContent = `${activeRoom ? activeRoom + ' · ' : ''}${current + 1} / ${activePhotos.length}`;
  }
  photos.forEach((photo, index) => photo.addEventListener('click', () => {
    opener = photo;
    activePhotos = photos;
    activeRoom = '';
    show(index);
    dialog.showModal();
  }));
  document.querySelectorAll('[data-floor-room]').forEach(room => {
    function openRoom(event) {
      const matching = room.dataset.photoIndices.split(',').map(Number).map(index => photos[index]).filter(Boolean);
      if (!matching.length) return;
      event.preventDefault();
      opener = room;
      activePhotos = matching;
      activeRoom = room.dataset.floorRoom;
      show(0);
      dialog.showModal();
    }
    room.addEventListener('click', openRoom);
    room.addEventListener('keydown', event => {
      if (event.key === ' ') {
        event.preventDefault();
        openRoom(event);
      }
    });
  });
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
