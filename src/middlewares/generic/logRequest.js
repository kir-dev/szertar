exports.logrequest = function() {
    return function(req, res, next) {
        console.log((new Date()).toLocaleString() + '\t' + req.method + '\t' + req.url);
        next();
    };
};
