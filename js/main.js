if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

fetch('https://www.google.com/favicon.ico?' + Math.random().toString().slice(2), { mode: 'no-cors' })
  .then(() => $('net').textContent = 'Depending on your blocker, Turn off your Wi-Fi first before running apps and restart.');

document.body.addEventListener('click', e => {
  const t = e.target.closest('[data-action]');
  if (!t) return;

  const f = window[t.dataset.action];
  t.dataset.arg ? f(t.dataset.arg) : f();
});

$('search').addEventListener('input', renderGrid);

builtins([
  'https://sapphire.cyanpurr.cc.cd/index.json',
  'http://localhost:8000/sapphire/index.json'
]).then(() => {
  renderList();
  fetchIdx();
  refresh();
});