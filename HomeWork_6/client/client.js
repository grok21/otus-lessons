require('regenerator-runtime/runtime')
console.log(navigator)


async function registerSW() {
  console.log("Register service worker")
  const register = await navigator.serviceWorker.register('./service-worker.js', {
    scope: '/'
  }).catch(e => console.log(e))
  console.log("SW registered")
}
//registerSW()


if ('serviceWorker' in navigator) {
  registerSW().catch(err => console.log(err))
}





/*
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', {
    scope: '/'
  }).then( registration => console.log(Registered))
    .catch(e => console.log(e))
  //registerSW().catch(err => console.log(err))
} else {
  console.log("Данный браузер не поддерживает Service Worker")
}
*/

