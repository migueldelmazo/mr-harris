define([
    'js/utils/classes',
    'js/utils/config',
    'js/utils/dom',
    'js/utils/errors',
    'js/utils/events',
    'js/utils/reports',
    'js/utils/requireError',
    'js/utils/storage',
    'js/utils/string',
    'js/utils/tests',
    'js/utils/testsClass',
    'marionette'
], function (
    classes,
    config,
    dom,
    errors,
    events,
    reports,
    requireError,
    storage,
    string,
    tests,
    testsClass) {

    var _utils = {
            classes: classes,
            config: config,
            dom: dom,
            errors: errors,
            events: events,
            reports: reports,
            requireError: requireError,
            storage: storage,
            tests: tests,
            testsClass: testsClass
        },

        initUtils = function () {
            _.extend(this, _utils); //extend this with required utils
            _.each(_utils, function (util) { //run each _init method
                var method = util._init;
                if (_.isFunction(method)) {
                    method.call(util, utils);
                }
            });
        },

        utils = window.z_utils = {

            //clone object
            clone: function (obj) {
                return JSON.parse(JSON.stringify(obj));
            },

            //return an attribute of an object with dot notation

            dotNotObj: function (obj, keys) {
                return _.reduce(keys.split('.'), function (memo, key) {
                    return _.isObject(memo[key]) ? memo[key] : memo;
                }, obj);
            },

            dotNot: function (obj, keys) {
                return _.reduce(keys.split('.'), function (memo, key) {
                    return memo && memo[key] || undefined;
                }, obj);
            },

            //call a function or return an attribute of an object, with dot notation
            foo: function (obj, keys, byDefault) {
                var foo = utils.dotNot(obj, keys),
                result = _.isFunction(foo) ? foo.apply(obj, utils.sliceArguments(arguments, 3)) : foo;
                return result !== undefined ? result : byDefault;
            },

            //return sliced arguments from parten method
            sliceArguments: function (args, start) {
                args = Array.prototype.slice.apply(args);
                return args.slice(start);
            },

            //parse an object or an array into array
            parseArray: function (array) {
                if (array === undefined) {
                    return [];
                } else if (!_.isArray(array)) {
                    return [array];
                }
                return array;
            },

            //temporal development method
            storeInWindow: function (type, obj) {
                window['z_' + type + '_' + (obj._name || '')] = obj;
            }

        };

    initUtils.call(utils);

    return utils;

});