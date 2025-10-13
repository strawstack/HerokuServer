import { fileURLToPath } from 'url';
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
app.get('/', (_, res) => {
  res.sendFile('src/index.html');
});

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
})
