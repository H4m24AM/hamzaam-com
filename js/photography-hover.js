// A passive overlay keeps hover boundaries and existing project links intact.
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
  let active;
  const close = () => { preview.hidden = true; active = null; };
  const targets = document.querySelectorAll('.ph-hero, .ph-proj-card:not(.ph-proj-card--real-estate) .ph-proj-card__img, .ph-about__img');
  targets.forEach(target => {
    target.addEventListener('pointerenter', event => {
      if (!hover.matches || event.pointerType !== 'mouse') return;
      const background = target.querySelector('.ph-hero__bg') || target;
      const match = getComputedStyle(background).backgroundImage.match(/^url\(["']?(.*?)["']?\)$/);
      if (!match) return;
      active = target;
      preview.hidden = true;
      image.onload = () => { if (active === target) preview.hidden = false; };
      image.onerror = close;
      image.src = match[1];
      if (image.complete && image.naturalWidth) preview.hidden = false;
    });
    target.addEventListener('pointerleave', close);
    target.addEventListener('pointerdown', close);
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  window.addEventListener('scroll', close, { passive: true });
  window.addEventListener('blur', close);
  hover.addEventListener('change', close);
})();
