define([
    'utils',
    'packages/header/header.view'
], function (utils, headerView) {

    return {

        _name: 'appView', //name of this view

        _el: '#app', //el, only for app view

        _template: '#app-view', //template

        _regions: { //regions
            header: 'header',
            cont: 'cont',
            footer: 'footer'
        },

        _defaultRegion: 'cont', //default region

        _initialViewsInRegions: [ //show this views on init
            {
                id: 'header', //id of view
                region: 'header',
                view: headerView
            }
        ]

    };
});