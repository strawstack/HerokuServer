(async () => {
  console.log("on load");

  document
    .querySelector("#requestButton")
    .addEventListener("click", async (e) => {
      const result = await Notification.requestPermission();
      console.log(result);
    });

  let canSend = true;

  document.body.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      if (canSend) {
        canSend = false;
        setTimeout(() => {
          const text = `HEY! Your task is now overdue.`;
          const notification = new Notification("Title", { body: text });
          console.log("notification sent");
          canSend = true;
        }, 2000);
      }
    }
  });
})();
