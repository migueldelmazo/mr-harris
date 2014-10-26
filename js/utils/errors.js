define([], function () {

    //throw methods helpers

    var manageError = function (type, error) {
            console.group(type + ': ' + error.code);
            delete error.code;
            consoleGruopError(error);
            console.groupEnd();
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
        };

    return {

        throwError: function (error) {
            manageError('Error', error);
            //TODO: avisar a la aplicacion para que haga lo que tenga que hacer
            //TODO: pensar en como gestionar reportes y estadisticas de la aplicacion
            //TODO: bloquear la aplicacion
        },

        throwWarning: function (error) {
            manageError('Warning', error);
        }
    };

});