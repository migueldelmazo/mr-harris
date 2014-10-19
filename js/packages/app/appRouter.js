define([
    'packages/tests/fooView',
    'packages/tests/serviceView'
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