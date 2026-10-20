import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static assets from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Also serve public directory
app.use(express.static(path.join(__dirname, 'public')));

// SPA fallback: return index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const defaultPort = Number(process.env.PORT) || 3000;

function startServer(port) {
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Production server running on http://0.0.0.0:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && port !== 3000) {
      console.log(`Port ${port} in use, falling back to 3000...`);
      startServer(3000);
    } else {
      console.error('Server failed to start:', err);
    }
  });
}

startServer(defaultPort);
