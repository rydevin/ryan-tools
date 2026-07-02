// Waypoint 2.2.2: no caching while troubleshooting blank screen.
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
