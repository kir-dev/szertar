if(typeof(EventSource) !== "undefined") {
    var userSSE = new EventSource("/userSSE")
    var snd = new Audio('/snd/open-ended.mp3')
    userSSE.onmessage = function(ev) {
        var msg = JSON.parse(ev.data)
        var notification = new Notification(msg.title, {body: msg.body, icon: msg.icon || '/img/dsklogo.png'})
        snd.play()
    }
} else {
}