define(['utils'], function (utils) {

    return {

        _name: 'contModel', //model name

        _defaults: { //default backbone attributes
            age: '',
            level: 0,
            mail: '',
            name: '',
            user: ''
        },

        _parseBeforeSet: { //parse value before set in model
            age: {
                parse: 'parseInt',
                defaultValue: 18
            },
            level: {
                parse: 'parseInt',
                defaultValue: 5
            }
        },

        _validateBeforeSet: ['level'],

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
            {   //if user is equal than admin warning = true, msg = warning
                attr: 'user',
                isValid: true, //if user is equal than admin we show message but the validation passed
                method: 'isEqual',
                methodParams: 'admin',
                msg: 'are you sure?',
                type: 'warning'
            },
            {   //if mail is invalid, error = true, msg = empty field
                attr: 'mail',
                method: 'regex',
                not: true,
                regex: 'isEmail',
                msg: 'invalid email'
            },
            {   //if lavel is great or equal than 0, error = true
                attr: 'level',
                not: true,
                method: 'isGreatOrEqualThan',
                methodParams: 0,
                parse: 'parseInt'
            },
            {   //if lavel is smaller than 10, error = true
                attr: 'level',
                not: true,
                method: 'isSmallerOrEqualThan',
                methodParams: 10,
                parse: 'parseInt'
            },
            {
                attr: 'level',
                not: true,
                method: 'isNumber',
                parse: 'parseInt'
            }
        ],

        submit: function () {
            utils.reports.create('contModel: submit model');
        }

    };

});