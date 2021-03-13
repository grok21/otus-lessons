console.log("Service-worker loaded")

self.addEventListener('push', event => {
  const data = event.data.json()
  console.log("Push has been received")
  self.registration.showNotification(data.title, {
    body: 'Notified by nodejs server'
  })
})