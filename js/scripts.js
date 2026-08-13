let file = null;
let scripts = [];

async function dir(id, create = false) {
  const root = await navigator.storage.getDirectory();
  return await (await root.getDirectoryHandle('scripts', { create })).getDirectoryHandle(id, { create });
}

async function load(id) {
  try {
    const d = await dir(id);
    const list = [];

    for await (const e of d.values()) {
      if (e.kind === 'file' && e.name.endsWith('.js')) {
        const text = await (await e.getFile()).text();
        const startup = text.startsWith('// Startup');
        list.push({name: e.name, code: startup ? text.replace(/^\/\/ Startup\r?\n?/, '') : text, startup});
      }
    }

    return list;
  } catch (e) {
    return [];
  }
}

function open() {
  if (!app) return;
  bootstrap.Modal.getOrCreateInstance($('modal')).show();
  render();
  hide();
}

function close() {
  bootstrap.Modal.getOrCreateInstance($('modal')).hide();
}

async function render() {
  scripts = await load(app);
  const c = $('saved');

  if (!scripts.length) return c.innerHTML = '<p class="sub">Nothing saved for this app.</p>';

  c.innerHTML = scripts.map((s, i) => `
    <div class="bg-body rounded-3 p-3 mb-3">
      <div class="mb-2">
        <strong class="text-primary">${s.name.replace(/\.js$/, '')}</strong>
        ${s.startup ? '<span class="status ms-2">(Startup)</span>' : ''}
      </div>
      <div class="d-flex gap-2 justify-content-end">
        <button class="btn btn-primary btn-sm" data-action="run" data-arg="${i}">Execute</button>
        <button class="btn btn-outline-primary btn-sm" data-action="edit" data-arg="${i}">Edit</button>
        <button class="btn btn-danger btn-sm" data-action="remove" data-arg="${i}">Delete</button>
      </div>
    </div>
  `).join('');
}

function run(i) {
  inject(scripts[i].code);
}

function edit(i) {
  show(scripts[i].name);
}

async function remove(i) {
  if (!confirm('Are you sure you want to delete this script?')) return;
  await (await dir(app)).removeEntry(scripts[i].name);
  render();
}

function show(name = null) {
  file = name;
  const s = name ? scripts.find(x => x.name === name) : null;

  $('form').classList.remove('d-none');
  $('ftitle').textContent = s ? 'Edit Script' : 'New Script';
  $('sname').value = s ? s.name.replace(/\.js$/, '') : '';
  $('scode').value = s ? s.code : '';
  $('startup').checked = s ? s.startup : false;
}

function hide() {
  $('form').classList.add('d-none');
}

async function save() {
  let raw = $('sname').value.trim();
  if (!raw) return alert('Script requires a name.');
  if (!raw.endsWith('.js')) raw += '.js';

  const d = await dir(app, true);
  if (file && file !== raw) {
    try { await d.removeEntry(file); } catch (e) {}
  }

  const w = await (await d.getFileHandle(raw, { create: true })).createWritable();
  await w.write(($('startup').checked ? '// Startup\n' : '') + $('scode').value);
  await w.close();

  hide();
  render();
}

function exec() {
  const c = $('dcode').value;
  if (c) inject(c);
}

function inject(code) {
  if (!app || !frame.contentWindow) return;
  try {
    frame.contentWindow.eval(code);
  } catch (e) {
    alert('Sapphire: Script Execution Error: ' + e.message);
  }
}