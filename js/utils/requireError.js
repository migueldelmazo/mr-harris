define([], function () {

    return {
        _init: function (utils) {
            //define require onError callback
            requirejs.onError = function (error) {
                utils.errors.throwError({
                    lib: 'require',
                    method: 'onError',
                    code: 'require error',
                    requireMessage: error.message,
                    requireModules: error.requireModules,
                    requireType: error.requireType,
                    requireStack: error.stack
                });
            }
        }
    };

});