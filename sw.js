/**
 * P2P SHARE — GITHUB PAGES SERVICE WORKER (sw.js)
 * Offline App-Shell & CDN Asset Caching (Bypasses Live P2P Signaling)
 */

const CACHE_NAME = 'p2p-share-github-v8';

// Core relative paths for GitHub Pages compatibility
const CORE_ASSETS = [
    './',
    './index.html'
];

// External UI & P2P SDKs cached opportunistically
const CDN_ASSETS = [
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://js.pusher.com/8.4.0/pusher.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
    'https://unpkg.com/html5-qrcode',
    'https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js',
    'https://unpkg.com/mqtt@5.3.4/dist/mqtt.min.js'
];

// 1. INSTALL: Pre-cache core HTML shell and opportunistically cache CDN libraries
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            try {
                await cache.addAll(CORE_ASSETS);
            } catch (e) {}

            // Cache CDN scripts individually so one CORS/network hiccup doesn't block install
            await Promise.allSettled(
                CDN_ASSETS.map((url) =>
                    fetch(url, { mode: 'no-cors' })
                        .then((res) => cache.put(url, res))
                        .catch(() => {})
                )
            );
        })
    );
});

// 2. ACTIVATE: Clean up older cache versions and claim open tabs immediately
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        ).then(() => self.clients.claim())
    );
});

// 3. FETCH: Network-first for HTML navigation, Cache-fallback for static assets
self.addEventListener('fetch', (event) => {
    const req = event.request;

    // Never intercept POST requests or non-HTTP schemes
    if (req.method !== 'GET' || !req.url.startsWith('http')) {
        return;
    }

    const url = new URL(req.url);

    // Bypass live signaling endpoints (Pusher, HiveMQ, EMQX, PeerJS broker)
    if (
        url.hostname.includes('pusher.com') ||
        url.hostname.includes('pusherapp.com') ||
        url.hostname.includes('hivemq.com') ||
        url.hostname.includes('emqx.io') ||
        url.hostname.includes('peerjs.com')
    ) {
        return;
    }

    // For page navigation (index.html or ?connect=... invite links): Network First -> Offline Cache Fallback
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req)
                .then((networkRes) => {
                    const resClone = networkRes.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', resClone));
                    return networkRes;
                })
                .catch(async () => {
                    const cache = await caches.open(CACHE_NAME);
                    return (
                        (await cache.match('./index.html')) ||
                        (await cache.match('./')) ||
                        caches.match(req)
                    );
                })
        );
        return;
    }

    // For static scripts, fonts, and icons: Network First with Runtime Cache Fallback
    event.respondWith(
        fetch(req)
            .then((networkRes) => {
                if (networkRes && (networkRes.status === 200 || networkRes.type === 'opaque')) {
                    const resClone = networkRes.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
                }
                return networkRes;
            })
            .catch(() => caches.match(req))
    );
});
