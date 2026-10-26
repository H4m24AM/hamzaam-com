const form = document.querySelector('#photography-inquiry');
const status = document.querySelector('#inquiry-status');
if (form && status) form.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  if (button.disabled) return;
  button.disabled = true;
  button.textContent = 'Sending…';
  status.textContent = 'Sending your request…';
  status.dataset.state = 'pending';
  try {
    const result = await fetch(form.action, {method:'POST', body:new FormData(form), headers:{Accept:'application/json'}});
    const body = await result.json();
    if (!result.ok || body.success !== true) throw new Error(body.error || 'Unable to send your request. Please email inquiries@hamza.am.');
    status.textContent = 'Thank you. Your request has been sent. I’ll follow up with availability and pricing.';
    status.dataset.state = 'success';
    form.reset();
  } catch (error) {
    status.textContent = error.message || 'Unable to send. Please try again or email inquiries@hamza.am.';
    status.dataset.state = 'error';
  } finally {
    button.disabled = false;
    button.innerHTML = 'Request Availability <span aria-hidden="true">↗</span>';
  }
});
