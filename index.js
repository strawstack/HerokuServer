import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import { dirname } from 'path';
import express from 'express';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 5006;
const app = express();

app.use(express.static(path.join(__dirname, 'src')));

//
// Routes
//
app.get('/', (req, res) => {
  res.sendFile('src/index.html');
});

//
// Sub routes
//
// import { routes as rhymesRoutes } from './src/p/rhymes/routes.js';
// rhymesRoutes(app);
for (let dir of readdirSync('src/p')) {
  const moduleDir = `./src/p/${dir}/routes.js`;
  const { routes } = await import(moduleDir);
  routes({
    get: (path, callback) => {
      app.get(`/p/${dir}${path}`, (req, res) => {
          callback(req, res);
      });
    },
    post: (path, callback) => {
      app.post(`/p/${dir}${path}`, (req, res) => {
          callback(req, res);
      });
    }});
}

//
// Start Server
//
const server = app.listen(port, () => {
  console.log(`http://localhost:${port}`)
});

//
// Config
//
// https://devcenter.heroku.com/articles/http-routing#keepalives
// https://nodejs.org/api/http.html#serverkeepalivetimeout
server.keepAliveTimeout = 95 * 1000;
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: gracefully shutting down');
  if (server) {
    server.close(() => {
      console.log('HTTP server closed');
    })
  }
});