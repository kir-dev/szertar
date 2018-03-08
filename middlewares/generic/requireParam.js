module.exports = function(param_name) {
    return function(req, res, next) {
        if(req.body[param_name]) {
            return next();
        } 
        return res.sendError('Missing parameter');
    };
};
