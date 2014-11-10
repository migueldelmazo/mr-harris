define([], function () {

    //throw methods helpers

    var manageError = function (type, error) {
            error = error || {};
            console.group(type + ': ' + error.code);
            delete error.code;
            consoleGruopError(error);
            console.groupEnd();
            createReport(type, error);
        },

        consoleGruopError = function (error) {
            _.each(error, function (value, key) {
                if (_.isObject(value)) {
                    console.group(key);
                    consoleGruopError(value);
                    console.groupEnd();
                } else {
                    console.debug(key + ': ' + value);
                }
            });
        },

        createReport = function (type, error) {
            utils.reports.create(error);
            if (type === 'Error') {
                utils.reports.send();
            }
        },

        utils;

    return {

        _init: function (_utils) {
            utils = _utils;
        },

        throwError: function (error) {
            manageError('Error', error);
            utils.config.get('app').onError();
            setTimeout(function () {
                window.location.href = 'error.html';
            }, 30000);
        },

        throwWarning: function (error) {
            manageError('Warning', error);
        }
    };

});