define([], function () {

    var config = window.z_config = {},
        utils;

    return {

        _init: function (_utils) {
            utils = _utils;
        },

        get: function (keys, byDefault) {
            return utils.foo(config, keys, byDefault);
        },

        set: function (key, value) {
            var obj = {};
            if (_.isString(key)) {
                obj[key] = value;
            } else {
                obj = key;
            }
            _.extend(config, obj);
        }

    };
});