module.exports = function(param_name) {
    return function(req, res, next) {
        if(req.body[param_name]) {
            next();
        } else {
            res.sendError("Missing parameter");
        }
    };
};
