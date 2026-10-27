//
// Example script send and retrieve messages from server
//

const BASE = "https://heroku-server-rch-22279f2bdd5b.herokuapp.com/post";

const CLEAR_TYPE = "clear_type";
const MESSAGE_TYPE = "MESSAGE";
const GET_MESSAGES_TYPE = "GET_MESSAGES";

const LOCAL_KEY = "local_key_generated_per_client";
const ROOT_KEY = "root_key_maybe_store_on_server_only";
const SECRET_CLEAR_KEY = "secret_clear_key_dont_post_public";

// const message_type = {
//   type: "[MESSAGE_TYPE]",
//   from: "[key]",
//   to: ROOT_KEY,
//   message: "[message text]",
//   timestamp: "[time sent]",
// };

// const message_type = {
//   type: "[GET_MESSAGES_TYPE | CLEAR_TYPE]",
//   key,
// };

async function sendMsg(from, to, message) {
  const response = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: MESSAGE_TYPE,
      from,
      to,
      message,
      timestamp: Date.now().toString(),
    }),
  });
}

async function getMsgs(key) {
  const response = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: GET_MESSAGES_TYPE,
      key,
    }),
  });
  return await response.json();
}

async function clearMsgs(key) {
  const response = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: CLEAR_TYPE,
      key,
    }),
  });
}

async function main() {
  await clearMsgs(SECRET_CLEAR_KEY);
  await sendMsg(LOCAL_KEY, ROOT_KEY, "hello");
  await sendMsg(ROOT_KEY, LOCAL_KEY, "Hi");
  await sendMsg(LOCAL_KEY, ROOT_KEY, "How are you?");
  await sendMsg(ROOT_KEY, LOCAL_KEY, "I'm good");
  const msgs = await getMsgs(LOCAL_KEY);
  console.log(msgs);
}

main();
