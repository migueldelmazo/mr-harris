define(['packages/tests/fooChild.i18n'], function (i18n) {

    return {

        _name: 'fooChildView', //view name

        _template: '#sub-foo-view', //backbone template

        _i18n: i18n,

        _domEvents: {
            'click': [
                { action: 'triggerToParent', ev: 'autocomplete' }
            ]
        },

        update: function (modelJSON) {
            this.get$ElByAttr('code').html(JSON.stringify(modelJSON));
        }

    };
});