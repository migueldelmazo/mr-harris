define(['utils'], function (utils) {

    //constructor service helpers

    var //service constructor
        constructor = function (options) {
            parseOptions.call(this, options);
            initPromise.call(this);
        },

        //init service options
        parseOptions = function (options) {
            options = options || {};
            this.method = options.method;
            this.params = options.params || {};
            this.type = options.type || 'GET';
        },

        //init service promise
        initPromise = function () {
            this.promise = $.Deferred();
        },

        //call service method, if return false we not call ajax
        runServiceMethod = function () {
            return this[this.method]() === undefined ? true : false;
        },

        //validate before or after send ajax call
        validate = function (method) {
            return (this[method]) ? this[method]() : true;
        },

        //parse before or after send ajax call
        parse = function (method) {
            if (this[method]) {
                this[method]();
            };
        },

        //extend service class
        extendPrototype = function (serviceClass) {
            _.extend(serviceClass.prototype, { //extend service class

                //call service method to set url and ajax options
                initialize: function () {
                    if (runServiceMethod.call(this)) {
                        if (validate.call(this, this.validateBeforeSend)) {
                            parse.call(this, this.parseBeforeSend);
                            utils.services.callAjax(this.getServiceKey());
                        } else {
                            this.reject();
                        }
                    }
                },

                //resolve this service promise with response data
                resolve: function (responseData) {
                    var that = this;
                    setTimeout(function () { //we wait 0 seconds to simulate an ajax call and resolve service
                        that.responseData = responseData;
                        if (validate.call(that, that.validateAfterSend)) {
                            parse.call(that, that.parseAfterSend);
                            that.promise.resolve(that.responseData);
                        }
                    }, 0);
                },

                //reject this service promise
                reject: function () {
                    var that = this;
                    setTimeout(function () { //we wait 0 seconds to simulate an ajax call and reject service
                        that.promise.reject();
                    }, 0);
                },

                //get mandatory options
                getServiceKey: function () {
                    return {
                        params: this.params,
                        type: this.type,
                        url: this.url
                    };
                },

                //return this service promise
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