if(typeof(EventSource) !== "undefined") {
    var adminSSE = new EventSource("/adminSSE")
    adminSSE.onmessage = function(ev) {
        var data = JSON.parse(ev.data)
        var notification = new Notification('Test', {body: data.msg})
    }
} else {
}