var expect = require('chai').expect;
var renderMainMW = require('../../../middlewares/generic/renderMain');

describe('renderMain MW', function () {
    it('should call res.render to pages/main', function (done) {
        var reqMock = {};
        var resMock = {
            render: function (page, params) {
                expect(page).be.eql("pages/main");
                done();
            },
            tpl: {}
        };
        var nextMock = function () {};

        renderMainMW()(reqMock, resMock, nextMock());
    });
});
