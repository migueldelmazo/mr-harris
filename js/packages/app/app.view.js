define(['utils'], function (utils) {

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

        onRender: function () {
            this.app.loadController('header', { regionName: 'header' });
        }

    };
});