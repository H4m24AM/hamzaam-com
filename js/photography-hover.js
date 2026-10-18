// Delayed passive hover preview plus an explicit, keyboard-accessible image viewer.
(() => {
  const hover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const preview = document.createElement('div');
  preview.className = 'ph-hover-preview';
  preview.hidden = true;
  preview.setAttribute('aria-hidden', 'true');
  const image = document.createElement('img');
  image.alt = '';
  preview.append(image);
  document.body.append(preview);

  const dialog = document.createElement('dialog');
  dialog.className = 'ph-lightbox';
  dialog.setAttribute('aria-label', 'Enlarged photograph');
  const closeButton = document.createElement('button');
  closeButton.className = 'ph-lightbox__close';
  closeButton.type = 'button';
  closeButton.textContent = 'Close ×';
  closeButton.setAttribute('aria-label', 'Close photograph');
  const fullImage = document.createElement('img');
  dialog.append(closeButton, fullImage);
  document.body.append(dialog);
  let active, timer, opener;
  const closePreview = () => {
    clearTimeout(timer);
    preview.hidden = true;
    active = null;
  };
  const sourceFor = target => {
    if (target.tagName === 'IMG') return target.src;
    const background = target.querySelector('.ph-hero__bg') || target;
    const match = getComputedStyle(background).backgroundImage.match(/^url\(["']?(.*?)["']?\)$/);
    return match && match[1];
  };
  const targets = document.querySelectorAll('.ph-hero, .ph-proj-card:not(.ph-proj-card--real-estate) .ph-proj-card__img, .ph-about__img, .ph-collection-card img');
  targets.forEach(target => {
    const label = target.getAttribute('alt') || target.closest('.ph-proj-card')?.querySelector('h2')?.textContent || 'Photography';
    // Preserve existing project navigation through card titles and links.
    if (!target.classList.contains('ph-hero')) {
      target.setAttribute('role', 'button');
      target.tabIndex = 0;
      target.setAttribute('aria-label', 'Enlarge image: ' + label);
    }
    target.addEventListener('pointerenter', event => {
      closePreview();
      if (!hover.matches || event.pointerType !== 'mouse' || dialog.open) return;
      const src = sourceFor(target);
      if (!src) return;
      active = target;
      timer = setTimeout(() => {
        if (active !== target) return;
        image.onload = () => { if (active === target && !dialog.open) preview.hidden = false; };
        image.onerror = closePreview;
        image.src = src;
        if (image.complete && image.naturalWidth) preview.hidden = false;
      }, 1000);
    });
    target.addEventListener('pointerleave', closePreview);
    const open = event => {
      if (event.target.closest('a,button') && target.classList.contains('ph-hero')) return;
      const src = sourceFor(target);
      if (!src) return;
      event.preventDefault();
      event.stopPropagation();
      closePreview();
      opener = target;
      fullImage.src = src;
      fullImage.alt = label;
      dialog.showModal();
      document.body.classList.add('ph-lightbox-open');
    };
    target.addEventListener('click', open);
    target.addEventListener('keydown', event => {
      if (event.target === target && (event.key === 'Enter' || event.key === ' ')) open(event);
    });
  });
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('ph-lightbox-open');
    fullImage.removeAttribute('src');
    if (opener && opener.tabIndex >= 0) opener.focus();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closePreview(); });
  window.addEventListener('scroll', closePreview, { passive: true });
  window.addEventListener('blur', closePreview);
  hover.addEventListener('change', closePreview);
})();
