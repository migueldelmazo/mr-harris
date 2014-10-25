define(['utils'], function (utils) {

    /*
     *  util: serviceClass
     *
     *  A service is an instance of 'serviceClass'
     *
     *  Flow:
     *  - constructor parse options and init promise
     *  - utils service run 'initialize':
     *    - Call instante options 'method', for set serviceOptions
     *    - Validate and parse params before send ajax call
     *    - If options 'method' return 'undefined' call ajax
     *  - When ajax call finished:
     *    - Validate and parse responseData after send ajax call
     *    - Resolve or reject method this promise
     *
     *  'ServiceClass' is designed to send an ajax call.
     *  But the options 'method' can perform other operations, such as get data from localStorage.
     *  This options 'method' is responsible for resolving the promise.
     */

    var constructor = function (options) {
            parseConstructorOptions.call(this, options);
            initPromise.call(this);
        },

        parseConstructorOptions = function (options) {
            options = options || {};
            this.data = {};
            this.method = options.method;
            this.params = options.params || {};
            this.type = options.type || 'GET';
        },

        initPromise = function () {
            this.promise = $.Deferred();
        },

        runServiceMethod = function () {
            return this[this.method]() === undefined ? true : false;
        },

        validateService = function (method) {
            return (this[method]) ? this[method]() : true;
        },

        parse = function (method) {
            if (this[method]) {
                this[method]();
            };
        },

        triggerServiceEvents = function () {
            var serviceEvent = this.serviceEvent;
            if (serviceEvent) {
                this.app.trigger('service:' + serviceEvent);

            }
        },

        //extend service class
        extendPrototype = function (serviceClass) {
            _.extend(serviceClass.prototype, {

                initialize: function () {
                    if (runServiceMethod.call(this)) {
                        if (validateService.call(this, this.validateBeforeSend)) { //validate before send
                            parse.call(this, this.parseBeforeSend); //parse before send
                            utils.services.callAjax(this.getServiceOptions()); //send ajax call
                        } else {
                            this.reject(); //invalid params, TODO: gestionar errores
                        }
                    }
                },

                resolve: function (responseData) {
                    var that = this;
                    setTimeout(function () { //we wait 0 seconds to simulate an ajax call and resolve service
                        that.responseData = responseData;
                        if (validateService.call(that, that.validateAfterSend)) { //validate after send
                            parse.call(that, that.parseAfterSend); //parse after send
                            that.promise.resolve(that.responseData); //resolve promise
                            triggerServiceEvents.call(that);
                        }
                    }, 0);
                },

                reject: function () {
                    var that = this;
                    setTimeout(function () { //we wait 0 seconds to simulate an ajax call and reject service
                        that.promise.reject();
                    }, 0);
                },

                getServiceOptions: function () {
                    return {
                        params: this.params,
                        type: this.type,
                        url: this.url
                    };
                },

                getPromise: function () {
                    return this.promise;
                },

                removeCacheAfter: function (miliseconds, serviceOptions) {
                    this._removeCacheAfter = this._removeCacheAfter || [];
                    this._removeCacheAfter.push({
                        miliseconds: miliseconds,
                        serviceOptions: serviceOptions
                    });
                },

                onClose: function () {
                    removeCacheAfter.call(this);
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