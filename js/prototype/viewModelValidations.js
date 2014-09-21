define(['utils'], function (utils) {

    //showModelValidations helpers

    var parseValidationsToView = function (validations) {
            var validationsView = {};
            _.each(validations, function (validation) {
                var attr = validation.attr;
                if (!validationsView.hasOwnProperty(attr)) {
                    validationsView[attr] = [];
                }
                validationsView[attr].push(validation);
            });
            return validationsView;
        },

        showModelValidation = function (validations, attr) {
            var $el = this.$('[js-validation=' + attr + ']'),
                $elValidationMirror = this.$('[js-validation-mirror=' + attr + ']');
            $el.html('').removeClass('val-success val-warning val-error');
            $elValidationMirror.removeClass('val-success val-warning val-error');
            _.each(validations, function (validation) {
                if (validation.userChanged) {
                    if (validation.methodResult) {
                        $('<li />').addClass('val-' + validation.type).html(validation.msg).appendTo($el);
                        $el.addClass('val-' + validation.type);
                        $elValidationMirror.addClass('val-' + validation.type);
                    }
                }
            });
        };

    //extend view class

    _.extend(Backbone.View.prototype, {

        //activate validation for model attributes and show validations in dom
        activateAndShowModelValidations: function (action) {
            this.activateModelValidations(action);
            this.showModelValidations(action);
        },

        //activate validation for model attributes
        activateModelValidations: function (action) {
            this._modelInstance.activateAttrValidation(action.attrs);
        },

        //show model validations in dom
        showModelValidations: function () {
            var validations = this._modelInstance.getValidations();
            validations = parseValidationsToView.call(this, validations);
            _.each(validations, function (validation, attr) {
                showModelValidation.call(this, validation, attr);
            }, this);
        }

    });
});