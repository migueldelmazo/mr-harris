define([], function () {

    return {
        appHomeHash: '',
        appStartHash: '',
        ajaxUrl: 'json/',
        routes: {
            testFoo: {
                controller: 'testFoo'
            },
            'testFoo/:product': {
                controller: 'testFoo'
            },
            testService: {
                controller: 'testService'
            }
        },

        controllers: {
            header: {
                url: 'packages/header/header.controller'
            },
            testFoo: {
                url: 'packages/tests/foo.controller'
            },
            testService: {
                url: 'packages/tests/service.controller'
            }
        }
    };

});