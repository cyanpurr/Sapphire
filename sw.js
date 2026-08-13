const CACHE = 'sapphire-v001';

const ASSETS = [
  '/', './index.html', './app.css', './lib/bootstrap.min.css',
  './lib/bootstrap.bundle.min.js', './jszip.min.js', './js/utils.js', './js/app.js',
  './js/scripts.js', './js/settings.js', './js/main.js', './favicon.ico', './manifest.json'
];

// most of "MIMES" really needs to be checked, i didn't make this.
const MIMES = {
  html: 'text/html', htm: 'text/html', xhtml: 'application/xhtml+xml',
  js: 'text/javascript', mjs: 'text/javascript', cjs: 'text/javascript',
  css: 'text/css', txt: 'text/plain', md: 'text/markdown',
  csv: 'text/csv', rtf: 'application/rtf', json: 'application/json',
  map: 'application/json', webmanifest: 'application/manifest+json', xml: 'application/xml',
  wasm: 'application/wasm', pdf: 'application/pdf', log: 'text/plain',
  ini: 'text/plain', conf: 'text/plain', yaml: 'application/yaml',
  yml: 'application/yaml', toml: 'application/toml', vtt: 'text/vtt',
  srt: 'application/x-subrip', webc: 'text/html', ts: 'application/typescript',
  tsx: 'application/octet-stream', jsx: 'application/javascript',
  vue: 'text/html', svelte: 'text/html', py: 'text/x-python',
  java: 'text/x-java-source', c: 'text/x-c', h: 'text/x-c',
  cpp: 'text/x-c++', hpp: 'text/x-c++', rs: 'text/x-rust',
  go: 'text/x-go', rb: 'text/x-ruby', php: 'application/x-httpd-php',
  sh: 'application/x-sh', bat: 'application/bat', ps1: 'application/octet-stream',
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
  gif: 'image/gif', webp: 'image/webp', avif: 'image/avif',
  ico: 'image/x-icon', bmp: 'image/bmp', svg: 'image/svg+xml',
  tiff: 'image/tiff', tif: 'image/tiff', heic: 'image/heic',
  heif: 'image/heif', jxl: 'image/jxl', jp2: 'image/jp2',
  j2k: 'image/jp2', jpf: 'image/jp2', psd: 'image/vnd.adobe.photoshop',
  raw: 'application/octet-stream', cr2: 'image/x-canon-cr2',
  nef: 'image/x-nikon-nef', dng: 'image/x-adobe-dng',
  mp3: 'audio/mpeg', ogg: 'audio/ogg', wav: 'audio/wav',
  opus: 'audio/ogg', flac: 'audio/flac', aac: 'audio/aac',
  m4a: 'audio/mp4', mid: 'audio/midi', midi: 'audio/midi',
  weba: 'audio/webm', mp4: 'video/mp4', m4v: 'video/mp4',
  webm: 'video/webm', ogv: 'video/ogg', mov: 'video/quicktime',
  avi: 'video/x-msvideo', mkv: 'video/x-matroska', ts: 'video/mp2t',
  m3u8: 'application/vnd.apple.mpegurl', mpeg: 'video/mpeg',
  mpg: 'video/mpeg', '3gp': 'video/3gpp', '3g2': 'video/3gpp2',
  m2ts: 'video/mp2t', mts: 'video/mp2t',
  zip: 'application/zip', gz: 'application/gzip', gzip: 'application/gzip',
  tar: 'application/x-tar', rar: 'application/vnd.rar',
  '7z': 'application/x-7z-compressed', bz2: 'application/x-bzip2',
  br: 'application/brotli', zst: 'application/zstd', xz: 'application/x-xz',
  lz: 'application/x-lzip', lz4: 'application/x-lz4',
  cab: 'application/vnd.ms-cab-compressed', ar: 'application/x-archive',
  cpio: 'application/x-cpio', doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  odt: 'application/vnd.oasis.opendocument.text',
  ods: 'application/vnd.oasis.opendocument.spreadsheet',
  epub: 'application/epub+zip', mobi: 'application/x-mobipocket-ebook',
  pages: 'application/vnd.apple.pages', numbers: 'application/vnd.apple.numbers',
  key: 'application/vnd.apple.keynote',
  iso: 'application/x-iso9660-image', dmg: 'application/x-apple-diskimage',
  deb: 'application/vnd.debian.binary-package', rpm: 'application/x-rpm',
  apk: 'application/vnd.android.package-archive', msi: 'application/x-msdownload',
  ttf: 'font/ttf', otf: 'font/otf', woff: 'font/woff', woff2: 'font/woff2',
  eot: 'application/vnd.ms-fontobject', sfnt: 'font/sfnt',
  glb: 'model/gltf-binary', gltf: 'model/gltf+json', obj: 'model/obj',
  stl: 'model/stl', '3mf': 'model/3mf', fbx: 'application/octet-stream',
  dae: 'model/vnd.collada+xml', ply: 'application/ply',
  sqlite: 'application/vnd.sqlite3', db: 'application/octet-stream',
  sql: 'application/sql', parquet: 'application/vnd.apache.parquet',
  har: 'application/json', manifest: 'text/cache-manifest', webbundle: 'application/webbundle',
  pem: 'application/x-pem-file', crt: 'application/x-x509-ca-cert',
  cer: 'application/pkix-cert', der: 'application/x-x509-ca-cert',
  p12: 'application/x-pkcs12', pfx: 'application/x-pkcs12',
  pck: 'application/octet-stream', data: 'application/octet-stream',
  bin: 'application/octet-stream', exe: 'application/octet-stream',
  dll: 'application/octet-stream', unity3d: 'application/octet-stream'
};

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(async cache => {
      await Promise.allSettled(
        ASSETS.map(asset => cache.add(asset).catch(err => {
          console.warn(`Failed to cache ${asset}:`, err);
        }))
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') { return; }
  const url = new URL(request.url);

  if (url.pathname.startsWith('/vapp/')) {
    event.respondWith(serve(url.pathname.slice('/vapp/'.length)));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request, { ignoreSearch: true })
        .then(cached => {
          if (cached) return cached;

          return caches.match('./index.html', { ignoreSearch: true })
            .then(fallback => {
              if (fallback) return fallback;

              return fetch(request).catch(() => new Response('Sapphire: Offline', {
                status: 503,
                headers: { 'Content-Type': 'text/plain' }
              }));
            });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true })
      .then(cached => {
        if (cached) return cached;

        return fetch(request).catch(() => new Response('Sapphire: Asset Not Cached', {
          status: 503,
          headers: { 'Content-Type': 'text/plain' }
        }));
      })
  );
});

