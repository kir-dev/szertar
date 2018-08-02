// We need to ask the user for permission
if (Notification.permission !== 'denied') Notification.requestPermission()

if(typeof(EventSource) !== "undefined" && Notification.permission === "granted") {
    var userSSE = new EventSource("/userSSE")
    var snd = new Audio('/snd/open-ended.mp3')
    userSSE.onmessage = function(ev) {
        var msg = JSON.parse(ev.data)
        var notification = new Notification(msg.title, {body: msg.body, icon: msg.icon || '/img/dsklogo.png'})
        snd.play()
    }
}