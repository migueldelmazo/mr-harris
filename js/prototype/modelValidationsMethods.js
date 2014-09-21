define(['utils'], function (utils) {

    //default regular expressions

    var regexs = {
            email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        };

    //model validations helpers

    _.extend(Backbone.Model.prototype, {

        //validation attribute methods

        isEmpty: function (validation) {
            return validation.value === '';
        },

        isEqual: function (validation) {
            return _.isEqual(validation.value, validation.methodParams);
        },

        //regex,

        regex: function (validation) {
            return regexs[validation.regex].test(validation.value);
        }

    });
});
