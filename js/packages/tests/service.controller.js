define(['packages/tests/service.view'], function (serviceView) {

    return {

        id: 'service',

        events: {
            defaultEvent: [
                { action: 'showInParentView', view: serviceView }
            ]
        }

    };
});

