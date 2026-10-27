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

const CLEAR_TYPE = "clear_type";
const MESSAGE_TYPE = "MESSAGE";
const GET_MESSAGES_TYPE = "GET_MESSAGES";

const LOCAL_KEY = "local_key_generated_per_client";
const ROOT_KEY = "root_key_maybe_store_on_server_only";
const SECRET_CLEAR_KEY = "secret_clear_key_dont_post_public";

const storage = [];

//
// Routes
//
app.get("/", (req, res) => {
  res.sendFile("src/index.html");
});

app.post("/post", (req, res) => {
  const body = req.body;
  if (body.type === MESSAGE_TYPE) {
    storage.push(body);
    res.send(200);
  } else if (body.type === GET_MESSAGES_TYPE) {
    const { key } = body;
    console.log(`key: ${key}`);
    res.json(
      storage
        .filter((msg) => msg.from === key || msg.to === key)
        .sort((a, b) => parseInt(a.timestamp, 10) - parseInt(b.timestamp, 10)),
    );
  } else if (body.type === CLEAR_TYPE) {
    const { key } = body;
    if (key === SECRET_CLEAR_KEY) storage.splice(0, storage.length);
    res.send(200);
  } else {
    res.send(404);
  }
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
