define([
    'utils',
    'packages/tests/fooChildView',
    'packages/tests/fooModel'
], function (utils, fooChildView, fooModel) {

    return {

        _name: 'fooView', //view name

        _template: '#foo-view', //backbone template

        _regions: { //marionette regions
            fooChild: 'fooChild'
        },

        _initialViewsInRegions: [ //show this regions on init
            {
                id: 'fooChild',
                region: 'fooChild',
                view: fooChildView,
                listenToView: { //listening triggers of this view
                    autocomplete: [
                        { action: 'set', to: 'model', toItem: 'user', value: 'usuario' },
                        { action: 'set', to: 'model', toItem: 'name', value: 'nombre' },
                        { action: 'set', to: 'model', toItem: 'mail', value: 'mail@mail.org' },
                        { action: 'set', to: 'model', toItem: 'age', value: '20' },
                        { action: 'runViewMethod', method: 'oneMethod', value: 'executed from fooChildView' },
                        { action: 'activateAndShowModelValidations', attrs: ['user', 'mail'] }
                    ]
                }
            }
        ],

        oneMethod: function (action, value) {
            utils.reports.create('fooView: oneMethod ' + value);
        },

        _model: {
            model: fooModel, //model of view
        }

        _modelBinds: [ //items bind between model and dom
            { model: 'user', dom: 'user' }, 'name', 'mail', 'age', 'level.level'
        ],

        _domEvents: { //dom events actions
            'keyup [js="user"]': [
                { action: 'set', from: 'dom', to: 'model', fromItem: 'user', toItem: 'user' },
                { action: 'activateModelValidations', attrs: 'user' },
                { action: 'showModelValidations' },
                { action: 'runViewMethod', method: 'oneMethod', value: 'fooView: runViewMethod' },
                { action: 'runModelMethod', method: 'oneMethod', value: 'fooView: runModelMethod' },
                { action: 'triggerToModel', ev: 'trySet:user' },
                { action: 'triggerToApp', ev: 'userChanged', from: 'model', fromItem: 'user' },
                { action: 'updateChild', viewName: 'fooChildView', from: 'model', fromFn: 'toJSON' },
                { action: 'createReport', value: 'fooView: keyup user' }
            ],
            'keyup [js="mail"]': [
                { action: 'activateAndShowModelValidations', attrs: 'mail' }
            ],
            'keyup [js="level.level"]': [
                //{ action: 'set', from: 'dom', to: 'model', fromItem: 'level.level', toItem: 'level.level' }
            ],
            'submit [js="form"]': [
                { action: 'runModelMethod', method: 'submit' }
            ],
            'click [js="submit"]': [
                { action: 'runModelMethod', method: 'submit' },
                { action: 'triggerToApp', ev: 'submit' }
            ]
        },

        _modelEvents: { //model events actions
            'trySet:user': [
                { action: 'createReport', value: 'fooView: trySet user' }
            ],
            'set:user': [
                { action: 'toggle', el: ['label-mail', 'label-age'], from: 'model', fromItem: 'user' },
                { action: 'toggleClass', from: 'model', fromItem: 'user', to: 'dom', el: 'label-user', className: 'selected' }
            ],
            'change:user': [
                { action: 'createReport', value: 'fooView: set user' }
            ],
            'set:level.level': [
                { action: 'toggleProperty', from: 'model', fromFn: 'validate', to: 'dom', el: 'submit', property: 'disabled' }
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