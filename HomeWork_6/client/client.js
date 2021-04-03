require('regenerator-runtime/runtime')

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js", { scope: "./" })
    .then((reg) => {
      console.log("Registration succeeded. Scope is " + reg.scope);
    })
    .catch((error) => {
      console.log("Registration failed with " + error);
    });

    const channel = new BroadcastChannel('sw');
    channel.addEventListener('message', (event) => {
      new Notification("Notification number " + event.data.msg.notificationNumber)
    })
}
