async function usage() {
  if (!navigator.storage?.estimate) return;
  const est = await navigator.storage.estimate();
  $('storage').textContent = `Storage Used: ${(est.usage / 1048576).toFixed(2)} MB`;
}

async function refresh() {
  await usage();

  $('idx').innerHTML = (await indexes()).map((url, i) => `
    <div class="d-flex align-items-center justify-content-between gap-3 bg-white rounded-4 p-3">
      <span class="text-break flex-grow-1">${url}</span>
      <button class="btn btn-danger btn-sm flex-shrink-0" data-action="drop" data-arg="${i}">Remove</button>
    </div>
  `).join('');
}

setInterval(usage, 10000);

async function add() {
  const input = $('url');
  const url = input.value.trim();
  if (!url) return;

  const list = await indexes();
  if (list.includes(url)) return alert('This index has already been added.');

  list.push(url);
  await write('indexes', list);
  input.value = '';
  await refresh();
  await fetchIdx();
}

async function drop(i) {
  if (!confirm('Are you sure you want to delete this index?')) return;

  const list = await indexes();
  list.splice(i, 1);
  await write('indexes', list);
  await refresh();
  await fetchIdx();
}

async function reset() {
  if (!confirm('Are you sure? This will delete all apps and reset all settings.')) return;

  const root = await navigator.storage.getDirectory();
  for await (const name of root.keys()) {
    await root.removeEntry(name, { recursive: true });
  }
  location.reload();
}