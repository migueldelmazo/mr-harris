define([], function () {

    var LOCAL_ID = 'local_id',
        session = {},
        utils,

        //localStorage helpers

        existsStorage = function () {
            return window.Storage !== undefined;
        },

        initLocalStorage = function () {
            var localStorage = window.localStorage;
            if (localStorage && _.isEmpty(localStorage.getItem(LOCAL_ID))) {
                localStorage.setItem(LOCAL_ID, JSON.stringify({}));
            }
        },

        localGetMainItem = function () {
            return existsStorage() ? JSON.parse(window.localStorage.getItem(LOCAL_ID)) : {};
        },

        localSetMainItem = function (obj) {
            if (existsStorage()) {
                window.localStorage.setItem(LOCAL_ID, JSON.stringify(obj));
            }
        };

    return {

        _init: function (_utils) {
            utils = _utils;
            initLocalStorage();
        },

        //localStorage

        localGet: function (keys, byDefault) {
            return utils.foo(localGetMainItem(), keys, byDefault);
        },

        localSet: function (key, value) {
            var result = localGetMainItem();
            result[key] = value;
            localSetMainItem(result);
        },

        localDel: function (key) {
            var result = localGetMainItem();
            delete result[key];
            localSetMainItem(result);
        },

        //sessionStorage

        sessionGet: function (keys, byDefault) {
            return utils.foo(session, keys, byDefault);
        },

        sessionSet: function (key, value) {
            session[key] = value;
        },

        sessionDel: function (key) {
            delete session[key];
        }

    };
});