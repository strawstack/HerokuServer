import { createServer } from "node:http";
import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 5006;
const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname, "src")));

//
// Routes
//
app.get("/", (req, res) => {
  res.sendFile("src/index.html");
});

app.get("/post", (req, res) => {
  res.send("hi");
});

//
// Start Server
//
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

//
// Config
//
// https://devcenter.heroku.com/articles/http-routing#keepalives
// https://nodejs.org/api/http.html#serverkeepalivetimeout
server.keepAliveTimeout = 95 * 1000;
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: gracefully shutting down");
  if (server) {
    server.close(() => {
      console.log("HTTP server closed");
    });
  }
});
