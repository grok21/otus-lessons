const publicVapidKey = "BMxutJUhidJV7vcz_s5JKYOadv9Jp45Fm4BHn0dGcWtbogaXMCQB112AidBTfyzEB6ewNIlJDPUx_NedeucpeiA"

// Check for service-worker
if ('serviceWorker' in navigator) {
  send().catch(err => console.log(err))

}

// Register SW, register push, send push 
async function send() {
  console.log("Register service worker")
  const register = await navigator.serviceWorker.register('/service-worker.js', {
    scope: '/'
  })
  console.log("SW registered")
  console.log(register)

  console.log("Register push...")
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true, 
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  })
  console.log("Push registered...")

  console.log("Sending push...")
  await fetch('/subscribe', {
    method: 'POST',
    bidy: JSON.stringify(subscription), 
    headers: {
      'content-type': 'application/json'
    }
  })
  console.log("Push sent")
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}