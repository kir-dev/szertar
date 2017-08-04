var logRequestMW = require('../../../middlewares/generic/logRequest');

describe('logRequest MW', function () {
    it('should call next', function (done) {
        var reqMock = {};
        var resMock = {};
        var nextMock = function () {
            done();
        };

        logRequestMW.logrequest()(reqMock, resMock, nextMock())
    });
});

