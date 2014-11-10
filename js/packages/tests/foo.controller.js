define(['packages/tests/foo.view'], function (fooView) {

    return {

        id: 'foo',

        subRoutes: {
            '/:product/:movement': 'lolo'
        },

        events: {
            defaultEvent: [
                { action: 'showInParentView', view: fooView }
            ]
        }

    };
});

