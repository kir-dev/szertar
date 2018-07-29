if(typeof(EventSource) !== "undefined") {
    var adminSSE = new EventSource("/adminSSE")
    var snd = new Audio('/snd/open-ended.mp3')
    adminSSE.onmessage = function(ev) {
        console.log(ev.data)
        var msg = JSON.parse(ev.data)
        var notification = new Notification(msg.title, {body: msg.body, icon: msg.icon || '/img/dsklogo.png'})
        notification.onclick = ()=>{
            window.open('admin/rents', '_self')
            notification.close()
        }
        notification.onshow = ()=> snd.play()
    }
} else {
}