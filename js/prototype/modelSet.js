define(['utils'], function (utils) {

    //set model helpers

    var //parse value before set
        parseBeforeSet = function (attr, value) {
            if (_.isString(attr)) {
                _.each(this._parseBeforeSet, function (parse, parseAttr) {
                    if (parseAttr === attr && parse.parse === 'parseInt') {
                        value = utils.parseInt(value, parse.defaultValue);
                    }
                });
            }
            return value;
        },

        //check if attr is in _validateBeforeSet and validate
        validateBeforeSet = function (attr, value) {
            return utils.parseArray(this._validateBeforeSet).indexOf(attr) >= 0 ? this.validate(attr, value): true;
        },

        //set in model with dot notation
        setDotNot = function (backboneSetMethod, dotNotKeys, value) {
            backboneSetMethod.call(this, utils.setDotNot(this.toJSON(), dotNotKeys, value), value);
            this.trigger('change');
        };

    //wrap set method

    Backbone.Model.prototype.set = _.wrap(Backbone.Model.prototype.set, function (backboneSetMethod, attr, value, options) {
        if (_.isString(attr)) {
            if (validateBeforeSet.call(this, attr, value)) {
                value = parseBeforeSet.call(this, attr, value);
                if (attr.indexOf('.') >= 0) {
                    setDotNot.call(this, backboneSetMethod, attr, value);
                } else {
                    backboneSetMethod.call(this, attr, value, options);
                }
            }
            //if value is equal than previous value, Backbone doesn't trigger change:attr. We always trigger set:attr
            this.trigger('set:' + attr);
        } else {
            backboneSetMethod.call(this, attr, value); //if attr is an object, call method normally
        }
    });
});
