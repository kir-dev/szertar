var expect = require('chai').expect;
var requireParamMW = require('../../../middlewares/generic/requireParam');

describe('requireParam MW', function () {
    it('calls next if param is provided', function (done) {
        var reqMock = {
            body: {
                param: "exists"
            }
        };
        var resMock = {
            sendError: function (message) {
                expect(true).be.eql(false)
            }
        };
        var nextMock = function () {
            done();
        };

        requireParamMW("param")(reqMock, resMock, nextMock());
    });

    it('sends error if param is not provided', function(done) {
        var reqMock = {
            body: {}
        };
        var resMock = {
            sendError: function (message) {
                expect(message).be.eql("Missing parameter");
                done();
            }
        };
        var nextMock = function () {};

        requireParamMW("param")(reqMock, resMock, nextMock());
    });
});
