define(['utils'], function (utils) {

    return {

        _name: 'contModel', //model name

        _defaults: { //default backbone attributes
            age: '',
            name: '',
            mail: '',
            user: ''
        },

        _parseBeforeSet: { //parse value before set in model
            age: {
                parse: 'parseInt',
                defaultValue: 18
            }
        },

        _validateBeforeSet: ['age'], //TODO

        _modelEvents: { //model events actions
            /*'change:user': [
                { action: 'incAttr', fromAttr: 'user', toAttr: 'name' },
                { action: 'setAttr', fromAttr: 'user', toAttr: 'mail' },
                { action: 'triggerEvent', ev: 'changed:mail' }
            ]*/
        },

        _validations: [
            {   //if user is empty error = true, msg = empty field
                attr: 'user',
                method: 'isEmpty',
                msg: 'empty field'
            },
            {   //if user is equal admin warning = true, msg = warning
                attr: 'user',
                isValid: true,
                method: 'isEqual',
                methodParams: 'admin',
                msg: 'are you sure?',
                type: 'warning'
            },
            {   //if mail is invalid, error = true, msg = empty field
                attr: 'mail',
                method: 'regex',
                not: true,
                regex: 'email',
                msg: 'invalid email'
            }
        ],

        submit: function () {
            utils.reports.create('contModel: submit model');
        }

    };

});