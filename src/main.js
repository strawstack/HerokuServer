(async () => {
  console.log("on load");

  document
    .querySelector("#requestButton")
    .addEventListener("click", async (e) => {
      const result = await Notification.requestPermission();
      console.log(result);
    });

  let sendOnce = false;

  document.body.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      if (sendOnce) return;
      sendOnce = true;
      setTimeout(() => {
        const text = `HEY! Your task is now overdue.`;
        const notification = new Notification("Title", { body: text });
        console.log("notification sent");
      }, 2000);
    }
  });
})();
