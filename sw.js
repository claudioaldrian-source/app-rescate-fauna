// Service worker de Reporte Fauna Santa Fe
// Guarda la app (pantalla, logos, iconos) para que abra rápido aunque haya mala señal.
// Los reportes y archivos van SIEMPRE directo a Supabase: nunca se guardan acá.
const VERSION = 'fauna-v7';   // cambiá este número cada vez que subas una versión nueva
const ARCHIVOS = [
  './',
  'index.html',
  'manifest.json',
  'logo-santafe.png',
  'logo_macla.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => Promise.allSettled(ARCHIVOS.map(a => c.add(a))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(claves => Promise.all(claves.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);

  // Solo GET del mismo sitio. Supabase, fuentes y demás pasan directo.
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  // Página y scripts (como acompanan.js): primero internet,
  // así siempre se ven la última versión y los casilleros nuevos; sin señal, lo guardado.
  if (req.mode === 'navigate' || url.pathname.endsWith('.js')) {
    e.respondWith(
      fetch(req)
        .then(r => { const copia = r.clone(); caches.open(VERSION).then(c => c.put(req, copia)); return r; })
        .catch(() => caches.match(req).then(r => r || caches.match('index.html')))
    );
    return;
  }

  // Imágenes e iconos: primero lo guardado.
  e.respondWith(caches.match(req).then(r => r || fetch(req)));
});
