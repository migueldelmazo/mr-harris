define(['utils'], function (utils) {

    //getValidations helpers

    var parseValidation = function (validation) {
            return _.extend(validation, _.extend({
                msg: '',
                type: 'error',
                userChanged: this._userAttrsChange.indexOf(validation.attr) >= 0
            }, validation));
            return validation;
        },

        setModelValueIntoValidation = function (validation, customValue) {
            var method = this[validation.parseMethod],
                value = parseValueBeforeValidation.call(this, validation, customValue);
            validation.value = _.isFunction(method) ? method.call(this, value) : value;
        },

        parseValueBeforeValidation = function (validation, customValue) {
            var value = customValue || this.get(validation.attr);
            if (validation.parse === 'parseInt') {
                return parseInt(value, 10);
            }
            return value;
        };

        getMethodResult = function (validation) {
            var result = this[validation.method].call(this, validation);
            validation.methodResult = validation.not === true ? !result : !!result;
        },

        setIsValid = function (validation) {
            if (validation.type === 'warning' || validation.type === 'success') {
                validation.isValid = true;
            } else {
                validation.isValid = !validation.methodResult;
            }
        };

    _.extend(Backbone.Model.prototype, {

        //validate method to be run by backbone model isValid method
        validate: function (attr, value) {
            return _.reduce(this.getValidations(attr, value), function (isValid, validation) {
                return isValid && validation.isValid;
            }, true);
        },

        /*
            return a array of objects with this attributes:
            {
                attr: 'atribute',
                isValid: true/false,
                method: 'methodToEvaluate',
                msg: 'error message',
                methodResult: true/false, //method result
                type: 'success/warning/error',
                userChanged: true/false, //if the user has activate the attribute validation
                value: 'value'
            }
        */
        getValidations: function (attr, value) {
            return _.compact(_.map(utils.clone(utils.parseArray(this._validations)), function (_validation) {
                if (attr === undefined || attr === _validation.attr) {
                    var validation = parseValidation.call(this, _validation); //prevent overwrite validation object
                    setModelValueIntoValidation.call(this, validation, value);
                    getMethodResult.call(this, validation);
                    setIsValid.call(this, validation);
                    return validation;
                }
            }, this));
        },

        //mark this attributes as modified by the user
        activateAttrValidation: function (attrs) {
            this._userAttrsChange = this._userAttrsChange.concat(utils.parseArray(attrs));
            this._userAttrsChange = _.unique(this._userAttrsChange);
        }

    });
});
