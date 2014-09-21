require([], function () {

    //main web file: call 'wakeup.json' and evaluates the returned configuration, to load an application or other

    var onDoneWakeup = function (data) {
            if (!data) {
                onErrorWakeup();
            }
            if (data.hrefRedirection) {
                window.location.href = data.hrefRedirection;
                return;
            }
            if (data.requireWakeupConf) {
                requirejs.config(data.requireWakeupConf);
            }
            if (data.appStartFile) {
                require([data.appStartFile], function (app) {
                    app(data);
                });
            }
        },

        onErrorWakeup = function () {
            window.location.href = 'error.html';
        },

        xhr = new XMLHttpRequest();

    //set require onError
    //requirejs.onError = onErrorWakeup;

    //call wakeup
    xhr.open('POST', 'json/wakeup.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            onDoneWakeup(JSON.parse(xhr.responseText));
        } else if ([404, 500 , 503, 504].indexOf(xhr.status) > -1) {
            onErrorWakeup(xhr);
        }
    };
    xhr.send();

});
