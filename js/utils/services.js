define([], function () {

    //TODO: hacer removeAjaxCache
    //TODO: gestionar errores xhr

    var //cache helpers

        //cache storage
        cache = window.z_cache = [],

        //find service in cache whit this options
        findCacheService = function (options) {
            return _.find(cache, function (cacheItem) {
                return isEqualService(cacheItem, options);
            }) || {};
        },

        //store service in cache if not exists, and return it
        storeServiceInCache = function (options) {
            var service = findCacheService(options);
            if (_.isEmpty(service)) {
                cache.push(utils.clone(options)); //if not exist clone and push options in cache
            }
            return findCacheService(options);
        },

        //set ajax data in cache
        setCacheData = function (options, data) {
            var service = findCacheService(options);
            service.data = data;
        },

        //service helpers

        //services storage
        services = window.z_services = [],

        //called after ajax response, run resolve service method
        resolveService = function (options, data) {
            _.each(services, function (service) {
                if (isEqualService(service.getOptions(), options)) {
                    service.resolve(data);
                    removeService(service);
                }
            });
        },

        //remove resolved service
        removeService = function (service) {
            //find service and set as undefined
            _.each(services, function (_service, index) {
                if (_service === service) {
                    services[index] = undefined;
                }
            });
            services = _.compact(services); //remove undefined services
        },

        //we wait 0 seconds to simulate an ajax call and resolve service
        resolveServiceInNewThread = function (options, service) {
            setTimeout(function () {
                resolveService(options, service.data); //we wait 0 seconds to simulate an ajax call
            }, 0);
        },

        //check key attributes between two services
        isEqualService = function (obj1, obj2) {
            return _.isEqual(obj1.params, obj2.params) &&
                obj1.type === obj2.type &&
                obj1.url === obj2.url;
        },

        //ajax helpers

        //send ajax call
        callAjax = function (options) {
            $.ajax(utils.config.get('ajaxUrl') + options.url, {
                data: options.params,
                type: options.type
            })
                .done(onAjaxSuccess.bind(this, options));
        },

        //ajax success callback
        onAjaxSuccess = function (options, data) {
            setCacheData(options, data);
            resolveService(options, data);
        },

        utils;

    return {

        _init: function (_utils) {
            utils = _utils; //store utils
        },

        //instance and run service
        run: function (serviceDefinition) {
            var instance = utils.classes.instance('service', serviceDefinition.service, serviceDefinition); //instance service
            services.push(instance); //store services
            instance.initialize();
            return instance.getPromise();
        },

        //send ajax call or resolve service with cached data
        callAjax: function (options) {
            var service = storeServiceInCache(options);
            if (service.data) {
                //if exists cached data we resolve this service
                resolveServiceInNewThread(options, service);
            } else if (!service.inProgress) {
                //else callAjax and set inProgress to prevent an other ajax call
                service.inProgress = true;
                callAjax(options, service);
            }
        }

    };
});