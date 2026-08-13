const $ = id => document.getElementById(id);

async function read(k, f) {
  try {
    const root = await navigator.storage.getDirectory();
    const data = await (await (await root.getFileHandle(k)).getFile()).text();
    return JSON.parse(data || f);
  } catch (e) {
    return JSON.parse(f);
  }
}

async function write(k, v) {
  const root = await navigator.storage.getDirectory();
  const fh = await root.getFileHandle(k, { create: true });
  const w = await fh.createWritable();
  await w.write(JSON.stringify(v));
  await w.close();
}

const installed = () => read('installed', '{}');
const indexes = () => read('indexes', '[]');
const mb = v => (v / 1048576).toFixed(1);
const fmt = t => `${t.status} (${mb(t.loaded)}${t.total ? ' / ' + mb(t.total) : ''} MB)`;
const zipId = url => btoa(url).replace(/=/g, '');