define(['packages/contModel'], function (contModel) {

    return {

        _name: 'subContView', //view name

        _template: '#sub-cont-view', //backbone template

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