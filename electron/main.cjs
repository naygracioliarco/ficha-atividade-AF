/**
 * Electron + servidor HTTP mínimo (só Node) para servir `dist/` em localhost — offline.
 */
const { app, BrowserWindow } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');

const DIST = path.resolve(__dirname, '..', 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.map': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
};

let staticServer;
/** @type {import('electron').BrowserWindow | null} */
let mainWindow = null;

function fileUnderDist(requestPath) {
  const raw = decodeURIComponent((requestPath || '/').split('?')[0]);
  const rel = raw === '/' ? 'index.html' : raw.replace(/^\/+/, '');
  const full = path.resolve(DIST, rel);
  const root = path.resolve(DIST);
  if (!full.startsWith(root + path.sep) && full !== root) return null;
  return full;
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, buf) => {
    if (err) {
      res.writeHead(404);
      res.end();
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(buf);
  });
}

function startStaticServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      if (req.method !== 'GET' || !req.url) {
        res.writeHead(404);
        res.end();
        return;
      }

      let filePath = fileUnderDist(req.url);
      if (!filePath) {
        res.writeHead(403);
        res.end();
        return;
      }

      fs.stat(filePath, (err, st) => {
        if (err || !st) {
          res.writeHead(404);
          res.end();
          return;
        }
        if (st.isDirectory()) {
          sendFile(res, path.join(filePath, 'index.html'));
          return;
        }
        sendFile(res, filePath);
      });
    });

    server.listen(0, '127.0.0.1', (err) => {
      if (err) return reject(err);
      staticServer = server;
      const addr = server.address();
      const port = typeof addr === 'object' && addr ? addr.port : 0;
      resolve(`http://127.0.0.1:${port}/`);
    });
  });
}

async function createWindow() {
  const url = await startStaticServer();

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 960,
    minHeight: 600,
    show: false,
    title: 'Livro Digital BETT',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.once('ready-to-show', () => {
    if (mainWindow) mainWindow.show();
  });

  await mainWindow.loadURL(url);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function stopServer() {
  if (staticServer) {
    staticServer.close();
    staticServer = undefined;
  }
}

app.whenReady().then(() => {
  createWindow().catch((e) => {
    console.error(e);
    app.quit();
  });
});

app.on('window-all-closed', () => {
  stopServer();
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  stopServer();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow().catch((e) => {
      console.error(e);
      app.quit();
    });
  }
});
