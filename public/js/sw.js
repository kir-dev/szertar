const applicationServerPublicKey =
  // eslint-disable-next-line max-len
  'BHlo1PhaPnRUKWPATl_uAAY66KXi21pRlW1tLtS38HywHCSD_QUhtpqx3oaTuwta66UD0hVua3uto9yn6GBzFy8'
let msg

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.')
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`)

  msg = event.data.json()
  const title = 'SCH Szertár: ' + msg.title || ''
  const options = {
    body: msg.body || '',
    icon: msg.icon || '/img/dsklogo.png',
    badge: msg.badge || '/img/dsklogo.png'
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click Received.')

  event.notification.close()

  // eslint-disable-next-line no-undef
  event.waitUntil(clients.openWindow(msg.link || '/'))
})

self.addEventListener('pushsubscriptionchange', event => {
  console.log('[Service Worker]: "pushsubscriptionchange" event fired.')
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey)
  event.waitUntil(
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
      .then(newSubscription => {
        // TODO: Send to application server
        console.log('[Service Worker] New subscription: ', newSubscription)
      })
  )
})
