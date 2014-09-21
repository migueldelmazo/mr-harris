define(['utils'], function (utils) {

    //set model helpers

    var parseBeforeSet = function (attr, value) {
            _.each(utils.foo(this, '_parseBeforeSet'), function (parse, parseAttr) {
                if (parseAttr === attr) {
                    if (parse.parse === 'parseInt') {
                        value = parseInt(value, 10) || parse.defaultValue || 0;
                    }
                }
            }, this);
            return value;
        },

        validateBeforeSet = function (attr, value) {
            //if (this.validate(attr, value))
            //coger las validaciones
            //ver si hay que validar
            //llamar a getValidations pasandole solo este attributo
            //llamar a validate
            return true;
        },

        constructorModel = Backbone.Model;

    //overwrite set method

    Backbone.Model.prototype.set = _.wrap(Backbone.Model.prototype.set, function (setFunc, attr, value, options) {
        value = _.isString(attr) ? parseBeforeSet.call(this, attr, value) : value; //parse value
        if (validateBeforeSet.call(this, attr, value)) {
            setFunc.call(this, attr, value, options); //Backbone.Model set
        }
        //if value is equal than previous value, Backbone doesn't trigger change:attr. We always trigger set:attr
        this.trigger('set:' + attr);
    });
});
