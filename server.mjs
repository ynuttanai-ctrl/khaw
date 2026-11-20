import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const PORT = Number(process.env.PORT || 7154);
const DIST_DIR = resolve('dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
};

const server = createServer(async (req, res) => {
  const urlPath = (req.url || '/').split('?')[0];
  const safePath = urlPath === '/' ? '/index.html' : urlPath;
  const requestedFile = resolve(DIST_DIR, `.${safePath}`);

  // Prevent directory traversal outside dist/
  let targetFile = requestedFile.startsWith(DIST_DIR) ? requestedFile : join(DIST_DIR, 'index.html');

  try {
    const info = await stat(targetFile);
    if (!info.isFile()) {
      targetFile = join(DIST_DIR, 'index.html');
    }
  } catch {
    targetFile = join(DIST_DIR, 'index.html');
  }

  const ext = extname(targetFile).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const cacheControl = safePath.startsWith('/assets/')
    ? 'public, max-age=31536000, immutable'
    : 'no-cache';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': cacheControl,
  });

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  createReadStream(targetFile).pipe(res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Khao Manee Stroll running on http://0.0.0.0:${PORT}`);
});

const shutdown = () => {
  server.close(() => process.exit(0));
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
