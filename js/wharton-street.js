(() => {
  const shortUrl = 'https://hamza.am/wharton';
  const title = '27–29 Wharton Street · Newark, New Jersey';
  const status = document.getElementById('wharton-share-status');
  document.getElementById('wharton-copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      status.textContent = 'Property link copied. Ready to share by text or email.';
    } catch {
      window.prompt('Copy the property link:', shortUrl);
    }
  });
  function shareByEmail() {
    window.location.href = 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent('Explore 27–29 Wharton Street in Newark, New Jersey. View the photographs and select rooms on the interactive floor plan:\n\n' + shortUrl);
  }
  document.getElementById('wharton-share').addEventListener('click', async () => {
    if (typeof navigator.share !== 'function') return shareByEmail();
    try { await navigator.share({title, url: shortUrl}); }
    catch (error) { if (error.name !== 'AbortError') shareByEmail(); }
  });

  const photos = [...document.querySelectorAll('#finished-gallery [data-photo]')];
  const floorLinks = [...document.querySelectorAll('[data-floor-room]')];
  const rooms = floorLinks.map(link => ({name: link.dataset.floorRoom, indices: link.dataset.photoIndices.split(',').map(Number)}));
  const choices = [...document.querySelectorAll('[data-room-choice]')];
  const plan = document.getElementById('floor-plan');
  const chooseRoom = document.getElementById('choose-room');
  const mobile = window.matchMedia('(max-width: 900px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const stage = document.getElementById('selected-image');
  const stageOpen = document.getElementById('selected-open');
  const thumbnails = document.getElementById('selected-thumbnails');
  const viewer = document.getElementById('property-viewer');
  let activeRoom = rooms.find(room => room.name === 'Living room');
  let current = 0;

  function setPlan(open, scroll = false) {
    plan.classList.toggle('is-open', open);
    chooseRoom.setAttribute('aria-expanded', String(open));
    if (scroll) plan.scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start'});
  }
  chooseRoom.addEventListener('click', () => {
    const open = !plan.classList.contains('is-open');
    setPlan(open, open);
    if (open) choices.find(button => button.getAttribute('aria-pressed') === 'true')?.focus({preventScroll:true});
  });
  document.getElementById('close-plan').addEventListener('click', () => {setPlan(false); chooseRoom.focus();});
  plan.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches) {setPlan(false); chooseRoom.focus();}
  });

  function render() {
    const selected = photos[activeRoom.indices[current]];
    const source = selected.querySelector('img');
    stage.src = source.src;
    stage.alt = source.alt;
    stageOpen.setAttribute('aria-label', 'View ' + selected.dataset.caption + ' in full screen');
    document.getElementById('selected-room').textContent = activeRoom.name;
    document.getElementById('selected-count').textContent = `${current + 1} / ${activeRoom.indices.length}`;
    document.getElementById('selected-caption').textContent = selected.dataset.caption;
    for (const link of floorLinks) link.setAttribute('aria-pressed', String(link.dataset.floorRoom === activeRoom.name));
    for (const button of choices) button.setAttribute('aria-pressed', String(button.dataset.roomChoice === activeRoom.name));
    const thumbnailButtons = [...thumbnails.children];
    thumbnailButtons.forEach((button,index) => button.setAttribute('aria-pressed', String(index === current)));
    const single = activeRoom.indices.length < 2;
    document.getElementById('selected-prev').disabled = single;
    document.getElementById('selected-next').disabled = single;
    document.getElementById('selected-prev').hidden = single;
    document.getElementById('selected-next').hidden = single;
  }
  function selectRoom(name, photoIndex, returnToViewer = false) {
    activeRoom = rooms.find(room => room.name === name) || activeRoom;
    current = Math.max(0, activeRoom.indices.indexOf(photoIndex));
    thumbnails.replaceChildren();
    activeRoom.indices.forEach((index,position) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `${activeRoom.name}, photograph ${position+1}`);
      const img = document.createElement('img');
      img.src = photos[index].querySelector('img').src;
      img.alt = '';
      button.append(img);
      button.addEventListener('click', () => {current = position; render();});
      thumbnails.append(button);
    });
    render();
    if (returnToViewer && mobile.matches) {
      setPlan(false);
      chooseRoom.focus({preventScroll:true});
      viewer.scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start'});
    }
  }
  floorLinks.forEach(link => {
    link.setAttribute('aria-label', `${link.dataset.floorRoom}: view room photographs`);
    link.addEventListener('click', event => {event.preventDefault(); selectRoom(link.dataset.floorRoom, undefined, true);});
    link.addEventListener('keydown', event => {
      if (event.key === ' ') {event.preventDefault(); selectRoom(link.dataset.floorRoom, undefined, true);}
    });
  });
  choices.forEach(button => button.addEventListener('click', () => selectRoom(button.dataset.roomChoice, undefined, true)));
  function move(delta) {current = (current + delta + activeRoom.indices.length) % activeRoom.indices.length; render();}
  document.getElementById('selected-prev').addEventListener('click', () => move(-1));
  document.getElementById('selected-next').addEventListener('click', () => move(1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);}
  });

  const dialog = document.querySelector('.wharton-lightbox');
  const image = document.getElementById('wharton-image');
  const caption = document.getElementById('wharton-caption');
  const count = document.getElementById('wharton-count');
  let dialogIndices = [];
  let dialogCurrent = 0;
  let opener;
  function showDialog(index) {
    dialogCurrent = (index + dialogIndices.length) % dialogIndices.length;
    const photoIndex = dialogIndices[dialogCurrent];
    const photo = photos[photoIndex];
    // Keep a local fallback if the external full-resolution image is unavailable.
    image.onerror = () => {
      image.onerror = null;
      image.src = photo.querySelector('img').src;
    };
    image.src = photo.dataset.photo;
    image.alt = photo.querySelector('img').alt;
    caption.textContent = photo.dataset.caption;
    count.textContent = `${dialogCurrent+1} / ${dialogIndices.length}`;
    const matchingRoom = activeRoom.indices.includes(photoIndex) ? activeRoom : rooms.find(room => room.indices.includes(photoIndex));
    selectRoom(matchingRoom.name, photoIndex);
  }
  function openDialog(indices, index, button) {
    opener = button; dialogIndices = indices; showDialog(index); dialog.showModal();
  }
  stageOpen.addEventListener('click', () => openDialog([...activeRoom.indices], current, stageOpen));
  photos.forEach((photo,index) => photo.addEventListener('click', () => openDialog(photos.map((_,i)=>i), index, photo)));
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-prev]').addEventListener('click', () => showDialog(dialogCurrent-1));
  dialog.querySelector('[data-next]').addEventListener('click', () => showDialog(dialogCurrent+1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {event.preventDefault(); showDialog(dialogCurrent+(event.key==='ArrowLeft'?-1:1));}
  });
  dialog.addEventListener('close', () => {image.removeAttribute('src');opener?.focus();});
  selectRoom('Living room');
})();
