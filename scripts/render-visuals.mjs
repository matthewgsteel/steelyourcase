import { chromium } from '@playwright/test';
import http from 'node:http';
import path from 'node:path';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';

const mode = process.argv[2] || 'all';
const root = process.cwd();
const distDir = path.join(root, 'dist');
const outputsDir = path.join(root, 'outputs', 'visual-renders');
const reportPath = path.join(root, 'outputs', 'VISUAL_REVIEW_REPORT.md');
const host = '127.0.0.1';
const port = 4173;
const baseUrl = `http://${host}:${port}`;

const captureSets = {
  all: [
    { file: 'home-desktop.png', path: '/', viewport: { width: 1440, height: 1400 } },
    { file: 'contact-desktop.png', path: '/contact/', viewport: { width: 1440, height: 1400 } },
    {
      file: 'immigration-desktop.png',
      path: '/immigration/',
      viewport: { width: 1440, height: 1400 },
    },
    {
      file: 'credit-repair-desktop.png',
      path: '/credit-repair/',
      viewport: { width: 1440, height: 1400 },
    },
    { file: 'home-mobile.png', path: '/', viewport: { width: 430, height: 932 } },
    { file: 'contact-mobile.png', path: '/contact/', viewport: { width: 430, height: 932 } },
  ],
  home: [{ file: 'home-desktop.png', path: '/', viewport: { width: 1440, height: 1400 } }],
  practices: [
    {
      file: 'immigration-desktop.png',
      path: '/immigration/',
      viewport: { width: 1440, height: 1400 },
    },
    {
      file: 'credit-repair-desktop.png',
      path: '/credit-repair/',
      viewport: { width: 1440, height: 1400 },
    },
    {
      file: 'traffic-tickets-desktop.png',
      path: '/traffic-tickets/',
      viewport: { width: 1440, height: 1400 },
    },
    { file: 'notary-desktop.png', path: '/notary/', viewport: { width: 1440, height: 1400 } },
  ],
  mobile: [
    { file: 'home-mobile.png', path: '/', viewport: { width: 430, height: 932 } },
    { file: 'contact-mobile.png', path: '/contact/', viewport: { width: 430, height: 932 } },
  ],
};

const targets = captureSets[mode];

if (!targets) {
  throw new Error(`Unknown render mode "${mode}". Use one of: ${Object.keys(captureSets).join(', ')}`);
}

await stat(distDir).catch(() => {
  throw new Error('dist/ is missing. Run "npm run build" before rendering visuals.');
});

await mkdir(outputsDir, { recursive: true });

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', baseUrl);
    const filePath = resolveFile(url.pathname);
    const file = await readFile(filePath);

    response.statusCode = 200;
    response.setHeader('Content-Type', mimeTypes[path.extname(filePath)] || 'application/octet-stream');
    response.end(file);
  } catch {
    response.statusCode = 404;
    response.end('Not found');
  }
});

await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(port, host, () => resolve());
});

const browser = await chromium.launch();
const artifacts = [];

try {
  for (const target of targets) {
    const page = await browser.newPage({
      colorScheme: 'dark',
      viewport: target.viewport,
    });

    await page.goto(`${baseUrl}${target.path}`, { waitUntil: 'networkidle' });
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }
      `,
    });
    await page.screenshot({
      fullPage: true,
      path: path.join(outputsDir, target.file),
    });
    await page.close();
    artifacts.push(target.file);
  }
} finally {
  await browser.close();
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

await writeFile(
  reportPath,
  [
    '# Visual Review Report',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Mode: ${mode}`,
    `Source: ${distDir}`,
    `Preview base URL: ${baseUrl}`,
    '',
    '## Artifacts',
    '',
    ...artifacts.map((artifact) => `- visual-renders/${artifact}`),
    '',
    '## Notes',
    '',
    '- Screenshots are from the built static site in mock-mail mode.',
    '- Pages Functions and live SMTP proof still require Cloudflare preview validation.',
  ].join('\n'),
  'utf8'
);

function resolveFile(urlPath) {
  const safePath = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  const joinedPath = path.join(distDir, safePath);

  if (safePath === '/' || safePath === '') {
    return path.join(distDir, 'index.html');
  }

  if (path.extname(joinedPath)) {
    return joinedPath;
  }

  return path.join(joinedPath, 'index.html');
}
