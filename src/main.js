(async () => {
  console.log("on load");

  const result = await Notification.requestPermission();
  console.log(result);

  setTimeout(() => {
    const text = `HEY! Your task is now overdue.`;
    const notification = new Notification("Title", { body: text });
  }, 2000);
})();
