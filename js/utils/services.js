define([], function () {

    //TODO: hacer removeAjaxCache
    //TODO: gestionar errores xhr

    var /*
         *  util: service
         *
         *  A service is an instance of 'serviceClass'.
         *  'services' is an array where we store the services that are waiting an ajax response.
         *
         *  Flow:
         *  - Someone running the method 'run' that:
         *    - Instance object of type 'service'.
         *    - Run 'initialize' instance method, to create its 'serviceKey'
         *    - Instance should call public method 'callAjax'.
         *    - 'callAjax' checks cached data for this 'serviceKey'.
         *      - If no cached data, call ajax API
         *  - When an ajax call answered successfully:
         *    - Set responseData in 'cache'.
         *    - We resolve all services have with this 'serviceKey', and remove this services.
         *  - When a call ajax responds with error:
         *    - We remove the 'serviceKey' in 'cache' of this service.
         *    - We reject all services have with this 'serviceKey'.
         */

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

        /*
         *  util: services > ajax
         *
         *  'callAjax' send ajax call to API.
         *  'onAjaxSuccess' set 'responseData' in 'cache' and resolve services.
         *  'onAjaxError' remove 'serviceKey' fron 'cache' and reject service.
         */

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

        //ajax success callback, store responseData in cache and resolve services
        onAjaxSuccess = function (serviceKey, responseData) {
            setCacheData(serviceKey, responseData);
            resolveService(serviceKey, responseData);
        },

        //ajax error callback, remove serviceKey from cache and reject services
        onAjaxError = function (serviceKey, responseError) {
            this.removeCache(serviceKey);
            rejectService(serviceKey, responseError); //TODO: manage ajax errors
        },

        /*
         *  util: service > cache
         *
         *  'cache' is an array in which we are stored objects called 'serviceKey'.
         *  We use 'serviceKey' as a key to relate it to the services instances.
         *  'serviceKey' has this sctructure:
         *  {
         *      url: 'my-url.json' //ajax url
         *      method: 'GET', //ajax method, maybe GET, POST, PUT...
         *      params: { myParams: 'foo' }, //ajax params to send to API
         *      responseData: {} //response data of ajax call. Only after ajax call response successfully.
         *  }
         *
         *  When a service is created, 'serviceKey' is checked whether there is in the 'cache'.
         *  If there is in 'cache', we resolve service instance with 'responseData'.
         *  If not, the 'serviceKey' is cached and service instance waits for for ajax call finished.
         *
         *  When an ajax call finishes, we store its 'responseData' in the corresponding 'serviceKey' from the 'cache'.
         */

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

        //remove service from cache with serviceKey
        removeServiceCache = function (serviceKey) {
            //find service and set as undefined
            _.each(cache, function (cacheService, index) {
                if (serviceKey === undefined || isEqualServiceKey(cacheService, serviceKey)) {
                    cache[index] = undefined;
                }
            });
            cache = _.compact(cache); //remove undefined services
        },

        utils;

    return {

        _init: function (_utils) {
            utils = _utils; //store utils
        },

        /*
         *  public service methods
         */

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