/* eslint-disable no-undef */
// We need to ask the user for permission
if (Notification.permission !== 'denied') Notification.requestPermission()

if (
  typeof EventSource !== 'undefined' &&
  Notification.permission === 'granted'
) {
  const adminSSE = new EventSource('/adminSSE')
  const snd = new Audio('/snd/open-ended.mp3')
  adminSSE.onmessage = function(ev) {
    const msg = JSON.parse(ev.data)
    const notification = new Notification(msg.title, {
      requireInteraction: true,
      body: msg.body,
      icon: msg.icon || '/img/dsklogo.png'
    })
    notification.onclick = () => {
      notification.close()
      window.open('/admin/rents', '_self')
    }
    notification.onshow = () => {
      snd.play()
      if ($('.newRents').text())
        $('.newRents').text(parseInt($('.newRents').html()) + 1)
      else $('.newRents').text(parseInt(1))
    }
  }
}
