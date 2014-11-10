define([
    'packages/header/header.view',
    'packages/header/headerLogin.view'
], function (headerView, headerLoginView) {

    return {

        id: 'header',

        events: {
            defaultEvent: [
                { action: 'showInParentView', view: headerView }
            ],
            login: [
                { action: 'showInParentView', view: headerLoginView }
            ]
        }

    };
});
