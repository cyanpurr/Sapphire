let evt = null;
let store = [];
let dls = {};
let app = null;
let tick = null;
const frame = $('frame');

if (sessionStorage.getItem('warning')) {
  $('warn').style.display = 'none';
}

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  evt = e;
});

async function installApp() {
  if (!evt) return alert('Failed to prompt for install. Make sure this is running under HTTPS otherwise you may need to install it from the dropdown menu or URL bar.');
  evt.prompt();
  if ((await evt.userChoice).outcome === 'accepted') dismiss();
}

function dismiss() {
  sessionStorage.setItem('warning', '1');
  $('warn').style.display = 'none';
}

async function renderList() {
  const list = $('apps');
  const apps = await installed();
  const keys = Object.keys(apps);

  if (!keys.length) return list.innerHTML = '<p class="sub">No apps installed yet. Check the Download tab to install some!</p>';

  list.innerHTML = keys.map(id => `
    <div class="d-flex align-items-center justify-content-between gap-4 bg-white rounded-4 p-4">
      <div class="left d-flex align-items-center gap-4 flex-grow-1">
        <img class="icon rounded-4" src="${apps[id].icon || './favicon.ico'}">
        <div>
          <h4 class="h5 mb-1">${apps[id].name}</h4>
          <span class="status">Size: ${mb(apps[id].size)} MB</span>
        </div>
      </div>
      <div class="d-flex gap-3 flex-shrink-0">
        <button class="btn btn-primary" data-action="launch" data-arg="${id}">Open</button>
        <button class="btn btn-danger" data-action="uninstall" data-arg="${id}">Uninstall</button>
      </div>
    </div>
  `).join('');
}

async function fetchIdx() {
  store = [];
  await Promise.all((await indexes()).map(async url => {
    try {
      store.push(...await (await fetch(url)).json());
    } catch (e) {}
  }));
  renderGrid();
}

async function renderGrid() {
  const grid = $('grid');
  const search = $('search');

  if (!store.length) {
    search.style.display = 'none';
    grid.innerHTML = '<p class="sub col-12">No apps available. Add an index in Settings.</p>';
    return;
  }

  search.style.display = 'block';
  const q = search.value.toLowerCase();
  const inst = await installed();
  const list = store.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.description.toLowerCase().includes(q)
  );

  grid.innerHTML = list.length ? list.map(a => {
    const id = zipId(a.zipfile);
    const dl = dls[id];
    let area;

    if (dl) {
      area = `
        <span class="status" id="ps-${id}">${fmt(dl)}</span>
        <div class="progress mt-2">
          <div class="progress-bar" id="pf-${id}" style="width:${dl.total ? Math.round(dl.loaded / dl.total * 100) : 0}%"></div>
        </div>`;
    } else if (inst[id]) {
      area = '<button class="btn btn-secondary disabled" disabled>Installed</button>';
    } else {
      area = `<button class="btn btn-primary" data-action="start" data-arg="${id}">Install</button>`;
    }

    return `
      <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
        <div class="card border-0 shadow-sm text-center h-100">
          <img class="thumb mx-auto mt-4" src="${a.icon}">
          <div class="card-body d-flex flex-column">
            <h4 class="h5">${a.name}</h4>
            <p class="sub flex-grow-1 mb-3">${a.description}</p>
            ${area}
          </div>
        </div>
      </div>`;
  }).join('') : '<p class="sub col-12">No apps found from your search.</p>';
}

function start(id) {
  if (dls[id]) return;

  const a = store.find(x => zipId(x.zipfile) === id);
  if (!a) return;

  dls[id] = {
    id, name: a.name, icon: a.icon, zipUrl: a.zipfile,
    loaded: 0, total: 0, status: 'Downloading...'
  };

  $('t2').checked = true;
  renderGrid();
  download(id);
}

async function download(id) {
  const t = dls[id];

  try {
    const res = await fetch(t.zipUrl);
    t.total = parseInt(res.headers.get('content-length') || 0, 10);

    const reader = res.body.getReader();
    let r;
    let chunks = [];
    let received = 0;

    while (!(r = await reader.read()).done) {
      chunks.push(r.value);
      received += r.value.length;
      t.loaded = received;
      progress(id);
    }

    t.status = 'Extracting...';
    progress(id);

    const zip = await JSZip.loadAsync(await new Blob(chunks).arrayBuffer());
    const root = await navigator.storage.getDirectory();
    const appDir = await (await root.getDirectoryHandle('apps', { create: true }))
      .getDirectoryHandle(id, { create: true });

    for (const p of Object.keys(zip.files)) {
      if (zip.files[p].dir) continue;

      const parts = p.split('/').filter(Boolean);
      let cur = appDir;

      for (let i = 0; i < parts.length - 1; i++) {
        cur = await cur.getDirectoryHandle(parts[i], { create: true });
      }

      const w = await (await cur.getFileHandle(parts.pop(), { create: true })).createWritable();
      await w.write(await zip.files[p].async('uint8array'));
      await w.close();
    }

    const apps = await installed();
    apps[id] = { name: t.name, icon: t.icon, size: received };
    await write('installed', apps);
  } catch (e) {}

  delete dls[id];
  renderGrid();
  renderList();
}

function progress(id) {
  const t = dls[id];
  if (!t) return;

  const ps = $('ps-' + id);
  const pf = $('pf-' + id);
  if (ps) ps.textContent = fmt(t);
  if (pf) pf.style.width = (t.total ? Math.round(t.loaded / t.total * 100) : 0) + '%';
}

async function uninstall(id) {
  if (!confirm('Are you sure you want to uninstall this app?')) return;

  const apps = await installed();
  delete apps[id];
  await write('installed', apps);

  try {
    const root = await navigator.storage.getDirectory();
    await (await root.getDirectoryHandle('apps')).removeEntry(id, { recursive: true });
    await (await root.getDirectoryHandle('scripts')).removeEntry(id, { recursive: true });
  } catch (e) {}

  renderList();
}

async function launch(id) {
  if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      location.reload();
      return;
    }
  }

  app = id;
  const info = (await installed())[id];

  $('title').textContent = info ? info.name : 'Sapphire';
  $('icon').src = info ? info.icon : './favicon.ico';
  frame.src = '/vapp/' + id + '/index.html?' + Date.now();
  $('runner').style.display = 'flex';

  clearInterval(tick);
  tick = setInterval(() => frame.contentWindow?.focus(), 500);

  frame.onload = async () => {
    if (!app) return;
    frame.contentWindow?.focus();
    (await load(id)).filter(s => s.startup).forEach(s => inject(s.code));
  };
}

function exit() {
  app = null;
  clearInterval(tick);
  frame.onload = null;
  frame.src = 'about:blank';
  $('runner').style.display = 'none';
  close();
}

function fullscreen() {
  document.fullscreenElement ? document.exitFullscreen() : frame.requestFullscreen();
}

async function builtins(urls) {
  const k = 'official-indexes';
  const root = await navigator.storage.getDirectory();
  
  try {
    await root.getFileHandle(k);
  } catch {
    const list = await indexes();
    for (const url of urls) {
      if (!list.includes(url)) list.push(url);
    }
    await write('indexes', list);
    await root.getFileHandle(k, { create: true });
  }
}

async function you_stupid_idiot() {
  const w = await (await (await navigator.storage.getDirectory()).getFileHandle("PLEASE KNOW WHAT YOU'RE DOING!!!", { create: true })).createWritable();
  await w.write("I reccomend to not touch anything in the filesystem unless you know what you're doing. Be safe and don't break anything. :)");
  await w.close();
}

you_stupid_idiot();