define([], function () {

    return {

        _name: 'fooChildView', //view name

        _template: '#sub-foo-view', //backbone template

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