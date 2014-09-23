define(['utils'], function (utils) {

    //set model helpers

    var //parse value before set
        parseBeforeSet = function (attr, value) {
            _.each(utils.foo(this, '_parseBeforeSet'), function (parse, parseAttr) {
                if (parseAttr === attr) {
                    if (parse.parse === 'parseInt') {
                        value = parseInt(value, 10) || parse.defaultValue || 0;
                    }
                }
            }, this);
            return value;
        },

        //check if attr is in _validateBeforeSet and valida
        validateBeforeSet = function (attr, value) {
            if (_.isString(attr) && utils.parseArray(this._validateBeforeSet).indexOf(attr) >= 0) {
                return this.validate(attr, value);
            } else {
                return true;
            }
        },

        constructorModel = Backbone.Model;

    //overwrite set method

    Backbone.Model.prototype.set = _.wrap(Backbone.Model.prototype.set, function (setFunc, attr, value, options) {
        if (validateBeforeSet.call(this, attr, value)) {
            value = _.isString(attr) ? parseBeforeSet.call(this, attr, value) : value; //parse value
            setFunc.call(this, attr, value, options); //Backbone.Model set
        }
        //if value is equal than previous value, Backbone doesn't trigger change:attr. We always trigger set:attr
        this.trigger('set:' + attr);
    });
});
