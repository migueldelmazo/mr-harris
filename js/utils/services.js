define([], function () {

    //TODO: hacer removeAjaxCache
    //TODO: gestionar errores xhr

    var //cache helpers

        //cache storage
        cache = window.z_cache = [],

        //find service in cache whit this serviceKey
        findCacheService = function (serviceKey) {
            return _.find(cache, function (cacheService) {
                return isEqualServiceKey(cacheService, serviceKey);
            }) || {};
        },

        //store service in cache if not exists, and return it
        storeServiceInCache = function (serviceKey) {
            var service = findCacheService(serviceKey);
            if (_.isEmpty(service)) {
                cache.push(utils.clone(serviceKey)); //if not exist clone and push serviceKey in cache
            }
            return findCacheService(serviceKey);
        },

        //set ajax response data in cache
        setCacheData = function (serviceKey, responseData) {
            var service = findCacheService(serviceKey);
            service.responseData = responseData;
        },

        //remove service from cache
        removeServiceCache = function (serviceKey) {
            //find service and set as undefined
            _.each(cache, function (cacheService, index) {
                if (isEqualServiceKey(cacheService, serviceKey)) {
                    cache[index] = undefined;
                }
            });
            cache = _.compact(cache); //remove undefined services
        },

        //service helpers

        //services storage
        services = window.z_services = [],

        //called after ajax response, run resolve service method
        resolveService = function (serviceKey, responseData) {
            _.each(services, function (service) {
                if (isEqualServiceKey(service.getServiceKey(), serviceKey)) {
                    service.resolve(responseData);
                    removeService(serviceKey);
                }
            });
        },

        //called after ajax response, run reject service method
        rejectService = function (serviceKey, responseError) {
            _.each(services, function (service) {
                if (isEqualServiceKey(service.getServiceKey(), serviceKey)) {
                    service.reject(responseError);
                    removeService(serviceKey);
                }
            });
        },

        //remove resolved service
        removeService = function (serviceKey) {
            //find service and set as undefined
            _.each(services, function (service, index) {
                if (service === serviceKey) {
                    services[index] = undefined;
                }
            });
            services = _.compact(services); //remove undefined services
        },

        //check key attributes between two services
        isEqualServiceKey = function (obj1, obj2) {
            return _.isEqual(obj1.params, obj2.params) && obj1.type === obj2.type && obj1.url === obj2.url;
        },

        //ajax helpers

        //send ajax call
        callAjax = function (serviceKey) {
            $.ajax(utils.config.get('ajaxUrl') + serviceKey.url, {
                data: serviceKey.params,
                type: serviceKey.type,
                context: this
            })
                .done(onAjaxSuccess.bind(this, serviceKey))
                .fail(onAjaxError.bind(this, serviceKey));
        },

        //ajax success callback
        onAjaxSuccess = function (serviceKey, responseData) {
            setCacheData(serviceKey, responseData);
            resolveService(serviceKey, responseData);
        },

        //ajax error callback
        onAjaxError = function (serviceKey, responseError) {
            this.removeCache(serviceKey);
            rejectService(serviceKey, responseError); //TODO: manage ajax errors
        },

        utils;

    return {

        _init: function (_utils) {
            utils = _utils; //store utils
        },

        //instance, run service and return promise
        run: function (serviceDefinition) {
            var instance = utils.classes.instance('service', serviceDefinition.service, serviceDefinition); //instance service
            services.push(instance); //store services
            instance.initialize();
            return instance.getPromise();
        },

        //send ajax call or resolve service with cached response data
        callAjax: function (serviceKey) {
            var service = storeServiceInCache(serviceKey),
                responseData = service.responseData;
            if (responseData) { //if exists cached response data we resolve this service
                resolveService(serviceKey, responseData);
            } else if (!service.inProgress) { //else callAjax and set inProgress to prevent an other ajax call
                service.inProgress = true;
                callAjax.call(this, serviceKey, service);
            }
        },

        //remove a service from cache
        removeCache: function (serviceKey) {
            removeServiceCache(serviceKey);
        }

    };
});