async function serve(path) {
  try {
    const parts = path.split('/').filter(Boolean);

    if (!parts.length) {
      return new Response('Sapphire: Invalid path.', {
        status: 400,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    const id = parts[0];
    const file = parts.slice(1).join('/') || 'index.html';
    const root = await navigator.storage.getDirectory();
    const apps = await root.getDirectoryHandle('apps');
    const dir = await apps.getDirectoryHandle(id);
    const dirs = file.split('/').filter(Boolean);
    let cur = dir;

    for (let i = 0; i < dirs.length - 1; i++) {
      cur = await cur.getDirectoryHandle(dirs[i]);
    }

    const filename = dirs[dirs.length - 1];
    const handle = await cur.getFileHandle(filename);
    const data = await handle.getFile();
    const ext = filename.includes('.')
      ? filename.split('.').pop().toLowerCase()
      : '';

    const headers = new Headers({
      'Content-Type': MIMES[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin'
    });

    if (ext === 'html' || ext === 'htm' || ext === 'xhtml') {
      let html = await data.text();

      if (/<head\b/i.test(html)) {
        html = html.replace(
          /<head\b[^>]*>/i,
          match => `${match}<base href="/vapp/${id}/">`
        );
      } else {
        html = `<head><base href="/vapp/${id}/"></head>` + html;
      }

      return new Response(html, { status: 200, headers });
    }

    return new Response(data, { status: 200, headers });
  } catch (err) {
    return new Response(
      `Sapphire: File Not Found: ${path}\n\n` +
      `${err?.name || 'Error'}: ${err?.message || err}`,
      {
        status: 404,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      }
    );
  }
}