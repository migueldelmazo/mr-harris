define([
    'utils',
    'packages/subContView',
    'packages/contModel'
], function (utils, subContView, contModel) {

    return {

        _name: 'contView', //view name

        _template: '#cont-view', //backbone template

        _regions: { //marionette regions
            subCont: 'subCont'
        },

        _initialViewsInRegions: [ //show this regions on init
            {
                id: 'subCont',
                region: 'subCont',
                view: subContView,
                listenToView: { //listening triggers of this view
                    autocomplete: [
                        { action: 'set', to: 'model', toItem: 'user', value: 'elenita' },
                        { action: 'set', to: 'model', toItem: 'name', value: 'nombre' },
                        { action: 'set', to: 'model', toItem: 'mail', value: 'mail@mail.org' },
                        { action: 'set', to: 'model', toItem: 'age', value: '20' },
                        { action: 'runViewMethod', method: 'oneMethod', value: 'executed from subContView' },
                        { action: 'activateAndShowModelValidations', attrs: ['user', 'mail'] }
                    ]
                }
            }
        ],

        oneMethod: function (action, value) {
            utils.reports.create('contView: oneMethod ' + value);
        },

        _model: contModel, //model of view

        _modelBinds: [ //items bind between model and dom
            { model: 'user', dom: 'user' }, 'name', 'mail', 'age'
        ],

        _domEvents: { //dom events actions
            'keyup [js=user]': [
                { action: 'set', from: 'dom', to: 'model', fromItem: 'user', toItem: 'user' },
                { action: 'activateModelValidations', attrs: 'user' },
                { action: 'showModelValidations' },
                { action: 'runViewMethod', method: 'oneMethod', value: 'contView: runViewMethod' },
                { action: 'runModelMethod', method: 'oneMethod', value: 'contView: runModelMethod' },
                { action: 'triggerToModel', ev: 'trySet:user' },
                { action: 'triggerToApp', ev: 'userChanged', from: 'model', fromItem: 'user' },
                { action: 'updateChild', viewName: 'subContView', from: 'model', fromFn: 'toJSON' },
                { action: 'createReport', value: 'contView: keyup user' }
            ],
            'keyup [js=mail]': [
                { action: 'activateAndShowModelValidations', attrs: 'mail' }
            ],
            'submit [js=form]': [
                { action: 'runModelMethod', method: 'submit' }
            ],
            'click [js=submit]': [
                { action: 'runModelMethod', method: 'submit' },
                { action: 'triggerToApp', ev: 'submit' }
            ]
        },

        _modelEvents: { //model events actions
            'trySet:user': [
                { action: 'createReport', value: 'contView: trySet user' }
            ],
            'set:user': [
                { action: 'toggle', el: ['label-mail', 'label-age'], from: 'model', fromItem: 'user' },
                { action: 'toggleClass', from: 'model', fromItem: 'user', to: 'dom', el: 'label-user', className: 'selected' },
                { action: 'toggleProperty', from: 'model', fromItem: 'user', to: 'dom', el: 'submit', property: 'disabled' }
            ],
            'change:user': [
                { action: 'createReport', value: 'contView: set user' }
            ]
        },

        _appEvents: { //app events actions
            appEventProof: [
                { action: 'set', to: 'model', toItem: 'user', value: 'appEventProof' },
            ]
        },

        _onRenderActions: []
    };
});