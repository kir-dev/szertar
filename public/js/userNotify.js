if(typeof(EventSource) !== "undefined") {
    var userSSE = new EventSource("/userSSE")
    userSSE.onmessage = function(ev) {
        var data = JSON.parse(ev.data)
        var notification = new Notification('Test', {body: data.msg})
    }
} else {
}