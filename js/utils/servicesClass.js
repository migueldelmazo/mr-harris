define(['utils'], function (utils) {

    //constructor service helpers

    var //service constructor
        constructor = function (options) {
            initOptions.call(this, options);
            initPromise.call(this);
        },

        //init service options
        initOptions = function (options) {
            options = options || {};
            this.method = options.method;
            this.params = options.params;
            this.type = options.type || 'GET';
        },

        //init service promise
        initPromise = function () {
            this.promise = $.Deferred();
        },

        //call service method to get ajax options
        getAjaxOptions = function () {
            return this[this.method]();
        },

        //extend service class
        extendPrototype = function (serviceClass) {
            _.extend(serviceClass.prototype, { //extend service class

                //call service method to get ajax options
                initialize: function () {
                    var ajaxOptions = getAjaxOptions.call(this);
                    //TODO: parse and validate before ajax call
                    utils.services.callAjax(ajaxOptions);
                },

                //resolve this service promise with response data
                resolve: function (data) {
                    //TODO: parse and validate after ajax call
                    this.promise.resolve(data);
                },

                //reject this service promise
                reject: function () {
                    this.promise.reject();
                },

                //get mandatory options
                getOptions: function () {
                    return {
                        params: this.params,
                        type: this.type,
                        url: this.url
                    };
                },

                getPromise: function () {
                    return this.promise;
                }

            });
        },

        //utils

        utils;

    return {

        _init: function (_utils) {
            //store utils
            utils = _utils;
            //create and extend Service
            extendPrototype(utils.classes.create('service', constructor));
        }

    };
});