define([
    'packages/tests/foo.view',
    'packages/tests/service.view'
], function (fooView, serviceView) {

    return {

        routes: {
            testFoo: 'testFoo',
            testService: 'testService'
        },

        testFoo: function () {
            this.app.appView.showView({
                id: 'foo',
                view: fooView
            });
        },

        testService: function () {
            this.app.appView.showView({
                id: 'testService',
                view: serviceView
            });
        }

    };
});